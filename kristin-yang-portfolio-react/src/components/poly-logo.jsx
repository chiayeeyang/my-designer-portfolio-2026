import { useId } from 'react';
import { polyLetterMask } from '@/lib/poly-letter-mask';
/** Animate the lettering in the supplied artwork, preserving its original shapes. */
export default function PolyLogo() {
    const id = useId().replace(/:/g, '');
    return <svg className="poly-logo" viewBox="0 0 669 417" role="img" aria-label="POLY Health — a smile unfolding into the Poly logo">
  <defs>
   <clipPath id={`${id}-y-bounds`}><rect x="517" y="210" width="76" height="155"/></clipPath>
   <clipPath id={`${id}-l-bounds`}><rect x="468" y="210" width="49" height="155"/></clipPath>
   <clipPath id={`${id}-o-bounds`}><rect x="416" y="210" width="52" height="155"/></clipPath>
   <clipPath id={`${id}-p-bounds`}><rect x="190" y="210" width="226" height="155"/></clipPath>
   <mask id={`${id}-reveal`} maskUnits="userSpaceOnUse" x="0" y="0" width="669" height="417">
    <path clipPath={`url(#${id}-p-bounds)`} className="poly-draw poly-letter-p" pathLength="1" d="M197 306 C270 310 348 282 387 228 C420 245 417 283 390 272 L367 253" fill="none" stroke="white" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round"/>
    <path clipPath={`url(#${id}-o-bounds)`} className="poly-draw poly-letter-o" pathLength="1" d="M433 267 C409 278 426 313 449 300 C468 286 455 267 449 267" fill="none" stroke="white" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round"/>
    <path clipPath={`url(#${id}-l-bounds)`} className="poly-draw poly-letter-l" pathLength="1" d="M478 306 C510 303 512 229 491 227 C468 225 477 308 512 309" fill="none" stroke="white" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round"/>
    <path clipPath={`url(#${id}-y-bounds)`} className="poly-draw poly-letter-y" pathLength="1" d="M528 267 C514 311 540 319 559 288 L561 276 C581 315 578 346 541 345" fill="none" stroke="white" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round"/>
   </mask>
  </defs>
  <image href="/images/poly-health-cover.png" width="669" height="417"/>
  <path d={polyLetterMask} fill="#e8b6af" stroke="#e8b6af" strokeWidth="1"/>
  <image href="/images/poly-health-cover.png" width="669" height="417" mask={`url(#${id}-reveal)`}/>
 </svg>;
}
