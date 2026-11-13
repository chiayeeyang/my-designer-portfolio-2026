// Add a public image path to `src` when the corresponding visual is ready.
// Example: src: '/images/nmdp/discovery-v2.webp'. Keep alt text descriptive.
export const nmdpMedia = {
  hero: { label: 'Hero photo / final concept image', src: null, alt: 'NMDP and food-delivery hero image' },
  journey: { label: 'NMDP journey', src: null, alt: 'The NMDP donor journey and the role of a returned swab kit' },
  field: { label: 'Field study', src: null, alt: 'NMDP campus recruitment field study' },
  heuristic: { label: 'Heuristic evaluation', src: null, alt: 'Evaluation of the existing NMDP registration experience' },
  aeiou: { label: 'AEIOU research', src: null, alt: 'Field observations of activities, environments, interactions, objects, and users' },
  affinity: { label: 'Affinity synthesis', src: null, alt: 'Synthesis of the team’s research findings' },
  sketches: { label: 'Sketch sprint', src: null, alt: 'Concepts generated during the team sketch sprint' },
  voting: { label: 'Dot voting', src: null, alt: 'Team voting to shortlist concept directions' },
  service: { label: 'Service flow', src: null, alt: 'Responsibilities across the food platform, restaurant, delivery, and NMDP' },
  user: { label: 'User flow', src: null, alt: 'Requesting, completing, and returning a swab kit with a food order' },
  early: { label: 'Early concept mockup', src: null, alt: 'Early NMDP and food-delivery concept' },
  discoveryBefore: { label: 'Prototype v1 · Discovery', src: null, alt: 'Initial concept showing the swab-kit option only at checkout' },
  discoveryAfter: { label: 'Prototype v2 · Discovery', src: null, alt: 'Proposed concept showing participating restaurants during browsing' },
  informationBefore: { label: 'Prototype v1 · Information', src: null, alt: 'Initial concept presenting all NMDP information together' },
  informationAfter: { label: 'Prototype v2 · Information', src: null, alt: 'Proposed short introduction with optional deeper information' },
  completionBefore: { label: 'Prototype v1 · Completion', src: null, alt: 'Initial concept ending after kit receipt' },
  completionAfter: { label: 'Prototype v2 · Completion', src: null, alt: 'Proposed status, next steps, reminders, and return confirmation' },
  current: { label: 'Current final prototype', src: null, alt: 'Current NMDP and food-delivery prototype' },
};

export const nmdpChapters = [
  ['challenge', 'Problem'], ['insights', 'Research'], ['direction', 'Design'],
  ['current-direction', 'Solution'], ['next', 'Next steps'],
];

export const nmdpIterations = [
  {
    id: 'discovery', title: 'Discovery',
    takeaway: 'Introduce the opportunity before checkout.',
    before: 'The swab-kit option appears only at checkout.',
    issue: 'People could encounter the partnership too late, without enough context.',
    after: 'Make participating restaurants visible during browsing.',
    why: 'Introduce the opportunity before asking people to make a decision.',
    beforeMedia: 'discoveryBefore', afterMedia: 'discoveryAfter',
  },
  {
    id: 'information', title: 'Information',
    takeaway: 'Offer clarity first, with room to learn more.',
    before: 'A large amount of NMDP information is presented at once.',
    issue: 'This could interrupt the food-ordering experience.',
    after: 'Use a short explanation first, with optional deeper information.',
    why: 'Provide enough context for an informed decision without overwhelming the user.',
    beforeMedia: 'informationBefore', afterMedia: 'informationAfter',
  },
  {
    id: 'completion', title: 'Completion',
    takeaway: 'Keep the next step visible after the kit arrives.',
    before: 'The experience ends once someone receives the swab kit.',
    issue: 'Receiving or registering does not necessarily lead to completing and returning a kit.',
    after: 'Add status, next steps, reminders, and completion confirmation.',
    why: 'Design for follow-through rather than only acquisition.',
    beforeMedia: 'completionBefore', afterMedia: 'completionAfter',
  },
];
