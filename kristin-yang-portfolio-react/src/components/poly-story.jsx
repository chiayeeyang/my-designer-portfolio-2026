import { useEffect, useRef, useState, useId } from 'react';
import styles from './poly-story.module.css';
export default function PolyStory() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    const id = useId().replace(/:/g, '');
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= .2), { threshold: [0, .2], rootMargin: '0px 0px -40px 0px' });
        if (ref.current)
            observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    const src = '/images/poly-my-story.png';
    return <figure ref={ref} className={`${styles.story} ${visible ? styles.playing : ''}`} aria-label="This is… My Story. A woman and the POLY mascot share a gentle embrace.">
  <svg viewBox="0 0 1146 434" role="img" aria-label="This is… My Story" preserveAspectRatio="xMidYMid meet">
   <defs>
    {/* Extract only the dark lettering; the source's cream rectangles become transparent. */}
    <filter id={`${id}-lettering`} colorInterpolationFilters="sRGB" x="0" y="0" width="100%" height="100%">
     <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1 -1 -1 0 2"/>
     <feComponentTransfer result="inkAlpha"><feFuncA type="linear" slope="2" intercept="0"/></feComponentTransfer>
     <feFlood floodColor="#4b2d23"/>
     <feComposite operator="in" in2="inkAlpha"/>
    </filter>
    <linearGradient id={`${id}-edge`}><stop offset="0" stopColor="black"/><stop offset="1" stopColor="white"/></linearGradient><mask id={`${id}-art`}><rect x="315" width="40" height="434" fill={`url(#${id}-edge)`}/><rect x="355" width="791" height="434" fill="white"/></mask>
    <clipPath id={`${id}-line1`}><rect x="60" y="125" width="255" height="76"/></clipPath>
    <clipPath id={`${id}-line2`}><rect x="60" y="218" width="255" height="76"/></clipPath>
    <linearGradient id={`${id}-cream`} x2="0" y2="1"><stop stopColor="#fff3e5"/><stop offset="1" stopColor="#ffecd2"/></linearGradient>
   </defs>
   <rect width="1146" height="434" fill={`url(#${id}-cream)`}/>
   <g mask={`url(#${id}-art)`}><image className={styles.embrace} href={src} width="1146" height="434"/></g>
   <g className={styles.first}><image href={src} width="1146" height="434" filter={`url(#${id}-lettering)`} clipPath={`url(#${id}-line1)`}/></g>
   <g className={styles.second}><image href={src} width="1146" height="434" filter={`url(#${id}-lettering)`} clipPath={`url(#${id}-line2)`}/></g>
  </svg>
 </figure>;
}
