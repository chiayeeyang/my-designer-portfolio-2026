export function caseStudyGroups(project) {
    const definitions = project.id === '01' ? [
        ['Project brief', 'context', 'requirements', 'resources'],
        ['Problem', 'audience', 'competitors', 'research'],
        ['Solution', 'solution'],
        ['Design direction', 'objectives'],
        ['Experience & visual design', 'structure', 'design'],
        ['Testing & refinements', 'testing'],
        ['Final outcome', 'outcome'],
    ] : project.id === '02' ? [
        ['Project brief', 'context', 'requirements', 'resources'],
        ['Research & insights', 'audience', 'competitors', 'research'],
        ['Design direction', 'objectives'],
        ['Experience structure', 'structure'],
        ['Core experience', 'experience'],
    ] : project.id === '03' ? [
        ['Project brief', 'context', 'requirements', 'resources'],
        ['Research & insights', 'audience', 'competitors', 'research'],
        ['Design direction', 'objectives'],
        ['Solution', 'journey'],
        ['Prototyping', 'prototype'],
        ['Final outcome', 'outcome'],
    ] : project.id === '04' ? [
        ['Project brief', 'context', 'requirements', 'resources'],
        ['Design direction', 'objectives'],
        ['Illustration series', 'design'],
        ['Final outcome', 'outcome'],
    ] : project.id === '05' ? [
        ['Project brief', 'context', 'resources'],
        ['Research & exploration', 'exploration'],
        ['Storyboarding', 'story'],
        ['Prototyping', 'prototype'],
        ['Production', 'production'],
        ['Final outcome', 'outcome'],
    ] : project.sections.map(section => [section.label, section.id]);
    return definitions.map(([label, ...ids], index) => ({
        id: `chapter-${index + 1}`,
        label,
        sections: ids.flatMap(id => project.sections.filter(section => section.id === id)),
    })).filter(chapter => chapter.sections.length > 0);
}
