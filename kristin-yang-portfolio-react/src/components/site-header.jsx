export default function SiteHeader() {
  const path = window.location.pathname;
  const current = path === '/about' ? 'about' : path.startsWith('/not-work') ? 'play' : 'work';
  return <header className={`site-header minimal-header${path === '/' ? ' home-entrance' : ''}`}>
    <a className="wordmark cherry-mark" href="/" aria-label="Kristin Yang — home">
      <svg viewBox="236 154 425 550" aria-hidden="true" focusable="false">
        <image href="/images/cherry-logo.png" width="900" height="875" />
      </svg>
    </a>
    <nav aria-label="Main navigation">
      <a href="/#work" aria-current={current === 'work' ? 'page' : undefined}>Work</a>
      <a href="/not-work" aria-current={current === 'play' ? 'page' : undefined}>Play</a>
      <a href="/about" aria-current={current === 'about' ? 'page' : undefined}>About</a>
    </nav>
  </header>;
}
