import SiteHeader from '@/components/site-header';
import NotWorkGallery from '@/components/not-work-gallery';

export default function PlayProjects() {
  return <div className="playground not-work-gallery-page">
    <a className="skip" href="#main">Skip to content</a>
    <SiteHeader />
    <main id="main" aria-label="Play projects">
      <NotWorkGallery />
      <section className="play-signoff">
        <a href="/#work">Back to <i>work?</i> ↗</a>
      </section>
    </main>
    <footer><div className="footer-bottom">
      <span>© {new Date().getFullYear()} Kristin Yang</span>
      <a href="mailto:chiayeeyang@gmail.com">Say hello ↗</a>
      <a href="#main">Back to top ↑</a>
    </div></footer>
  </div>;
}
