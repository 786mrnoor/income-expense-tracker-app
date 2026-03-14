import styles from './dropdown.module.css';
import DropownProvider from './context/dropown.provider';
import ToggleButton from './components/toggle.button';
import DropdownMenu from './components/dropdown.menu';
import DropdownItem from './components/dropdown.item';

export default function Dropdown({ children }: { children: React.ReactNode }) {

  return (
    <DropownProvider>
      <div className={styles.dropdown}>
        {children}
      </div>
    </DropownProvider>
  )
};

Dropdown.ToggleButton = ToggleButton;
Dropdown.DropdownMenu = DropdownMenu;
Dropdown.DropdownItem = DropdownItem;
