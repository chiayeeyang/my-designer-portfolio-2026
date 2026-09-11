import { useEffect, useRef, useState } from 'react';
import styles from './poly-sidebar-mascot.module.css';
export default function PolySidebarMascot() {
    const [greet, setGreet] = useState(false);
    const timer = useRef(undefined);
    useEffect(() => () => clearTimeout(timer.current), []);
    return <div className={styles.companion} data-greet={greet}>
  <button type="button" aria-label="Say hello to Ovie" onClick={() => { clearTimeout(timer.current); setGreet(true); timer.current = setTimeout(() => setGreet(false), 3000); }}>
   <svg viewBox="0 280 1420 1370" aria-hidden="true"><image href="/images/poly-sidebar-mascot.png" width="2732" height="2048"/></svg>
  </button>
  <p className={styles.greeting}>Hi, I’m Ovie!</p>
 </div>;
}
