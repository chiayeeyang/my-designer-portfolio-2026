import { useEffect, useState } from 'react';
import SiteHeader from '@/components/site-header';
import DonorJourney from '@/components/donor-journey';
import NmdpLiteratureReview from '@/components/nmdp-literature-review';
import NmdpResearchArtifacts from '@/components/nmdp-research-artifacts';
import styles from './nmdp.module.css';

// Content and sequence from the NMDP page of the supplied Figma wireframe.
const insights = [
  {
    title: 'Registration is only the beginning',
    sources: ['literature'],
    finding: 'Being on the registry does not guarantee that someone will ultimately be available or willing to donate. Trust, readiness, and practical constraints continue to shape participation over time.',
    implication: 'Design for follow-through, not just sign-up.',
  },
  {
    title: 'Participation extends beyond the interface',
    sources: ['literature', 'iceberg'],
    finding: 'The donor journey is shaped by more than usability. Motivation, fear, access, family context, and other structural factors influence whether someone feels able to participate.',
    implication: 'Look beyond the NMDP website and consider the wider service experience.',
  },
  {
    title: 'Confidence comes before commitment',
    sources: ['heuristic'],
    finding: 'The registration flow asks users to make decisions about eligibility, swabbing, consent, and long-term participation without always providing enough context upfront.',
    implication: 'Build understanding before asking users to commit.',
  },
  {
    title: 'Convenience shapes participation',
    sources: ['field'],
    finding: 'Field observation showed that timing and effort strongly affected engagement. People who were rushed were less likely to stop, and initial interest did not always lead to swab completion.',
    implication: 'Fit participation into routines people already have.',
  },
  {
    title: 'Participation can create pride',
    sources: ['field'],
    finding: 'Past registrants returned to the campus tabling session, NMDP-themed bracelets were worn visibly, and previous participation sometimes became a source of pride or recognition.',
    implication: 'Create opportunities for recognition',
  },
];

const designIdeas = [
  {
    title: 'Social media badges',
    category: 'Recognition',
    image: '/images/nmdp-research/ideas/social-media-badge.jpg',
    alt: 'Sketch of optional NMDP profile badges, social sharing, and separate recognition for registry participation and donation.',
    description: 'Optional physical or digital badges recognize registry participation and can be shared or kept private. A separate badge marks donation.',
  },
  {
    title: 'NMDP × Coachella',
    category: 'Collaboration',
    image: '/images/nmdp-research/ideas/coachella-collaboration.jpg',
    alt: 'Sketch of a proposed NMDP and Coachella festival-pass box with a swab kit, wristband, and festival perks.',
    description: 'Pair a festival-pass box with a swab kit, instructions, and a prepaid return envelope. Festival perks aim to encourage follow-through.',
  },
  {
    title: 'Restaurant & delivery',
    category: 'Accessibility',
    image: '/images/nmdp-research/ideas/food-delivery-partnership.jpg',
    alt: 'Sketch showing participating restaurants, an optional swab kit at checkout, registration guidance, and a reward.',
    description: 'Offer optional swab kits with restaurant pickup or food delivery, plus a discount after kit registration. Fit participation into everyday routines.',
    selected: true,
  },
];

function ImagePlaceholder({ label, className = '', children }) {
  return <div className={`${styles.placeholder} ${className}`} role="img" aria-label={`${label} — image placeholder`}>
    {children && <span aria-hidden="true">{children}</span>}
  </div>;
}

// Research stays compact until a method is selected; only the active panel mounts its artifacts.
const researchMethods = [
  ['literature', 'Literature review'],
  ['iceberg', 'Iceberg model'],
  ['personas', 'Personas'],
  ['heuristic', 'Heuristic evaluation & affinity mapping'],
  ['field', 'Campus tabling field study'],
];

const researchSourceLabels = {
  literature: 'Literature review',
  iceberg: 'Iceberg synthesis',
  heuristic: 'Heuristic evaluation & affinity mapping',
  field: 'Campus tabling field study',
};

function researchMethodFromHash(hash) {
  const method = hash.replace('#research-panel-', '');
  return researchMethods.some(([id]) => id === method) ? method : hash.startsWith('#evaluation-') ? 'heuristic' : null;
}

function ResearchMethods({ activeMethod, setActiveMethod }) {

  return <div className={styles.researchMethods}>
    <div className={styles.methodButtons} role="group" aria-label="Explore research methods">
      {researchMethods.map(([id, label]) => <button
        key={id}
        id={`research-button-${id}`}
        type="button"
        className={styles.methodButton}
        aria-expanded={activeMethod === id}
        aria-controls={`research-panel-${id}`}
        onClick={() => setActiveMethod(current => current === id ? null : id)}
      >
        {label}<span aria-hidden="true">{activeMethod === id ? '−' : '+'}</span>
      </button>)}
    </div>
    {researchMethods.map(([id]) => <div
      key={id}
      id={`research-panel-${id}`}
      role="region"
      aria-labelledby={`research-button-${id}`}
      className={styles.methodPanel}
      tabIndex={-1}
      hidden={activeMethod !== id}
    >
      {activeMethod === id && (id === 'literature'
        ? <NmdpLiteratureReview />
        : <NmdpResearchArtifacts method={id} />)}

    </div>)}
  </div>;
}

function handleDemoKeyDown(event) {
  const track = event.currentTarget;
  if (track.scrollWidth <= track.clientWidth) return;
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const step = track.children[1].offsetLeft - track.children[0].offsetLeft;
  const current = Math.round(track.scrollLeft / step);
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? track.children.length - 1
    : current + (event.key === 'ArrowRight' ? 1 : -1);
  track.scrollTo({
    left: Math.max(0, Math.min(next, track.children.length - 1)) * step,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  });
}

export default function Nmdp() {
  const [activeMethod, setActiveMethod] = useState(() => researchMethodFromHash(window.location.hash));
  const [researchJump, setResearchJump] = useState(() => ({ hash: window.location.hash, focus: false }));

  useEffect(() => {
    function onHashChange() {
      const hash = window.location.hash;
      const method = researchMethodFromHash(hash);
      if (method) setActiveMethod(method);
      setResearchJump({ hash, focus: false });
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (!researchJump.hash) return;
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(researchJump.hash.slice(1));
      if (!target || target.hidden) return;
      if (researchJump.focus) target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    });
    return () => cancelAnimationFrame(frame);
  }, [researchJump]);

  function openResearchSource(event, method) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const hash = `#research-panel-${method}`;
    if (window.location.hash !== hash) window.history.pushState(null, '', hash);
    setActiveMethod(method);
    setResearchJump({ hash, focus: true });
  }

  return <div className={styles.shell}>
    <a className="skip" href="#main">Skip to content</a>
    <SiteHeader />
    <main id="main" className={styles.page}>
      <ImagePlaceholder label="NMDP hero image or demo" className={styles.heroImage} />

      <header className={styles.intro}>
        <h1><a href="https://www.nmdp.org/what-we-do/about-us" target="_blank" rel="noreferrer">NMDP</a> Redesign Project</h1>
        <p className={styles.dek}>Reimagining donor engagement by making swab-kit access a seamless part of everyday routines.</p>
      </header>

      <dl className={styles.metadata}>
        <div><dt>Team</dt><dd>Kristin Yang<br />Xinru Lu<br />Adin Gilman-Cohen</dd></div>
        <div><dt>Timeline</dt><dd>6 weeks</dd></div>
        <div><dt>Role</dt><dd>User research<br />Interaction design<br />Prototyping</dd></div>
        <div><dt>Tools</dt><dd>Figma + MCP<br />FigJam<br />Codex</dd></div>
      </dl>

      <div className={styles.demos} role="region" aria-label="Final mockup previews" tabIndex={0} onKeyDown={handleDemoKeyDown}>
        {[1, 2, 3].map(number => <ImagePlaceholder key={number} label={`Final mockup demo ${number}`} className={styles.demo}>DEMO</ImagePlaceholder>)}
      </div>

      <article className={styles.story}>
        <section id="context" className={styles.context} aria-labelledby="context-heading">
          <div className={styles.stage}>
            <h2 id="context-heading" className={styles.stageLabel}>Context</h2>
            <div className={styles.copy}>
              <h3>What’s NMDP?</h3>
              <p>NMDP connects patients with blood cancers and other blood disorders to potential blood stem-cell and bone-marrow donors. Joining the registry involves registering and completing a cheek-swab kit so potential matches can be identified.</p>
              <p>In collaboration with NMDP, we explored new ways to promote the donor registry and make participation more accessible, engaging, and frictionless.</p>
            </div>
          </div>
        </section>

        <section id="challenge" className={styles.challenge} aria-labelledby="challenge-heading">
          <div className={styles.stage}>
            <h2 id="challenge-heading" className={styles.stageLabel}>Challenge</h2>
            <div className={styles.copy}>
              <h3>Interest doesn’t always translate into completed participation.</h3>
              <p>The project began with an interest in improving the donor registration experience, but our research revealed that participation depends on much more than a usable form.</p>
              <p>People may be willing to help but lack clear information, feel uncertain about donation, or struggle to fit participation into their lives. Our interviews and user testing also showed that attracting attention does not necessarily lead to action.</p>
              <p>This shifted our design question toward making the broader donor journey more accessible, reassuring, and motivating: <strong>from first discovering NMDP to remaining engaged and potentially donating.</strong></p>
            </div>
          </div>
          <DonorJourney />
        </section>

        <section id="insights" className={styles.research} aria-labelledby="research-heading">
          <div className={styles.stage}>
            <h2 id="research-heading" className={styles.stageLabel}>Research</h2>
            <div className={styles.copy}>
              <p>We explored the system from multiple angles before narrowing the opportunity. To understand why initial interest did not always lead to completed participation, we combined:</p>
            </div>
          </div>
          <ResearchMethods activeMethod={activeMethod} setActiveMethod={setActiveMethod} />
          <div className={`${styles.copy} ${styles.researchInsights}`}>
              <h3 className={styles.insightsHeading}>Insights that influenced our design:</h3>
              <ol className={styles.insights}>
                {insights.map((insight, index) => <li key={insight.title}>
                  <h4>{String(index + 1).padStart(2, '0')} — {insight.title}</h4>
                  <p className={styles.insightSources}><span>Drawn from</span>{insight.sources.map(method => <a key={method} className={styles.methodButton} href={`#research-panel-${method}`} onClick={event => openResearchSource(event, method)}>{researchSourceLabels[method]}</a>)}</p>
                  <p>{insight.finding}</p>
                  <p className={styles.implication}>Design implication → {insight.implication}</p>
                </li>)}
              </ol>
          </div>
          <aside id="research-takeaway" className={styles.researchShift} aria-labelledby="research-shift-heading">
            <h3 id="research-shift-heading">These findings shifted our focus.</h3>
            <div className={styles.shiftFlow}>
              <p className={styles.shiftFrom}><span>From</span>Improving the registration process</p>
              <svg className={styles.shiftArrow} width="40" height="24" viewBox="0 0 40 24" fill="none" aria-hidden="true"><path d="M2 12h35m-9-9 9 9-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <p className={styles.shiftTo}><span>To</span>Reducing the effort between interest and action.</p>
            </div>
          </aside>
        </section>

        <section id="direction" className={styles.design} aria-labelledby="design-heading">
          <div className={styles.stage}>
            <h2 id="design-heading" className={styles.stageLabel}>Design</h2>
            <div className={styles.designContent}>
              <p className={styles.designQuestion}>How might we make donor participation easier to access and follow through within people’s existing routines?</p>
              <div className={styles.designExploration}>
                <h3>Exploring possible interventions</h3>
                <p>We generated 24 concepts across access, recognition, and agency, then narrowed them based on research relevance and opportunity for further prototyping.</p>
              </div>
              <div className={styles.designIdeas}>
                {designIdeas.map((idea, index) => <figure key={idea.title} id={`design-idea-${index + 1}`} className={`${styles.designIdea}${idea.selected ? ` ${styles.selectedIdea}` : ''}`}>
                  <figcaption>
                    <div className={styles.ideaMeta}>
                      <span>Idea {String(index + 1).padStart(2, '0')} / {idea.category}</span>
                      {idea.selected && <span className={styles.ideaSelected}>Chosen direction</span>}
                    </div>
                    <h4>{idea.title}</h4>
                    <p>{idea.description}</p>
                  </figcaption>
                  <a className={styles.ideaImage} href={idea.image} target="_blank" rel="noopener noreferrer" aria-label={`View full ${idea.title} sketch (opens in a new tab)`}>
                    <img src={idea.image} alt={idea.alt} width="2732" height="2048" loading="lazy" decoding="async" />
                  </a>
                </figure>)}
              </div>
            </div>
          </div>
          <p className={styles.designSelection}>We moved forward with food delivery because it addressed the convenience and follow-through barriers most directly.</p>
        </section>
      </article>
    </main>
  </div>;
}
