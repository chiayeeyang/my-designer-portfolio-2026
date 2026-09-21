import { useEffect, useRef, useState } from 'react';
import styles from './publication-reader.module.css';

const total = 31;
const pageUrl = page => `/images/how-to-publication/page-${String(page).padStart(2, '0')}.jpg`;

export default function PublicationReader() {
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState('next');
  const [zoom, setZoom] = useState(false);
  const dialog = useRef(null);
  const touch = useRef(null);
  const move = next => {
    const value = Math.max(1, Math.min(total, next));
    setDirection(value > page ? 'next' : 'previous');
    setPage(value);
  };
  useEffect(() => {
    [page - 1, page + 1].filter(n => n > 0 && n <= total).forEach(n => {
      const image = new Image(); image.src = pageUrl(n);
    });
  }, [page]);
  const keys = event => {
    if (event.target.tagName === 'SELECT') return;
    if (event.key === 'ArrowRight') { event.preventDefault(); move(page + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(page - 1); }
    if (event.key === 'Home') { event.preventDefault(); move(1); }
    if (event.key === 'End') { event.preventDefault(); move(total); }
  };
  const controls = <div className={styles.controls}>
    <button type="button" onClick={() => move(page - 1)} disabled={page === 1} aria-label="Previous page">← <span>Previous</span></button>
    <label className={styles.pageSelect}>Page <select aria-label="Publication page" value={page} onChange={e => move(Number(e.target.value))}>{Array.from({ length: total }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}</select><span>of {total}</span></label>
    <button type="button" onClick={() => move(page + 1)} disabled={page === total} aria-label="Next page"><span>Next</span> →</button>
  </div>;
  const art = <img src={pageUrl(page)} alt={`How To＿ at Home publication — page ${page} of ${total}`} width="1800" height="1800" draggable="false" />;
  return <div className={styles.reader} onKeyDown={keys}>
    <div className={styles.toolbar}><span>HOW TO＿ AT HOME · PUBLICATION</span><a href="/how-to-at-home.pdf" target="_blank" rel="noreferrer">Open PDF ↗</a></div>
    <div className={styles.stage} onTouchStart={e => { touch.current = e.touches[0].clientX; }} onTouchEnd={e => { if (touch.current !== null) { const distance = e.changedTouches[0].clientX - touch.current; if (Math.abs(distance) > 55) move(page + (distance < 0 ? 1 : -1)); touch.current = null; } }}>
      <button key={page} className={`${styles.sheet} ${direction === 'next' ? styles.next : styles.previous}`} type="button" aria-label={`Enlarge publication page ${page}`} onClick={() => { setZoom(false); dialog.current.showModal(); }}>{art}<span className={styles.enlarge}>Enlarge ↗</span></button>
    </div>
    {controls}
    <p className={styles.hint}>Turn the pages with the arrows or swipe. Click a page to read it closer.</p>
    <span className={styles.srOnly} aria-live="polite">Page {page} of {total}</span>
    <dialog ref={dialog} className={styles.dialog} onClick={e => { if (e.target === e.currentTarget) dialog.current.close(); }}>
      <div className={styles.dialogBar}><button type="button" onClick={() => setZoom(value => !value)}>{zoom ? 'Fit page' : 'Zoom in +'}</button><button type="button" onClick={() => dialog.current.close()} aria-label="Close publication reader">Close ✕</button></div>
      <div className={`${styles.viewport} ${zoom ? styles.zoom : ''}`}>{art}</div>
      {controls}
    </dialog>
  </div>;
}
