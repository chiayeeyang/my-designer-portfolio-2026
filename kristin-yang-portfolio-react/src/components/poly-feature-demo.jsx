import styles from './poly-feature-demo.module.css';

const features = [
 {id:'meal', title:'Log a meal', tag:'App-exclusive', text:'Record meals, add nutrition details, and review your daily intake.'},
 {id:'movement', title:'Add movement', tag:'App-exclusive', text:'Log exercise and keep activity alongside your food and water intake.'},
 {id:'rewards', title:'Rewards', tag:'App-exclusive', text:'Celebrate everyday milestones with accomplishment trophies.'},
 {id:'community', title:'Community', tag:'Expanded for the app', text:"Building on POLY Health's focus, the app highlights sharing, following, and conversation as key drivers of engagement."},
 {id:'recipes', title:'Browse recipes', tag:'Extended from POLY Health', text:'Find recipes, explore ingredients, and keep favourites in one place.'},
 {id:'articles', title:'Read articles', tag:'Extended from POLY Health', text:'Explore insights and save useful reading to return to later.'},
];

export default function PolyFeatureDemo() {
 return (<ol className={styles.features}>{features.map((f,i)=><li key={f.id}><span className={styles.number}>{i+1}.</span><div><div className={styles.featureHeading}><h3>{f.title}</h3><span className={styles.tag} data-exclusive={f.tag === 'App-exclusive'} data-expanded={f.id === 'community'}>{f.tag}</span></div><p>{f.text}</p></div></li>)}</ol>);
}
