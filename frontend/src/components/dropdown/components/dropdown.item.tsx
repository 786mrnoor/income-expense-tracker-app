import type React from "react";
import styles from './styles.module.css'
import { useDropdownDispatch } from "../context/dropdown.context";

type DropdownItemProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
  className?: string
}
export default function DropdownItem({ children, onClick, className }: DropdownItemProps) {
  const setShow = useDropdownDispatch();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    setShow(false);
    if (onClick) onClick(e);
  }

  return (
    <li>
      <button
        className={`${styles.dropdownItem} ${className || styles.defaultDropdownItem}`}
        onClick={handleClick}>
        {children}
      </button>
    </li>
  )
};
