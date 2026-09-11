import { useEffect, useRef } from 'react';
import { renderLeftovers, LEFTOVERS_LOOP_SECONDS, trayPose } from '@/lib/leftovers-motion';
import styles from './leftovers-preview.module.css';
export default function LeftoversPreview() {
    const canvas = useRef(null);
    const tray = useRef(null), paper = useRef(null);
    useEffect(() => {
        const el = canvas.current;
        if (!el)
            return;
        const ctx = el.getContext('2d');
        if (!ctx)
            return;
        const net = new Image(), liner = new Image(), fallback = new Image();
        let disposed = false, visible = false, ready = false, frame = 0, last = 0, time = 0, width = 0, height = 0;
        const reduced = matchMedia('(prefers-reduced-motion: reduce)');
        const paint = () => {
            if (!ready || !width)
                return;
            const dpr = Math.min(devicePixelRatio || 1, 2);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const lw = Math.min(width * .6, height * .78 * 5061 / 3590), lh = lw * 3590 / 5061;
            const pose = trayPose(time);
            if (tray.current && paper.current) {
                const trayEl = tray.current, paperEl = paper.current;
                trayEl.style.width = `${lw * 1.2}px`;
                trayEl.style.height = `${lh * 1.26}px`;
                trayEl.style.opacity = reduced.matches ? '0' : String(1 - pose.sink);
                trayEl.style.transform = `translate(-50%,-50%) translateX(${-width * 1.2 * (1 - pose.arrival)}px) translateZ(${-100 * pose.sink}px) rotateX(${42 - 17 * pose.arrival}deg) rotateY(-15deg) rotateZ(5deg)`;
                paperEl.style.width = `${lw}px`;
                paperEl.style.height = `${lh}px`;
                paperEl.style.opacity = reduced.matches ? '0' : String(1 - pose.paperFade);
                // Match the recessed bed on arrival, then level into the existing fold geometry.
                paperEl.style.transform = `translate(-50%,-50%) translateX(${width * 1.25 * (1 - pose.arrival)}px) rotateX(${25 * (1 - pose.sink)}deg) rotateY(${-15 * (1 - pose.sink)}deg) rotateZ(${5 - 10.72958 * pose.sink}deg) translateZ(1px)`;
            }
            if (reduced.matches) {
                ctx.fillStyle = '#269afa';
                ctx.fillRect(0, 0, width, height);
                const h = height * .8, w = h * fallback.naturalWidth / fallback.naturalHeight;
                ctx.drawImage(fallback, (width - w) / 2, (height - h) / 2, w, h);
            }
            else
                renderLeftovers(ctx, width, height, time, net, liner);
        };
        const tick = (now) => {
            frame = 0;
            if (disposed || !visible || !ready || reduced.matches)
                return;
            if (last)
                time = (time + Math.min((now - last) / 1000, .05)) % LEFTOVERS_LOOP_SECONDS;
            last = now;
            paint();
            frame = requestAnimationFrame(tick);
        };
        const sync = () => { cancelAnimationFrame(frame); frame = 0; last = 0; paint(); if (visible && ready && !reduced.matches && !document.hidden)
            frame = requestAnimationFrame(tick); };
        const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .15 });
        observer.observe(el);
        const resize = new ResizeObserver(() => {
            const box = el.getBoundingClientRect();
            width = box.width;
            height = box.height;
            const dpr = Math.min(devicePixelRatio || 1, 2);
            el.width = Math.round(width * dpr);
            el.height = Math.round(height * dpr);
            paint();
        });
        resize.observe(el);
        Promise.all([[net, '/images/leftovers-net.png'], [liner, '/images/leftovers-liner.jpg'], [fallback, '/images/leftovers-box.png']].map(([img, src]) => new Promise((resolve, reject) => {
            const image = img;
            image.onload = () => resolve();
            image.onerror = reject;
            image.src = src;
        }))).then(() => { if (!disposed) {
            ready = true;
            sync();
        } }).catch(() => { if (!disposed) {
            el.style.backgroundImage = 'url(/images/leftovers-box.png)';
            el.style.backgroundSize = 'contain';
            el.style.backgroundRepeat = 'no-repeat';
            el.style.backgroundPosition = 'center';
        } });
        reduced.addEventListener('change', sync);
        document.addEventListener('visibilitychange', sync);
        return () => { disposed = true; cancelAnimationFrame(frame); observer.disconnect(); resize.disconnect(); reduced.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync); };
    }, []);
    return <div className={`${styles.stage} relative isolate flex h-full w-full items-center justify-center overflow-hidden perspective-[1200px]`}><canvas ref={canvas} className={styles.canvas} role="img" aria-label="A red tray enters from the left and the original printed liner enters from the right, meeting in the center. The tray dissolves, the liner folds into a tapered takeaway box, food drops inside, and the red flaps overlap to close it."/>
  <div ref={tray} className={styles.tray} aria-hidden="true">
   <div className={styles.underside}/><div className={styles.walls}/><div className={styles.bed}/><div className={styles.rim}/>
  </div>
  <img ref={paper} className={styles.paper} src="/images/leftovers-liner.jpg" alt="" aria-hidden="true"/>
 </div>;
}
