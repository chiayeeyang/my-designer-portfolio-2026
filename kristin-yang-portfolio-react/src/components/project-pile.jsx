import { useEffect, useRef, useState } from 'react';
import { playProjects } from '@/lib/play-projects';
export default function ProjectPile() {
    const [selected, setSelected] = useState(null);
    const rig = useRef(null);
    const wire = useRef(null);
    const arena = useRef(null);
    const links = useRef([]);
    useEffect(() => {
        const area = arena.current;
        if (!area)
            return;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
        let busy = false;
        let dead = false;
        let lifted = null;
        const animations = [];
        let balls = [];
        let width = 0, height = 0, frame = 0, last = 0, until = 0, focused = false;
        let prevX = -1, prevY = -1;
        const cooldown = Array(6).fill(0);
        const draw = () => balls.forEach((b, i) => { const el = links.current[i]; if (el) {
            el.style.left = '0';
            el.style.top = '0';
            el.style.width = `${b.r * 2}px`;
            el.style.height = `${b.r * 2}px`;
            el.style.transform = `translate(${b.x - b.r}px,${b.y - b.r}px) rotate(${b.angle}deg)`;
        } });
        function step(dt) {
            for (const b of balls) {
                b.vy += 1000 * dt;
                b.vx *= Math.pow(.985, dt * 60);
                b.x += b.vx * dt;
                b.y += b.vy * dt;
                b.angle += b.spin * dt;
                b.spin *= .97;
                if (b.x < b.r) {
                    b.x = b.r;
                    b.vx = Math.abs(b.vx) * .55;
                }
                if (b.x > width - b.r) {
                    b.x = width - b.r;
                    b.vx = -Math.abs(b.vx) * .55;
                }
                if (b.y < b.r) {
                    b.y = b.r;
                    b.vy = Math.abs(b.vy) * .3;
                }
                if (b.y > height - b.r) {
                    b.y = height - b.r;
                    b.vy = -Math.abs(b.vy) * .22;
                    b.vx *= .93;
                    if (Math.abs(b.vy) < 18)
                        b.vy = 0;
                }
            }
            for (let pass = 0; pass < 5; pass++)
                for (let i = 0; i < balls.length; i++)
                    for (let j = i + 1; j < balls.length; j++) {
                        const a = balls[i], b = balls[j], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || .01, gap = a.r + b.r - d;
                        if (gap > 0) {
                            const nx = dx / d, ny = dy / d;
                            a.x -= nx * gap * .5;
                            a.y -= ny * gap * .5;
                            b.x += nx * gap * .5;
                            b.y += ny * gap * .5;
                            const speed = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
                            if (speed < 0) {
                                const impulse = -speed * .62;
                                a.vx -= impulse * nx;
                                a.vy -= impulse * ny;
                                b.vx += impulse * nx;
                                b.vy += impulse * ny;
                            }
                        }
                    }
            for (const b of balls) {
                b.x = Math.max(b.r, Math.min(width - b.r, b.x));
                b.y = Math.max(b.r, Math.min(height - b.r, b.y));
            }
        }
        function animate(now) { frame = 0; if (focused || reduced.matches || busy)
            return; const dt = Math.min((now - last) / 1000 || 1 / 60, 1 / 30); last = now; step(dt / 2); step(dt / 2); draw(); if (now < until)
            frame = requestAnimationFrame(animate); }
        function wake() { if (reduced.matches || focused)
            return; until = performance.now() + 4500; if (!frame) {
            last = performance.now();
            frame = requestAnimationFrame(animate);
        } }
        function resize() { if (busy)
            return; const rect = area.getBoundingClientRect(); if (Math.abs(rect.width - width) < 1 && Math.abs(rect.height - height) < 1)
            return; width = rect.width; height = rect.height; const base = Math.max(52, Math.min(120, width / 7.9)); balls = [.9, 1.05, 1.13, .93, 1.02, .98].map((size, i) => ({ r: base * size, x: width * (.18 + (i % 3) * .32), y: height * .2 + Math.floor(i / 3) * base * 2.4, vx: 0, vy: 0, angle: [-9, 8, -5, 7, -6, 4][i], spin: 0 })); for (let n = 0; n < 420; n++)
            step(1 / 60); balls.forEach(b => { b.vx = 0; b.vy = 0; }); draw(); }
        function move(event) { if (event.pointerType !== 'mouse' || reduced.matches || focused || busy)
            return; const rect = area.getBoundingClientRect(), x = event.clientX - rect.left, y = event.clientY - rect.top; const travel = Math.hypot(x - prevX, y - prevY); prevX = x; prevY = y; if (travel < 3)
            return; const now = performance.now(); const i = balls.findIndex(b => Math.hypot(x - b.x, y - b.y) < b.r); if (i < 0 || now - cooldown[i] < 850)
            return; cooldown[i] = now; const b = balls[i]; b.vx = (x < b.x ? 1 : -1) * Math.min(340, 150 + travel * 3); b.vy = -Math.min(430, 230 + travel * 2); b.spin = (x < b.x ? 1 : -1) * 50; wake(); }
        async function pick(event) {
            const target = event.target.closest('.pile-ball');
            if (!target || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0)
                return;
            if (reduced.matches)
                return;
            event.preventDefault();
            if (busy)
                return;
            const index = links.current.indexOf(target);
            const b = balls[index];
            if (!b || !rig.current || !wire.current) {
                window.location.assign(target.href);
                return;
            }
            busy = true;
            setSelected(index);
            cancelAnimationFrame(frame);
            frame = 0;
            const arm = rig.current, tether = wire.current;
            area.classList.add('claw-working');
            const rect = target.getBoundingClientRect();
            arm.style.left = `${rect.left + rect.width / 2 - 40}px`;
            arm.style.visibility = 'visible';
            const resetPickup = () => { lifted?.remove(); lifted = null; target.style.visibility = ''; arm.style.visibility = 'hidden'; };
            async function run(el, keyframes, duration) { const a = el.animate(keyframes, { duration, easing: 'cubic-bezier(.35,0,.2,1)', fill: 'forwards' }); animations.push(a); await a.finished; }
            try {
                const drop = Math.max(0, rect.top + 16);
                await run(tether, [{ height: '0px' }, { height: `${drop}px` }], 750);
                arm.classList.add('claw-closed');
                await run(arm, [{ opacity: 1 }, { opacity: 1 }], 220);
                lifted = target.cloneNode(true);
                lifted.setAttribute('aria-hidden', 'true');
                lifted.setAttribute('tabindex', '-1');
                Object.assign(lifted.style, { position: 'fixed', left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px`, transform: 'none', zIndex: '1999', pointerEvents: 'none', visibility: 'visible' });
                document.body.appendChild(lifted);
                target.style.visibility = 'hidden';
                await Promise.all([
                    run(tether, [{ height: `${drop}px` }, { height: '0px' }], 950),
                    run(arm, [{ transform: 'translateY(0)' }, { transform: `translateY(-${rect.height + 64}px)` }], 950),
                    run(lifted, [{ top: `${rect.top}px` }, { top: `-${rect.height + 80}px` }], 950)
                ]);
                if (!dead)
                    window.location.assign(target.href);
            }
            catch {
                if (!dead) {
                    resetPickup();
                    busy = false;
                    setSelected(null);
                    area.classList.remove('claw-working');
                    arm.classList.remove('claw-closed');
                    animations.forEach(a => a.cancel());
                    draw();
                }
            }
        }
        const restore = () => { lifted?.remove(); lifted = null; links.current.forEach(link => { if (link)
            link.style.visibility = ''; }); if (rig.current)
            rig.current.style.visibility = 'hidden'; busy = false; setSelected(null); animations.splice(0).forEach(a => a.cancel()); area.classList.remove('claw-working'); rig.current?.classList.remove('claw-closed'); resize(); draw(); };
        window.addEventListener('pageshow', restore);
        const focus = (e) => { if (e.target.matches(':focus-visible')) {
            focused = true;
            if (frame)
                cancelAnimationFrame(frame);
            frame = 0;
        } };
        const blur = () => { focused = false; };
        const observer = new ResizeObserver(resize);
        observer.observe(area);
        resize();
        area.addEventListener('click', pick);
        area.addEventListener('pointermove', move);
        area.addEventListener('focusin', focus);
        area.addEventListener('focusout', blur);
        return () => { dead = true; lifted?.remove(); window.removeEventListener('pageshow', restore); animations.forEach(a => a.cancel()); area.removeEventListener('click', pick); cancelAnimationFrame(frame); observer.disconnect(); area.removeEventListener('pointermove', move); area.removeEventListener('focusin', focus); area.removeEventListener('focusout', blur); };
    }, []);
    return <section className="project-pile open-claw-playground" aria-label="Side projects"><span className="sr-only" role="status">{selected !== null ? `Picking up ${playProjects[selected].title}` : ''}</span><div ref={rig} className="claw-rig screen-claw" aria-hidden="true"><div ref={wire} className="claw-wire"/><svg className="machine-claw" viewBox="0 0 80 64"><rect x="31" y="0" width="18" height="16" rx="4" fill="#244bed"/><path className="claw-finger-left" d="M33 15L12 36L17 55L26 59"/><path className="claw-finger-right" d="M47 15L68 36L63 55L54 59"/><path d="M40 14V48"/></svg></div><div className="pile-arena" ref={arena}>{playProjects.map((p, i) => <a aria-disabled={selected !== null} ref={el => { links.current[i] = el; }} className={`pile-ball pile-tone-${i % 4}`} href={`/not-work/${p.slug}`} key={p.slug} aria-label={`Explore ${p.title}`}><div className="orb-name"><h2>{p.title}</h2></div><div className="orb-image" aria-hidden="true"><span>＋</span></div></a>)}</div></section>;
}
