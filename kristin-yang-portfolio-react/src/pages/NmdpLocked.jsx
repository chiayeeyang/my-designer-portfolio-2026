import { useEffect, useState } from 'react';
import { LockKeyhole } from 'lucide-react';
import SiteHeader from '@/components/site-header';
import NmdpAccessCover from '@/components/nmdp-access-cover';
import styles from './nmdp-locked.module.css';

export default function NmdpLocked({ children }) {
  const [status, setStatus] = useState('checking');
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/nmdp-access', { credentials: 'same-origin', cache: 'no-store', signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error('Access unavailable');
        const data = await response.json();
        setStatus(data.authenticated ? 'open' : 'locked');
      })
      .catch(err => {
        if (err.name === 'AbortError') return;
        setStatus('locked');
        setError('Case study access is temporarily unavailable. Please try again.');
      });
    return () => controller.abort();
  }, []);

  async function lock() {
    const response = await fetch('/api/nmdp-access', { method: 'DELETE', credentials: 'same-origin' }).catch(() => null);
    if (response?.ok) window.location.assign('/work/nmdp');
  }

  if (status === 'open') return <>{children}<button className={styles.relock} onClick={lock}><LockKeyhole size={14} aria-hidden="true" />Lock case study</button></>;

  return <>
    <a className="skip" href="#main">Skip to content</a>
    <SiteHeader />
    <main id="main" className={styles.page}>
      <a className={styles.back} href="/#work">← Selected work</a>
      <div className={styles.cover}>
        <NmdpAccessCover checking={status === 'checking'} onUnlock={() => { setStatus('open'); window.scrollTo({ top: 0, behavior: 'instant' }); }} />
      </div>
      <h1>NMDP × Food Delivery</h1>
      <p className={styles.description}>Bringing donor swab kits into everyday food pickup and delivery.</p>
      {error && <p className={styles.error} role="alert">{error}</p>}
    </main>
  </>;
}
