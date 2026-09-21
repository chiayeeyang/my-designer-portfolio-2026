import PolyFeatureDemo from './poly-feature-demo';
import PolyLoginShowcase from './poly-login-showcase';
import PolyFeatureFilm from './poly-feature-film';
import { useEffect, useState } from 'react';
import styles from './poly-app-case-study.module.css';
const chapters = [['mobile-shift', 'The mobile shift'], ['core-tracking', 'Core Features'], ['app-outcome', 'Final outcome']];
export default function PolyAppCaseStudy() {
    const [active, setActive] = useState(chapters[0][0]);
    useEffect(() => { const onScroll = () => { let current = chapters[0][0]; for (const [id] of chapters) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 320)
            current = id;
    } setActive(current); }; window.addEventListener('scroll', onScroll, { passive: true }); onScroll(); return () => window.removeEventListener('scroll', onScroll); }, []);
    return <div className={`editorial-body ${styles.body}`}><nav className={`case-chapter-nav ${styles.nav}`} aria-label="Case study sections">{chapters.map(([id, label], i) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} className="transition-colors duration-500"><span>{String(i + 1).padStart(2, '0')}</span>{label}</a>)}</nav><article className={styles.article}>
    <section id="mobile-shift" className={styles.chapter}><div className={styles.eyebrow}>01 / THE MOBILE SHIFT</div><h2>Care that fits in your pocket.</h2><p className={styles.insight}>The user feedback from POLY Health mentioned a practical gap: tracking food was hard to sustain, and progress felt difficult to track.</p><p><strong className={styles.projectName}>Poly App</strong> extends the vision of Poly Health, carrying forward its core values of empathy and accessibility in digital healthcare design. The app expands the user experience beyond education by integrating features such as <span className={styles.emphasis}>diet and progress tracking</span>, <span className={styles.emphasis}>personalized guidance from dietitian</span>, and <span className={styles.emphasis}>a reward-based system</span> that motivates sustainable lifestyle improvement for individuals with Polycystic Ovary Syndrome (PCOS).</p></section>
    <section id="core-tracking" className={styles.chapter}><div className={styles.eyebrow}>02 / CORE FEATURES</div><h2>Small inputs. A clearer picture.</h2><PolyFeatureDemo /></section>
    <section id="app-outcome" className={styles.chapter}><div className="chapter-heading solution-chapter-heading"><span>03</span>Final outcome</div><PolyFeatureFilm><PolyLoginShowcase /></PolyFeatureFilm></section></article></div>;
}
