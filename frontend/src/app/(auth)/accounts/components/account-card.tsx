import { formatDateTime } from '@/utils/format-datetime';
import styles from './account.module.css'
import type { AccountBaseSchema } from '@/schemas/accounts/base.schema';
import { memo } from 'react';

type AccountProps = {
  data: AccountBaseSchema;
  isEditing: boolean;
  onEdit: React.Dispatch<React.SetStateAction<AccountBaseSchema | null>>;
  onDelete: (id: AccountBaseSchema["id"]) => void
}
function Account({ data, isEditing, onEdit, onDelete }: AccountProps) {
  return (
    <li
      className={
        `list-group-item ${styles.tagListItem} ${isEditing ? ' bg-info-subtle' : ''}`
      }
    >
      <div>
        <p className="fw-bold m-0 lh-1">{data.name}</p>
        <span className="my-fs-sm">{formatDateTime(data.createdAt)}</span>
      </div>
      <p className={styles.balance}>Balance: ₹{data.balance}</p>
      <div className="btn-group">
        <button className="btn btn-primary btn-sm" type="button"
          onClick={() => onEdit(data)}
        >Edit</button>

        <button
          className="btn btn-danger btn-sm"
          type="button"
          onClick={() => onDelete(data.id)}
        >Delete</button>
      </div>
    </li>
  );
}

const AccountCard = memo(Account);

export default AccountCard;