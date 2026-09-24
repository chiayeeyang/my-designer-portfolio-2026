import LeftoverBoard from './leftover-board';
import styles from './leftover-process.module.css';

function Figure({src,alt,caption,className=''}) {
  return <figure className={className}><a href={src} target="_blank" rel="noreferrer" aria-label={`Open full image: ${alt}`}><img src={src} alt={alt} loading="lazy"/></a><figcaption>{caption}</figcaption></figure>;
}
function Heading({number,title,children}) {
  return <header className={styles.heading}><span>{number}</span><div><h3>{title}</h3><p>{children}</p></div></header>;
}
export default function LeftoverProcess() {
 return <div className={styles.process}>
  <section className={styles.stage}>
   <Heading number="01" title="Explore what a tray liner could become">Early sketches explored games, leftover recipes, and comic storytelling within the same folding template. A playful approach connected the practical container with a reason to engage.</Heading>
   <Figure src="/images/leftover-process/concept-clean.png" alt="Original handwritten concept map and two folding-template sketches" caption="Concept exploration · content ideas mapped onto the folding template"/>
  </section>
  <section className={styles.stage}>
   <Heading number="02" title="Let the game unfold!">Color divides the folding structure into distinct spaces. Illustrations, ideas for reducing food waste, and gameplay instructions transform these spaces into a shared game board that invites exploration from every side of the table.</Heading>
   <LeftoverBoard/>
  </section>
  <section className={styles.stage}>
   <Heading number="03" title="Building digital companion">A balance display, money adjustments, chance and community chest cards, and a dice roll. The sketches explored how these controls could fit different screen orientations.</Heading>
   <h4 className={styles.versionHeading}>Original, 2022</h4>
   <div className={styles.wireframes}>
    <Figure className={styles.landscape} src="/images/leftover-process/landscape-wireframe.jpg" alt="Landscape interface sketch with cards, dice, and money controls" caption="Landscape layout"/>
    <Figure src="/images/leftover-process/portrait-wireframe.jpg" alt="Portrait interface sketch with balance above cards and dice" caption="Portrait layout"/>
   </div>
   <Figure className={styles.companionMockup} src="/images/leftover-process/digital-companion-polished.png" alt="Angled black and silver phone showing the original companion cards, calculator, and dice" caption="Original companion: cards, calculator, and dice"/>
   <nav className={styles.companionLinks} aria-label="Explore the digital companion">
    <a className={styles.tryCompanion} href="https://leftovers-game-2022.vercel.app/" target="_blank" rel="noopener noreferrer">Try <span aria-hidden="true">↗</span></a>
    <a href="https://github.com/chiayeeyang/leftovers-game-2022.git" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
   </nav>
   <section className={styles.revisited} aria-labelledby="companion-revisited">
    <h4 id="companion-revisited" className={styles.versionHeading}>Revisited, 2026</h4>
    <p className={styles.revisitIntro}>A new iteration brings the original cards, calculator, and dice together in a shared game table.</p>
    <ol className={styles.improvements}>
     <li><span className={styles.improvementNumber} aria-hidden="true">01</span><div><h5>A place for every player</h5><p>Manage up to five players, each with their own balance.</p></div></li>
     <li><span className={styles.improvementNumber} aria-hidden="true">02</span><div><h5>Simpler money moves</h5><p>Pay or collect with quick amounts and dedicated controls.</p></div></li>
     <li><span className={styles.improvementNumber} aria-hidden="true">03</span><div><h5>Pick up where you left off</h5><p>Players, balances, cards, and dice history are saved on the same device.</p></div></li>
    </ol>
    <Figure src="/images/leftover-process/companion-2026.png" alt="Revisited companion interface showing player balances, dice, Chance cards, and a personal bank" caption="Revisited interface, with a shared game table"/>
    <nav className={styles.companionLinks} aria-label="Explore the revisited companion">
     <a className={styles.tryCompanion} href="https://leftovers-board-game.vercel.app/" target="_blank" rel="noopener noreferrer">Try <span aria-hidden="true">↗</span></a>
     <a href="https://github.com/chiayeeyang/leftovers-board-game.git" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
    </nav>
   </section>
  </section>

 </div>;
}
