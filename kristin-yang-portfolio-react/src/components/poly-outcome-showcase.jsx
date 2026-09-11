import { useEffect, useRef, useState, useId } from 'react';
import { ArrowLeft, ArrowRight, Heart, RotateCcw, Check, ArrowUpRight } from 'lucide-react';
import styles from './poly-outcome-showcase.module.css';
function Reveal({ children, className = '' }) {
    const ref = useRef(null);
    useEffect(() => { const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) {
        ref.current?.setAttribute('data-visible', 'true');
        observer.disconnect();
    } }, { threshold: .08 }); if (ref.current)
        observer.observe(ref.current); return () => observer.disconnect(); }, []);
    return <div ref={ref} className={`${styles.reveal} ${className}`}>{children}</div>;
}
function DietaryPanels() {
    const id = useId().replaceAll(':', '');
    return <svg viewBox="-65 144 1585 710" role="img" aria-label="What is PCOS, Foods to Eat, and Foods to Avoid appear one at a time">
 <defs>
  <clipPath id={`${id}-pcos`}><path d="M590 164H1500V819H777V329Q777 289 737 289H570V184Q570 164 590 164Z"/></clipPath>
  <clipPath id={`${id}-eat`}><path d="M396 289H737Q777 289 777 329V779Q777 819 737 819H354Q394 819 394 779V450Q394 410 354 410H356V329Q356 289 396 289Z"/></clipPath>
  <clipPath id={`${id}-avoid`}><path d="M0 410H354Q394 410 394 450V779Q394 819 354 819H0Z"/></clipPath>
 </defs>
 <g className={styles.dietPanel} style={{ animationDelay: '0ms' }}><rect x="570" y="164" width="930" height="655" rx="20" fill="white"/><image href="/images/poly-case-37.jpg" width="1500" height="1556" clipPath={`url(#${id}-pcos)`}/></g>
 <g className={styles.dietPanel} style={{ animationDelay: '1000ms' }}><rect x="356" y="289" width="421" height="530" rx="40" fill="#dfe49d"/><image href="/images/poly-case-37.jpg" width="1500" height="1556" clipPath={`url(#${id}-eat)`}/></g>
 <g className={styles.dietPanel} style={{ animationDelay: '2000ms' }}><rect x="-40" y="410" width="434" height="409" rx="40" fill="#df907f"/><image href="/images/poly-case-37.jpg" width="1500" height="1556" clipPath={`url(#${id}-avoid)`}/></g>
 </svg>;
}
function Crop({ src, box, width, height, label, className = '' }) {
    return <svg className={className} viewBox={box} role="img" aria-label={label}><image href={src} width={width} height={height}/></svg>;
}
const recipes = [
    { name: 'Bagel Brunch Platter', time: '15–20 mins', tags: ['Protein'], box: '255 1080 350 180' },
    { name: 'Shrimp & Tofu Egg Drop Soup', time: '20–25 mins', tags: ['Dairy free', 'Egg'], box: '650 962 232 160' },
    { name: 'Steak & Air-Fried Potatoes', time: '25–30 mins', tags: ['Gluten free'], box: '915 1080 340 184' },
    { name: 'Salmon Steamed Egg', time: '25–30 mins', tags: ['Protein', 'Dairy free'], box: '48 45 586 380', src: '/images/poly-case-30.jpg', width: 684, height: 864 },
];
const questions = [
    { title: 'Do you track your period?', answers: ['Yes, regularly', 'Sometimes', 'Not yet'] },
    { title: 'Do you experience PMS before your period?', answers: ['Yes, every time', 'Sometimes', 'Never'] },
    { title: 'A little more understanding.', answers: [] },
];
export default function PolyOutcomeShowcase({ prototype }) {
    const [story, setStory] = useState(0), [saved, setSaved] = useState([]), [step, setStep] = useState(0), [playing, setPlaying] = useState(true), [visible, setVisible] = useState(false), [reduced, setReduced] = useState(false), [help, setHelp] = useState(false);
    const articles = useRef(null);
    const rail = useRef(null), test = useRef(null);
    useEffect(() => { const media = matchMedia('(prefers-reduced-motion: reduce)'); const update = () => setReduced(media.matches); update(); media.addEventListener('change', update); const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .2 }); if (test.current)
        observer.observe(test.current); return () => { observer.disconnect(); media.removeEventListener('change', update); }; }, []);
    useEffect(() => { if (!playing || !visible || reduced)
        return; const timer = setInterval(() => setStep(n => (n + 1) % 3), 4500); return () => clearInterval(timer); }, [playing, visible, reduced]);
    function advance() { setPlaying(false); setHelp(false); setStep(n => Math.min(n + 1, 2)); }
    return <div className={styles.showcase}>
  <Reveal className={styles.hero}>
   <div className="relative z-10"><h3>A little knowledge.<br />A lot more comfort.</h3><p>Because you deserve to be heard, not just diagnosed.</p></div>
   <div className={styles.heroVisual}><div className={styles.laptop}><div className={styles.screen}><img src="/images/poly-health-original-landing.png" alt="Poly Health homepage with PCOS-friendly recipes and Ovie" loading="lazy"/></div><div className={styles.laptopBase}/></div></div>
   <div className={`${styles.heroNav} flex flex-wrap items-center justify-center gap-3`}><a href="#poly-story">The story ↓</a><a href="#poly-recipes">Eat well ↓</a><a href="#poly-walkthrough">Get to know yourself ↓</a></div>
  </Reveal>
  <Reveal className={styles.story}>
   <div id="poly-story" className={styles.sectionHead}><span className={styles.meta}>01 / A PERSONAL BEGINNING</span><h3>Care starts with a story.</h3><p>Why did I create this website?</p></div>
   <img className={styles.storyBanner} src="/images/poly-my-story.png" alt="This is… My Story. Ovie embraces a woman." loading="lazy"/>
   <div className={styles.storyDeck}>
    <div className={styles.storyCopy} key={story}><span className={styles.meta}>{story === 0 ? 'THE EXPERIENCE' : 'THE RESPONSE'}</span><h4>{story === 0 ? 'And I hope my experiences would inspire you!' : 'A personal healthcare buddy.'}</h4><p>{story === 0 ? 'A personal experience with PCOS became the starting point for Poly Health: a place to share, learn, and feel less alone.' : 'Recipes, accessible information, and a hormone self-check come together in one warm, approachable experience.'}</p><div className="mt-6 flex gap-2">{[0, 1].map(n => <button key={n} type="button" aria-label={`Read story ${n + 1}`} aria-pressed={story === n} className={styles.dot} onClick={() => setStory(n)}/>)}</div></div>
    <div className={styles.paper} key={`paper-${story}`}><Crop src="/images/poly-case-35.jpg" box={story === 0 ? '86 703 640 670' : '770 781 644 648'} width={1500} height={1549} label={story === 0 ? 'Original personal story editorial page' : 'Original Poly Health mission editorial page'}/></div>
   </div>
  </Reveal>
  <Reveal className={styles.recipes}>
   <div id="poly-recipes" className={`${styles.sectionHead} flex items-end justify-between gap-4`}><div><span className={styles.meta}>02 / EVERYDAY NOURISHMENT</span><h3>Eat well & be happy.</h3><p>PCOS-friendly recipes, made inviting.</p></div><div className={`${styles.arrows} flex gap-2`}><button type="button" aria-label="Previous recipes" onClick={() => rail.current?.scrollBy({ left: -260, behavior: reduced ? 'auto' : 'smooth' })}><ArrowLeft size={17}/></button><button type="button" aria-label="Next recipes" onClick={() => rail.current?.scrollBy({ left: 260, behavior: reduced ? 'auto' : 'smooth' })}><ArrowRight size={17}/></button></div></div>
   <div ref={rail} className={styles.recipeRail} tabIndex={0} aria-label="Recipe carousel">{recipes.map(recipe => <article className={styles.recipeCard} key={recipe.name} tabIndex={0}><div className={styles.food}><Crop src={recipe.src || '/images/poly-case-36.jpg'} box={recipe.box} width={recipe.width || 1500} height={recipe.height || 1616} label={recipe.name}/><button type="button" aria-label={`${saved.includes(recipe.name) ? 'Unsave' : 'Save'} ${recipe.name}`} aria-pressed={saved.includes(recipe.name)} onClick={() => setSaved(list => list.includes(recipe.name) ? list.filter(n => n !== recipe.name) : [...list, recipe.name])}><Heart size={18} fill={saved.includes(recipe.name) ? 'currentColor' : 'none'}/></button></div><div className={styles.recipeText}><span className={styles.meta}>{recipe.time}</span><h4>{recipe.name}</h4><div className={styles.tags}>{recipe.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
   <div className={styles.recipeFoot}><span>Good food. Small steps. Everyday care.</span><span aria-live="polite">{saved.length ? `${saved.length} saved ${saved.length === 1 ? 'recipe' : 'recipes'}` : 'Explore the recipes →'}</span></div>
  </Reveal>
  <Reveal className={styles.advice}>
   <div id="poly-advice" className={styles.sectionHead}><span className={styles.meta}>03 / DIETARY ADVICE & INSIGHTS</span><h3>Dietary advice & insights.</h3></div>
   <a className={styles.adviceArtwork} href="/images/poly-case-37.jpg" target="_blank" rel="noreferrer" aria-label="Enlarge the original dietary advice and insights design"><DietaryPanels /></a>
   <div className={`${styles.articleHeader} flex items-center justify-between gap-4`}><h4>The latest articles</h4><div className={`${styles.arrows} flex gap-2`}><button type="button" aria-label="Previous articles" onClick={() => articles.current?.scrollBy({ left: -260, behavior: reduced ? 'auto' : 'smooth' })}><ArrowLeft size={17}/></button><button type="button" aria-label="Next articles" onClick={() => articles.current?.scrollBy({ left: 260, behavior: reduced ? 'auto' : 'smooth' })}><ArrowRight size={17}/></button></div></div>
   <div ref={articles} className={styles.articleRail} tabIndex={0} aria-label="Original insights article designs">{[
            { title: 'Top 9 Foods That Help You Sleep', box: '26 1123 248 160' },
            { title: 'Exercise During Period: What You Should Do and Avoid', box: '291 1123 248 160' },
            { title: 'How to Support Your Hormones During Stressful Times', box: '556 1123 248 160' },
        ].map(article => <article className={styles.articleCard} key={article.title}><Crop src="/images/poly-case-37.jpg" box={article.box} width={1500} height={1556} label={article.title}/><h4>{article.title}</h4></article>)}</div>
  </Reveal>
  <Reveal className={styles.diagnostic}>
   <div id="poly-walkthrough" className={styles.sectionHead}><span className={styles.meta}>04 / UNDERSTANDING YOUR BODY</span><h3>Uncertainty, met with kindness</h3></div>
   <div className={styles.testBanner}><div><span className={styles.meta}>ONLINE HORMONAL TEST</span><h4>Do I have PCOS?</h4><p>A gentle starting point for understanding your symptoms.</p><button type="button" className={styles.pill} onClick={() => { setStep(0); setPlaying(false); test.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' }); }}>Explore the test <ArrowRight size={16}/></button></div><img src="/images/poly-case-12.jpg" alt="Ovie with a question mark" loading="lazy"/></div>
   <div ref={test} className={styles.walkthrough} role="region" aria-label="Hormone questionnaire walkthrough">
    <div className={`${styles.walkthroughTop} flex items-center justify-between`}><span className={styles.meta}>POLY / SELF-CHECK PREVIEW</span><button type="button" onClick={() => setPlaying(!playing)}>{playing && !reduced ? 'Pause' : 'Play'} walkthrough</button></div>
    <div className={styles.progress}>{questions.map((q, n) => <button key={q.title} type="button" aria-label={`Show step ${n + 1}`} aria-current={step === n ? 'step' : undefined} onClick={() => { setPlaying(false); setStep(n); setHelp(false); }}><span /></button>)}</div>
    <div className={styles.questionWindow}><div className={styles.questionTrack} style={{ transform: `translateX(-${step * 100}%)` }}>{questions.map((question, n) => <div key={question.title} className={styles.question} inert={step !== n}><span className={styles.meta}>0{n + 1} / 03</span><h4>{question.title}{n === 1 && <button className={styles.info} type="button" aria-label="Explain PMS" aria-expanded={help} onClick={() => { setHelp(!help); setPlaying(false); }}>i</button>}</h4>{n === 1 && help ? <div className={styles.help}><strong>What is PMS?</strong><p>PMS is short for premenstrual syndrome, which includes a wide variety of signs and symptoms, including mood swings, tender breasts, food cravings, fatigue, irritability and depression. It's estimated that as many as 3 of every 4 menstruating women have experienced some form of premenstrual syndrome.</p><button type="button" onClick={() => setHelp(false)}>Understood <Check size={14}/></button></div> : n === 2 ? <><p>This preview shows the flow of the prototype. Explore the full design to see how questions lead to guidance and next steps.</p><button type="button" className={styles.pill} onClick={() => { setStep(0); setPlaying(false); }}><RotateCcw size={15}/> Start again</button></> : <div className={styles.answers}>{question.answers.map(answer => <button type="button" key={answer} onClick={advance}>{answer}<ArrowRight size={14}/></button>)}</div>}</div>)}</div></div>
    <div className={styles.walkthroughBottom}><span>One question at a time.</span><button type="button" disabled={step === 0} onClick={() => { setPlaying(false); setHelp(false); setStep(n => n - 1); }}><ArrowLeft size={14}/> Back</button></div>
   </div>
  </Reveal>
  <Reveal className={styles.figma}><div><h3>Meet the full experience.</h3><div className="mt-6 flex flex-wrap items-center gap-5">{prototype && <a className={styles.pill} href={prototype} target="_blank" rel="noreferrer">View on Figma <ArrowUpRight size={16}/></a>}</div></div></Reveal>
 </div>;
}
