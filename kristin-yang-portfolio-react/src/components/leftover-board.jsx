import { useEffect, useId, useRef, useState } from 'react';
import styles from './leftover-board.module.css';

const artwork = '/images/leftover-process/board-artwork.png';
const sections = [
 ['Foodies edition', '697,633 902,429 1185,709 980,913'],
 ['Karma', '378,367 637,109 902,429 697,633'],
 ['Just visiting', '637,109 787,24 905,24 902,429'],
 ['No Waste', '905,24 1022,24 1162,100 902,429'],
 ['ShareTheMeal', '1162,100 1512,449 1185,709 902,429'],
 ['Chance', '1512,449 1587,589 1587,709 1185,709'],
 ['FoodCloud', '1185,709 1587,709 1587,831 1503,974'],
 ['Too Good To Go', '1185,709 1503,974 1245,1233 980,913'],
 ['SuperCook', '980,913 1245,1233 1095,1315 974,1315'],
 ['Go', '827,1315 974,1315 980,913 719,1240'],
 ['OLIO', '697,633 980,913 719,1240 370,891'],
 ['Community chest', '294,633 697,633 370,891 294,752'],
 ['Go to jail', '294,517 378,367 697,633 294,633'],
 ['Gameplay tools', '1162,100 1245,19 1350,19 1395,64 1410,73 1425,76 1440,71 1455,62 1480,40 1497,32 1515,31 1534,37 1550,51 1560,72 1565,90 1565,148 1562,156 1547,172 1538,176 1528,174 1505,151 1498,146 1492,148 1489,154 1490,161 1593,262 1593,367 1512,449'],
];
function bounds(points) {
 const pairs=points.split(' ').map(p=>p.split(',').map(Number));
 const xs=pairs.map(p=>p[0]), ys=pairs.map(p=>p[1]);
 return `${Math.min(...xs)-20} ${Math.min(...ys)-20} ${Math.max(...xs)-Math.min(...xs)+40} ${Math.max(...ys)-Math.min(...ys)+40}`;
}
export default function LeftoverBoard() {
 const id=useId(); const root=useRef(null); const dialog=useRef(null);
 const [started,setStarted]=useState(false); const [run,setRun]=useState(0); const [selected,setSelected]=useState(null); const [zoom,setZoom]=useState(1);
 useEffect(()=>{
  const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setStarted(true);observer.disconnect();}}, {threshold:.25});
  observer.observe(root.current); return ()=>observer.disconnect();
 },[]);
 function open(index){setSelected(index);setZoom(1);dialog.current.showModal();}
 return <div ref={root} className={styles.board}>
  <div className={styles.toolbar}><span>Click a section to explore the details.</span><button type="button" onClick={()=>{setStarted(true);setRun(v=>v+1);}}>Replay build ↻</button></div>
  <svg viewBox="280 0 1330 1334" className={styles.canvas} aria-label="Interactive tray liner: artwork builds on the color template">
   <defs>
    <clipPath id={`${id}-outline`}>
     {sections.map(([name,points])=><polygon key={name} points={points}/>)}
     <polygon points="378,367 299,279 299,121 392,29 550,29 637,109"/>
     <polygon points="370,891 295,967 295,1207 404,1315 644,1315 719,1240"/>
     <polygon points="1503,974 1583,1062 1583,1219 1490,1312 1333,1312 1245,1233"/>
    </clipPath>
    <clipPath id={`${id}-template`}>
     <path transform="translate(294 18) scale(.8290816)" d="M 118 13 L 307 13 L 414 110 L 595 7 L 879 7 L 1048 100 L 1147 1 L 1274 1 L 1337 64 Q 1360 79 1380 60 L 1411 28 Q 1480 -18 1522 52 Q 1540 78 1533 163 L 1511 185 Q 1498 197 1481 181 L 1459 158 Q 1443 149 1441 162 L 1567 294 L 1567 421 L 1468 520 L 1559 690 L 1559 975 L 1457 1154 L 1554 1261 L 1554 1450 L 1441 1562 L 1242 1562 L 1146 1465 L 968 1567 L 684 1567 L 512 1475 L 422 1567 L 132 1567 L 1 1435 L 1 1146 L 92 1055 L 1 884 L 1 602 L 103 422 L 6 315 L 6 125 Z"/>
    </clipPath>
   </defs>
   <image key={`template-${run}`} className={started?styles.templateDone:undefined} href="/images/leftover-process/color-template.png" x="294" y="18" width="1300" height="1300" preserveAspectRatio="none" clipPath={`url(#${id}-template)`}/>
   <image clipPath={`url(#${id}-outline)`} key={run} href={artwork} width="1888" height="1334" pointerEvents="none" className={`${styles.section} ${started?styles.reveal:''}`} style={{animationDelay:'4.1s'}}/>
   <defs>{sections.map(([name,points],i)=><clipPath id={`${id}-${i}`} key={name}><polygon points={points}/></clipPath>)}</defs>
   {sections.map(([name,points],i)=><g key={`${run}-${name}`} className={`${styles.section} ${started?styles.reveal:''}`} style={{animationDelay:`${.6+i*.25}s`}}>
    <image href={artwork} width="1888" height="1334" clipPath={`url(#${id}-${i})`} pointerEvents="none"/>
    <polygon points={points} className={styles.hotspot} role="button" tabIndex={0} aria-label={`Zoom into ${name}`} onClick={()=>open(i)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(i);}}}/>
   </g>)}
  </svg>
  <dialog ref={dialog} className={styles.dialog} onClick={e=>{if(e.target===e.currentTarget)dialog.current.close();}} aria-label={selected===null?'Board detail':sections[selected][0]}>
   {selected!==null&&<><div className={styles.modalHeader}><h4>{sections[selected][0]}</h4><button type="button" onClick={()=>dialog.current.close()} autoFocus>Close ×</button></div>
    <div className={styles.detail}><svg viewBox={bounds(sections[selected][1])} style={{width:`${zoom*100}%`,height:`${zoom*100}%`}} aria-label={`${sections[selected][0]} artwork detail`}><defs><clipPath id={`${id}-detail`}><polygon points={sections[selected][1]}/></clipPath></defs><image href={artwork} width="1888" height="1334" clipPath={`url(#${id}-detail)`}/></svg></div>
    <div className={styles.zoom}><button type="button" aria-label="Zoom out" disabled={zoom<=1} onClick={()=>setZoom(v=>v-.5)}>−</button><span>{Math.round(zoom*100)}%</span><button type="button" aria-label="Zoom in" disabled={zoom>=3} onClick={()=>setZoom(v=>v+.5)}>+</button></div></>}
  </dialog>
 </div>;
}
