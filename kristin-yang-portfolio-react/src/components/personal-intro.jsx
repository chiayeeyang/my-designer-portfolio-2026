import './personal-intro.css';

export default function PersonalIntro() {
  return <section className="personal-intro" aria-labelledby="personal-intro-heading">
    <p className="intro-context">Currently at UC Berkeley · <a href="https://design.berkeley.edu/" target="_blank" rel="noopener noreferrer" aria-label="Berkeley Master of Design (opens in a new tab)">MDes</a></p>
    <h1 id="personal-intro-heading">
      <span className="intro-phrase intro-phrase-name"><span className="intro-name">Kristin Yang</span> is a </span>
      <span className="intro-phrase intro-phrase-role">multidisciplinary product designer </span>
      <span className="intro-phrase intro-phrase-purpose">who creates thoughtful digital experiences </span>
      <span className="intro-phrase intro-phrase-bridge">with a </span>
      <span className="intro-playful">playful eye<svg className="intro-eye" aria-hidden="true" viewBox="0 0 48 28"><ellipse cx="14" cy="14" rx="9" ry="12" /><ellipse cx="34" cy="14" rx="9" ry="12" /><g><circle cx="16" cy="15" r="3.6" /><circle cx="36" cy="15" r="3.6" /></g></svg></span><span className="intro-phrase intro-phrase-stop">.</span>
    </h1>
    <div className="personal-intro-links"><a href="mailto:chiayeeyang@gmail.com">Email <span aria-hidden="true">↗</span></a><a href="/resume_UIUX.pdf" target="_blank" rel="noreferrer">Résumé <span aria-hidden="true">↗</span></a></div>
  </section>;
}
