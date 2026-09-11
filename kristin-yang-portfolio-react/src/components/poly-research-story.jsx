import styles from './poly-research-story.module.css';
export default function PolyResearchStory() {
    return <div className={styles.story}>
 <section className="editorial-section" id="research">
  <div className="eyebrow">IDENTIFY THE PROBLEM</div><h2>Identifying the gaps.</h2>
  <p>The interview and survey focused on women aged 20–35, as PCOS is common during the reproductive years.</p>
  <div className={styles.sample} aria-label="Interview sample: 40 participants">
   <div className={styles.sampleTotal}><span className={styles.microLabel}>INTERVIEW SAMPLE</span><strong>40</strong><span>participants</span></div>
   <div className={styles.distribution}>
    <h3>Age breakdown</h3>
    {[{ age: '20–25', count: 18 }, { age: '25–30', count: 5 }, { age: '30–35', count: 17 }].map(group => <div className={styles.ageRow} key={group.age}>
     <div className={styles.ageLabel}><span>{group.age} years</span><span><strong>{group.count}</strong> <small>· {group.count / 40 * 100}%</small></span></div>
     <div className={styles.track} aria-hidden="true"><span style={{ width: `${group.count / 40 * 100}%` }}/></div>
    </div>)}
   </div>
  </div>
  <div className={styles.barrierHeading}><span className={styles.microLabel}>KEY FINDINGS</span><h3>Four barriers to better support.</h3></div>
  <ul className={styles.barriers}>
   <li><h4>Long waits</h4><p>GP appointments could take weeks to secure.</p></li>
   <li><h4>Hospital-centred care</h4><p>Community support and prevention needed more attention.</p></li>
   <li><h4>Staff shortages</h4><p>Pressure on doctors, nurses, and allied health professionals affected access.</p></li>
   <li><h4>Disconnected systems</h4><p>Information was fragmented between GP, hospital, and social care.</p></li>
  </ul>
 </section>
 <section className="editorial-section" id="audience">
  <div className="eyebrow">PCOS SURVEY INSIGHTS</div><h2>Why PCOS can be overlooked.</h2>
  <div className={styles.pcosSample}>
   <div><span className={styles.microLabel}>WITHIN THE RESEARCH GROUP</span><strong>6 <small>of 40</small></strong><span>participants had a PCOS diagnosis</span></div>
   <p>This included both recently diagnosed women and those diagnosed previously. Their survey responses highlighted barriers to recognising PCOS and finding ongoing support.</p>
  </div>
  <ul className={styles.barriers}>
   <li><h4>Symptoms dismissed</h4><p>Menstrual irregularities were often understood as a normal part of growing up, making PCOS easier to overlook.</p></li>
   <li><h4>Information hard to navigate</h4><p>Online searches led to scattered information or medical language that was difficult to understand.</p></li>
   <li><h4>Support spread across sources</h4><p>Participants lacked one place connecting PCOS knowledge, routes to care, symptom-management guidance, and self-check questions.</p></li>
   <li><h4>Advice lacked personal relevance</h4><p>Some reported improvements after dietary changes, but found that online advice rarely reflected their individual symptoms and needs.</p></li>
  </ul>
 </section>
 <section className="editorial-section" id="research-conclusion">
  <div className="eyebrow">CONNECT THE EVIDENCE</div><h2>Support beyond diagnosis.</h2>
  <p>The interviews point to a need for clear, ongoing guidance. WHO and international PCOS guidelines reinforce the value of healthy habits and support for long-term management.</p>
  <p className={styles.evidenceSources}><a className={styles.citation} href="https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome" target="_blank" rel="noreferrer">WHO, 2026 ↗</a><a className={styles.citation} href="https://www.monash.edu/__data/assets/pdf_file/0003/3379521/Evidence-Based-Guidelines-2023.pdf" target="_blank" rel="noreferrer">International PCOS Guideline, 2023 ↗</a></p>
  <p className={styles.note}>Evidence reviewed after the 2022 project.</p>
 </section>
 <section className={`editorial-section ${styles.persona}`} id="interview-insights">
  <div className="eyebrow">USER PERSONA</div><h2>Emily: finding her way after diagnosis.</h2>
  <div className={styles.personaProfile}>
   <img className={styles.portrait} src="/images/poly-emily.png" alt="Emily waving, with a speech bubble saying Hi! I’m Emily!" width="2048" height="2048" loading="lazy"/>
   <div><span className={styles.microLabel}>NEWLY DIAGNOSED · LIMITED PCOS KNOWLEDGE</span><h3>Emily</h3><p className={styles.personaMeta}>30 years old · London · Office worker</p><p>Recently diagnosed with PCOS, Emily wants to understand which food and lifestyle changes fit her needs. She cooks most meals herself but struggles to turn unfamiliar advice into a routine.</p></div>
  </div>
  <div className={styles.personaDetails}>
   <div><h3>Goals</h3><ul className={styles.bullets}><li>Understand what to eat and why.</li><li>Manage concerns about weight and skin through everyday habits.</li><li>Build a healthier routine she can sustain.</li></ul></div>
   <div><h3>Frustrations</h3><ul className={styles.bullets}><li>Unsure how food choices relate to her symptoms.</li><li>Finds healthy eating restrictive and hard to maintain.</li><li>Late nights, little exercise, and tiredness make change difficult.</li></ul></div>
  </div>
  <div className={styles.conclusion}><span className="eyebrow">WHAT EMILY NEEDS</span><h3>Clear guidance she can put into practice.</h3><p>Understandable PCOS information, recipes with ingredient explanations, and <span className={styles.blueUnderline}>manageable lifestyle steps</span>—with a clear route to professional support.</p></div>
 </section>
 <section className={`editorial-section ${styles.persona}`} id="maya-persona">
  <div className="eyebrow">USER PERSONA</div><h2>Maya: managing PCOS on her own terms.</h2>
  <div className={styles.personaProfile}>
   <div className={styles.personaPlaceholder} role="img" aria-label="Maya portrait placeholder"><span aria-hidden="true">M</span><small>Portrait to come</small></div>
   <div><span className={styles.microLabel}>EIGHT YEARS SINCE DIAGNOSIS · EXPERIENCED IN SELF-MANAGEMENT</span><h3>Maya</h3><p className={styles.personaMeta}>27 years old · London · PhD student</p><p>Diagnosed in college after years of irregular cycles dismissed as stress, Maya has since seen four doctors and tried birth control, metformin, and supplements, with limited or short-lived benefits. She now thinks in terms of managing PCOS, rather than fixing it.</p></div>
  </div>
  <div className={styles.personaDetails}>
   <div><h3>Goals</h3><ul className={styles.bullets}><li>Understand her body's patterns without needing a medical degree.</li><li>Find a community that listens without defaulting to diet tips.</li><li>Feel that everyday choices matter, even without a finish line.</li></ul></div>
   <div><h3>Frustrations</h3><ul className={styles.bullets}><li>Content implying PCOS is reversible if she tries hard enough.</li><li>Generic wellness apps that overlook hormonal conditions.</li><li>Online communities shaped by misinformation and diet culture.</li></ul></div>
  </div>
  <div className={styles.conclusion}><span className="eyebrow">WHAT MAYA NEEDS</span><h3>Accurate support without pressure to “fix” herself.</h3><ul className={styles.bullets}><li>Realistic information that does not oversell outcomes.</li><li>A tone that values chronic management as a worthwhile goal.</li><li>Space to track symptoms and patterns without feeling judged.</li></ul></div>
  <p className={styles.decision}><span>Design implication</span>Respect her lived experience. Use “<span className={styles.blueUnderline}>understand</span>” and “<span className={styles.blueUnderline}>manage</span>,” acknowledge her symptoms, and avoid promises to “heal,” “fix,” or “reverse” PCOS. Make tracking a tool for learning, not a score of how well she is coping.</p>
 </section>
    </div>;
}
