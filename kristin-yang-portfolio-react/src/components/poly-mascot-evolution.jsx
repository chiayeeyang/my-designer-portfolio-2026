import { useEffect, useRef, useState, useId } from 'react';
import styles from './poly-mascot-evolution.module.css';
const outline = 'M18 300 C24 245 80 164 130 98 Q166 51 207 57 Q277 75 342 57 Q394 43 433 73 C484 122 525 197 561 265 Q589 325 582 371 Q580 414 533 421 Q482 424 470 385 Q451 348 473 322 Q491 307 514 307 C533 259 490 187 439 157 Q389 120 372 146 Q360 175 388 246 C417 328 448 412 467 491 Q491 561 459 599 Q450 618 395 614 L303 615 Q258 612 289 590 Q358 545 364 492 Q369 430 357 339 Q353 302 332 319 C296 331 296 372 280 430 Q257 547 216 595 Q205 610 179 607 Q113 604 64 615 Q38 617 44 599 Q46 588 77 584 Q159 569 192 499 Q217 435 221 348 L229 153 Q233 103 204 106 C162 102 124 134 91 175 Q41 230 44 281 Q43 304 63 301 Q110 276 130 299 Q151 333 113 352 Q77 371 37 346 Q13 331 18 300Z';
const details = ['M268 92 Q274 86 276 96 M310 87 Q317 82 317 93 M288 101 Q272 122 293 118 M261 131 Q290 161 332 129', 'M71 311 Q74 293 87 304 Q102 288 108 307 Q126 305 119 325 Q116 342 101 338 Q86 351 80 336 Q60 345 65 325 Q57 311 71 311', 'M489 328 Q501 311 514 326 Q527 307 533 329 Q556 320 558 343 Q575 355 560 369 Q569 392 548 397 Q543 419 524 404 Q504 420 498 401 Q477 397 488 378 Q470 357 485 348'];
export default function PolyMascotEvolution() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    const id = useId();
    useEffect(() => { const observer = new IntersectionObserver(entries => setVisible(entries.some(e => e.isIntersecting)), { threshold: .15 }); if (ref.current)
        observer.observe(ref.current); return () => observer.disconnect(); }, []);
    return <figure ref={ref} className={styles.evolution} data-playing={visible}>
  <svg viewBox="0 0 602 664" role="img" aria-label="Ovie drawn in textured pencil from the original sketch, then revealed as the finished full-body digital illustration">
   <defs><clipPath id={`${id}-shape`}><path d={outline}/></clipPath><filter id={`${id}-pencil`} x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".45" numOctaves="3" seed="4" result="grain"/><feDisplacementMap in="SourceGraphic" in2="grain" scale="1.2"/></filter></defs>
   <g className={styles.pencil} filter={`url(#${id}-pencil)`}>{[outline, ...details].map((d, i) => <g key={d} style={{ '--stroke-delay': `${i * .45}s` }}><path d={d} pathLength="1000"/><path d={d} pathLength="1000" transform="translate(.6 -.4)" opacity=".35"/></g>)}</g>
   <image className={styles.sketch} href="/images/poly-ovie-sketch.png" width="602" height="664" clipPath={`url(#${id}-shape)`}/>
   <svg className={styles.digital} x="9" y="48" width="580" height="577" viewBox="660 370 1380 1360"><image href="/images/poly-ovie-final.png" width="2732" height="2048"/></svg>
  </svg>
 </figure>;
}
