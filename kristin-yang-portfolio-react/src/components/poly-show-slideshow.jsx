import { useEffect, useRef, useState } from 'react';
import styles from './poly-show-slideshow.module.css';
export default function PolyShowSlideshow({ images }) {
    const [active, setActive] = useState(0), [paused, setPaused] = useState(false), [visible, setVisible] = useState(false), [reduced, setReduced] = useState(false);
    const ref = useRef(null);
    useEffect(() => { const media = matchMedia('(prefers-reduced-motion: reduce)'); const update = () => setReduced(media.matches); update(); media.addEventListener('change', update); const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .15 }); if (ref.current)
        observer.observe(ref.current); return () => { media.removeEventListener('change', update); observer.disconnect(); }; }, []);
    useEffect(() => { if (!visible || paused || reduced || images.length < 2)
        return; const timer = setInterval(() => setActive(n => (n + 1) % images.length), 4500); return () => clearInterval(timer); }, [visible, paused, reduced, images.length]);
    function move(direction) { setPaused(true); setActive(n => (n + direction + images.length) % images.length); }
    return <div ref={ref} className={styles.slideshow} role="region" aria-roledescription="carousel" aria-label="Graduate show photographs"><div className={styles.stage}>{images.map((image, i) => <img key={image.src} src={image.src} alt={image.label} hidden={i !== active}/>)}</div><div className={styles.controls}><div><span>{String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span></div><div className={styles.buttons}><button type="button" aria-label="Previous photograph" onClick={() => move(-1)}>←</button>{!reduced && <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}>{paused ? 'Play' : 'Pause'}</button>}<button type="button" aria-label="Next photograph" onClick={() => move(1)}>→</button></div></div></div>;
}
