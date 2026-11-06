import { useEffect, useRef, useState } from 'react';
import './play-door.css';

export default function PlayDoor() {
  const [phase, setPhase] = useState('idle');
  const [ready, setReady] = useState(false);
  const timers = useRef([]);
  const busy = useRef(false);
  const audio = useRef(null);
  const scene = useRef(null);
  useEffect(() => {
    let mounted = true;
    Promise.all(['/images/play-door/doorway.png', '/images/play-door/kristin.png'].map(src => new Promise(resolve => {
      const img = new Image(); img.onload = () => resolve(true); img.onerror = () => resolve(false); img.src = src;
    }))).then(results => { if (mounted) setReady(results.every(Boolean)); });
    return () => { mounted = false; timers.current.forEach(clearTimeout); audio.current?.close().catch(() => {}); };
  }, []);
  function chime() {
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) return;
      const ctx = audio.current || (audio.current = new Audio());
      void ctx.resume();
      [660, 520].forEach((frequency, i) => {
        const tone = ctx.createOscillator(), volume = ctx.createGain();
        tone.frequency.value = frequency; tone.connect(volume); volume.connect(ctx.destination);
        const start = ctx.currentTime + i * .24;
        volume.gain.setValueAtTime(0, start); volume.gain.linearRampToValueAtTime(.035, start + .015); volume.gain.exponentialRampToValueAtTime(.001, start + .6);
        tone.start(start); tone.stop(start + .65);
      });
    } catch { /* The visual greeting works when sound is unavailable. */ }
  }
  function enter() {
    if (busy.current) return;
    busy.current = true;
    timers.current.forEach(clearTimeout);
    const bounds = scene.current?.getBoundingClientRect();
    if (bounds && (bounds.bottom > window.innerHeight || bounds.top < 100)) scene.current.scrollIntoView({behavior:'instant',block:'center'});
    setPhase('welcome'); chime();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced && ready) {
      timers.current.push(setTimeout(() => setPhase('opening'), 650));
      timers.current.push(setTimeout(() => setPhase('entering'), 1250));
    }
    timers.current.push(setTimeout(() => {
      setPhase('entered'); busy.current = false;
      window.location.assign('/not-work/projects');
    }, reduced || !ready ? 900 : 3300));
  }
  const open = ['opening', 'entering', 'entered'].includes(phase);
  return <section className="play-door-hero" aria-label="Enter Play">
    <figure className="play-door-figure" data-phase={phase} data-open={open}>
      <div className="play-door-scene" ref={scene}>
        <img className="play-door-original" src="/images/play-door/original.jpg" alt="Kristin in a blue hat pushing a wooden door beside a brass doorbell." fetchPriority="high" />
        <div className="play-door-layers" aria-hidden="true">
          <img className="play-door-plate" src="/images/play-door/doorway.png" alt="" />
          <div className="play-door-interior"><div className="play-door-universe" /></div>
          <div className="play-door-leaf"><img src="/images/play-door/doorway.png" alt="" /></div>
          <div className="play-door-person"><img src="/images/play-door/kristin.png" alt="" /></div>
          <svg className="play-door-frame" viewBox="0 0 1045 1567"><defs><clipPath id="play-right-jamb"><path d="M630 402L714 385L671 1567L576 1567Z" /></clipPath></defs><image href="/images/play-door/doorway.png" width="1045" height="1567" clipPath="url(#play-right-jamb)" /></svg>
        </div>
        <button className="play-doorbell" onClick={enter} aria-label="Ring the doorbell and enter Play" aria-disabled={busy.current}>
          <span className="play-bell-pulse" aria-hidden="true" /><span className="play-bell-label">ring me</span>
        </button>
        <div className="play-door-welcome" role="status" aria-live="polite">{phase !== 'idle' ? 'Welcome!' : ''}</div>
      </div>

    </figure>
  </section>;
}
