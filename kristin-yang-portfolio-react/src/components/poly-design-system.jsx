import { useState } from 'react';
import styles from './poly-design-system.module.css';
const types = [
    { name: 'Display Title', family: 'Arima Madurai', css: '40px / 400 / -1.2px / 48px', className: 'display' },
    { name: 'Heading 1', family: 'Outfit', css: '28px / 400 / -0.56px / 35px', className: 'heading' },
    { name: 'Body Copy', family: 'Outfit', css: '16px / 400 / 0px / 26px', className: 'body' },
    { name: 'Mono Label', family: 'ui-monospace', css: '11px / 400 / 1.1px / 16px', className: 'mono' },
];
const colors = [{ name: 'Brand / Primary', hex: '#F28888', token: '--poly-coral' }, { name: 'Brand / Soft', hex: '#F2B2AC', token: '--poly-pink' }, { name: 'Surface / Background', hex: '#F2E3D5', token: '--poly-cream' }, { name: 'Text / Primary', hex: '#402820', token: '--poly-brown' }, { name: 'Text / Muted', hex: '#8C6764', token: '--poly-muted' }];
export default function PolyDesignSystem() {
    const [sample, setSample] = useState('Care that feels human.');
    return <div className={styles.spec}>
  <header className={styles.header}><span className="eyebrow">POLY HEALTH / DESIGN SYSTEM</span><h2>A system built around care.</h2><p>Warm color, expressive type, and consistent spacing create an approachable interface.</p></header>
  <section className={styles.block} aria-labelledby="type-spec"><div className={styles.sectionTitle}><h3 id="type-spec">01 / Typography</h3><span>SIZE / WEIGHT / TRACKING / LINE HEIGHT</span></div>
   <label className={styles.inputLabel}>Preview text<input value={sample} onChange={e => setSample(e.target.value)} maxLength={100} placeholder="Type to preview the scale"/></label>
   <div className={styles.typeTable}>{types.map(type => <div className={styles.typeRow} key={type.name}><div><h4>{type.name}</h4><code>{type.family}<br />{type.css}</code></div><div className={`${styles.preview} ${styles[type.className]}`}>{sample || 'Care that feels human.'}</div></div>)}</div>
  </section>
  <section className={styles.block} aria-labelledby="color-spec"><div className={styles.sectionTitle}><h3 id="color-spec">02 / Semantic colors</h3><span>HEX / CSS TOKEN / TAILWIND UTILITY</span></div><div className={styles.colors}>{colors.map(color => <div className={styles.color} key={color.token}><div className={styles.swatch} style={{ background: color.hex }}/><div className={styles.colorMeta}><h4>{color.name}</h4><code>{color.hex}</code><code>{color.token}</code><code>{['bg-', '[', 'var(', color.token, ')', ']'].join('')}</code></div></div>)}</div></section>
  <section className={styles.block} aria-labelledby="button-spec">
   <div className={styles.sectionTitle}><h3 id="button-spec">03 / Buttons</h3><span>DEFAULT / HOVER / PRESS / FOCUS</span></div>
   <div className={styles.buttons}>{[{ name: 'Primary / Pink', className: styles.primaryButton, colors: '#F2B2AC / #FFFFFF' }, { name: 'Secondary / Cream', className: styles.secondaryButton, colors: '#F2E3D5 / #F28888' }].map(button => <div className={styles.buttonSample} key={button.name}><div className={styles.buttonStage}><button type="button" className={`${styles.demoButton} ${button.className}`} aria-label={`${button.name} button preview`}>Button</button></div><h4>{button.name}</h4><code>{button.colors}</code><code>44px height / 999px radius / Outfit 16px</code></div>)}</div>
   <p className={styles.note}>Soft pill shapes and a gentle shadow make actions feel approachable. Hover, press, or tab to explore each state.</p>
  </section>
  <section className={styles.block} aria-labelledby="detail-spec"><div className={styles.sectionTitle}><h3 id="detail-spec">04 / Geometry</h3><span>REUSABLE MEASUREMENTS</span></div><h4 className={styles.subhead}>Border radius</h4><div className={styles.radii}>{[{ value: 2, utility: 'rounded-sm' }, { value: 16, utility: 'rounded-2xl' }, { value: 24, utility: 'rounded-3xl' }].map(radius => <div key={radius.value}><div className={styles.radiusBox} style={{ borderRadius: radius.value }}/><code>{radius.value}px / {radius.utility}</code></div>)}</div></section>
 </div>;
}
