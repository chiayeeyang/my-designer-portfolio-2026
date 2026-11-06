import { LockKeyhole } from 'lucide-react';
import styles from './nmdp-preview.module.css';

export default function NmdpPreview() {
  return <div className={styles.preview}>
    <div className={styles.status}>
      <span className={styles.lock} aria-hidden="true"><LockKeyhole size={25} strokeWidth={1.5} /></span>
      <p className={styles.title}>Work in progress</p>
      <p className={styles.note}>Case study coming soon</p>
    </div>
  </div>;
}
