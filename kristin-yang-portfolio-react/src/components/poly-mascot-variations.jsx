import { useEffect, useRef, useState } from 'react';
import styles from './poly-mascot-variations.module.css';
const variants = [{ id: 12, name: 'Ovie asking a question' }, { id: 13, name: 'Ovie celebrating' }, { id: 14, name: 'Ovie offering encouragement' }, { id: 15, name: 'Ovie providing nutrition guidance' }];
export default function PolyMascotVariations() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState(0);
    useEffect(() => { const observer = new IntersectionObserver(entries => setVisible(entries.some(e => e.isIntersecting)), { threshold: .15 }); if (ref.current)
        observer.observe(ref.current); return () => observer.disconnect(); }, []);
    useEffect(() => { if (!visible || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
        return; const interval = setInterval(() => setActive(index => (index + 1) % variants.length), 2000); return () => clearInterval(interval); }, [visible]);
    return <section className={styles.wrapper}><h3>Variations</h3><div ref={ref} className={styles.variations} data-playing={visible} aria-label="Ovie character slideshow">{variants.map((v, i) => <img key={v.id} src={`/images/poly-case-${v.id}.jpg`} alt={v.name} hidden={i !== active}/>)}</div></section>;
}
