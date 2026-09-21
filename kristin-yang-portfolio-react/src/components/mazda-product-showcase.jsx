import styles from './mazda-product-showcase.module.css';

const collections = [
  { title: 'Coloring books', images: [
    ['book-coloring', 'A hand colors the Mazda MX-5 with a red pencil in an open coloring book'],
    ['book-overhead', 'Overhead view of the Cosmo and MX-5 coloring book spread'],
    ['book-angle', 'Angled view of the Cosmo and RX-Vision coloring book spread'],
  ] },
  { title: 'Puzzle collection', images: [
    ['puzzle-overhead', 'Overhead view of the Mazda MX-5 beach puzzle'],
    ['puzzle-angle', 'Three-quarter view of the Mazda Cosmo puzzle'],
    ['puzzle-detail', 'Low angled view of the Mazda RX-Vision puzzle'],
  ] },
];

export default function MazdaProductShowcase() {
  return <div className={styles.showcase}>
    {collections.map(({ title, images }) => <section className={styles.collection} key={title} aria-label={`${title} mockups`}>
      <h3>{title}</h3>
      <div className={styles.grid}>
        {images.map(([name, alt]) => <figure key={name}>
          <img src={`/images/mazda-mockups/${name}.webp`} alt={alt} loading="lazy" width="1536" height="1024" />
        </figure>)}
      </div>
    </section>)}
  </div>;
}
