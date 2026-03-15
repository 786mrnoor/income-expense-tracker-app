import { formatDateTime } from '@/utils/format-datetime';
import styles from './account.module.css'
import type { AccountBaseSchema } from '@/schemas/accounts/base.schema';
import { memo } from 'react';
import Dropdown from '@/components/dropdown/dropdown';
import Dots from '@/components/icons/dots';

type AccountProps = {
  data: AccountBaseSchema;
  isEditing: boolean;
  onRefreshBalance: (id: AccountBaseSchema["id"]) => void
  onEdit: React.Dispatch<React.SetStateAction<AccountBaseSchema | null>>;
  onDelete: (id: AccountBaseSchema["id"]) => void
}
function Account({ data, isEditing, onRefreshBalance, onEdit, onDelete }: AccountProps) {
  return (
    <li
      className={
        `list-group-item ${styles.tagListItem} ${isEditing ? ' bg-info-subtle' : ''}`
      }
    >
      <div>
        <p className="fw-bold m-0 lh-1">{data.name}</p>
        <span className="my-fs-sm">{formatDateTime(data.updatedAt)}</span>
      </div>
      <h2
        className={`fs-5 ${data.balance >= 0 ? 'text-success' : 'text-danger'}`}
      >
        {data.balance >= 0 ? '+' : '-'} ₹{Math.abs(data.balance)}
      </h2>
      <Dropdown>
        <Dropdown.ToggleButton className={styles.dropdownToggle}><Dots /></Dropdown.ToggleButton>
        <Dropdown.DropdownMenu>
          <Dropdown.DropdownItem onClick={() => onRefreshBalance(data.id)}>Refresh balance</Dropdown.DropdownItem>
          <Dropdown.DropdownItem onClick={() => onEdit(data)}>Edit</Dropdown.DropdownItem>
          <Dropdown.DropdownItem className='text-danger' onClick={() => onDelete(data.id)}>Delete</Dropdown.DropdownItem>
        </Dropdown.DropdownMenu>
      </Dropdown>
    </li>
  );
}

const AccountCard = memo(Account);

export default AccountCard;