import { useEffect, useRef, useState } from 'react';
const source = 'https://video.squarespace-cdn.com/content/v1/68ecf4b0200232020f827e37/f41e1ad0-e42d-4db4-b1dd-0b800e2247b3/playlist.m3u8';
export default function ProjectAnimation() {
    const video = useRef(null);
    const [failed, setFailed] = useState(false);
    useEffect(() => {
        const el = video.current;
        if (!el)
            return;
        let dispose = () => { };
        let stopped = false;
        if (el.canPlayType('application/vnd.apple.mpegurl')) {
            el.src = source;
        }
        else {
            import('hls.js').then(({ default: Hls }) => { if (stopped)
                return; if (!Hls.isSupported()) {
                setFailed(true);
                return;
            } const player = new Hls({ maxBufferLength: 15 }); player.loadSource(source); player.attachMedia(el); player.on(Hls.Events.ERROR, (_, data) => { if (data.fatal)
                setFailed(true); }); dispose = () => { player.destroy(); }; }).catch(() => { if (!stopped)
                setFailed(true); });
        }
        return () => { stopped = true; dispose(); };
    }, []);
    return <figure className="project-animation"><video ref={video} controls playsInline preload="metadata" poster="https://video.squarespace-cdn.com/content/v1/68ecf4b0200232020f827e37/f41e1ad0-e42d-4db4-b1dd-0b800e2247b3/thumbnail" aria-label="Code Like a Chef — final stop-motion animation" onError={() => setFailed(true)}/>{failed && <p>The video couldn’t load here. <a href="https://yangdongdong.space/work-1/project-one-f5w4d-fxsxt" target="_blank" rel="noreferrer">Watch on the original project page ↗</a></p>}</figure>;
}
