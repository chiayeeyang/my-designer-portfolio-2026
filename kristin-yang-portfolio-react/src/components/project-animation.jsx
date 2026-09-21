export default function ProjectAnimation() {
    return <figure className="project-animation">
        <video controls playsInline preload="metadata" poster="/images/chef-video-poster.jpg" aria-label="Code Like a Chef — final stop-motion animation">
            <source src="/videos/code-like-a-chef.mp4" type="video/mp4"/>
        </video>
    </figure>;
}
