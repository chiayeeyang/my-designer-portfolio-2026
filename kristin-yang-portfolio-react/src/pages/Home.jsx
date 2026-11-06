import NmdpPreview from '@/components/nmdp-preview';
import ChefPreview from '@/components/chef-preview';
import LeftoversPreview from '@/components/leftovers-preview';
import MazdaPuzzle from '@/components/mazda-puzzle';
import PolyAppPreview from '@/components/poly-app-preview';
import PolyPreview from '@/components/poly-preview';
import SiteHeader from '@/components/site-header';
import PersonalIntro from '@/components/personal-intro';

const projects = [
  { id: 'nmdp', date: 'September 2026', dateTime: '2026-09', title: 'NMDP × Food Delivery', description: 'Bringing donor swab kits into everyday food pickup and delivery.', tags: ['Design research', 'UX design', 'Service design'], locked: true, className: 'navy', Preview: NmdpPreview },
  { id: '01', date: 'May 2023', dateTime: '2023-05', title: 'POLY Health', description: 'Making PCOS education and everyday support feel more approachable.', tags: ['Product design', 'Healthcare', 'Web'], className: 'blue', Preview: PolyPreview },
  { id: '02', date: 'June 2023', dateTime: '2023-06', title: 'Poly App', description: 'Turning health guidance into simple daily habits.', tags: ['Product design', 'Mobile', 'Interaction'], className: 'silver', Preview: PolyAppPreview },
  { id: '04', date: 'January 2021', dateTime: '2021-01', title: 'Mazda Kids Puzzle', description: 'Illustrated puzzles that bring families into the Mazda experience.', tags: ['Illustration', 'Play', 'Brand experience'], className: 'yellow', Preview: MazdaPuzzle },
  { id: '03', date: 'June 2022', dateTime: '2022-06', title: 'Got Leftovers? All Sorted!', description: 'Rethinking how leftover food is shared, packed, and valued.', tags: ['Product design', 'Food', 'Sustainability'], className: 'pink', Preview: LeftoversPreview },
  { id: '05', date: 'November 2023', dateTime: '2023-11', title: 'Code Like a Chef', description: 'Explaining code through the familiar rhythm of a kitchen.', tags: ['Animation', 'Storytelling', 'Creative coding'], className: 'ink', Preview: ChefPreview },
];

export default function Home() {
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <SiteHeader />
    <main id="main" className="personal-home">
      <PersonalIntro />
      <section id="work" className="work">
        <div className="section-label"><h2>Selected work <sup>({String(projects.length).padStart(2, '0')})</sup></h2></div>
        <div className="project-grid">
          {projects.map(({ Preview, ...project }, index) => {
            const Card = project.locked ? 'article' : 'a';
            return <Card href={project.locked ? undefined : `/work/${project.id}`} className={`project project-${project.id}${project.locked ? ' project-locked' : ''}`} key={project.id} aria-label={project.locked ? `${project.title} — work in progress` : `View ${project.title}`}>
            <div className="project-caption">
              <span className="project-index">{String(index + 1).padStart(2, '0')} / <time dateTime={project.dateTime}>{project.date}</time></span>
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <ul className="project-tags">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
              {project.status && <span className="project-status">{project.status}</span>}
            </div>
            <div className={`project-art ${project.className}`}>
              <Preview />
              {!project.locked && <span className="project-open" aria-hidden="true">↗</span>}
            </div>
          </Card>;})}
        </div>
      </section>
      <footer id="contact">
        <a className="footer-cta" href="mailto:chiayeeyang@gmail.com">Say hello. <span aria-hidden="true">↗</span></a>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Kristin Yang</span><a href="mailto:chiayeeyang@gmail.com">chiayeeyang@gmail.com ↗</a><a href="#main">Back to top ↑</a></div>
      </footer>
    </main>
  </>;
}
