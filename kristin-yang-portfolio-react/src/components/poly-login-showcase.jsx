import { useEffect, useRef, useState } from 'react';
import styles from './poly-login-showcase.module.css';

const screens = [
  ['welcome', 'Welcome'],
  ['diet', 'Track your everyday diet'],
  ['insights', 'Learn PCOS insights'],
  ['community', 'Online community'],
  ['login', 'Log in'],
];

export default function PolyLoginShowcase({ paused = false }) {
  const [selected, setSelected] = useState(0);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .2 });
    observer.observe(ref.current);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(media.matches);
    media.addEventListener('change', change);
    return () => { observer.disconnect(); media.removeEventListener('change', change); };
  }, []);
  useEffect(() => {
    if (paused || reduced || !visible) return;
    const timer = window.setInterval(() => setSelected(value => (value + 1) % screens.length), 3200);
    return () => window.clearInterval(timer);
  }, [paused, reduced, visible, selected]);
  return <div ref={ref} id="poly-login-showcase" className={styles.showcase} style={{ scrollMarginTop: 145 }}>
    <h3 className={styles.title}>User Log-in</h3>
    <p className={styles.intro}>Meet your health companion, explore the app, and sign in to get started.</p>
    <div className={styles.composition} aria-label="Login and onboarding screens">
      {screens.map(([name, title], index) => {
        const offset = ((index - selected + 7) % screens.length) - 2;
        const distance = Math.abs(offset);
        return <button key={name} type="button"
          className={styles.screen}
          data-distance={distance}
          style={{ '--offset': offset, '--scale': [1, .93, .86][distance], zIndex: 10 - distance }}
          aria-label={`Preview ${title}`} aria-pressed={selected === index}
          onClick={() => setSelected(index)}>
          <img src={`/images/poly-login/${name}.jpg`} alt={`${title} screen`} width="414" height="896" />
        </button>;
      })}
      <div className={styles.phone} aria-hidden="true">
        <div className={styles.phoneViewport}>
          {screens.map(([name], index) => {
            const offset = ((index - selected + 7) % screens.length) - 2;
            return <img key={name} src={`/images/poly-login/${name}.jpg`} alt="" width="414" height="896"
              style={{ transform: `translateX(${offset * 100}%)`, zIndex: offset === 0 ? 2 : 1 }} />;
          })}
        </div>
        <span className={styles.notch} />
      </div>
    </div>
  </div>;
}
