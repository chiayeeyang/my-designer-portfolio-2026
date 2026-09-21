import { cloneElement, isValidElement, useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import styles from './poly-feature-film.module.css';

const root = '/images/poly-feature-film/';
function Phone({ file, label, height = 896, start = 0, end = 0, className = '', children, format = 'webp', inset = false }) {
  const artwork = <img className={end ? styles.scroll : undefined} src={`${root}${file}.${format}`} alt={label} width="828" height={height * 2} loading="lazy" style={{ '--start': `${-start / height * 100}%`, '--travel': `${-end / height * 100}%` }} />;
  return <div className={`${styles.phone} ${className}`}>
    <div className={styles.screen}>
      {inset ? <div className={styles.scrollViewport}>{artwork}</div> : artwork}
      {children}
    </div>
    <span className={styles.speaker} aria-hidden="true" />
  </div>;
}
function Card({ file, label, className = '', format = 'webp' }) {
  return <div className={`${styles.card} ${className}`}><img src={`${root}${file}.${format}`} alt={label} loading="lazy" /></div>;
}
function MealStartPhone() {
  return <Phone file="photo" label="Meal recording: tap Add meal, choose Dinner, then select a photo" className={styles.stepPhone}>
    <div className={styles.mealStart} aria-hidden="true">
      <svg className={styles.mealHomeCrop} viewBox="0 545 414 723" preserveAspectRatio="xMidYMid slice">
        <image href={`${root}home-scroll.png`} width="414" height="2118" />
      </svg>
      <div className={styles.fixedTopNavigation}><img src={`${root}top-navbar.png`} alt="" /></div>
      <div className={styles.fixedNavigation}><img src={`${root}navigation-down.png`} alt="" /></div>
      <span className={styles.addMealTap} />
      <div className={styles.mealChooser}>
        <div className={styles.mealChooserCard}>
          <img src={`${root}add-input.png`} alt="" />
          <span className={styles.dinnerTap} />
        </div>
      </div>
    </div>
  </Phone>;
}
function MealNutrientsPhone() {
  return <Phone file="log-nutrients" label="Log nutrients: tap Enter manually, complete the form, then Save the meal" height={905} className={styles.stepPhone}>
    <div className={styles.nutrientEntry} aria-hidden="true">
      <img src={`${root}add-nutrients.png`} alt="" />
      <span className={styles.manualTap} />
      <div className={styles.manualSheet}>
        <img src={`${root}manual-nutrients.png`} alt="" />
        <span className={styles.saveTap} />
      </div>
    </div>
  </Phone>;
}
function Scene({ title, description, name, paused, children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .2 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <section ref={ref} className={styles.scene} data-running={visible && !paused} aria-label={`${title} animated showcase`}>
    <header className={styles.heading}><h3>{title}</h3><p>{description}</p></header>
    <div className={`${styles.stage} ${styles[name]}`}>{children}</div>
  </section>;
}

export default function PolyFeatureFilm({ children }) {
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setPaused(media.matches);
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);
  return <>
    <div className={styles.toolbar}><button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play feature animations' : 'Pause feature animations'}>{paused ? <Play size={14} /> : <Pause size={14} />}<span>{paused ? 'Play motion' : 'Pause motion'}</span></button></div>
    {isValidElement(children) ? cloneElement(children, { paused }) : children}
    <div className={styles.film}>
    <Scene title="Home Page" description="Meals, movement, water, and progress. Your day in one place." name="home" paused={paused}>
      <Card file="menu" format="png" label="Hazel profile menu with progress, saved recipes, insights and accomplishments" className={styles.menuPanel} />
      <Card file="add-input" format="png" label="Choose breakfast, lunch, dinner, snack, exercise, water or body measurements" className={styles.inputPanel} />
      <Phone file="home-scroll" format="png" inset label="Today dashboard with daily intake, hydration and food groups" height={2118} start={67} end={1395} className={styles.primary}>
        <div className={styles.fixedTopNavigation}><img src={`${root}top-navbar.png`} alt="Profile, accomplishments, calendar and notifications" width="414" height="82" loading="lazy" /></div>
        <div className={styles.fixedNavigation}><img src={`${root}navigation-down.png`} alt="Today, Recipes, Insights and Community navigation" width="454" height="131" loading="lazy" /></div>
      </Phone>
      <div className={`${styles.cropCard} ${styles.nutrients}`}><img src={`${root}home.webp`} alt="Six food groups and daily nutrition goals" loading="lazy" /></div>
      <span className={styles.note}>A little progress, every day.</span>
    </Scene>
    <Scene title="Meal Recording" description="Choose a meal photo, log nutrients, and review the full picture." name="meal" paused={paused}>
      <div className={styles.step}><MealStartPhone /><span>01 / Add a meal & photo</span></div>
      <div className={styles.step}><MealNutrientsPhone /><span>02 / Log nutrients</span></div>
      <div className={styles.step}><Phone file="nutrition" label="Review the recorded meal, food groups and calorie breakdown" height={1493} end={570} className={styles.stepPhone} /><span>03 / Review your meal</span></div>
    </Scene>
    <Scene title="Reward System" description="Small milestones make everyday habits worth celebrating." name="rewards" paused={paused}>
      <Phone file="accomplishment" format="png" label="My Accomplishments trophies and login streaks" height={1143} className={`${styles.primary} ${styles.rewardPhone}`}>
        <svg className={styles.rewardHeader} viewBox="0 0 414 105" aria-hidden="true">
          <image href={`${root}accomplishment.png`} width="414" height="1143" />
        </svg>
        <img className={styles.rewardMascot} src={`${root}reward-mascot.png`} alt="Keep up with the great work to unlock more!" width="431" height="310" loading="lazy" />
      </Phone>
      <Card file="reward-water" label="Stay hydrated: daily water goal achievement" className={styles.rewardBadge} />
      <Card file="reward-recipes" format="png" label="Try out 3 recipes from the app achievement" className={styles.rewardRecipes} />
      <Card file="reward-workout" format="png" label="Reach daily workout goal for the first time achievement" className={styles.rewardWorkout} />
      <span className={styles.note}>A little encouragement, every day.</span>
    </Scene>
    <Scene title="PCOS-Friendly Recipes" description="Find something you love. Explore ingredients and plan your next meal." name="recipes" paused={paused}>
      <Phone file="recipes" label="Recipe discovery page" height={2367} className={styles.backPhone} />
      <Phone file="recipe-detail" label="Mixed berries overnight oats recipe with preparation time and ingredients" height={1528} end={500} className={styles.frontPhone} />
      <Card file="ingredients" label="Recipe ingredients and Add to Shopping List" className={styles.ingredients} />
    </Scene>
    <Scene title="Healthcare Insights" description="Discover useful reading and keep it close for later." name="insights" paused={paused}>
      <Phone file="articles" format="jpg" label="Healthcare insights discovery with yoga, latest articles, food and hormone balance" height={2459} className={styles.backPhone}>
        <div className={styles.fixedNavigation}><img src={`${root}insights-navigation.png`} alt="Today, Recipes, Insights and Community navigation, Insights selected" width="454" height="131" loading="lazy" /></div>
      </Phone>
      <Phone file="article-sleep" label="Sleep insight article reading experience" height={2683} end={850} className={styles.frontPhone} />
      <Card file="article-saved" label="Article saved confirmation" className={styles.saved} />
    </Scene>
    <Scene title="Community" description="Share your everyday, follow others, and gain support from professionals." name="community" paused={paused}>
      <Phone file="community-feed" format="jpg" inset label="Community feed with shared meals and stories" height={2543} start={82} end={1820} className={`${styles.backPhone} ${styles.communityFeed}`}>
        <div className={styles.fixedTopNavigation}><img src={`${root}community-header.png`} alt="Community profile, search and notifications" width="414" height="82" loading="lazy" /></div>
        <svg className={styles.messageBar} viewBox="0 20 414 91" role="img" aria-label="Today, Recipes, Insights and Community navigation, Community selected"><image href={`${root}community-navigation.png`} width="414" height="131" /></svg>
      </Phone>
      <Phone file="community-comments" format="jpg" inset label="Hazel's dinner post and conversation with the Poly Health Team" height={1352} start={82} end={629} className={`${styles.frontPhone} ${styles.staticPhone} ${styles.communityFeed}`}>
        <div className={styles.fixedTopNavigation}><img src={`${root}community-header.png`} alt="Community profile, search and notifications" width="414" height="82" loading="lazy" /></div>
        <svg className={styles.messageBar} viewBox="0 9 414 91" role="img" aria-label="Message field with send, camera and microphone controls">
          <image href={`${root}community-message-bar.png`} width="429" height="194" />
        </svg>
      </Phone>
      <Card file="community-professional-support" format="png" label="Supportive comment from the Poly Health Team nutritionist" className={styles.professionalSupport} />
      <span className={`${styles.note} ${styles.centeredNote}`}>A little support, every day.</span>
    </Scene>
  </div></>;
}
