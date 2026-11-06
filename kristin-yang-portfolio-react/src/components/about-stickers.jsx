import { useRef, useState } from 'react';
import './about-stickers.css';
const stickers = [
  {id:'cake', file:'cake.png', caption:'i design with food', x:7, y:7, w:58, angle:-7},
  {id:'matcha', file:'matcha.png', caption:'i take my matcha very seriously', x:66, y:6, w:27, angle:9},
  {id:'rock', file:'rock.png', caption:'i sometimes imagine myself being a rock', x:7, y:38, w:29, angle:-10},
  {id:'hand', file:'hand.png', caption:'hi, thats me', x:38, y:43, w:56, angle:7},
  {id:'illustration', file:'illustration.jpg', caption:'my love language is illustration', x:49, y:65, w:31, angle:-9},
];
export default function AboutStickers(){
 const board=useRef(null), drag=useRef(null), top=useRef(5);
 const [positions,setPositions]=useState({}), [active,setActive]=useState(null);
 function move(id,x,y){setPositions(p=>({...p,[id]:{...p[id],x:Math.max(2,Math.min(98-stickers.find(s=>s.id===id).w,x)),y:Math.max(2,Math.min(78,y))}}));}
 function down(e,s){if(e.button!==0)return;const r=board.current.getBoundingClientRect();const p=positions[s.id]||s;drag.current={id:s.id,px:e.clientX,py:e.clientY,x:p.x,y:p.y,width:r.width,height:r.height};e.currentTarget.setPointerCapture(e.pointerId);setActive(s.id);setPositions(p=>({...p,[s.id]:{...s,...p[s.id],z:++top.current}}));}
 function pointerMove(e){const d=drag.current;if(!d)return;move(d.id,d.x+(e.clientX-d.px)/d.width*100,d.y+(e.clientY-d.py)/d.height*100);}
 function key(e,s){const deltas={ArrowLeft:[-2,0],ArrowRight:[2,0],ArrowUp:[0,-2],ArrowDown:[0,2]};if(deltas[e.key]){e.preventDefault();const p=positions[s.id]||s;move(s.id,p.x+deltas[e.key][0],p.y+deltas[e.key][1]);}if(e.key==='Escape')setActive(null);}
 return <aside className="sticker-collection" aria-label="A few things about Kristin"><p className="sticker-mobile-story" role="status">{stickers.find(s=>s.id===active)?.caption}</p><div className="sticker-board" ref={board}>
 {stickers.map((s,i)=>{const p=positions[s.id]||s;return <button type="button" key={s.id} className={`personal-sticker sticker-${s.id}`} style={{left:p.x+'%',top:p.y+'%',width:s.w+'%',zIndex:p.z||i+1,'--tilt':s.angle+'deg','--outline':i%2?'#c72c78':'#244bed'}} aria-label={s.caption} aria-describedby="sticker-help" data-active={active===s.id} onPointerDown={e=>down(e,s)} onPointerMove={pointerMove} onPointerUp={()=>{drag.current=null;}} onPointerCancel={()=>{drag.current=null;}} onLostPointerCapture={()=>{drag.current=null;}} onClick={()=>setActive(s.id)} onFocus={()=>setActive(s.id)} onBlur={()=>setActive(null)} onKeyDown={e=>key(e,s)}>
 <span className="sticker-art">{s.id==='hand'?<svg viewBox="650 1300 2374 1150" role="img" aria-label="Kristin holding her name labels"><image href="/images/about-stickers/hand.png" width="3024" height="4032" /></svg>:<img src={'/images/about-stickers/'+s.file} alt="" draggable="false" />}</span><span className="sticker-caption">{s.caption}</span></button>;})}
 </div><span id="sticker-help" className="sr-only">Use arrow keys to move a focused sticker. Tap or focus a sticker to read its story.</span></aside>;
}
