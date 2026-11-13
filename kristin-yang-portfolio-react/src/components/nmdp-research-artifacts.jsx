import styles from './nmdp-research-artifacts.module.css';
import NmdpPersonas from './nmdp-personas';

const assetRoot = '/images/nmdp-research/';

// Summaries are drawn from the team's original FigJam board, field-observation
// sheet, affinity-map photo, and Kristin's completed heuristic workbook.
// Personas are research-informed scenarios, not interview participants.
function ArtifactLink({ file, children, className = '' }) {
  return <a className={`${styles.sourceLink} ${className}`} href={`${assetRoot}${file}`} target="_blank" rel="noreferrer">
    {children} <span aria-hidden="true">↗</span>
  </a>;
}

function OriginalImage({ file, alt, caption, showCaption = true, className = '' }) {
  return <figure className={`${styles.figure} ${className}`}>
    <a className={styles.imageLink} href={`${assetRoot}${file}`} target="_blank" rel="noreferrer" aria-label={`Enlarge ${caption}`}>
      <img src={`${assetRoot}${file}`} alt={alt} loading="lazy" decoding="async" />
      <span className={styles.enlarge} aria-hidden="true">↗</span>
    </a>
    {showCaption && <figcaption>{caption}</figcaption>}
  </figure>;
}

function Iceberg() {
  const levels = [
    ['Events', 'People wait. Donors hesitate.', 'Patients wait for a suitable donor; registered donors may feel unsure when contacted.'],
    ['Patterns', 'Uncertainty repeats across the journey.', 'Misconceptions, uneven access, and inconsistent communication recur across stakeholders.'],
    ['Structures', 'Many systems shape one decision.', 'Matching complexity, registry representation, and coordination across hospitals, labs, and registries sit behind the experience.'],
    ['Mental models', 'Assumptions can weaken commitment.', 'Donation is perceived as painful or risky; signing up can be mistaken for the whole commitment.'],
  ];
  return <div className={styles.panel}>
    <header className={styles.heading}>
      <h3>Look beneath the moment of hesitation.</h3>
    </header>
    <div className={styles.icebergDiagram}>
      <svg className={styles.icebergSilhouette} viewBox="0 0 280 800" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path className={styles.icebergBody} d="M31 200 84 143 112 162 161 26 206 119 231 161 254 200 272 295 238 409 211 549 140 763 77 609 43 468 16 315Z" />
        <path className={styles.icebergLight} d="M31 200 84 143 112 162 161 26 147 200Z" />
        <path className={styles.icebergFacet} d="M161 26 206 119 231 161 254 200 147 200Z" />
        <path className={styles.icebergFacet} d="M147 200 272 295 238 409 211 549 140 763 175 459Z" />
        <path className={styles.icebergLight} d="M31 200 147 200 175 459 140 763 77 609 101 396Z" />
      </svg>
      <ol className={styles.iceberg} aria-label="Four levels of the team's iceberg analysis">
        {levels.map(([level, title, copy], i) => <li key={level}>
          <div className={styles.level}><span>{String(i + 1).padStart(2, '0')}</span>{level}</div>
          <div><h4>{title}</h4><p>{copy}</p></div>
        </li>)}
      </ol>
    </div>
  </div>;
}

function Heuristic() {
  const findings = [
    ['Progress', 'The first screens lacked a progress indicator; later steps were unlabeled.', 'Show the route before asking people to begin.'],
    ['Understanding', 'Eligibility language and swab / DNA questions left room for uncertainty.', 'Explain what each decision means, where it is asked.'],
    ['Control', 'No Back option followed the health screening.', 'Let people review and correct their answers.'],
    ['Consent & errors', 'Consent sat below Continue, and name fields accepted spaces only.', 'Make consent visible and catch errors before submission.'],
  ];
  return <div className={styles.panel}>
    <header className={styles.heading}><h3>Reduce doubt before asking for commitment.</h3></header>
    <dl className={styles.evaluationScope}>
      <div><dt>Evaluated area</dt><dd>NMDP donor experience, focusing on NMDP’s Join The Donor Registry page</dd></div>
      <div><dt>User group</dt><dd>Prospective donors to the registry</dd></div>
      <div><dt>Device</dt><dd>Desktop</dd></div>
    </dl>
    <div className={styles.evaluation}>
      <div>
        <dl className={styles.findings}>
          {findings.map(([label, finding, implication]) => <div key={label}>
            <dt>{label}</dt><dd><p>{finding}</p><p className={styles.direction}><span aria-hidden="true">→</span> {implication}</p></dd>
          </div>)}
        </dl>
      </div>
    </div>
  </div>;
}

function Affinity() {
  return <div className={styles.panel}>
    <header className={styles.heading}><div><h3>Individual issues became shared patterns.</h3><p className={styles.note}>We grouped the evaluation findings into four areas to carry into design.</p></div></header>
    <ul className={styles.themes} aria-label="Themes on the affinity board">
      <li>Help & information</li><li>Progress</li><li>Data input</li><li>Navigability</li>
    </ul>
    <OriginalImage file="affinity-map.webp" alt="Original whiteboard affinity map with sticky notes grouped under help and information, progress, data input, and navigability." caption="Team affinity-mapping session" showCaption={false} className={styles.affinityPhoto} />
  </div>;
}

function FieldStudy() {
  const observations = [
    ['01', 'Timing changes receptiveness.', 'People rushing between classes were less likely to stop; seated people and slower walkers were more open to conversation.'],
    ['02', 'A scan is not a commitment.', 'Some people scanned the QR code without reading. Questions about needles and swabbing could interrupt participation.'],
    ['03', 'Participation can become visible pride.', 'Past registrants returned to the table and wore NMDP bracelets, creating openings for recognition and conversation.'],
  ];
  return <div className={styles.panel}>
    <header className={styles.heading}><h3>Attention alone did not lead to action.</h3></header>
    <OriginalImage file="campus-tabling.jpg" alt="The NMDP campus tabling team gathered beside the donor registry stand at UC Berkeley." caption="Campus tabling session" showCaption={false} className={styles.campusPhoto} />
    <ol className={styles.observations}>
      {observations.map(([number, title, copy]) => <li key={number}><span className={styles.observationNumber}>{number}</span><h4>{title}</h4><p>{copy}</p></li>)}
    </ol>
    <div className={styles.designDirections}>
      <h4>Design directions</h4>
      <p className={styles.note}>Ideas drawn from the campus observations and AEIOU analysis, to explore and test.</p>
      <ol className={styles.directionCards}>
        <li><h5>01 · Meet people at the right moment</h5><p>Rushed students declined; seated students and natural conversations were easier to engage.</p><p><strong>Explore</strong> Approach people between activities, ask permission, and offer a take-away option with an easy exit.</p></li>
        <li><h5>02 · Reduce fear and uncertainty</h5><p>Needles, cheek swabs, and kit hygiene prompted hesitation.</p><p><strong>Explore</strong> Explain the process and safe kit handling clearly. Investigate donation-method preferences with NMDP before promising choice.</p></li>
        <li><h5>03 · Turn a scan into a clear next step</h5><p>Some scanned without reading; initial willingness did not always lead to completing a swab.</p><p><strong>Explore</strong> Pair the QR code with a clear sequence, optional guidance, and a way to return later.</p></li>
        <li><h5>04 · Welcome participation and return visits</h5><p>Bracelets and returning registrants made participation visible and opened conversations.</p><p><strong>Explore</strong> Offer optional recognition that distinguishes registration from donation and respects people’s privacy.</p></li>
      </ol>
    </div>
  </div>;
}

const panels = { iceberg: Iceberg, personas: NmdpPersonas, heuristic: Heuristic, affinity: Affinity, field: FieldStudy };

export default function NmdpResearchArtifacts({ method }) {
  const Panel = panels[method];
  return Panel ? <Panel /> : null;
}
