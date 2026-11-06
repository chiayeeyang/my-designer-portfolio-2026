import AboutStickers from '@/components/about-stickers';
import SiteHeader from '@/components/site-header';
import './about.css';

const experience = [
  ['Corinthia London', 'Junior Sous Chef', '2023–26'],
  ['Bake Off: The Professionals', 'Team Leader & Contestant', '2025'],
  ['Wunderman Thompson', 'Designer', '2020–21'],
];
const education = [
  ['University of California, Berkeley', 'Master of Design · MDes Distinguished Scholar Award', 'Expected 2027'],
  ['Central Saint Martins, London', 'BA (Honors) Graphic Communication Design · First Class Honors', '2019–22'],
];
function ResumeRows({ title, rows }) {
  return <section className="about-resume-section"><h2>{title}</h2><dl>{rows.map(([name, detail, date]) => <div className="about-resume-row" key={name}><dt>{name}<span>{detail}</span></dt><dd>{date}</dd></div>)}</dl></section>;
}
export default function About() {
  return <><a className="skip" href="#main">Skip to content</a><SiteHeader />
    <main id="main" className="about-page">
      <div className="about-page-copy">
        <header className="about-page-intro"><h1><span className="about-greeting">Hi!</span> I’m <i>Kristin.</i></h1>
          <p>I’m a Master of Design student at UC Berkeley, with a background in graphic communication and pastry. Previously, I worked as a designer at Wunderman Thompson and a pastry chef at Corinthia London.</p>
          <p>I’m a multidisciplinary product designer exploring how thoughtful interactions and playful details can make digital experiences feel more human.</p>
          <div className="about-contact"><a href="mailto:kristin_yang@berkeley.edu">Email ↗</a><a href="https://www.linkedin.com/in/kcyang/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="/resume_UIUX.pdf" target="_blank" rel="noreferrer">Full résumé ↗</a></div>
        </header>
        <ResumeRows title="Experience" rows={experience} />
        <ResumeRows title="Education" rows={education} />
        <ResumeRows title="Independent project" rows={[["POLY Health", "UI/UX Design · Healthcare education & peer support", "2022–26"]]} />
        <section className="about-resume-section"><h2>What I work with</h2><p>User research, interaction design, prototyping, design systems, and brand identity.</p><p className="about-tools">Figma + MCP · Codex · Adobe Creative Suite · Claude Design</p></section>
      </div>
      <AboutStickers />
    </main>
    <footer className="about-page-footer"><div className="footer-bottom"><span>© {new Date().getFullYear()} Kristin Yang</span><a href="/#work">Explore my work ↗</a><a href="/resume_UIUX.pdf" download>Download résumé ↓</a></div></footer>
  </>;
}
