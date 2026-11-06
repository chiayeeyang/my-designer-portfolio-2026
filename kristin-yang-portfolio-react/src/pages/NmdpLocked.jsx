import SiteHeader from '@/components/site-header';
import NmdpPreview from '@/components/nmdp-preview';
import styles from './nmdp-locked.module.css';

export default function NmdpLocked() {
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <SiteHeader />
    <main id="main" className={styles.page}>
      <a className={styles.back} href="/#work">← Selected work</a>
      <div className={styles.cover}><NmdpPreview /></div>
      <h1>NMDP × Food Delivery</h1>
      <p>Bringing donor swab kits into everyday food pickup and delivery.</p>
    </main>
  </>;
}
