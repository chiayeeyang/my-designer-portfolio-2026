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
   <Heading number="02" title="Build the board around the folds">The color template divides the folding structure into distinct spaces. Illustrations, food-waste ideas, and gameplay instructions turn those spaces into a board that can be explored from around the table.</Heading>
   <LeftoverBoard/>
  </section>
  <section className={styles.stage}>
   <Heading number="03" title="Sketch the digital companion">A balance display, money adjustments, chance and community chest cards, and a dice roll. The sketches explored how these controls could fit different screen orientations.</Heading>
   <div className={styles.wireframes}>
    <Figure className={styles.landscape} src="/images/leftover-process/landscape-wireframe.jpg" alt="Landscape interface sketch with cards, dice, and money controls" caption="Landscape layout"/>
    <Figure src="/images/leftover-process/portrait-wireframe.jpg" alt="Portrait interface sketch with balance above cards and dice" caption="Portrait layout"/>
   </div>
  </section>

 </div>;
}
