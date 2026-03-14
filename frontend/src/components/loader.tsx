import styles from './styles/loader.module.css';
import { useEffect } from 'react';

function stopTabKey(e: KeyboardEvent) {
  e.preventDefault();
}

function Loader({ show }: { show: boolean }) {
  useEffect(() => {
    if (!show) return;
    document.addEventListener('keydown', stopTabKey);

    return () => {
      document.removeEventListener('keydown', stopTabKey);
    };
  }, [show]);

  return (
    <div className={styles.loaderContainer} style={{ display: show ? 'flex' : 'none' }}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default Loader;