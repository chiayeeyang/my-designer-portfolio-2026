import { useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import NmdpLocked from './pages/NmdpLocked';
import NotWork from './pages/NotWork';
import PlayProjects from './pages/PlayProjects';
import NotWorkDetail from './pages/NotWorkDetail';
import { getProject } from './lib/projects';
import { playProjects } from './lib/play-projects';

export default function App() {
  const pathname = decodeURIComponent(window.location.pathname).replace(/\/+$/, '') || '/';
  const workMatch = pathname.match(/^\/work\/([^/]+)$/);
  const playMatch = pathname.match(/^\/not-work\/([^/]+)$/);
  const project = workMatch ? getProject(workMatch[1]) : null;
  const collection = playMatch ? playProjects.find(item => item.slug === playMatch[1]) : null;
  const title = pathname === '/work/nmdp' ? 'NMDP × Food Delivery — Work in progress' : pathname === '/about' ? 'About' : project ? project.title : collection ? collection.title + ' — Not Work' : pathname === '/not-work/projects' ? 'Play projects' : pathname === '/not-work' ? 'Play' : 'Multidisciplinary UI/UX Designer';
  useEffect(() => {
    document.title = title + ' — Kristin Yang';
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = pathname === '/work/nmdp' ? 'NMDP × Food Delivery is a work in progress. Case study coming soon.' : project?.intro || collection?.intro || 'Thoughtful design, with people at the heart. The portfolio of Kristin Yang.';
    if (window.location.hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView());
  }, [title, project, collection, pathname]);
  if (pathname === '/work/nmdp') return <NmdpLocked />;
  if (pathname === '/about') return <About />;
  if (pathname === '/') return <Home />;
  if (pathname === '/not-work') return <NotWork />;
  if (pathname === '/not-work/projects') return <PlayProjects />;
  if (project) return <Work id={workMatch[1]} />;
  if (collection) return <NotWorkDetail slug={playMatch[1]} />;
  return <main style={{padding:'15vh 6%'}}><h1>Page not found.</h1><p><a href="/">Return to Kristin’s portfolio ↗</a></p></main>;
}
