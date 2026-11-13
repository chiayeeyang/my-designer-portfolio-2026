import styles from './donor-journey.module.css';

// Timing and barriers: https://www.nmdp.org/get-involved/join-the-registry/college-student-faq
// https://www.nmdp.org/get-involved/join-the-registry/myths-and-facts-about-blood-stem-cell-donation
const steps = ['Discover', 'Register', 'Swab', 'Return Kit', 'Stay Available', 'Match', 'Donate'];

export default function DonorJourney() {
  return (
    <figure className={styles.journey} aria-label="Donor registry process and two participation gaps">
      <ol className={styles.steps} aria-label="Registry process">
        {steps.map((step, index) => (
          <li key={step} className={`${styles.step} ${index === 0 ? styles.joinGap : ''} ${index === 4 ? styles.waitGap : ''}`}>
            {index === 0 && <>
              <span className={styles.gapMarker} aria-hidden="true">01</span>
              <span className={styles.gapDot} aria-hidden="true" />
            </>}
            {index === 4 && <span className={styles.gapMarker} aria-hidden="true">02</span>}
            <span className={styles.node} aria-hidden="true" />
            <span className={styles.stepLabel}>{step}</span>
            {index === 5 && <span className={styles.stepDetail}>If identified</span>}
            {index === 6 && <span className={styles.stepDetail}>If eligible & willing</span>}
          </li>
        ))}
      </ol>

      <div className={styles.notes}>
        <div className={styles.note}>
          <h4><span>01</span> Hesitation to join</h4>
          <p className={styles.qualifier}>Possible barriers before registering</p>
          <ul>
            <li>Fear of pain or misconceptions about donation</li>
            <li>Uncertainty about eligibility or commitment</li>
            <li>Concerns about time, privacy or trust</li>
          </ul>
        </div>
        <div className={`${styles.note} ${styles.retention}`}>
          <h4><span>02</span> Drop-off while waiting</h4>
          <p className={styles.qualifier}>Possible barriers to staying available</p>
          <ul>
            <li>Changed contact details or missed outreach</li>
            <li>Changes in health, work or family commitments</li>
            <li>Uncertainty about donating when contacted</li>
          </ul>
          <div className={styles.timing}>
            <span className={styles.timingLabel}>Registration → match contact</span>
            <strong>Months to years—or never.</strong>
          </div>
        </div>
      </div>

    </figure>
  );
}
