import { useEffect, useRef, useState } from 'react';
import styles from './poly-testing.module.css';
export function SaveRecipeDemo() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => { const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .2 }); if (ref.current)
        observer.observe(ref.current); return () => observer.disconnect(); }, []);
    return <div ref={ref} className={`${styles.saveDemo} ${styles.autoSave}`} data-playing={visible} role="img" aria-label="Animated demonstration: an outlined heart is pressed and fills pink to save a recipe"><div className={styles.heartButton}><svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 54 9 31C-5 15 18-1 32 16 46-1 69 15 55 31Z"/></svg><span className={styles.saveRipple}/></div><span className={styles.savedLabel} aria-hidden="true">Recipe saved</span></div>;
}
export function ButtonZoom() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => { const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .15 }); if (ref.current)
        observer.observe(ref.current); return () => observer.disconnect(); }, []);
    return <div ref={ref} className={styles.zoomFrame} data-playing={visible}><img className={styles.resultCutout} src="/images/poly-result-updated.png" alt="Poly Health result screen with Retake the Test and Back to Home actions" loading="lazy"/></div>;
}
export function PmsInfoDemo() {
    const [phase, setPhase] = useState('wide');
    const [visible, setVisible] = useState(false), [reduced, setReduced] = useState(false), [manual, setManual] = useState(false), [manualOpen, setManualOpen] = useState(false);
    const container = useRef(null), trigger = useRef(null);
    useEffect(() => { const media = matchMedia('(prefers-reduced-motion: reduce)'); const update = () => setReduced(media.matches); update(); media.addEventListener('change', update); const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .2 }); if (container.current)
        observer.observe(container.current); return () => { observer.disconnect(); media.removeEventListener('change', update); }; }, []);
    useEffect(() => {
        if (!visible || reduced || manual) {
            setPhase('wide');
            return;
        }
        let timers = [];
        function cycle() { setPhase('wide'); timers = [setTimeout(() => setPhase('zoom'), 900), setTimeout(() => setPhase('click'), 2600), setTimeout(() => setPhase('open'), 3100), setTimeout(() => setPhase('zoom'), 7600), setTimeout(() => setPhase('wide'), 8600), setTimeout(cycle, 10400)]; }
        cycle();
        return () => timers.forEach(clearTimeout);
    }, [visible, reduced, manual]);
    const open = manual ? manualOpen : phase === 'open';
    function close() { setManual(true); setManualOpen(false); trigger.current?.focus(); }
    return <div ref={container} className={styles.pmsDemo} data-phase={phase} data-reduced={reduced} onKeyDown={e => { if (e.key === 'Escape' && open) {
        e.preventDefault();
        close();
    } }}>
 <div className={styles.pmsScene}>
 <img src="/images/poly-case-31.jpg" alt="Questionnaire with contextual help beside PMS" loading="lazy"/>
 <button ref={trigger} type="button" className={styles.infoButton} aria-label="What is PMS?" aria-expanded={open} aria-controls="pms-explanation" onClick={() => { setManual(true); setManualOpen(!open); }}>i</button>
 </div>
 {open && <div className={styles.infoOverlay}><div className={styles.infoPanel} id="pms-explanation" role="region" aria-label="PMS explanation"><h4>What is PMS?</h4><p>PMS is short for <strong>premenstrual syndrome</strong>. It includes symptoms such as mood swings, tender breasts, food cravings, fatigue, and irritability before a period.</p><button type="button" onClick={close}>Understand!</button></div></div>}
 {manual && !reduced && <button className={styles.replayDemo} type="button" onClick={() => { setManualOpen(false); setManual(false); }}>Replay animation ↻</button>}
 </div>;
}
