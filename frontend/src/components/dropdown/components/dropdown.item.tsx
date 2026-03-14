import type React from "react";
import styles from './styles.module.css'

type DropdownItemProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
}
export default function DropdownItem({ children, onClick }: DropdownItemProps) {
  return (
    <li>
      <button className={styles.dropdownItem} onClick={onClick}>
        {children}
      </button>
    </li>
  )
};
