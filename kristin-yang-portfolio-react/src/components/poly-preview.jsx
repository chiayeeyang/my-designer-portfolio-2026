import { useEffect, useRef, useId } from 'react';
export default function PolyPreview() {
    const video = useRef(null);
    const id = useId().replace(/:/g, '');
    useEffect(() => {
        const element = video.current;
        if (!element)
            return;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
        let inView = false;
        const update = () => {
            if (inView && !reduced.matches && !document.hidden) {
                void element.play().catch(() => { });
            }
            else
                element.pause();
        };
        const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); }, { threshold: .25 });
        observer.observe(element);
        reduced.addEventListener('change', update);
        document.addEventListener('visibilitychange', update);
        return () => { observer.disconnect(); reduced.removeEventListener('change', update); document.removeEventListener('visibilitychange', update); element.pause(); };
    }, []);
    return <div className="poly-original-stage poly-clean-reveal poly-video-stage" role="img" aria-label="Full original POLY Health prototype walkthrough in its laptop frame.">
  <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}><defs>
   <clipPath id={`${id}-laptop`} clipPathUnits="objectBoundingBox"><path d="M.113 .003H.886Q.913 .003 .913 .05V.934H1V.959Q1 .991 .973 .996H.027Q0 .991 0 .959V.934H.086V.05Q.086 .003 .113 .003Z"/></clipPath>
  </defs></svg>
  <div className="poly-full-laptop" style={{ clipPath: `url(#${id}-laptop)` }}>
   <video ref={video} src="/videos/poly-health-demo2.mp4" poster="/images/poly-health-demo2-poster.jpg" muted loop playsInline preload="none" disablePictureInPicture aria-hidden="true"/>
   <svg className="poly-laptop-chrome" viewBox="0 0 3024 1830" aria-hidden="true"><defs><clipPath id={`${id}-chrome`}><path clipRule="evenodd" d="M0 0H3024V1830H0Z M304 234V1570Q304 1614 348 1614H2672Q2716 1614 2716 1570V234Z"/></clipPath></defs><image href="/images/poly-health-full-laptop.jpg" width="3024" height="1830" clipPath={`url(#${id}-chrome)`}/></svg>
  </div>
 </div>;
}
