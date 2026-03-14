import type React from "react";
import styles from './styles.module.css'
import { useDropdown, useDropdownDispatch } from "../context/dropdown.context";
import { useEffect } from "react";

export default function DropdownMenu({ children }: { children: React.ReactNode }) {
  const show = useDropdown();
  const setShow = useDropdownDispatch();

  useEffect(() => {
    if (!show) return;

    function hideDropdown() {
      setShow(false);
    }

    document.addEventListener('click', hideDropdown);

    return () => {
      document.removeEventListener('click', hideDropdown);
    };
  }, [show]);

  if (!show) return null;
  return (
    <ul className={styles.dropdownMenu} onClick={(e) => e.stopPropagation()}>
      {children}
    </ul>
  )
};
