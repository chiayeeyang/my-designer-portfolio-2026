import './personal-intro.css';

export default function PersonalIntro() {
  return <section className="personal-intro" aria-labelledby="personal-intro-heading">
    <div className="personal-intro-content">
      <h1 id="personal-intro-heading">
        <span className="intro-phrase intro-phrase-name"><img className="intro-cake" src="/images/intro-cake.png" width="1779" height="884" alt="Kristin Yang" fetchPriority="high" /> is a </span>
        <span className="intro-phrase intro-phrase-role">multidisciplinary product designer who creates </span>
        <span className="intro-phrase intro-phrase-purpose">thoughtful digital experiences with a playful eye.</span>
      </h1>
      <div className="personal-intro-details">
        <p className="intro-context">Currently at UC Berkeley · <a href="https://design.berkeley.edu/" target="_blank" rel="noopener noreferrer" aria-label="Berkeley Master of Design (opens in a new tab)">MDes</a></p>
        <div className="personal-intro-links">
          <a href="mailto:chiayeeyang@gmail.com">Email</a>
          <a href="/resume_UIUX.pdf" target="_blank" rel="noreferrer">Résumé</a>
        </div>
      </div>
    </div>
  </section>;
}
