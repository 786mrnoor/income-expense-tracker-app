import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';

import styles from './styles/nav.module.css';
import Profile from './profile';
import BackButton from './back-button';

export default function Nav() {
  const { pathname } = useLocation();
  const [showProfile, setShowProfile] = useState(false);

  function toggleProfileContainer(e: React.MouseEvent<HTMLImageElement>) {
    e.stopPropagation();
    setShowProfile(!showProfile);
  }

  function closeProfile() {
    setShowProfile(false);
  }

  useEffect(() => {
    if (showProfile) {
      document.addEventListener('click', closeProfile);
    } else {
      document.removeEventListener('click', closeProfile);
    }
    return () => {
      document.removeEventListener('click', closeProfile);
    };
  }, [showProfile]);

  return (
    <>
      <nav className={`bg-light border ${styles.topNav}`}>
        {pathname !== '/' && <BackButton />}
        <Link className="btn btn-dark" to="/">Home</Link>
        <Link className="btn btn-dark" to="add-transaction">Add Transaction</Link>
        <Link className="btn btn-dark" to="tags">Tags</Link>
        <Link className="btn btn-dark" to="accounts">Accounts</Link>
        <img onClick={toggleProfileContainer} src={"/profile.png"} alt="logo" />
        {showProfile && <Profile onCloseProfile={closeProfile} />}
      </nav>
    </>
  );
}