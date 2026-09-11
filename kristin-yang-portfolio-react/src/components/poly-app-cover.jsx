import { useEffect, useId, useRef, useState } from 'react';
import styles from './poly-app-cover.module.css';
const pieces = [
    { name: 'Daily tracking phone', x: 813, y: 20, w: 338, h: 684, r: 49, delay: 0, kind: 'phone' },
    { name: 'Welcome phone', x: 425, y: 440, w: 333, h: 650, r: 49, delay: 1100, kind: 'phone' },
    { name: 'Recipe browsing phone', x: 1214, y: 448, w: 334, h: 650, r: 49, delay: 2200, kind: 'phone' },
    { name: 'Calendar and activity overview', x: 1218, y: -45, w: 330, h: 440, r: 34, delay: 3500, kind: 'card' },
    { name: 'Sleep article', x: 1611, y: -50, w: 332, h: 402, r: 32, delay: 3800, kind: 'card' },
    { name: 'Meal and activity entry', x: 823, y: 756, w: 321, h: 380, r: 20, delay: 4100, kind: 'card' },
    { name: 'Overnight oats recipe', x: 1612, y: 400, w: 331, h: 720, r: 40, delay: 4400, kind: 'card' },
];
export default function PolyAppCover() {
    const ref = useRef(null), id = useId().replaceAll(':', '');
    const [entered, setEntered] = useState(false);
    useEffect(() => { const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) {
        setEntered(true);
        observer.disconnect();
    } }, { threshold: .18 }); if (ref.current)
        observer.observe(ref.current); return () => observer.disconnect(); }, []);
    return <div ref={ref} className={styles.cover} data-entered={entered}>
 <svg viewBox="0 0 2048 968" role="img" aria-label="Poly App: three mobile screens for welcoming users, tracking daily habits, and discovering recipes, followed by calendar, article and meal-entry cards and the Poly App logo">
 <defs><linearGradient id={`${id}-pink`} x2="0" y2="1"><stop stopColor="#f6d6d1"/><stop offset="1" stopColor="#fff6ef"/></linearGradient>{pieces.map((p, i) => <clipPath key={p.name} id={`${id}-${i}`}><rect x={p.x} y={p.y} width={p.w} height={p.h} rx={p.r}/></clipPath>)}<clipPath id={`${id}-logo`}><rect x="437" y="292" width="314" height="110"/></clipPath></defs>
 <path fill="#fff6ef" d="M0 0h2048v968H0z"/><path fill={`url(#${id}-pink)`} d="M0 182C245 254 244 54 525 125S817 107 991 161s252 218 501 135 406-6 477-17 65-110 79-92v781H0Z"/><path fill="#f4d1c9" d="M0 783c278-100 460 169 714 58s331 61 532-111 292 79 528 6 211-6 274 37v195H0Z"/>
 <g transform="translate(-160 0)">{pieces.map((p, i) => <g key={p.name} className={`${styles.piece} ${p.kind === 'phone' ? styles.phone : styles.card}`} style={{ animationDelay: `${p.delay}ms` }}><g clipPath={`url(#${id}-${i})`}><image href="/images/poly-app-landing.jpg" width="2048" height="968"/></g></g>)}
 <g className={`${styles.piece} ${styles.logo}`} style={{ animationDelay: '5400ms' }}><g clipPath={`url(#${id}-logo)`}><image href="/images/poly-app-landing.jpg" width="2048" height="968"/></g></g>
 </g></svg></div>;
}
