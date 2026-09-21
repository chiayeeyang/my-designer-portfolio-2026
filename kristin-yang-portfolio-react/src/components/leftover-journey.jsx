import { useEffect, useRef, useState, useId } from 'react';
import styles from './leftover-journey.module.css';

// Keep each drawing, handwritten label, and connecting arrow in one reveal.
// Separate label bounds keep the long “foldable container” line together.
const regions = [
 [0,0,650,850,0],
 [650,0,230,850,1],
 [880,0,490,850,2],
 // Reveal the downward orange arrow with the explanatory text at step 5.
 [1370,0,350,430,3],
 [1370,430,350,420,5],
 [1720,0,1012,850,4],
 [0,850,2732,380,5],
 [0,1230,650,818,6],
 [650,1230,160,818,7],
 [810,1430,575,470,8],
 [810,1900,840,148,8],
 [1385,1230,175,670,9],
 [1560,1230,1172,210,9],
 [1560,1440,1172,460,10],
 [1650,1900,1082,148,10],
];
export default function LeftoverJourney() {
  const ref = useRef(null);
  const clipId = useId();
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [step, setStep] = useState(0);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update(); media.addEventListener('change', update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .25 });
    observer.observe(ref.current);
    return () => { observer.disconnect(); media.removeEventListener('change', update); };
  }, []);
  useEffect(() => {
    if (!visible || reduced) return;
    const timer = setInterval(() => setStep(value => (value + 1) % 14), 1400);
    return () => clearInterval(timer);
  }, [visible, reduced]);
  const shown = reduced ? 13 : step;
  return <div ref={ref} className={styles.journey} aria-label="The missing takeaway step and the tray liner solution">
    <svg className={styles.artwork} viewBox="0 0 2732 2048" role="img" aria-label="Original illustrated journey: a meal leaves leftovers, which are thrown away without a container. A foldable container becomes a tray liner to provide the missing takeaway step.">
      <defs>{regions.map(([x,y,w,h],i) => <clipPath key={i} id={`${clipId}-${i}`}><rect x={x} y={y} width={w} height={h}/></clipPath>)}</defs>
      {regions.map((region,i) => <g key={i} clipPath={`url(#${clipId}-${i})`}><image className={styles.reveal} data-shown={shown >= region[4]} href="/images/leftovers/original-journey.png" width="2732" height="2048"/></g>)}
    </svg>
  </div>;
}
