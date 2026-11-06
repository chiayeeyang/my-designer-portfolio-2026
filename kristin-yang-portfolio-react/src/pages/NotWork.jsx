import SiteHeader from '@/components/site-header';
import PlayDoor from '@/components/play-door';

export default function Playground() {
  return <div className="playground play-entrance-page">
    <a className="skip" href="#main">Skip to content</a>
    <SiteHeader />
    <main id="main"><PlayDoor /></main>
  </div>;
}
