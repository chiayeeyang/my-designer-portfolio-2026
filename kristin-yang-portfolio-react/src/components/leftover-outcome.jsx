import LeftoverPacking from './leftover-packing';
import styles from './leftover-outcome.module.css';
const root='/images/leftover-outcome/';
export default function LeftoverOutcome() {
 return <div className={styles.outcome}>
  <figure><a href={root+'tray-mockup.jpg'} target="_blank" rel="noreferrer"><img src={root+'tray-mockup.jpg'} alt="Studio mockup of the printed liner in a red tray with its folded takeaway box" loading="lazy"/></a></figure>

  <section className={styles.play}>
   <figure><a href={root+'gameplay.jpeg'} target="_blank" rel="noreferrer"><img src={root+'gameplay.jpeg'} alt="Players moving pieces on the printed liner while using the phone companion" loading="lazy"/></a></figure>
  </section>
  <section className={styles.packing}><LeftoverPacking/></section>
 </div>;
}
