import styles from './nmdp-literature-review.module.css';

// Adapted from the team's literature-review synthesis in Figma, frame 28:2.
const journey = [
  ['Patient + physician', 'Diagnosis / referral'],
  ['NMDP registry', 'HLA matching'],
  ['Donor contacted', 'Potential match'],
  ['Confirm + screen', 'Typing / health checks'],
  ['Donate + transplant', 'Coordinated care'],
  ['Follow-up', 'Recovery / outcomes'],
];

export default function NmdpLiteratureReview() {
  return <div className={styles.review}>
    <ol className={styles.journey} aria-label="The connected transplant system">
      {journey.map(([title, detail], index) => <li key={title} className={index === 1 ? styles.registry : undefined}>
        <h3>{title}</h3><p>{detail}</p>
        {index < journey.length - 1 && <span className={styles.connector} aria-hidden="true"><img src="/images/nmdp-research/system-arrow.svg" alt="" /></span>}
      </li>)}
    </ol>
    <ol className={styles.findings} aria-label="Four findings that shaped our understanding">
      <li className={styles.system}>
        <h3><span>01</span> A connected system</h3>
        <p>Transplantation depends on a coordinated network of patients, donors, clinicians, and transplant centers.</p>
        <p className={styles.direction}>Cluster map → Identify stakeholders, relationships, and information systems</p>
      </li>
      <li className={styles.access}>
        <h3><span>02</span> Unequal access</h3>
        <p>Registry representation, healthcare access, insurance, and family support all shape access.</p>
        <p className={styles.direction}>Iceberg → Look beneath visible matching difficulties to structural barriers</p>
      </li>
      <li className={styles.matching}>
        <h3><span>03</span> Medical advances <img className={styles.matchArrow} src="/images/nmdp-research/matching-arrow.svg" alt="lead to" /> more potential matches</h3>
        <p>Partially matched transplants expand donor options—<strong>but why do barriers to access remain?</strong></p>
        <p className={styles.direction}>Research shift → Beyond finding more matches</p>
      </li>
      <li className={styles.availability}>
        <h3><span>04</span> A match ≠ an available donor</h3>
        <p>Fear, mistrust, uncertainty, and work or family demands can affect willingness to donate.</p>
        <p className={styles.direction}>Personas → Understand trust, readiness, and practical constraints</p>
      </li>
    </ol>
  </div>;
}
