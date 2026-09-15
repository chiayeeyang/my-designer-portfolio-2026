import { SaveRecipeDemo, ButtonZoom, PmsInfoDemo } from './poly-testing-interactions';
import styles from './poly-testing.module.css';
function Evidence({ items, compact = false }) {
    return <div className={`${styles.images} ${compact ? styles.compact : ''}`}>{items.map(item => <figure key={item.id}>{item.id === 28 ? <SaveRecipeDemo /> : item.id === 25 ? <ButtonZoom /> : <a href={`/images/poly-case-${item.id}.jpg`} target="_blank" rel="noreferrer" aria-label={`Enlarge: ${item.label}`}><img src={`/images/poly-case-${item.id}.jpg`} alt={item.label} loading="lazy"/></a>}<figcaption>{item.label}</figcaption></figure>)}</div>;
}
export default function PolyTesting() {
    return <section id="testing" className={`editorial-section ${styles.testing}`}>
 <h2>Usability testing & iteration</h2>
 <div className={styles.summary}><span>KEY TAKEAWAY</span><p>The visual identity felt warm and approachable. The main friction came from finding features and recognising what to click.</p></div>
 <div className={styles.task}>
  <header><span className={styles.index}>TEST 01</span><h3>Find, save, and revisit a recipe.</h3><p><strong>Task given</strong> Find the “bagel brunch platter,” save it, and locate it in saved recipes.</p></header>
  <dl className={styles.analysis}><div><dt>Feedback</dt><dd>Some respondents found the flow straightforward; others <span className={styles.underline}>confused saving recipes with the “Save article” feature because both used the same icon</span>.</dd></div><div><dt>Insight</dt><dd>The value of saving was clear, but entry points and the distinction between saved content types needed stronger cues.</dd></div><div><dt>Iteration</dt><dd><span className={styles.underline}>Replaced the recipe bookmark with a heart</span>, while keeping bookmarks for articles, giving each content type a distinct visual cue.</dd></div></dl>
  <Evidence compact items={[{ id: 27, label: 'Before / Sharing same icon with “save article”' }, { id: 28, label: 'After / Heart for saved recipes' }]}/>
  <Evidence items={[{ id: 29, label: 'Articles / Bookmark retained' }, { id: 30, label: 'Recipes / Heart applied to the card' }]}/>
 </div>
 <div className={styles.task}>
  <header><span className={styles.index}>TEST 02</span><h3>Complete the questionnaire and return home.</h3><p><strong>Task given</strong> Find and complete the hormone self-check questionnaire, then return to the homepage.</p></header>
  <dl className={styles.analysis}><div><dt>Feedback</dt><dd>Several responses described the flow as easy once found. Others took longer to locate it because “Do I have PCOS?” and “hormone test” were not clearly connected. A respondent specifically <span className={styles.underline}>suggested different icons for retaking the test and returning home</span>.</dd></div><div><dt>Insight</dt><dd>Consistent naming helps users enter the flow; distinct action cues help them leave it confidently.</dd></div><div><dt>Iteration</dt><dd>Differentiated the result-page actions with a <span className={styles.underline}>repeat icon for “Retake the Test” and a home icon for “Back to Home,”</span> supported by different button treatments.</dd></div></dl>
  <Evidence items={[{ id: 25, label: 'Updated screen' }]}/>
  <div className={styles.refinement}><span className={styles.index}>RELATED REFINEMENT / LANGUAGE</span><h3>Explain terms at the point of use.</h3><p>One comment points out that the question assumes familiarity with “PMS.” The revision added an information icon and an on-demand explanation, supporting comprehension without leaving the questionnaire.</p><figure className={styles.pmsFigure}><PmsInfoDemo /><figcaption>Updated screen / information button added with explanation on PCOS</figcaption></figure></div>
 </div>
 </section>;
}
