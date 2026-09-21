import styles from './leftover-research.module.css';
const base = '/images/leftover-research/';
export function LeftoverObservations() {
  return <div className={styles.observations}>
    {[1, 2].map((n) => <figure key={n}><a href={`${base}observation-${n}.jpg`} target="_blank" rel="noreferrer"><img src={`${base}observation-${n}.jpg`} alt={n === 1 ? 'Documenting discarded food and packaging during campus field research' : 'Examining a bin during food-waste field research'} loading="lazy" /></a></figure>)}
  </div>;
}
function PollBar({ label, discounted, fresh }) {
  return <div className={styles.pollRow}>
    <span className={styles.time}>{label}</span>
    <div className={styles.bar} role="img" aria-label={`${label}: ${discounted}% chose discounted food past its best-before date; ${fresh}% chose fresh food at full price`}>
      <span style={{ width: `${discounted}%` }}>{discounted}%</span><span style={{ width: `${fresh}%` }}>{fresh}%</span>
    </div>
  </div>;
}
function Bars({ rows, total, unit = 'votes' }) {
  return <div className={styles.countBars}>{rows.map(([label, count, correct]) => <div className={styles.countRow} key={label}>
    <div className={styles.countLabel}><span>{label}{correct && <small>Answer key</small>}</span><span>{count} {unit}</span></div>
    <div className={styles.track}><div style={{ width: `${count / total * 100}%` }} data-correct={correct || undefined} /></div>
  </div>)}</div>;
}
function Split({ left, right, value, dataBase }) {
  return <><div className={styles.legend}><span><i />{left}</span><span><i />{right}</span></div>{dataBase && <p className={styles.note}>{dataBase}</p>}<div className={styles.bar} role="img" aria-label={`${left}: ${value}%; ${right}: ${100 - value}%`}><span style={{width: `${value}%`}}>{value}%</span><span style={{width: `${100-value}%`}}>{100-value}%</span></div></>;
}
export function LeftoverSurvey() {
  return <div className={styles.survey}>
    <div className="eyebrow">INSTAGRAM SURVEY / FINDINGS</div>
    <p>An Instagram questionnaire explored attitudes toward leftovers, food-sharing platforms, and food nearing expiration. The recorded price-preference poll was closely split; the other prompts explored habits, trust, awareness, and empathy.</p>
    <h3>Would you buy the same food just past its best-before date at a reduced price, or fresh at its original price?</h3>
    <div className={styles.legend}><span><i />Past best-before · reduced price</span><span><i />Fresh · original price</span></div>
    <PollBar label="Data base: 150 participants" discounted={48} fresh={52} />
    <div className={styles.question}>
      <h3>How often do you pack leftovers when eating out?</h3>
      <Split left="Yes" right="No" value={41} dataBase="Data base: 150 participants" />
    </div>
    <div className={styles.question}>
      <h3>How comfortable are you sharing or receiving food from strangers?</h3>
      <p className={styles.note}>Data base: 150 participants</p>
      <div className={styles.scale} role="img" aria-label="Comfort scale: 75% of the way from I'm ok with that toward unlikely"><div className={styles.scaleTrack}><span className={styles.marker}><b>75%</b></span></div><div className={styles.scaleLabels}><span>I'm ok with that</span><span>Unlikely</span></div></div>
    </div>
    <div className={styles.question}>
      <h3>What concerns do you have about food-sharing platforms?</h3>
      <p className={styles.note}>Themes from 30 visible written responses. A response can mention more than one theme.</p>
      <Bars total={30} unit="mentions" rows={[["Hygiene & cleanliness",15],["Safety & health",7],["Pricing honesty",5],["All concerns / unspecified",3]]} />
    </div>
    <div className={styles.question}>
      <h3>What is the annual value of food wasted globally?</h3>
      <p className={styles.note}>32 quiz responses · counts from the supplied results</p>
      <Bars total={32} rows={[["1 trillion",9,true],["5.3 billion",11],["560 million",5],["2 billion",7]]} />
    </div>
    <div className={styles.question}>
      <h3>How much land grows food that is never eaten?</h3>
      <p>An area larger than which country?</p>
      <p className={styles.note}>46 quiz responses · counts from the supplied results</p>
      <Bars total={46} rows={[["Russia",17],["China",12,true],["Australia",6],["United States",11]]} />
    </div>
    <div className={styles.question}>
      <h3>Who do you feel most empathy toward?</h3>
      <p className={styles.note}>150 votes</p>
      <Bars total={150} rows={[["Wasted plants and animals",75],["People facing hunger",40],["Farmers",35]]} />
    </div>
  </div>;
}
