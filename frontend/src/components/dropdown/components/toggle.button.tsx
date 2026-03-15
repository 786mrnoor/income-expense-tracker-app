import type React from "react";
import styles from './styles.module.css'
import { useDropdownDispatch } from "../context/dropdown.context";

export default function ToggleButton({ children, className }: { children: React.ReactNode, className?: string }) {
  const setShow = useDropdownDispatch();

  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setShow(s => !s);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`${styles.dropdownToggleButton} ${className}`}
    >
      {children}
    </button>
  )
};
