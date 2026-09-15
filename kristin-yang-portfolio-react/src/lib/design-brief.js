export function asDesignBrief(p) {
    if (!['01', '02', '03'].includes(p.id))
        return p;
    const section = (id) => p.sections.find(s => s.id === id);
    const audience = p.id === '01' ? 'Individuals with PCOS who need approachable information and support throughout the diagnostic journey.' : p.id === '02' ? 'Women aged 18–35 newly diagnosed with PCOS, including smartphone users seeking accessible guidance and support with lasting habits.' : 'University students: often financially constrained, yet open to trying new things and adopting food-sharing platforms.';
    const requirements = p.id === '01' ? [
        { title: 'Information and support', text: 'PCOS education, symptom-based recipes, lifestyle insights, and a self-check questionnaire with information on seeking medical help.' },
        { title: 'Visual direction', text: 'Empathetic, therapeutic, and playful. A shared typography, color, and component system, supported by the Ovie mascot.' },
        { title: 'Deliverables', text: 'User flows, website wireframes, interactive interface mockups, and a graduate-show presentation.' }
    ] : p.id === '02' ? [
        { title: 'Core functions', text: 'Activity and diet tracking, dietitian guidance, recipes, lifestyle insights, rewards, and community.' },
        { title: 'Experience principles', text: 'Empathy, inspiration, and playfulness.' },
        { title: 'Deliverables', text: 'Mobile app structure, wireframes, and an interactive Figma prototype.' }
    ] : [
        { title: 'Physical format', text: 'A tray liner that folds into a takeaway box and doubles as a Monopoly-style game board.' },
        { title: 'Digital companion', text: 'Digital dice, chance cards, community chest cards, and a money calculator.' },
        { title: 'Deliverables', text: 'Physical prototypes, the final tray liner and game, and a coded online companion.' }
    ];
    const market = p.id === '01' ? 'The original research identified scattered, technical PCOS information and limited guidance tailored to individual symptoms. A formal named-competitor comparison was not documented.' : p.id === '02' ? 'The app extends POLY Health into tracking, personalized guidance, and rewards. A formal competitor comparison was not documented in the original project.' : 'Research explored attitudes toward food-sharing platforms, including concerns about safety, hygiene, and liability. The final game introduces Too Good To Go, ShareTheMeal, and OLIO as food-waste solutions; a formal competitor comparison was not documented.';
    const goals = p.id === '01' ? section('direction') : p.id === '02' ? section('goals') : { id: 'goals', label: 'Goals', title: 'Reduce waste through practical, playful participation.', points: [{ title: 'Reduce food waste', text: 'Make packing leftovers easier.' }, { title: 'Introduce food sharing', text: 'Build awareness of food-sharing platforms.' }, { title: 'Encourage takeaway habits', text: 'Combine empathy, function, and gamification.' }] };
    const brief = [
        { ...section('context'), label: p.id === '01' ? 'Overview' : 'Project overview' },
        { id: 'requirements', label: 'Requirements & deliverables', title: p.id === '01' ? 'Requirement and Deliverables' : 'What the project needed to deliver.', points: requirements },
        { id: 'audience', label: 'Target audience', title: 'Who the experience is for.', body: [audience] },
        { id: 'competitors', label: 'Competitor analysis', title: 'The surrounding landscape.', body: [market] },
        { ...goals, id: 'objectives', label: 'Goals & objectives' },
        { id: 'resources', label: 'Budget & timeline', title: 'Project parameters.', points: [{ title: 'Timeline', text: `${p.duration} · ${p.year}.` }, { title: 'Budget', text: p.budget || 'Not specified in the original project.' }, ...(p.tools ? [{ title: 'Tools', text: p.tools }] : [])] },
        ...p.sections.filter(s => !['context', 'direction', 'goals', 'audience'].includes(s.id))
    ];
    return { ...p, sections: p.id === '01' ? brief.filter(section => section.id !== 'resources') : brief };
}
