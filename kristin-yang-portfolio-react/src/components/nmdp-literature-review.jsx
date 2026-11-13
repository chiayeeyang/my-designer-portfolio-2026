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
        {index < journey.length - 1 && <span className={styles.connector} aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 8h13m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>}
      </li>)}
    </ol>
    <ol className={styles.findings} aria-label="Four findings that shaped our understanding">
      <li>
        <span className={styles.number}>01</span><h3>A connected system</h3>
        <p>Transplantation depends on a coordinated network of patients, donors, clinicians, and transplant centers.</p>
      </li>
      <li>
        <span className={styles.number}>02</span><h3>Unequal access</h3>
        <p>Registry representation, healthcare access, insurance, and family support all shape access.</p>
      </li>
      <li>
        <span className={styles.number}>03</span><h3>Medical advances <svg className={styles.matchArrow} width="24" height="16" viewBox="0 0 24 16" fill="none" role="img" aria-label="lead to"><path d="M2 8h20M7 3 2 8l5 5m10-10 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> more potential matches</h3>
        <p>Partially matched transplants expand donor options—<strong>but why do barriers to access remain?</strong></p>
      </li>
      <li>
        <span className={styles.number}>04</span><h3>A match ≠ an available donor</h3>
        <p>Fear, mistrust, uncertainty, and work or family demands can affect willingness to donate.</p>
      </li>
    </ol>
  </div>;
}
