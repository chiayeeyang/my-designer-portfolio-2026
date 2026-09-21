import { useEffect, useId, useRef, useState } from 'react';
import styles from './mazda-coloring.module.css';

export default function MazdaColoring({label, src}) {
  const mask = useId().replace(/:/g, '');
  const host = useRef(null);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [outline, setOutline] = useState(false);
  const reduced = useRef(false);
  function showOutline(){setOutline(true);}
  function restoreColor(){setOutline(false);setProgress(reduced.current ? 1 : 0);setPlaying(!reduced.current);}
  const model = label.replace('Mazda ', '').toLowerCase();
  useEffect(() => {
    const media=window.matchMedia('(prefers-reduced-motion: reduce)');
    reduced.current=media.matches;
    if(media.matches) setProgress(1); else setPlaying(true);
    const change=()=>{reduced.current=media.matches;if(media.matches){setPlaying(false);setProgress(1);}};
    media.addEventListener('change',change);
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.25});
    observer.observe(host.current);
    return()=>{observer.disconnect();media.removeEventListener('change',change);};
  },[]);
  useEffect(()=>{
    if(!playing || !visible || outline) return;
    let frame,last;
    function tick(now){if(last!==undefined&&!document.hidden)setProgress(p=>Math.min(1,p+Math.min(now-last,80)/3200));last=now;frame=requestAnimationFrame(tick);}
    frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame);
  },[playing,visible,outline]);
  useEffect(()=>{if(progress===1)setPlaying(false);},[progress]);
  return <figure ref={host} className={styles.figure}>
    <svg tabIndex="0" onMouseEnter={showOutline} onMouseLeave={restoreColor} onFocus={showOutline} onBlur={restoreColor} className={styles.art} viewBox="0 0 1500 1061" role="img" aria-label={`${label}: outline to full-color illustration`}>
      <defs><mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="1500" height="1061">
        <rect width="1500" height="1061" fill="black"/>
        {Array.from({length:10},(_,i)=>{const amount=Math.max(0,Math.min(1,progress*10-i));return <path key={i} d={i%2?`M 1540 ${i*118} Q 750 ${i*118+20} -40 ${i*118+12}`:`M -40 ${i*118} Q 750 ${i*118-14} 1540 ${i*118+12}`} fill="none" stroke="white" strokeWidth="180" opacity={amount > 0 ? 1 : 0} strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-amount}/>;})}
      </mask></defs>
      <image href={`/images/mazda-outline/${model}.png`} width="1500" height="1061" preserveAspectRatio="none"/>
      <image opacity={outline ? 0 : 1} href={src} width="1500" height="1061" preserveAspectRatio="none" mask={`url(#${mask})`}/>
    </svg>
    <figcaption className={styles.caption}><span>{label}</span></figcaption>
  </figure>;
}
