import styles from './nmdp-preview.module.css';

export default function NmdpPreview() {
  return <div className={styles.preview}>
    <img src="/images/nmdp-cover-clean.png" alt="NMDP food-delivery concept: a mobile order with a free donor swab kit, a takeaway bag, and a prepaid return envelope." loading="lazy" decoding="async" />
  </div>;
}
