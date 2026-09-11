import { useEffect, useRef } from 'react';
/** Progressive enhancement: imagery remains visible without JS or motion support. */
export default function ProcessFigure({ children, className = '', animateOnView = false }) {
    const ref = useRef(null);
    useEffect(() => {
        const element = ref.current;
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (!element || preference.matches || !('IntersectionObserver' in window))
            return;
        const observer = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) {
                element.dataset.reveal = 'visible';
                observer.disconnect();
            }
        }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
        // Never hide an image already in view during hydration.
        if (animateOnView || element.getBoundingClientRect().top >= window.innerHeight) {
            element.dataset.reveal = 'pending';
            observer.observe(element);
        }
        const onPreference = () => {
            if (preference.matches) {
                element.dataset.reveal = 'visible';
                observer.disconnect();
            }
        };
        preference.addEventListener('change', onPreference);
        return () => { observer.disconnect(); preference.removeEventListener('change', onPreference); delete element.dataset.reveal; };
    }, [animateOnView]);
    return <figure ref={ref} className={`process-figure ${className}`}>{children}</figure>;
}
