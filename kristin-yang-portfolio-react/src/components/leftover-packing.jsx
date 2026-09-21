import { useEffect, useRef } from 'react';

export default function LeftoverPacking() {
  const ref = useRef(null);
  useEffect(() => {
    const video = ref.current;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const update = () => {
      if (visible && !media.matches) video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { threshold: .3 });
    observer.observe(video);
    media.addEventListener('change', update);
    return () => { observer.disconnect(); media.removeEventListener('change', update); };
  }, []);
  return <figure className="editorial-visual visual-wide">
    <video ref={ref} src="/videos/leftover-packing-v3.mp4" poster="/images/leftovers/packing-poster.jpg" muted loop playsInline controls preload="metadata" aria-label="Stop-motion sequence showing leftovers transferred into the foldable tray-liner box" style={{display:'block',width:'100%',aspectRatio:'4 / 3',background:'#fafafa'}}/>
  </figure>;
}
