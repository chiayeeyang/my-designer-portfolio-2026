import { useEffect, useId, useRef, useState } from 'react';
import styles from './mazda-puzzle.module.css';
const artwork = '/images/mazda-mx5-hero.jpg';
const columns = 10, rows = 7;
// Deterministic, offset junctions keep the 70 pieces irregular without hydration drift.
const knots = Array.from({ length: rows + 1 }, (_, r) => Array.from({ length: columns + 1 }, (_, c) => [
    c * 100 + (c === 0 || c === columns ? 0 : Math.sin(r * 7 + c * 13) * 10),
    r * 708 / rows + (r === 0 || r === rows ? 0 : Math.sin(r * 11 + c * 3) * 9),
]));
// Each shared edge is defined once; its neighbor uses the exact reversed curve.
// Offset junctions and alternating curved tabs create asymmetrical interlocking pieces.
function edge(a, b, tab) {
    const dx = b[0] - a[0], dy = b[1] - a[1], length = Math.hypot(dx, dy);
    const p = (u, v) => [a[0] + dx * u - dy / length * v, a[1] + dy * u + dx / length * v];
    if (!tab)
        return { start: a, segments: [[p(1 / 3, 0), p(2 / 3, 0), b]] };
    return { start: a, segments: [
            [p(.15, 0), p(.32, 0), p(.40, 0)],
            [p(.48, 0), p(.40, tab * .38), p(.40, tab * .80)],
            [p(.40, tab * 1.32), p(.60, tab * 1.32), p(.60, tab * .80)],
            [p(.60, tab * .28), p(.52, 0), p(.62, 0)],
            [p(.72, 0), p(.88, 0), b],
        ] };
}
function commands(curve, reverse = false) {
    if (!reverse)
        return curve.segments.map(s => `C${s.flat().join(' ')}`).join(' ');
    return curve.segments.map((s, i) => [s[1], s[0], i ? curve.segments[i - 1][2] : curve.start]).reverse().map(s => `C${s.flat().join(' ')}`).join(' ');
}
const horizontal = knots.map((row, r) => row.slice(0, -1).map((a, c) => edge(a, row[c + 1], r === 0 || r === rows ? 0 : ((r + c) % 2 ? 1 : -1) * (8 + c % 3))));
const vertical = knots.slice(0, -1).map((row, r) => row.map((a, c) => edge(a, knots[r + 1][c], c === 0 || c === columns ? 0 : ((r + c) % 2 ? -1 : 1) * (8 + r % 3))));
const pieces = Array.from({ length: columns * rows }, (_, i) => {
    const r = Math.floor(i / columns), c = i % columns;
    return `M${knots[r][c].join(' ')} ${commands(horizontal[r][c])} ${commands(vertical[r][c + 1])} ${commands(horizontal[r + 1][c], true)} ${commands(vertical[r][c], true)} Z`;
});
const seams = [...horizontal.slice(1, rows).flat(), ...vertical.flatMap(row => row.slice(1, columns))].map(e => `M${e.start.join(' ')} ${commands(e)}`).join(' ');
// The badge on the car's nose is inside this deliberately irregular lower piece.
const missingPiece = 45;
export default function MazdaPuzzle({ fullscreen = false }) {
    const id = `mazda-${useId().replace(/:/g, '')}`;
    const root = useRef(null), image = useRef(null);
    const [loaded, setLoaded] = useState(false), [active, setActive] = useState(false);
    const [mounted, setMounted] = useState(false), [run, setRun] = useState(0);
    const reset = useRef(null);
    const [src, setSrc] = useState(artwork);
    const enter = () => {
        if (reset.current)
            clearTimeout(reset.current);
        setRun(value => value + 1);
        setMounted(true);
        setActive(true);
    };
    const leave = () => {
        setActive(false);
        if (reset.current)
            clearTimeout(reset.current);
        reset.current = setTimeout(() => { setMounted(false); reset.current = null; }, 500);
    };
    useEffect(() => {
        if (image.current?.complete && image.current.naturalWidth > 0)
            setLoaded(true);
        const hide = () => { if (document.hidden)
            leave(); };
        document.addEventListener('visibilitychange', hide);
        return () => { if (reset.current)
            clearTimeout(reset.current); document.removeEventListener('visibilitychange', hide); };
    }, []);
    return <div ref={root} className={`${styles.puzzle} ${fullscreen ? styles.fullscreen : ""} relative isolate w-full overflow-hidden`} onMouseEnter={enter} onMouseLeave={leave} onFocus={enter} onBlur={leave} tabIndex={fullscreen ? 0 : undefined} data-ready={loaded} data-active={active} role="img" aria-label="An irregular Mazda puzzle completes as the missing car-badge piece slides into place, then becomes a seamless illustration. Hover to reveal the puzzle and complete the missing piece.">
  <img ref={image} src={src} onLoad={() => setLoaded(true)} onError={() => setSrc('/images/mazda-puzzle-1.jpg')} className={styles.fallback} alt="" aria-hidden="true"/>
  <img src={src} alt="" aria-hidden="true" className={styles.backdrop}/>
  {mounted && loaded && <svg key={run} preserveAspectRatio="xMidYMid slice" className={`${styles.scene} absolute inset-0 h-full w-full`} viewBox="0 0 1000 708" aria-hidden="true">
   <defs>
    <image id={`${id}-art`} href={src} width="1000" height="708" preserveAspectRatio="none"/>
    {pieces.map((d, i) => <clipPath id={`${id}-piece-${i}`} clipPathUnits="userSpaceOnUse" key={i}><path d={d}/></clipPath>)}
   </defs>
   <g className={styles.camera}>
   {[...pieces.keys()].filter(i => i !== missingPiece).concat(missingPiece).map(i => <g key={i} className={i === missingPiece ? styles.missing : undefined}><use href={`#${id}-art`} clipPath={`url(#${id}-piece-${i})`}/></g>)}
   <use href={`#${id}-art`} className={styles.complete}/>
   <path className={styles.seams} d={seams} fill="none" strokeWidth=".8" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"/>
   </g>
  </svg>}
 </div>;
}
