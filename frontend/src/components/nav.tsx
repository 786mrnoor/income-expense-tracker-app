import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

import styles from "./styles/nav.module.css";
import Profile from "./profile";
import BackButton from "./back-button";

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
      document.addEventListener("click", closeProfile);
    } else {
      document.removeEventListener("click", closeProfile);
    }
    return () => {
      document.removeEventListener("click", closeProfile);
    };
  }, [showProfile]);

  return (
    <header className={`bg-light border ${styles.topHeader}`}>
      <label className={styles.hamburgerMenuButton}>
        <input type="checkbox" id="menu" />
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M4 6H20M4 12H20M4 18H20"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </svg>
      </label>
      <img onClick={toggleProfileContainer} src={"/profile.png"} alt="logo" />
      {showProfile && <Profile onCloseProfile={closeProfile} />}
      <nav className={styles.topNav}>
        {pathname !== "/" && <BackButton />}
        <Link className="btn btn-dark" to="/">
          Home
        </Link>
        <Link className="btn btn-dark" to="add-transaction">
          Add Transaction
        </Link>
        <Link className="btn btn-dark" to="tags">
          Tags
        </Link>
        <Link className="btn btn-dark" to="accounts">
          Accounts
        </Link>
      </nav>
    </header>
  );
}
