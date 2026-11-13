import { useId, useRef, useState } from 'react';
import styles from './nmdp-personas.module.css';
import PersonaIllustration from './nmdp-persona-illustration';

// Condensed from the four research-informed scenarios on the team's persona board.
const people = [
  {
    id: 'patient', name: 'Maya Thompson', role: 'Patient', age: 8, location: 'Chicago, Illinois',
    need: 'Clarity while waiting.',
    bio: 'Recently diagnosed with leukemia, Maya is waiting for a donor after no full match was found in her family.',
    pains: ['Not knowing when a donor will be found', 'Unfamiliar treatment information', 'Fear that a potential donor may become unavailable'],
    goals: ['Find a suitable donor', 'Understand what happens next', 'Return to everyday life with her family'],
    background: '#faf1ed', accent: '#e8b9a7', ink: '#83513e',
  },
  {
    id: 'donor', name: 'Ethan Lee', role: 'Potential donor', age: 24, location: 'San Francisco, California',
    need: 'Confidence before committing.',
    bio: 'Ethan joined the registry in college. Now contacted as a possible match, he wants to help—but needs to understand the commitment.',
    pains: ['Unclear next steps and recovery time', 'Worries about pain and side effects', 'Fitting donation around work and travel'],
    goals: ['Know exactly what donation involves', 'Plan around his daily responsibilities', 'Feel confident about helping a patient'],
    background: '#eef4f8', accent: '#b9d3e3', ink: '#45677b',
  },
  {
    id: 'caregiver', name: 'Daniel Carter', role: 'Family caregiver', age: 38, location: 'Boston, Massachusetts',
    need: 'Support for the supporter.',
    bio: 'As his wife prepares for a transplant, Daniel coordinates appointments, medication, and home life while trying to stay emotionally present.',
    pains: ['Too many responsibilities at once', 'Complex information and changing schedules', 'Emotional exhaustion and little time for himself'],
    goals: ['Support his wife through recovery', 'Keep care and appointments organized', 'Communicate clearly with the medical team'],
    background: '#f0f4ec', accent: '#c6d7b9', ink: '#54684a',
  },
  {
    id: 'advocate', name: 'John Davis', role: 'Community advocate', age: 60, location: 'Boston, Massachusetts',
    need: 'Trust, and a way to contribute.',
    bio: 'After losing his son to blood cancer, John wants to honor his memory by sharing reliable information and encouraging eligible people to join.',
    pains: ['Mistrust shaped by past healthcare experiences', 'Uncertainty about which information to trust', 'No clear way to help beyond donating'],
    goals: ['Honor his son’s memory', 'Share credible information with his community', 'Encourage others without making them feel pressured'],
    background: '#f3eff7', accent: '#d5c6e2', ink: '#6f557c',
  },
];

export default function NmdpPersonas() {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const headingId = useId();
  const instructionsId = useId();

  function goTo(index) {
    const track = trackRef.current;
    if (!track) return;
    const target = Math.max(0, Math.min(index, people.length - 1));
    const step = track.children[1].offsetLeft - track.children[0].offsetLeft;
    track.scrollTo({ left: target * step, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  function syncSlide(event) {
    const track = event.currentTarget;
    const step = track.children[1].offsetLeft - track.children[0].offsetLeft;
    setActive(Math.max(0, Math.min(Math.round(track.scrollLeft / step), people.length - 1)));
  }

  function onKeyDown(event) {
    const next = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: people.length - 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    goTo(next);
  }

  return <div className={styles.carousel} role="region" aria-roledescription="carousel" aria-labelledby={headingId}>
    <header className={styles.header}>
      <h3 id={headingId}>Research-Informed Personas</h3>
    </header>
    <p id={instructionsId} className={styles.srOnly}>Swipe horizontally or use the arrow keys to explore four personas.</p>
    <div className={styles.track} ref={trackRef} tabIndex={0} aria-label="Persona profiles" aria-describedby={instructionsId} onScroll={syncSlide} onKeyDown={onKeyDown}>
      {people.map((person, index) => <div key={person.id} className={styles.slide} role="group" aria-roledescription="slide" aria-label={`${index + 1} of 4: ${person.name}`} aria-hidden={active !== index} style={{ '--persona-background': person.background, '--persona-accent': person.accent, '--persona-ink': person.ink }}>
        <div className={styles.character}>
          <span className={styles.number} aria-hidden="true">0{index + 1}</span>
          <PersonaIllustration person={person} />
          <p className={styles.need}>{person.need}</p>
        </div>
        <div className={styles.profile}>
          <p className={styles.role}>{person.role}</p>
          <h4 className={styles.name}>{person.name}</h4>
          <p className={styles.details}>{person.age} years old <span aria-hidden="true">·</span> {person.location}</p>
          <div className={styles.bio}>
            <h5>Bio</h5><p>{person.bio}</p>
          </div>
          <div className={styles.columns}>
            <div><h5>Key pain points</h5><ul>{person.pains.map(item => <li key={item}>{item}</li>)}</ul></div>
            <div><h5>Goals</h5><ul>{person.goals.map(item => <li key={item}>{item}</li>)}</ul></div>
          </div>
        </div>
      </div>)}
    </div>
    <div className={styles.pagination} aria-label="Choose a persona">
      {people.map((person, index) => <button key={person.id} type="button" aria-label={`Show ${person.name}`} aria-current={active === index ? 'true' : undefined} onClick={() => goTo(index)}><span /></button>)}
    </div>
    <p className={styles.srOnly} aria-live="polite" aria-atomic="true">{people[active].name}, {active + 1} of {people.length}</p>
  </div>;
}
