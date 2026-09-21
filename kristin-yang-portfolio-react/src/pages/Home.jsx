import ChefPreview from '@/components/chef-preview';
import LeftoversPreview from '@/components/leftovers-preview';
import MazdaPuzzle from '@/components/mazda-puzzle';
import PolyAppPreview from '@/components/poly-app-preview';
import PolyPreview from '@/components/poly-preview';
import SiteHeader from '@/components/site-header';
import CakeHero from '@/components/cake-hero';
const projects = [
    { id: '01', title: 'POLY Health', type: 'Product design · UI/UX', className: 'blue' },
    { id: '02', title: 'Poly App', type: 'Product design · UI/UX', className: 'silver' },
    { id: '04', title: 'Mazda Kids Puzzle', type: 'Illustration · 2021', className: 'yellow' },
    { id: '03', title: 'Got Leftovers? All Sorted!', type: 'Product design · 2022', className: 'pink' },
    { id: '05', title: 'Code Like a Chef', type: 'Animation · 2023', className: 'ink' },
];
export default function Home() {
    return <><a className="skip" href="#main">Skip to content</a><SiteHeader />
 <main id="main"><CakeHero />
 <section id="work" className="work"><div className="section-label"><h2>Selected work <sup>(05)</sup></h2><span>A little strategy. A lot of care.</span></div><div className="project-grid">{projects.map(p => <a href={`/work/${p.id}`} className={`project project-${p.id}`} key={p.id}><div className={`project-art ${p.className}`}><>{p.id === '01' ? <PolyPreview /> : p.id === '02' ? <PolyAppPreview /> : p.id === '03' ? <LeftoversPreview /> : p.id === '04' ? <MazdaPuzzle /> : p.id === '05' ? <ChefPreview /> : <span className="art-label">IMAGE PLACEHOLDER</span>}</>{p.id !== '01' && p.id !== '02' && p.id !== '03' && p.id !== '04' && p.id !== '05' && <><span className="art-number">{p.id}</span><span className="art-bottom">{p.id === '02' ? 'HUMAN-CENTERED EXPERIENCES' : 'A DIFFERENT PERSPECTIVE'}</span></>}<span className="project-open" aria-hidden="true">↗</span></div><div className="project-caption"><div><h3>{p.title}</h3><p>{p.type}</p></div>{p.id !== '05' && <span>View case study ↗</span>}</div></a>)}</div></section>
 <section className="about" id="about"><div className="eyebrow">A LITTLE ABOUT ME</div><div><h2>Hi, I’m <i>Kristin.</i></h2><p>I'm a multidisciplinary designer with 4+ years of experience across visual, brand, and UI/UX design. I combine user research, visual systems, and strategic thinking to create intuitive experiences across advertising, hospitality, and healthcare.</p><p>I trained in graphic communication and found my way into the pastry kitchen, where I discovered that design and food are shaped by the same instinct — curating how people experience and interact with the world around them. I love using design — across taste, visuals, and technology — to create moments that connect people.</p><p>Outside of designing and baking, you'll find me on the couch, at a café, or out with friends, usually with good food nearby.</p><a className="text-link" href="/resume_UIUX.pdf" target="_blank" rel="noreferrer">View my résumé ↗</a></div></section>
 <footer id="contact"><div className="eyebrow">GOOD DESIGN STARTS WITH A CONVERSATION</div><a className="footer-cta" href="mailto:chiayeeyang@gmail.com">Let’s make it <i>meaningful.</i> <span>↗</span></a><div className="footer-bottom"><span>© {new Date().getFullYear()} Kristin Yang</span><a href="mailto:chiayeeyang@gmail.com">chiayeeyang@gmail.com ↗</a><a href="#main">Back to top ↑</a></div></footer></main></>;
}
