import { useEffect, useRef, useState } from 'react';

const frames = Array.from({ length: 6 }, (_, i) => `/images/leftovers/packing-${i + 1}.jpg`);

export default function LeftoverPacking() {
  const ref = useRef(null);
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let timer;
    let current = 0;
    frames.forEach(src => { const image = new Image(); image.src = src; });
    const advance = () => {
      timer = setTimeout(() => {
        current = (current + 1) % frames.length;
        setFrame(current);
        advance();
      }, current === frames.length - 1 ? 2000 : 1000);
    };
    const update = () => {
      clearTimeout(timer);
      if (visible && !media.matches) advance();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { threshold: .3 });
    observer.observe(ref.current);
    media.addEventListener('change', update);
    return () => { clearTimeout(timer); observer.disconnect(); media.removeEventListener('change', update); };
  }, []);
  return <figure ref={ref} className="editorial-visual visual-wide">
    <img src={frames[frame]} alt="Packing leftovers into the foldable tray-liner box" width="1440" height="1080" style={{display:'block',width:'100%',height:'auto',aspectRatio:'4 / 3',background:'#fafafa'}}/>
  </figure>;
}
