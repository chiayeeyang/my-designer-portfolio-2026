const layers = [
    { id: 'surface', number: '01', title: 'The surface', question: 'What are we seeing?', copy: 'Look beyond the first impression. A beautiful interface starts with a better question.' },
    { id: 'understand', number: '02', title: 'The human need', question: 'What are people really trying to do?', copy: 'Listen, observe, and make room for the experiences behind the behavior.' },
    { id: 'root', number: '03', title: 'The root problem', question: 'What actually needs to change?', copy: 'Find the cause, not just the symptom. Then design with clarity, empathy, and purpose.' },
];
export default function CakeHero() {
    return <section className="layers-hero" aria-label="Meet Kristin">
  <div className="layers-topline"><span className="eyebrow"><span className="dot"/> MULTIDISCIPLINARY UI/UX DESIGNER</span></div>
  <h1 className="layers-heading">Thoughtful design.<br />With people at the <i>heart.</i></h1>
  <div className="layer-experience">
   <div className="layer-aside"><p>Serious about<br /><i>people,</i></p></div>
   <div className="layer-stack"><svg className="layer-cherry" viewBox="0 0 48 48" role="img" aria-label="Cherry"><path d="M24 30C21 18 28 8 36 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="22" cy="33" r="10" fill="#244bed"/><path d="M17 30c0-2 2-4 4-4" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>{layers.map(l => <details className={`design-layer layer-${l.id}`} key={l.id}><summary aria-label={`Explore ${l.title.toLowerCase()}`}><span className="layer-slab slab-left" aria-hidden="true"/><span className="layer-slab slab-right" aria-hidden="true"/><span className="layer-label"><span>{l.number}</span>{l.title}<span className="layer-symbol" aria-hidden="true">+</span></span></summary><div className="layer-insight"><h2>{l.question}</h2><p>{l.copy}</p></div></details>)}<div className="layer-baseline" aria-hidden="true"/></div>
   <div className="layer-aside layer-right"><p><i>playful</i> about<br />process.</p></div>
  </div>
  <div className="layer-signature">kristin yang<span>®</span></div>
  <div className="layers-bottom"><p>Bringing research, empathy,<br />and visual communication to digital experiences.</p><a className="scroll-link" href="#work">Explore my work <span>↓</span></a></div>
 </section>;
}
