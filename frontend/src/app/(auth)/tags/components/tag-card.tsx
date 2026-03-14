import type React from 'react';
import { memo } from 'react';
import { formatDateTime } from '@/utils/format-datetime';
import styles from './tag.module.css'
import type { TagBaseSchema } from "@/schemas/tags/base.schema";

type TagProps = {
  data: TagBaseSchema;
  isEditing: boolean;
  onEdit: React.Dispatch<React.SetStateAction<TagBaseSchema | null>>
  onDelete: (id: TagBaseSchema["id"]) => void
}
function Tag({ data, isEditing, onEdit, onDelete }: TagProps) {

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

        <button className="btn btn-danger btn-sm" type="button"
          onClick={() => onDelete(data.id)}
        >Delete</button>
      </div>
    </li>
  );
}

const TagCard = memo(Tag);

export default TagCard;