import { useEffect, useRef } from 'react';
export default function ChefPreview() {
    const video = useRef(null);
    useEffect(() => {
        const el = video.current;
        if (!el)
            return;
        const reduced = matchMedia('(prefers-reduced-motion: reduce)');
        let visible = false;
        const sync = () => { if (visible && !reduced.matches && !document.hidden)
            void el.play().catch(() => { });
        else
            el.pause(); };
        const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .15 });
        observer.observe(el);
        reduced.addEventListener('change', sync);
        document.addEventListener('visibilitychange', sync);
        return () => { observer.disconnect(); reduced.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync); el.pause(); };
    }, []);
    return <video ref={video} className="chef-video-preview" src="/videos/chef-preview.mp4" poster="/images/chef-preview-poster.jpg" muted loop playsInline preload="metadata" disablePictureInPicture aria-label="Code Like a Chef — three-second animation preview"/>;
}
