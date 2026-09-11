import { useEffect, useRef, useState } from 'react';
export default function NotWorkVideo({ src, poster, label, original }) { const ref = useRef(null); const [failed, setFailed] = useState(false); useEffect(() => { const video = ref.current; if (!video)
    return; let cancelled = false; let dispose = () => { }; if (video.canPlayType('application/vnd.apple.mpegurl'))
    video.src = src;
else
    import('hls.js').then(({ default: Hls }) => { if (cancelled)
        return; if (!Hls.isSupported()) {
        setFailed(true);
        return;
    } const player = new Hls({ maxBufferLength: 15 }); player.loadSource(src); player.attachMedia(video); player.on(Hls.Events.ERROR, (_, data) => { if (data.fatal)
        setFailed(true); }); dispose = () => player.destroy(); }).catch(() => setFailed(true)); return () => { cancelled = true; dispose(); }; }, [src]); return <div className="not-work-motion"><video ref={ref} controls playsInline preload="metadata" poster={poster} aria-label={label} onError={() => setFailed(true)}/>{failed && <p><a href={original} target="_blank" rel="noreferrer">Watch the original animation ↗</a></p>}</div>; }
