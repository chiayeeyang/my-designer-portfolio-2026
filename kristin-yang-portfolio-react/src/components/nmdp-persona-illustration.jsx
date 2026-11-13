import styles from './nmdp-personas.module.css';

// Flat, softly colored scenes share a restrained palette and rounded linework.
const ink = '#5b625f';
const skin = '#e9c4aa';

function Maya() {
  return <>
    <path fill="#e5d4df" d="M47 179q0-13 14-13h158q14 0 14 13v69H47Z" />
    <path d="M54 244v39m171-39v39" stroke="#b6bcb3" strokeWidth="7" />
    <rect x="38" y="227" width="204" height="22" rx="11" fill="#c8b9ca" />
    <path fill="#abbacb" d="m113 210-3 62 18 3 15-62m6 0 8 60 17-2-5-63Z" />
    <path fill="#e9d8ca" d="m108 268-9 12q-4 8 7 8h25l-2-17m28-2 1 16h27q8-2 2-8l-16-10Z" />
    <path fill="#b7d6ca" d="M112 120q-16 3-23 29l-11 39 20 7 11-28-4 49q34 12 72-1l-7-49 14 27 17-11-18-41q-9-20-25-22Z" />
    <path fill={skin} d="M127 105v16q13 15 26 0v-16Z" />
    <path fill={skin} d="M107 71q-6-5-9 2-2 12 10 16m68-18q7-5 9 2 1 12-11 16" />
    <path fill={skin} d="M106 62q1-33 35-33t35 33v20q-2 34-35 34t-35-34Z" />
    <path fill="#c5b4cf" d="M104 63V53q0-31 37-31t37 31v10Z" />
    <path fill="#e0d0e4" d="M103 57q38-8 76 0v13q-38-6-76 0Z" />
    <path d="M123 84h1m33 0h1m-21 13q6 4 12-1" stroke={ink} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="m119 124 21 14 20-15m-20 15v30" stroke="#72998b" strokeWidth="1.7" fill="none" />
    <path fill="#f5e5b5" d="m97 170 43 6v43l-43-8Zm43 6 43-6v41l-43 8Z" />
    <path d="M140 177v40m-33-33 23 3m-23 7 23 3m21-10 21-3m-21 13 21-3" stroke="#baa977" strokeWidth="1.5" fill="none" />
    <path fill={skin} d="M81 184q-4 9 6 14l15 6q8 1 7-6l-8-7-3-8q-4-6-7 1Zm109-4q9 2 7 11l-16 10q-10 4-10-4l8-7 2-8q3-6 9-2Z" />
    <path d="m87 185-4 10" stroke="#fffaf0" strokeWidth="5" />
    <circle cx="216" cy="97" r="21" fill="#f1dfaf" />
    <path d="M216 85v24m-12-12h24" stroke="#fffaf1" strokeWidth="5" strokeLinecap="round" />
  </>;
}

function Ethan() {
  return <>
    <rect x="32" y="46" width="60" height="54" rx="8" fill="#dce8df" transform="rotate(-8 62 73)" />
    <path d="m43 62 34-5m-32 18 9-2m6-1 9-1m-22 16 9-1" stroke="#a3bdaf" strokeWidth="3" strokeLinecap="round" />
    <path fill="#a6b7ca" d="m111 181-15 88 20 3 27-70 12 68h20l-4-91Z" />
    <path fill="#747c7b" d="m96 266-13 15q-2 6 8 6h26l1-17Zm60 1v20h33q8-3 1-8l-16-12Z" />
    <path fill="#bdd5c7" d="m116 91-20 9-24 58 20 8 20-36-8 57q38 13 74 0l-11-58 19 14 14-17-30-28-18-7Z" />
    <path fill={skin} d="m125 75-2 21q14 15 28 0l-3-22Z" />
    <path fill={skin} d="M115 45q0-24 27-24t27 24v20q-5 27-29 26-25-1-25-26Z" />
    <path fill="#555d5a" d="M114 59q-12-19-1-33 9-15 30-12 21-1 28 17l-4 16q-21 0-31-15-3 18-21 15Z" />
    <path d="m143 61 7 1m-8 14 8 1" stroke={ink} strokeWidth="2" strokeLinecap="round" />
    <path fill={skin} d="m75 156-6 18q-2 9 7 11l11 2q9-3 3-10l-6-6 6-10m97-27 8-17q4-8 10-5l5 9-10 22Z" />
    <rect x="199" y="91" width="20" height="37" rx="4" fill="#7a8c97" transform="rotate(15 209 109)" />
    <path d="m207 96 7 2" stroke="#dde5e5" strokeWidth="2" strokeLinecap="round" />
    <path d="m115 102 48 82m-51-47-7 46" stroke="#6e8d7d" strokeWidth="2" fill="none" />
    <rect x="144" y="175" width="43" height="32" rx="7" fill="#dbc2ae" />
    <path d="M147 183h36m-20 0v5" stroke="#aa8f7f" strokeWidth="1.5" />
  </>;
}

function Daniel() {
  return <>
    <rect x="174" y="43" width="65" height="60" rx="6" fill="#f1e1ba" />
    <path d="M174 59h65m-51-22v12m37-12v12" stroke="#c9b98e" strokeWidth="2.5" strokeLinecap="round" />
    <path d="m187 72 5 5 10-12m7 7h16m-38 17h16m6 0h16" stroke="#b0a781" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path fill="#c2d4cc" d="M54 159q0-15 15-15h34q12 0 14 16l4 51h48v26H54Z" />
    <path d="M64 236v47m96-47v47" stroke="#a0b3ac" strokeWidth="7" />
    <path fill="#a8b5c6" d="m96 190 63 9q12 2 15 15l9 55-19 2-18-43-46-3q-20-5-15-24Z" />
    <path fill="#889bad" d="m118 219 24 8-13 47-20-3Z" />
    <path fill="#777970" d="m109 269-9 12q-3 6 8 6h25l-5-17m36-2v19h31q8-2 2-8l-17-11Z" />
    <path fill="#d5b8af" d="M95 95q-21 5-23 30l8 72q25 19 60 9l-10-74 22 32 17-12-25-43q-6-11-22-15Z" />
    <path fill={skin} d="m100 77 2 22q13 12 25-2l-4-23Z" />
    <path fill={skin} d="M90 47q0-29 28-28t29 28l-3 23q-3 22-25 22-24-1-26-24Z" />
    <path fill="#62645a" d="m92 63-8-23q-3-27 27-28 25-5 35 14l1 16q-20 3-32-13-5 18-21 17Z" />
    <path d="M126 54h2m3 15 7 1m-36 5 6 9 20 3" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" />
    <rect x="134" y="148" width="48" height="61" rx="5" fill="#f0e5ce" transform="rotate(14 158 178)" />
    <rect x="151" y="145" width="20" height="7" rx="3" fill="#b8c4b3" transform="rotate(14 158 178)" />
    <path d="m146 165 23 6m-26 6 24 6m-26 5 16 4" stroke="#bab397" strokeWidth="2" strokeLinecap="round" />
    <path fill={skin} d="m162 146 11 9q7 6 2 13l-9-3-6-7-8-2m-56-9 5 24 33 8q11 4 9 11-2 7-12 4l-41-8q-9-3-10-12l-3-24Z" />
    <path d="m93 124 3 22m10-44 10 10 11-12" stroke="#a48982" strokeWidth="1.8" fill="none" />
  </>;
}

function John() {
  return <>
    <path fill="#dfd7e7" d="M184 43h54q10 0 10 10v31q0 10-10 10h-22l-12 12V94h-20q-10 0-10-10V53q0-10 10-10Z" />
    <path d="M189 62h44m-44 13h28" stroke="#b5a7c6" strokeWidth="3" strokeLinecap="round" />
    <path fill="#aab6b0" d="m110 181-8 90 20 2 19-69 14 68h20l-4-91Z" />
    <path fill="#75736e" d="m103 267-12 14q-3 6 7 6h25v-17m32-3v20h31q8-2 2-8l-16-12Z" />
    <path fill="#a9c3c9" d="m115 90-23 12-31 30 12 16 35-22-5 65q34 11 74-2l-12-58 26 16 13-17-37-28-17-10Z" />
    <path fill="#c69d82" d="m125 73-2 23q15 14 28-1l-5-23Z" />
    <path fill="#c69d82" d="M113 40q1-23 27-23t27 23v27q-2 25-27 25t-27-25Z" />
    <path fill="#dedbd2" d="M113 60q-12-17-5-34 5-14 21-13l8 7q12-9 25-2 15 8 6 41l-6-21q-15 0-23-10-5 13-22 12Z" />
    <g fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round">
      <rect x="116" y="47" width="20" height="15" rx="6" /><rect x="145" y="47" width="20" height="15" rx="6" /><path d="M136 53h9m-11 22q7 4 14-1" />
      <path d="m119 96 20 20 15-18m-15 18v70m-25-47-8 43" stroke="#75969d" />
    </g>
    <path fill="#c69d82" d="m63 132-16-7q-7-3-11 2-5 8 3 14l23 10 11-7m119-10 15-14q6-5 12 0 6 7-1 13l-17 16Z" />
    <path fill="#e7c6b7" d="m35 110 29-7 11 45-30 7Z" />
    <path d="m43 118 16-4m-14 12 16-4m-14 12 12-3" stroke="#b18d7c" strokeWidth="2" strokeLinecap="round" />
  </>;
}

const scenes = { patient: Maya, donor: Ethan, caregiver: Daniel, advocate: John };
const descriptions = {
  patient: 'Maya, an eight-year-old patient in a soft cap and mint hospital gown, reading on a hospital bed',
  donor: 'Ethan in a mint sweater, checking his phone with a shoulder bag at his side',
  caregiver: 'Daniel seated with a care checklist beside an appointment calendar',
  advocate: 'John with gray hair and glasses, sharing an information leaflet',
};

export default function PersonaIllustration({ person }) {
  const Scene = scenes[person.id];
  return <svg viewBox="0 0 280 320" className={styles.portrait} role="img" aria-label={descriptions[person.id]}>
    <path fill="var(--persona-accent)" opacity=".32" d="M36 94C43 35 91 18 133 34c40 15 81-3 107 42s8 78 2 118c-5 38-34 77-88 78-61 2-111-15-122-67-9-39-1-71 4-111Z" />
    <ellipse cx="141" cy="289" rx="106" ry="7" fill="var(--persona-accent)" opacity=".25" />
    <Scene />
    <g fill="var(--persona-ink)" opacity=".15"><circle cx="42" cy="229" r="2" /><circle cx="34" cy="239" r="1.5" /><circle cx="46" cy="246" r="1.5" /><circle cx="224" cy="265" r="2" /><circle cx="234" cy="256" r="1.5" /><circle cx="238" cy="270" r="1.5" /></g>
  </svg>;
}
