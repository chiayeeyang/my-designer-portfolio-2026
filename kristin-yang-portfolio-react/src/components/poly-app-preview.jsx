const screens = [
    { label: 'Daily diet and activity tracking', image: 'poly-app-tracking.png' },
    { label: 'Nutrition facts and macronutrients', image: 'poly-app-nutrition.png' },
    { label: 'Meal details and nutritionist feedback', image: 'poly-app-meal.png' },
];
export default function PolyAppPreview() {
    return <div className="poly-app-gallery" role="img" aria-label="Poly App: daily tracking, nutrition facts, and nutritionist feedback. Created with the goal of changing the way you receive healthcare.">
  <div className="poly-app-composition">
  <p className="poly-app-slogan"><span>Created with the goal of changing</span> <span>the way you receive healthcare.</span></p>
  {screens.map((screen, index) => <div className={`poly-app-panel poly-app-panel-${index}`} key={screen.label}>
   <img src={`/images/${screen.image}`} alt={screen.label} loading="lazy"/>
  </div>)}
  </div>
 </div>;
}
