import { useEffect } from 'react';
import Home from './pages/Home';
import Work from './pages/Work';
import NotWork from './pages/NotWork';
import NotWorkDetail from './pages/NotWorkDetail';
import { getProject } from './lib/projects';
import { playProjects } from './lib/play-projects';

export default function App() {
  const pathname = decodeURIComponent(window.location.pathname).replace(/\/+$/, '') || '/';
  const workMatch = pathname.match(/^\/work\/([^/]+)$/);
  const playMatch = pathname.match(/^\/not-work\/([^/]+)$/);
  const project = workMatch ? getProject(workMatch[1]) : null;
  const collection = playMatch ? playProjects.find(item => item.slug === playMatch[1]) : null;
  const title = project ? project.title : collection ? collection.title + ' — Not Work' : pathname === '/not-work' ? 'Not Work' : 'Multidisciplinary UI/UX Designer';
  useEffect(() => {
    document.title = title + ' — Kristin Yang';
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = project?.intro || collection?.intro || 'Thoughtful design, with people at the heart. The portfolio of Kristin Yang.';
    if (window.location.hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView());
  }, [title, project, collection]);
  if (pathname === '/') return <Home />;
  if (pathname === '/not-work') return <NotWork />;
  if (project) return <Work id={workMatch[1]} />;
  if (collection) return <NotWorkDetail slug={playMatch[1]} />;
  return <main style={{padding:'15vh 6%'}}><h1>Page not found.</h1><p><a href="/">Return to Kristin’s portfolio ↗</a></p></main>;
}
