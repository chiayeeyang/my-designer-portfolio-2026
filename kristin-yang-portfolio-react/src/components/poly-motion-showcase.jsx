import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, ArrowUpRight } from 'lucide-react';
import styles from './poly-motion-showcase.module.css';

const root = '/images/poly-app-hq/';
const scenes = [
  {label:'Log in', title:'A warm welcome.', text:'Meet Ovie. Your everyday care starts here.', image:'/images/poly-login/login.jpg', height:896, companion:'/images/poly-login/welcome.jpg', detail:'Your personal healthcare buddy', link:'Explore onboarding', target:'poly-login-showcase'},
  {label:'Homepage', title:'Your day, together.', text:'Meals, movement, water, and progress in one place.', image:root+'home.webp', height:2118, companion:root+'nutrition.webp', detail:'Small inputs. A clearer picture.', feature:'meal'},
  {label:'Rewards', title:'Small wins matter.', text:'Celebrate the habits you build, one milestone at a time.', image:root+'rewards.webp', height:1143, companion:root+'reward-water.webp', detail:'A little encouragement, every day.', feature:'rewards', badge:true},
  {label:'Recipes', title:'Make room for flavour.', text:'Discover recipes and keep your favourites close.', image:root+'recipes.webp', height:2367, companion:'/images/poly-login/diet.jpg', detail:'From inspiration to your next meal.', feature:'recipes'},
  {label:'Healthcare insights', title:'Understand your body.', text:'Discover healthcare insights and save useful reading.', image:root+'insights.webp', height:2137, companion:'/images/poly-insights/sleep.jpg', detail:'Knowledge you can return to.', feature:'articles', card:true},
  {label:'Community', title:'You’re not alone.', text:'Share your journey, follow others, and stay connected.', image:root+'community.webp', height:2453, companion:'/images/poly-login/community.jpg', detail:'Care grows through connection.', feature:'community'},
];
const duration = 6000;

export default function PolyMotionShowcase({onExplore}) {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const host = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {threshold:.15});
    observer.observe(host.current);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => {setReduced(media.matches); if(media.matches) setPlaying(false);};
    media.addEventListener('change', change);
    return () => {observer.disconnect(); media.removeEventListener('change', change);};
  }, []);
  useEffect(() => {
    if (!playing || !visible) return;
    let frame, previous;
    const tick = now => {
      if (previous !== undefined && !document.hidden) setTime(t => (t + Math.min(now - previous, 80)) % (duration * scenes.length));
      previous = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, visible]);
  const index = Math.floor(time / duration);
  const phase = (time % duration) / duration;
  const scene = scenes[index];
  const travel = reduced ? 0 : Math.max(0, Math.min(1, (phase - .22) / .65));
  const ease = travel * travel * (3 - 2 * travel);
  function select(i) {setTime(i * duration); setPlaying(false);}
  return <section ref={host} className={styles.showcase} aria-label="Poly App motion showcase" data-paused={!playing || !visible}>
    <div className={styles.masthead}><span>POLY APP</span><span>Everyday care, connected.</span></div>
    <div className={styles.stage}>
      <div className={styles.copy} key={'copy'+index}>
        <span className={styles.kicker}>{String(index+1).padStart(2,'0')} / {scene.label}</span>
        <h3>{scene.title}</h3>
        <p>{scene.text}</p>
        <a href={'#'+(scene.target || 'poly-interactive-demo')} onClick={() => {setPlaying(false); if(scene.feature) onExplore(scene.feature);}}>{scene.link || 'Try this feature'} <ArrowUpRight size={16}/></a>
      </div>
      <div className={styles.visual} key={'visual'+index}>
        <div className={styles.orbit} aria-hidden="true" />
        <div className={styles.companion} data-card={scene.card || scene.badge}>
          <img src={scene.companion} alt="" />
        </div>
        <div className={styles.phone}>
          <div className={styles.screen}>
            <img src={scene.image} alt={`${scene.label} app screen`} style={{transform:`translateY(-${ease * (scene.height - 896) / scene.height * 100}%)`}} />
          </div>
          <span className={styles.speaker} aria-hidden="true" />
        </div>
        <div className={styles.caption}>{scene.detail}</div>
      </div>
    </div>
    <div className={styles.controls}>
      <button type="button" onClick={()=>setPlaying(p=>!p)} aria-label={playing?'Pause showcase':'Play showcase'}>{playing?<Pause size={16}/>:<Play size={16}/>}</button>
      <button type="button" onClick={()=>{setTime(0);setPlaying(true);}} aria-label="Replay showcase"><RotateCcw size={16}/></button>
      <span className={styles.time}>{String(Math.floor(time/1000)).padStart(2,'0')} / 36s</span>
      <div className={styles.chapters} aria-label="Showcase chapters">
        {scenes.map((s,i)=><button type="button" key={s.label} onClick={()=>select(i)} aria-label={`Show ${s.label}`} aria-pressed={index===i}><span className={styles.track}><i style={{transform:`scaleX(${i<index?1:i===index?phase:0})`}}/></span><span>{s.label}</span></button>)}
      </div>
    </div>
  </section>;
}
