import { useEffect, useRef, useState } from 'react';
import { CalendarDays, ChefHat, Lightbulb, Globe } from 'lucide-react';
import styles from './poly-feature-demo.module.css';

const features = [
 {id:'meal', title:'Log a meal', tag:'App-exclusive', text:'Record meals, add nutrition details, and review your daily intake.'},
 {id:'movement', title:'Add movement', tag:'App-exclusive', text:'Log exercise and keep activity alongside your food and water intake.'},
 {id:'rewards', title:'Rewards', tag:'App-exclusive', text:'Celebrate everyday milestones with accomplishment trophies.'},
 {id:'community', title:'Community', tag:'Expanded for the app', text:"Building on POLY Health's focus, the app highlights sharing, following, and conversation as key drivers of engagement."},
 {id:'recipes', title:'Browse recipes', tag:'Extended from POLY Health', text:'Find recipes, explore ingredients, and keep favourites in one place.'},
 {id:'articles', title:'Read articles', tag:'Extended from POLY Health', text:'Explore insights and save useful reading to return to later.'},
];
const articles = [
 {title:'Top 9 Foods That Help You Sleep',box:'26 1123 248 160',intro:'Food, sleep, and everyday routines',body:'Explore the connection between everyday food choices and a restful evening. This reading preview brings the article into the app, with a place to save it and return later.'},
 {title:'Exercise During Period: What You Should Do and Avoid',box:'291 1123 248 160',intro:'Movement at your own pace',body:'A space to explore questions about movement and your cycle. Save this article to your personal reading list or mark it as read when you are finished.'},
 {title:'How to Support Your Hormones During Stressful Times',box:'556 1123 248 160',intro:'Making room for everyday wellbeing',body:'An introduction to the app’s wellbeing reading experience. Browse related insights, keep useful articles together, and return whenever it suits you.'},
];
function Artwork({box,src='/images/poly-case-37.jpg',width=1500,height=1556,label}) {return <svg viewBox={box} preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}><image href={src} width={width} height={height}/></svg>;}
const recipeData=[{title:'Salmon Steamed Egg',ingredient:'Salmon',time:'25–30 mins',items:['Salmon','Eggs','Water','Spring onion'],box:'26 491 167 110',src:'/images/poly-app-hq/recipes.webp',width:414,height:2367},{title:'Bagel Brunch Platter',ingredient:'Avocado',time:'15–20 mins',items:['Bagel','Avocado','Eggs','Tomatoes'],box:'222 491 167 110',src:'/images/poly-app-hq/recipes.webp',width:414,height:2367},{title:'Shrimp & Tofu Egg Drop Soup',ingredient:'Shrimp',time:'20–25 mins',items:['Shrimp','Tofu','Eggs','Spring onion'],box:'650 962 232 160',src:'/images/poly-case-36.jpg',width:1500,height:1616}];
const milestones=[
 {name:'Stay hydrated',x:45,y:191,text:'reach daily water goal for the first time',image:'water'},
 {name:'Go active',x:164,y:191,text:'reach daily workout goal for the first time',image:'active'},
 {name:'Tried 3 recipes',x:291,y:191,text:'try out 3 recipes from the app',image:'recipes'},
 {name:'Go vegan',x:45,y:321,text:'try a vegan meal'},
 {name:'Go sugar free',x:164,y:321,text:'complete a sugar-free milestone'},
 {name:'Early bird',x:291,y:321,text:'start your day with breakfast'},
 {name:'Saved 3 insights',x:45,y:436,text:'save 3 insights to read later'},
 {name:'3 days',x:45,y:627,text:'log in for 3 days'},
 {name:'1 week',x:164,y:627,text:'log in for 1 week'},
 {name:'2 weeks',x:291,y:627,text:'log in for 2 weeks'},
 {name:'3 weeks',x:45,y:739,text:'log in for 3 weeks'},
 {name:'1 month',x:164,y:739,text:'log in for 1 month'},
];
function RewardMilestone({milestone,onClose}){
 const confirm=useRef(null);
 useEffect(()=>{const previous=document.activeElement;confirm.current.focus({preventScroll:true});return()=>previous?.focus({preventScroll:true});},[]);
 return <div className={styles.rewardLayer} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
 <div role="dialog" aria-modal="true" className={styles.rewardDialog} aria-label={milestone.name+' milestone'} onKeyDown={e=>{if(e.key==='Escape')onClose();if(e.key==='Tab'){e.preventDefault();confirm.current.focus();}}}>
 <div className={styles.rewardPopupArtwork}><img src={'/images/poly-app-hq/reward-'+milestone.image+'.webp'} alt={milestone.text} width="180" height="178"/><button ref={confirm} className={styles.hotspot} style={{left:'24%',top:'75%',width:'53%',height:'18%'}} aria-label="OK" onClick={onClose}/></div>
 </div></div>;
}
function InputChooser({onClose,onChoose}) {
 const dialog=useRef(null);
 useEffect(()=>{const node=dialog.current;node.showModal();return()=>node.close();},[]);
 return <dialog ref={dialog} className={styles.inputDialog} aria-label="What would you like to add?" onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
 <div className={styles.chooserArtwork}>
 <img src="/images/poly-app-hq/input.webp" alt="" />
 <button autoFocus className={styles.hotspot} style={{left:'90%',top:'2%',width:'9%',height:'8%'}} aria-label="Close add input" onClick={onClose}/>
 {['Breakfast','Lunch','Dinner','Snack','Exercise','Water','Body measurements'].map((name,i)=><button key={name} className={styles.hotspot} style={{left:(8+(i%3)*29.5)+'%',top:(14+Math.floor(i/3)*26.5)+'%',width:'25%',height:i===6?'29%':'25%'}} aria-label={name} onClick={()=>onChoose(name)}/>)}
 </div></dialog>;
}
export default function PolyFeatureDemo(){
 const [active,setActive]=useState('meal'),[step,setStep]=useState(0),[mealType,setMealType]=useState('Dinner'),[mealSaved,setMealSaved]=useState(false),[mealName,setMealName]=useState('Instant noodles with egg'),[calories,setCalories]=useState('855');
 const [exercise,setExercise]=useState('Cycling'),[minutes,setMinutes]=useState('30'),[activities,setActivities]=useState([]);
 const [hydrated,setHydrated]=useState(false),[badge,setBadge]=useState(null);
 const [following,setFollowing]=useState(false),[liked,setLiked]=useState(false),[comment,setComment]=useState(''),[comments,setComments]=useState([]),[feed,setFeed]=useState('Popular');
 const [query,setQuery]=useState(''),[recipe,setRecipe]=useState(null),[savedRecipes,setSavedRecipes]=useState([]),[recipeTab,setRecipeTab]=useState('Discover'),[detailTab,setDetailTab]=useState('Ingredients'),[shopping,setShopping]=useState([]),[triedRecipes,setTriedRecipes]=useState([]);
 const [article,setArticle]=useState(null),[savedArticles,setSavedArticles]=useState([]),[read,setRead]=useState([]),[articleTab,setArticleTab]=useState('Discover');
 const [inputOpen,setInputOpen]=useState(false),[water,setWater]=useState(1000),[weight,setWeight]=useState('52'),[measurementSaved,setMeasurementSaved]=useState(false);
 const landing=active==='meal'&&step===0;
 const artworkPage=landing||active==='rewards';
 const feature=features.find(f=>f.id===active);
 const choose=id=>{setInputOpen(false);setActive(id);setStep(0);setBadge(null);};
 const toggle=(value,list,setter)=>setter(list.includes(value)?list.filter(x=>x!==value):[...list,value]);
 function reset(){setInputOpen(false);setWater(1000);setWeight('52');setMeasurementSaved(false);setStep(0);setMealSaved(false);setActivities([]);setHydrated(false);setBadge(null);setFollowing(false);setLiked(false);setComments([]);setComment('');setShopping([]);setTriedRecipes([]);setSavedRecipes([]);setSavedArticles([]);setRead([]);setRecipe(null);setArticle(null);setQuery('');setFeed('Popular');setRecipeTab('Discover');setArticleTab('Discover');setMealName('Instant noodles with egg');setCalories('855');setMealType('Dinner');setExercise('Cycling');setMinutes('30');}

 return <>
 <ol className={styles.features}>{features.map((f,i)=><li key={f.id}><span className={styles.number}>{i+1}.</span><div><div className={styles.featureHeading}><h3>{f.title}</h3><span className={styles.tag} data-exclusive={f.tag === 'App-exclusive'} data-expanded={f.id === 'community'}>{f.tag}</span></div><p>{f.text}</p></div></li>)}</ol>
 <div className={styles.demo}>
 <div className={styles.tabs} role="group" aria-label="Feature demonstrations">{features.map((f,i)=><button type="button" key={f.id} aria-pressed={active===f.id} onClick={()=>choose(f.id)}>{i+1}. {f.title}</button>)}</div>
 <div className={styles.demoHeading}><div><span className={styles.tag} data-exclusive={feature.tag === 'App-exclusive'} data-expanded={feature.id === 'community'}>{feature.tag}</span><h3>{feature.title}</h3></div><button className={styles.reset} onClick={reset}>Reset demo</button></div>
 <div className={styles.phone}>
 {active!=='rewards'&&<header className={styles.referenceHeader}><img src="/images/poly-app-hq/header.webp" alt="Hazel profile, accomplishments badge, calendar and notifications"/><button className={styles.hotspot} style={{left:'66%',top:'35%',width:'9%',height:'52%'}} aria-label="Open accomplishments" onClick={()=>choose('rewards')}/><button className={styles.hotspot} style={{left:'76%',top:'35%',width:'9%',height:'52%'}} aria-label="Open Today calendar" onClick={()=>choose('meal')}/></header>}
 <div key={active+':'+step} className={artworkPage?styles.landingContent:styles.content}>
 {active==='meal' && <>
 {step===0 && <><div className={styles.landingScroll} aria-label="Today dashboard"><div className={styles.homeArtwork}><div className={styles.landingArtwork}>
 <img src="/images/poly-app-hq/home.webp" alt="Poly App Today calendar, complete nutrition chart, Today's Diet, activity and body measurements"/>
 <button className={styles.hotspot} style={{left:'16%',top:'17%',width:'25%',height:'2.5%'}} aria-label="Add input" onClick={()=>setInputOpen(true)}/>
 <button className={styles.hotspot} style={{left:'70%',top:'42%',width:'25%',height:'2%'}} aria-label="Add meal" onClick={()=>setInputOpen(true)}/>
 <button className={styles.hotspot} style={{left:'5%',top:'74.7%',width:'41%',height:'6.3%'}} aria-label="Add exercise" onClick={()=>choose('movement')}/>
 <button className={styles.hotspot} style={{left:'73%',top:'82.7%',width:'23%',height:'2.5%'}} aria-label="Update body measurements" onClick={()=>setStep(5)}/>
 </div></div></div>{mealSaved&&<p className={styles.savedEntry}>{mealName} · {calories} kcal saved in Today.</p>}</>}
 {step===4&&<><button className={styles.back} onClick={()=>setStep(0)}>← Today</button><h4>Water</h4><p aria-live="polite">{water} ml logged today</p><button className={styles.primary} onClick={()=>{setWater(w=>w+250);if(water+250>=2000)setHydrated(true);}}>Add 250 ml</button>{water>=2000&&<p className={styles.success}>Stay hydrated trophy unlocked.</p>}</>}
 {step===5&&<><button className={styles.back} onClick={()=>setStep(0)}>← Today</button><h4>Body measurements</h4><form onSubmit={e=>{e.preventDefault();setMeasurementSaved(true);}}><label>Weight (kg)<input type="number" min="1" max="500" step="0.1" value={weight} onChange={e=>{setWeight(e.target.value);setMeasurementSaved(false);}} required/></label><button className={styles.primary}>Save measurement</button></form>{measurementSaved&&<p className={styles.success}>Saved: {weight} kg</p>}</>}
 {step===1&&<><button className={styles.back} onClick={()=>setStep(0)}>← Back</button><h4>Choose a picture</h4><button className={styles.photoChoice} onClick={()=>setStep(2)}><div className={styles.mealPhoto}/><span>Use sample meal photo</span></button></>}
 {step===2&&<><button className={styles.back} onClick={()=>setStep(1)}>← Back</button><div className={styles.mealPhoto}/><h4>Log nutrients</h4><form onSubmit={e=>{e.preventDefault();setMealSaved(true);setStep(3);}}><label>Meal<input value={mealName} onChange={e=>setMealName(e.target.value)} required/></label><label>Meal type<select value={mealType} onChange={e=>setMealType(e.target.value)}>{['Breakfast','Lunch','Dinner','Snack'].map(t=><option key={t}>{t}</option>)}</select></label><label>Calories (kcal)<input type="number" min="1" max="10000" value={calories} onChange={e=>setCalories(e.target.value)} required/></label><button className={styles.primary}>Save meal</button></form></>}
 {step===3&&<><p className={styles.success}>Meal saved</p><h4>{mealType}</h4><p>{mealName} · {calories} kcal</p><p>Your entry is ready to review in Today.</p><button className={styles.primary} onClick={()=>choose('movement')}>Next: Add movement →</button></>}
 </>}
 {active==='movement'&&<><h4>My activity</h4><div className={styles.activityTotal}><strong>{activities.reduce((n,a)=>n+Number(a.minutes),0)}</strong><span>minutes logged today</span></div><form onSubmit={e=>{e.preventDefault();setActivities(a=>[...a,{exercise,minutes}]);}}><label>Exercise<select value={exercise} onChange={e=>setExercise(e.target.value)}>{['Cycling','Walking','Running','Yoga'].map(x=><option key={x}>{x}</option>)}</select></label><label>Duration (minutes)<input value={minutes} onChange={e=>setMinutes(e.target.value)} type="number" min="1" max="1440" required/></label><button className={styles.primary}>Add exercise +</button></form><div aria-live="polite">{activities.map((a,i)=><div className={styles.activityCard} key={i}><strong>{a.exercise}</strong><span>{a.minutes} minutes</span><button aria-label={`Remove ${a.exercise} entry ${i+1}`} onClick={()=>setActivities(activities.filter((_,j)=>j!==i))}>×</button></div>)}</div>{activities.length>0&&<><p className={styles.success}>Go active trophy unlocked.</p><button className={styles.primary} onClick={()=>choose('rewards')}>View accomplishments →</button></>}</>}
 {active==='rewards'&&<div className={styles.landingScroll} tabIndex={0} aria-label="My Accomplishments"><div className={styles.rewardCrop}><div className={styles.landingArtwork}><img src="/images/poly-app-hq/rewards.webp" alt="My Accomplishments: trophies, login streaks and Ovie celebrating progress."/><button className={styles.hotspot} style={{left:'6%',top:'3.5%',width:'12%',height:'4%'}} aria-label="Back to Today" onClick={()=>choose('meal')}/>{milestones.map((m,i)=>m.image&&<button key={m.name} className={styles.hotspot} style={{left:(m.x/414*100)+'%',top:(m.y/1143*100)+'%',width:'20%',height:'9%'}} aria-label={m.name+' milestone'} onClick={()=>setBadge(i)}/>)}</div></div></div>}
 {active==='community'&&<><div className={styles.smallTabs}>{['Popular','Following','My Posts'].map(t=><button key={t} aria-pressed={feed===t} onClick={()=>setFeed(t)}>{t}</button>)}</div>{feed==='My Posts'?<p className={styles.empty}>Your shared meals will appear here.</p>:feed==='Following'&&!following?<p className={styles.empty}>Follow someone in Popular to see their posts here.</p>:<><div className={styles.postAuthor}><strong>Sabrina</strong><button onClick={()=>setFollowing(!following)}>{following?'Following':'Follow'}</button></div><h4>Dinner</h4><p>A little meal inspiration for today. What did you enjoy cooking?</p><div className={styles.mealPhoto}/><div className={styles.postActions}><button aria-pressed={liked} onClick={()=>setLiked(!liked)}>{liked?'♥':'♡'} {liked?21:20} likes</button><span>{comments.length} {comments.length===1?'comment':'comments'}</span></div><div className={styles.comments}>{comments.map((c,i)=><p key={i}><strong>Hazel</strong><br/>{c}</p>)}</div><form onSubmit={e=>{e.preventDefault();if(comment.trim()){setComments([...comments,comment.trim()]);setComment('');}}}><label>Join the conversation<input value={comment} onChange={e=>setComment(e.target.value)} placeholder="Type a message…" maxLength={500} required/></label><button className={styles.primary} disabled={!comment.trim()}>Send comment</button></form></>}</>}
 {active==='recipes'&&<>{recipe===null?<><h4>Eat Well & Be Happy!</h4><label>Find recipes<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by recipe or ingredient"/></label><div className={styles.smallTabs}>{['Discover','Saved','Ingredients'].map(t=><button key={t} aria-pressed={recipeTab===t} onClick={()=>setRecipeTab(t)}>{t}</button>)}</div>{recipeTab==='Ingredients'&&<div className={styles.smallTabs}>{['Salmon','Avocado','Shrimp',''].map(t=><button key={t} onClick={()=>setQuery(t)}>{t||'All'}</button>)}</div>}<div className={styles.cards}>{recipeData.filter(r=>(recipeTab!=='Saved'||savedRecipes.includes(r.title))&&(r.title+' '+r.ingredient).toLowerCase().includes(query.toLowerCase())).map(r=><button key={r.title} onClick={()=>{setRecipe(r);setDetailTab('Ingredients');}}><Artwork {...r} label={r.title}/><strong>{r.title}</strong><small>{r.time}</small></button>)}</div>{recipeTab==='Saved'&&savedRecipes.length===0&&<p className={styles.empty}>Save a recipe to find it here.</p>}</>:<><button className={styles.back} onClick={()=>setRecipe(null)}>← Recipes</button><Artwork {...recipe} label={recipe.title}/><h4>{recipe.title}</h4><p>{recipe.time}</p><button className={styles.primary} onClick={()=>toggle(recipe.title,savedRecipes,setSavedRecipes)}>{savedRecipes.includes(recipe.title)?'Saved ✓':'Save recipe'}</button><button className={styles.primary} disabled={triedRecipes.includes(recipe.title)} onClick={()=>setTriedRecipes([...triedRecipes,recipe.title])}>{triedRecipes.includes(recipe.title)?'Tried ✓':'Mark as tried'}</button><div className={styles.smallTabs}>{['Ingredients','Instructions'].map(t=><button key={t} aria-pressed={detailTab===t} onClick={()=>setDetailTab(t)}>{t}</button>)}</div>{detailTab==='Ingredients'?<><ul>{recipe.items.map(x=><li key={x}>{x}</li>)}</ul><button className={styles.primary} onClick={()=>setShopping([...new Set([...shopping,...recipe.items])])}>Add ingredients to shopping list</button></>:<p>Prepare your ingredients, assemble the meal, and serve. This is sample recipe content for exploring the interface.</p>}</>}{shopping.length>0&&<details className={styles.shopping}><summary>My shopping list ({shopping.length})</summary>{shopping.map(x=><label key={x}><input type="checkbox"/>{x}</label>)}</details>}</>}
 {active==='articles'&&<>{article===null?<><h4>Insights for your everyday</h4><div className={styles.smallTabs}>{['Discover','Saved'].map(t=><button key={t} aria-pressed={articleTab===t} onClick={()=>setArticleTab(t)}>{t}</button>)}</div>{articles.filter(a=>articleTab!=='Saved'||savedArticles.includes(a.title)).map(a=><button className={styles.articleCard} key={a.title} onClick={()=>setArticle(a)}><Artwork box={a.box} label={a.title}/><strong>{a.title}</strong><small>{read.includes(a.title)?'Read ✓':'Read article →'}</small></button>)}{articleTab==='Saved'&&savedArticles.length===0&&<p className={styles.empty}>Save an article to read later.</p>}</>:<><button className={styles.back} onClick={()=>setArticle(null)}>← Insights</button><Artwork box={article.box} label={article.title}/><h4>{article.title}</h4><span className={styles.muted}>Reading preview</span><h5>{article.intro}</h5><p>{article.body}</p><button className={styles.primary} onClick={()=>toggle(article.title,savedArticles,setSavedArticles)}>{savedArticles.includes(article.title)?'Saved ✓':'Save article'}</button><button className={styles.primary} disabled={read.includes(article.title)} onClick={()=>setRead([...read,article.title])}>{read.includes(article.title)?'Marked as read ✓':'Mark as read'}</button></>}</>}
 </div>
 <nav className={styles.bottomNav} aria-label="Demo app navigation">{[['meal','Today',CalendarDays],['recipes','Recipes',ChefHat],['articles','Insights',Lightbulb],['community','Community',Globe]].map(([id,label,Icon])=><button key={id} aria-current={(active===id||(id==='meal'&&['movement','rewards'].includes(active)))?'page':undefined} onClick={()=>choose(id)}><Icon aria-hidden="true" strokeWidth={1.8}/><span>{label}</span></button>)}</nav>
 {active==='rewards'&&badge!==null&&<RewardMilestone milestone={milestones[badge]} onClose={()=>setBadge(null)}/>}
 </div>
 {inputOpen&&<InputChooser onClose={()=>setInputOpen(false)} onChoose={name=>{setInputOpen(false);if(name==='Exercise'){choose('movement');}else if(name==='Water'){setStep(4);}else if(name==='Body measurements'){setStep(5);}else{setMealType(name);setStep(1);}}}/>}
 <p className={styles.caption}>Explore the interface.</p><p className={styles.note}>Interactive demonstration with sample content. Entries stay in this preview.</p>
 </div></>;
}
