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

function OriginalImage({ file, alt, caption, showCaption = true, enlarge = true, className = '' }) {
  return <figure className={`${styles.figure} ${className}`}>
    {enlarge ? <a className={styles.imageLink} href={`${assetRoot}${file}`} target="_blank" rel="noreferrer" aria-label={`Enlarge ${caption}`}>
      <img src={`${assetRoot}${file}`} alt={alt} loading="lazy" decoding="async" />
      <span className={styles.enlarge} aria-hidden="true">↗</span>
    </a> : <img src={`${assetRoot}${file}`} alt={alt} loading="lazy" decoding="async" />}
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

function AnnotatedScreenshot({ file, alt, caption, width, height, marks }) {
  return <figure className={styles.annotatedFigure}>
    <a className={styles.annotatedImage} href={`${assetRoot}${file}`} target="_blank" rel="noreferrer" aria-label={`Enlarge original ${caption.toLowerCase()} screenshot`}>
      <img src={`${assetRoot}${file}`} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      {marks.map(({ number, left, top, width: markWidth, height: markHeight }) => <span
        key={number} className={styles.annotationBox} aria-hidden="true"
        style={{ left: `${left}%`, top: `${top}%`, width: `${markWidth}%`, height: `${markHeight}%` }}
      ><span>{number}</span></span>)}
    </a>
    <figcaption>{caption}</figcaption>
  </figure>;
}

function Finding({ number, title, observation, risk, response }) {
  return <li className={styles.finding}>
    <div className={styles.findingTitle}><span className={styles.annotationNumber}>{number}</span><h5>{title}</h5></div>
    <p>{observation}</p>
    <p className={styles.userDifficulty}><strong>Potential difficulty</strong>{risk}</p>
    <p className={styles.designResponse}><strong>Design response</strong>{response}</p>
  </li>;
}

function Heuristic() {
  const themes = [
    ['Help & information', 'Eligibility terms, swabbing, and DNA questions needed more explanation at the point of decision.'],
    ['Progress', 'The early screens lacked a progress indicator; later dots did not explain the steps ahead.'],
    ['Data input', 'The evaluation also found that name fields accepted spaces-only input, allowing an incomplete answer to pass.'],
    ['Navigability', 'Returning to health screening was unclear, and agreement text appeared below the primary action.'],
  ];
  return <div className={styles.panel}>
    <header className={styles.heading}><div><h3>Reduce doubt before asking for commitment.</h3><p className={styles.researchIntro}>We reviewed the desktop registration flow, then used affinity mapping to turn individual usability issues into shared design priorities.</p></div></header>
    <dl className={styles.evaluationScope}>
      <div><dt>Evaluated area</dt><dd>NMDP donor experience, focusing on <a href="https://my.nmdp.org/s/join?language=en_US&joinCode=marrow17&gad_source=1&gad_campaignid=21894551707&gbraid=0AAAAADRYjn-5v5gsuBXMf7yM8odw896qL&gclid=Cj0KCQiAh9vXBhDKARIsAMooYhe4lCQ-CZ1CVsRPgOrqJ-RwkFIn1Cg5Ekgx87Y8XREZWble1lYFCNUaAvz0EALw_wcB" target="_blank" rel="noopener noreferrer">NMDP’s Join The Donor Registry</a> page</dd></div>
      <div><dt>User group</dt><dd>Prospective donors to the registry</dd></div>
      <div><dt>Device</dt><dd>Desktop</dd></div>
    </dl>
    <nav className={styles.researchSequence} aria-label="Evaluation and synthesis sections">
      <a href="#evaluation-evidence"><span>01</span> Evaluate the flow</a>
      <a href="#evaluation-patterns"><span>02</span> Group the findings</a>
      <a href="#evaluation-priorities"><span>03</span> Set design priorities</a>
    </nav>

    <section id="evaluation-evidence" className={styles.evaluationSection} aria-labelledby="evaluation-evidence-heading">
      <header className={styles.sectionHeading}><p className={styles.sectionEyebrow}>01 / Heuristic evaluation</p><h4 id="evaluation-evidence-heading">Where the flow creates uncertainty.</h4><p>Two moments from the existing registration journey show the issues we identified.</p></header>
      <article className={styles.evidenceRow} aria-labelledby="eligibility-evidence-heading">
        <div className={styles.evidenceVisual}>
          <AnnotatedScreenshot file="registration-eligibility.png" width="1522" height="1734" alt="NMDP health screening with a list of medical conditions and Previous and Next buttons. The medication option is highlighted as finding 01." caption="Eligibility screening" marks={[{ number: '01', left: 10, top: 44.7, width: 83, height: 6.2 }]} />
          <figure className={styles.detailFigure}><figcaption>Detail / eligibility wording</figcaption><a href={`${assetRoot}registration-eligibility-detail.png`} target="_blank" rel="noreferrer" aria-label="Enlarge eligibility wording detail"><img src={`${assetRoot}registration-eligibility-detail.png`} width="1280" height="128" alt="Currently taking prescribed medications for pain, heart issues, cancer or other serious diseases." loading="lazy" decoding="async" /></a></figure>
        </div>
        <div className={styles.evidenceCopy}>
          <p className={styles.evidenceLabel}>Eligibility screening</p>
          <h4 id="eligibility-evidence-heading">“Does this apply to me?”</h4>
          <ol className={styles.annotationList}>
            <Finding number="01" title="Broad wording needs context." observation="One option groups several medication types with “other serious diseases,” without explaining what falls within that category." risk="A prospective donor may be unsure whether their medication or condition applies." response="Offer clear definitions and relevant help beside the eligibility question." />
          </ol>
        </div>
      </article>
      <article className={styles.evidenceRow} aria-labelledby="registration-evidence-heading">
        <div className={styles.evidenceVisual}>
          <AnnotatedScreenshot file="registration-personal-details.png" width="1456" height="1834" alt="NMDP personal-details form with unlabeled progress dots, a Next button without a visible Back option, and agreement text below the button. These areas are highlighted as findings 02, 03, and 04." caption="Personal details & registration" marks={[
            { number: '02', left: 12, top: 11.6, width: 78, height: 3.5 },
            { number: '03', left: 12, top: 87.9, width: 21, height: 6.2 },
            { number: '04', left: 12, top: 95.7, width: 78, height: 3.3 },
          ]} />
        </div>
        <div className={styles.evidenceCopy}>
          <p className={styles.evidenceLabel}>Personal details</p>
          <h4 id="registration-evidence-heading">“What happens next?”</h4>
          <ol className={styles.annotationList}>
            <Finding number="02" title="Progress is visible, but unexplained." observation="The dots show a sequence without naming the steps; the earlier health screen has no progress indicator." risk="People may not know what information or effort is still required." response="Show a consistent, labeled sequence from the beginning." />
            <Finding number="03" title="The way back is unclear." observation="This screen presents Next without a visible option to return to health screening." risk="People may feel unable to review or correct an earlier answer." response="Provide a clear Back action and preserve previous answers." />
            <Finding number="04" title="Agreement follows the action." observation="The terms-of-use agreement sits below the Next button." risk="People may continue before noticing what the action means." response="Place the agreement in the reading path before the primary action." />
          </ol>
        </div>
      </article>
    </section>

    <section id="evaluation-patterns" className={styles.evaluationSection} aria-labelledby="evaluation-patterns-heading">
      <header className={styles.sectionHeading}><p className={styles.sectionEyebrow}>02 / Affinity mapping</p><h4 id="evaluation-patterns-heading">From individual issues to shared patterns.</h4><p>We grouped findings from the wider evaluation into four themes. This helped us see where the flow needed clearer information, expectations, and control.</p></header>
      <div className={styles.synthesisGrid}>
        <OriginalImage file="affinity-map.webp" alt="Original team affinity board grouping evaluation notes into Help / Info, Progress, Data input, and Navigability." caption="Our team’s affinity-mapping session" className={styles.affinityPhoto} />
        <dl className={styles.themeFindings}>{themes.map(([title, copy], index) => <div key={title}><dt><span>{String(index + 1).padStart(2, '0')}</span>{title}</dt><dd>{copy}</dd></div>)}</dl>
      </div>
    </section>

    <section id="evaluation-priorities" className={`${styles.evaluationSection} ${styles.prioritiesSection}`} aria-labelledby="evaluation-priorities-heading">
      <header className={styles.sectionHeading}><p className={styles.sectionEyebrow}>03 / Design priorities</p><h4 id="evaluation-priorities-heading">What we carried into design.</h4></header>
      <ol className={styles.evaluationPriorities}>
        <li><span>01</span><h5>Set expectations early.</h5><p>Make the steps and commitment clear before asking people to begin.</p></li>
        <li><span>02</span><h5>Explain decisions in context.</h5><p>Put eligibility guidance and agreement details where people need to act.</p></li>
        <li><span>03</span><h5>Make correction easy.</h5><p>Let people revisit answers and resolve input errors before continuing.</p></li>
      </ol>
    </section>
  </div>;
}

function FieldStudy() {
  const observations = [
    ['01', 'Timing changes receptiveness.', 'People rushing between classes were less likely to stop; seated people and slower walkers were more open to conversation.'],
    ['02', 'A scan is not a commitment.', 'Some people scanned the QR code without reading. Questions about needles and swabbing could interrupt participation.'],
    ['03', 'Participation can become visible pride.', 'Past registrants returned to the table and wore NMDP bracelets, creating openings for recognition and conversation.'],
  ];
  return <div className={styles.panel}>
    <header className={styles.heading}><div><h3>Attention alone did not lead to action.</h3><p className={styles.fieldIntro}>At an NMDP donor-registration event at UC Berkeley, we approached students, introduced NMDP, and encouraged them to join the donor registry. By observing their responses, questions, and participation in cheek swabbing, we explored what helped people move from initial interest to action.</p></div></header>
    <OriginalImage file="campus-tabling.jpg" alt="The NMDP campus tabling team gathered beside the donor registry stand at UC Berkeley." caption="Campus tabling session" showCaption={false} enlarge={false} className={styles.campusPhoto} />
    <ol className={styles.observations}>
      {observations.map(([number, title, copy]) => <li key={number}><span className={styles.observationNumber}>{number}</span><h4>{title}</h4><p>{copy}</p></li>)}
    </ol>
    <div className={styles.designDirections}>
      <h4>Design directions</h4>
      <p className={styles.note}>Ideas drawn from the campus observations and AEIOU analysis, to explore and test.</p>
      <ol className={styles.directionCards}>
        <li><span className={styles.observationNumber}>01</span><h5>Meet people at the right moment</h5><p>Rushed students declined; seated students and natural conversations were easier to engage.</p><p><strong>Explore</strong> Approach people between activities, ask permission, and offer a take-away option with an easy exit.</p></li>
        <li><span className={styles.observationNumber}>02</span><h5>Reduce fear and uncertainty</h5><p>Needles, cheek swabs, and kit hygiene prompted hesitation.</p><p><strong>Explore</strong> Explain the process and safe kit handling clearly. Investigate donation-method preferences with NMDP before promising choice.</p></li>
        <li><span className={styles.observationNumber}>03</span><h5>Turn a scan into a clear next step</h5><p>Some scanned without reading; initial willingness did not always lead to completing a swab.</p><p><strong>Explore</strong> Pair the QR code with a clear sequence, optional guidance, and a way to return later.</p></li>
        <li><span className={styles.observationNumber}>04</span><h5>Welcome participation and return visits</h5><p>Bracelets and returning registrants made participation visible and opened conversations.</p><p><strong>Explore</strong> Offer optional recognition that distinguishes registration from donation and respects people’s privacy.</p></li>
      </ol>
    </div>
  </div>;
}

const panels = { iceberg: Iceberg, personas: NmdpPersonas, heuristic: Heuristic, field: FieldStudy };

export default function NmdpResearchArtifacts({ method }) {
  const Panel = panels[method];
  return Panel ? <Panel /> : null;
}
