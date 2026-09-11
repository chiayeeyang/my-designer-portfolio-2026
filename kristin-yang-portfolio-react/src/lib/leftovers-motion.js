const ease = (v) => { v = Math.max(0, Math.min(1, v)); return v * v * (3 - 2 * v); };
const phase = (t, a, b) => ease((t - a) / (b - a));
const mix = (a, b, t) => a + (b - a) * t;
// Shared clock: entry 0–.9, tray dissolve .9–1.2, fold 1.2–2.2,
// food and closure 2.2–3, followed by a 1.2 second finished hold.
export const LEFTOVERS_LOOP_SECONDS = 4.8;
function bezierProgress(value, x1, y1, x2, y2) {
    const x = Math.max(0, Math.min(1, value));
    let low = 0, high = 1, u = x;
    const sample = (v, a, b) => 3 * (1 - v) * (1 - v) * v * a + 3 * (1 - v) * v * v * b + v * v * v;
    for (let i = 0; i < 16; i++) {
        u = (low + high) / 2;
        if (sample(u, x1, x2) < x)
            low = u;
        else
            high = u;
    }
    return sample(u, y1, y2);
}
const entry = (t) => bezierProgress(t / .9, .16, 1, .3, 1);
const W = 200, D = 170, H = 190;
// Source positions on the supplied dieline, in its 1888 × 1334 reference space.
const artwork = [
    { wall: [[699, 633], [903, 428], [638, 109], [379, 367]], lid: [[379, 367], [638, 109], [550, 29], [392, 29], [299, 121], [299, 279]] },
    { wall: [[903, 428], [1183, 709], [1511, 448], [1163, 100]], lid: [[1163, 100], [1511, 448], [1593, 367], [1593, 261], [1565, 35], [1490, 19], [1405, 78], [1245, 19]] },
    { wall: [[1183, 709], [980, 913], [1248, 1230], [1504, 974]], lid: [[1504, 974], [1248, 1230], [1333, 1316], [1490, 1316], [1583, 1220], [1583, 1062]] },
    { wall: [[980, 913], [699, 633], [370, 893], [718, 1242]], lid: [[718, 1242], [370, 893], [296, 967], [296, 1207], [405, 1315], [640, 1315]] },
];
function affine(ctx, image, uv, p) {
    const [a, b, c] = uv, [u, v, w] = p;
    const det = (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
    if (Math.abs(det) < .001)
        return;
    const ax = ((v[0] - u[0]) * (c[1] - a[1]) - (w[0] - u[0]) * (b[1] - a[1])) / det;
    const bx = ((w[0] - u[0]) * (b[0] - a[0]) - (v[0] - u[0]) * (c[0] - a[0])) / det;
    const ay = ((v[1] - u[1]) * (c[1] - a[1]) - (w[1] - u[1]) * (b[1] - a[1])) / det;
    const by = ((w[1] - u[1]) * (b[0] - a[0]) - (v[1] - u[1]) * (c[0] - a[0])) / det;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(...u);
    ctx.lineTo(...v);
    ctx.lineTo(...w);
    ctx.closePath();
    ctx.clip();
    ctx.transform(ax, ay, bx, by, u[0] - ax * a[0] - bx * a[1], u[1] - ay * a[0] - by * a[1]);
    ctx.drawImage(image, 0, 0, 1888, 1334);
    ctx.restore();
}
export function trayPose(t) {
    return { arrival: bezierProgress(t, .16, 1, .3, 1), sink: phase(t, 1, 1.4), paperFade: phase(t, 1.4, 1.52) };
}
export function renderLeftovers(ctx, width, height, t, net, liner) {
    t = Math.max(0, t - .2);
    const fold = phase(t, 1.32, 2.2), fade = 1 - phase(t, 4.2, 4.6);
    ctx.clearRect(0, 0, width, height);
    const bg = ctx.createLinearGradient(0, 0, width, height);
    bg.addColorStop(0, '#64b5ff');
    bg.addColorStop(1, '#0589f5');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#158de9';
    ctx.beginPath();
    ctx.moveTo(0, height * .72);
    ctx.lineTo(width, height * .93);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.fill();
    const cx = width * .5, cy = height * .5, unit = Math.min(width / 840, height / 590);
    const cam = phase(t, 1.32, 2.2), yaw = mix(-.1, -.63, cam), tilt = mix(.18, .85, cam);
    const scale = unit * mix(.85, 1.48, cam);
    const project = (p) => {
        const x = p[0] * Math.cos(yaw) - p[1] * Math.sin(yaw);
        const y = p[0] * Math.sin(yaw) + p[1] * Math.cos(yaw);
        return [cx + x * scale, cy + (y * Math.cos(tilt) - (p[2] - (H * Math.sin(78 * Math.PI / 180) / 2) * cam) * Math.sin(tilt)) * scale];
    };
    const depth = (p) => (p[0] * Math.sin(yaw) + p[1] * Math.cos(yaw)) * Math.sin(tilt) + p[2] * Math.cos(tilt);
    ctx.save();
    ctx.globalAlpha = fade * .22;
    ctx.filter = 'blur(12px)';
    ctx.fillStyle = '#074e83';
    ctx.beginPath();
    ctx.ellipse(cx, cy + height * .26, width * mix(.28, .19, cam), height * .055, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    const modelAlpha = phase(t, 1.2, 1.32) * fade;
    if (!modelAlpha)
        return;
    ctx.save();
    ctx.globalAlpha = modelAlpha;
    const faces = [{ points: [[-W / 2, -D / 2, 0], [-W / 2, D / 2, 0], [W / 2, D / 2, 0], [W / 2, -D / 2, 0]], uv: [[699, 633], [903, 428], [1183, 709], [980, 913]], shade: .02 }];
    const angle = fold * 78 * Math.PI / 180;
    const spread = H * Math.cos(angle), z = H * Math.sin(angle);
    // Four tapered walls. Each lid is attached to its wall's outer hinge.
    for (let i = 0; i < 4; i++) {
        const alongX = i === 1 || i === 3;
        const normal = i === 0 ? [-1, 0] : i === 1 ? [0, 1] : i === 2 ? [1, 0] : [0, -1];
        const tangent = i === 0 ? [0, 1] : i === 1 ? [1, 0] : i === 2 ? [0, -1] : [-1, 0];
        const edge = alongX ? D / 2 : W / 2, half = alongX ? W / 2 : D / 2;
        const at = (out, across, height) => [normal[0] * out + tangent[0] * across, normal[1] * out + tangent[1] * across, height];
        const flare = H * Math.cos(78 * Math.PI / 180) * fold;
        const innerA = at(edge, -half, 0), innerB = at(edge, half, 0);
        const outerA = at(edge + spread, -half - flare, z), outerB = at(edge + spread, half + flare, z);
        faces.push({ points: [innerA, innerB, outerB, outerA], uv: artwork[i].wall, shade: [.06, .01, .18, .1][i] * fold });
        const close = phase(t, i % 2 === 0 ? 2.6 : 2.72, i % 2 === 0 ? 2.86 : 3.0);
        const lidAngle = angle + close * (Math.PI - angle);
        const length = (edge + H * Math.cos(78 * Math.PI / 180) + 3);
        const endOut = edge + spread + length * Math.cos(lidAngle), endZ = z + length * Math.sin(lidAngle) + i * .45 * close;
        const tipA = at(endOut, -half - flare + 14, endZ), tipB = at(endOut, half + flare - 14, endZ);
        // The outer red flaps are rectified directly from their printed source panels.
        const lidUV = artwork[i].lid;
        faces.push({ points: [outerA, outerB, tipB, tipA], uv: [lidUV[0], lidUV[1], lidUV[Math.floor(lidUV.length / 2)], lidUV[lidUV.length - 1]], shade: .035 });
    }
    const items = faces.map(face => ({ depth: face.points.reduce((s, p) => s + depth(p), 0) / face.points.length, draw: () => {
            const lw = Math.min(width * .6, height * .78 * 5061 / 3590), lh = lw * 3590 / 5061;
            const points = face.points.map((p, i) => {
                // The printed net starts in exactly the same position as the complete liner.
                const x = (944 - face.uv[i][0]) * lw / 1888, y = (667 - face.uv[i][1]) * lh / 1334;
                const flat = [cx + x * Math.cos(-.1) - y * Math.sin(-.1), cy + x * Math.sin(-.1) + y * Math.cos(-.1)];
                const folded = project(p);
                return [mix(flat[0], folded[0], fold), mix(flat[1], folded[1], fold)];
            });
            ctx.save();
            ctx.beginPath();
            points.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p));
            ctx.closePath();
            ctx.fillStyle = '#f4c72e';
            ctx.fill();
            affine(ctx, net, [face.uv[0], face.uv[1], face.uv[2]], [points[0], points[1], points[2]]);
            affine(ctx, net, [face.uv[0], face.uv[2], face.uv[3]], [points[0], points[2], points[3]]);
            ctx.beginPath();
            points.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p));
            ctx.closePath();
            if (face.shade) {
                ctx.fillStyle = 'rgba(54,24,8,' + face.shade + ')';
                ctx.fill();
            }
            ctx.strokeStyle = '#ffefbc99';
            ctx.lineWidth = .65;
            ctx.stroke();
            ctx.restore();
        } }));
    // Food stays inside the rim; depth sorting lets the front walls conceal its landing.
    for (let i = 0; i < 3; i++) {
        const drop = bezierProgress((t - 2.2 - i * .045) / .31, .175, .885, .32, 1.275);
        if (t < 2.2 + i * .045 || t > 2.62)
            continue;
        const p = [(i - 1) * 36, 10 + (i % 2) * 18, mix(430, 30, drop)];
        items.push({ depth: depth(p), draw: () => {
                const [x, y] = project(p);
                ctx.save();
                ctx.translate(x, y);
                ctx.scale(unit * 1.2, unit * 1.2);
                ctx.rotate((1 - drop) * (i - 1));
                ctx.globalAlpha *= 1 - phase(t, 2.53, 2.62);
                if (i === 0) {
                    ctx.fillStyle = '#529448';
                    for (const [a, b, r] of [[-10, 0, 13], [9, 0, 14], [0, -12, 13]]) {
                        ctx.beginPath();
                        ctx.arc(a, b, r, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    ctx.fillStyle = '#93b85e';
                    ctx.fillRect(-4, 7, 8, 16);
                }
                else if (i === 1) {
                    ctx.strokeStyle = '#f6c85b';
                    ctx.lineWidth = 8;
                    ctx.lineCap = 'round';
                    ctx.beginPath();
                    ctx.moveTo(-18, -8);
                    ctx.bezierCurveTo(21, -22, -21, 19, 18, 8);
                    ctx.moveTo(-12, 8);
                    ctx.bezierCurveTo(22, -5, -12, 28, 22, 20);
                    ctx.stroke();
                }
                else {
                    ctx.fillStyle = '#e84c34';
                    ctx.beginPath();
                    ctx.arc(0, 0, 17, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = '#448847';
                    ctx.beginPath();
                    ctx.moveTo(0, -20);
                    ctx.lineTo(5, -12);
                    ctx.lineTo(14, -13);
                    ctx.lineTo(4, -7);
                    ctx.lineTo(-9, -14);
                    ctx.closePath();
                    ctx.fill();
                }
                ctx.restore();
            } });
    }
    items.sort((a, b) => a.depth - b.depth).forEach(item => item.draw());
    ctx.restore();
}
