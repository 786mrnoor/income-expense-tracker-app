import type React from 'react';
import { memo } from 'react';
import { formatDateTime } from '@/utils/format-datetime';
import styles from './tag.module.css'
import type { TagBaseSchema } from "@/schemas/tags/base.schema";
import Dropdown from '@/components/dropdown/dropdown';
import Dots from '@/components/icons/dots';

type TagProps = {
  data: TagBaseSchema;
  isEditing: boolean;
  onRefreshBalance: (id: TagBaseSchema["id"]) => void
  onEdit: React.Dispatch<React.SetStateAction<TagBaseSchema | null>>
  onDelete: (id: TagBaseSchema["id"]) => void
}
function Tag({ data, isEditing, onRefreshBalance, onEdit, onDelete }: TagProps) {

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

const TagCard = memo(Tag);

export default TagCard;