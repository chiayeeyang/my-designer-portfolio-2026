import { useEffect, useRef } from 'react';
import styles from './poly-feature-map.module.css';
const features = [
    { name: 'Insights', details: ['Physical & mental wellbeing', 'Diet · fertility'], link: 'Connects to recipes' },
    { name: 'Advice', details: ['Home cooking · eating out', 'Ingredients · dietary tips'], link: 'Connects to recipes' },
    { name: 'Recipes', details: ['Filter by symptoms & meal', 'Dietary preferences'], link: 'Save to profile' },
    { name: 'My Story', details: ['A personal PCOS experience', 'Explore relevant recipes'], link: 'Connects to recipes' },
    { name: 'Do I have PCOS?', details: ['Self-check questionnaire', 'Guidance on seeking care'], link: '' },
    { name: 'Profile', details: ['Saved recipes', 'Saved articles'], link: '' },
    { name: 'Community hub', details: ['Share experiences & concerns', 'Find peer support'], link: '' },
];
export default function PolyFeatureMap() {
    const ref = useRef(null);
    useEffect(() => {
        const element = ref.current;
        if (!element)
            return;
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (preference.matches || !('IntersectionObserver' in window))
            return;
        element.dataset.motion = 'pending';
        let interval;
        let restart;
        const stop = () => { clearInterval(interval); clearTimeout(restart); };
        const play = () => {
            element.dataset.motion = 'pending';
            restart = setTimeout(() => { element.dataset.motion = 'playing'; }, 80);
        };
        const observer = new IntersectionObserver(entries => {
            stop();
            if (entries.some(entry => entry.isIntersecting) && !preference.matches) {
                play();
                interval = setInterval(play, 10000);
            }
        }, { threshold: .12 });
        observer.observe(element);
        const change = () => { if (preference.matches) {
            stop();
            delete element.dataset.motion;
        }
        else {
            observer.unobserve(element);
            observer.observe(element);
        } };
        preference.addEventListener('change', change);
        return () => { stop(); observer.disconnect(); preference.removeEventListener('change', change); };
    }, []);
    return <div ref={ref} className={styles.map}>
  <div className={styles.root}><span className={styles.kicker}>POLY HEALTH</span><strong>Landing page</strong><span>What is PCOS? · My story · Latest insights & recipes</span></div>
  <div className={styles.branches}>
   {features.map((feature, i) => <div className={styles.branch} key={feature.name} style={{ '--delay': `${350 + i * 360}ms` }}>
    <div className={styles.feature}><span className={styles.index}>{String(i + 1).padStart(2, '0')}</span><strong>{feature.name}</strong></div>
    <div className={styles.details}>{feature.details.map(detail => <span key={detail}>{detail}</span>)}{feature.link && <small>↗ {feature.link}</small>}</div>
   </div>)}
  </div>
 </div>;
}
