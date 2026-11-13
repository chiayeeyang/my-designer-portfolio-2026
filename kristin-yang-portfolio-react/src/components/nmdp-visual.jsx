import { nmdpMedia } from '@/lib/nmdp-content';
import styles from './nmdp-visual.module.css';

export default function NmdpVisual({ name, className = '', tone = 'blue', eager = false }) {
  const media = nmdpMedia[name];
  return <figure className={`${styles.visual} ${styles[tone]} ${className}`}>
    {media.src ? <img src={media.src} alt={media.alt} loading={eager ? 'eager' : 'lazy'} /> :
      <div className={styles.placeholder} role="img" aria-label={`${media.label} — image placeholder`}>
        <span className={styles.mark} aria-hidden="true">＋</span>
        <span className={styles.label}>[{media.label}]</span>
      </div>}
  </figure>;
}
