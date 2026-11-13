import { useId, useRef, useState } from 'react';
import NmdpPreview from './nmdp-preview';
import styles from './nmdp-access-cover.module.css';

export default function NmdpAccessCover({ inline = false, checking = false, onUnlock }) {
  const [showForm, setShowForm] = useState(!inline);
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const input = useRef(null);
  const trigger = useRef(null);
  const fieldId = useId();

  function close() {
    if (!inline || busy) return;
    setShowForm(false);
    setError('');
    setPassword('');
    requestAnimationFrame(() => trigger.current?.focus());
  }

  async function unlock(event) {
    event.preventDefault();
    if (!password || busy || checking) return;
    setBusy(true);
    setError('');
    try {
      const response = await fetch('/api/nmdp-access', {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        setError(response.status === 401 ? 'That password isn’t quite right. Try again.' : response.status === 429 ? 'Too many attempts. Please try again in a few minutes.' : 'Case study access is temporarily unavailable. Please try again.');
        setBusy(false);
        input.current?.focus();
        input.current?.select();
        return;
      }
      setPassword('');
      if (onUnlock) onUnlock();
      else window.location.assign('/work/nmdp');
    } catch {
      setBusy(false);
      setError('Unable to connect. Please try again.');
    }
  }

  return <div className={styles.cover}>
    <NmdpPreview />
    {inline && !showForm && <button ref={trigger} className={styles.trigger} type="button" onClick={() => setShowForm(true)} aria-label="Open NMDP case study password form" />}
    {showForm && <div className={styles.overlay} onKeyDown={event => { if (event.key === 'Escape') close(); }}>
      {inline && <button className={styles.close} type="button" aria-label="Close password form" disabled={busy} onClick={close}>×</button>}
      <form className={styles.form} onSubmit={unlock} aria-label="NMDP case study access" aria-busy={busy}>
        <label className="sr-only" htmlFor={fieldId}>Case study password</label>
        <input ref={input} autoFocus={inline} id={fieldId} name="password" type="password" placeholder="Password" autoComplete="current-password" required maxLength={128} value={password} onChange={event => setPassword(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? `${fieldId}-error` : undefined} />
        <button className={styles.submit} type="submit" disabled={checking || busy}>{checking ? 'Checking…' : busy ? 'Opening…' : 'Submit'}</button>
        <p id={`${fieldId}-error`} className={styles.error} role="alert">{error}</p>
      </form>
    </div>}
  </div>;
}
