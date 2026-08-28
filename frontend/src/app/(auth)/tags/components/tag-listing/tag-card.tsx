import styles from "./tag.module.css";
import { memo } from "react";
import { formatDateTime } from "@/utils/format-datetime";
import type { TagBaseSchema } from "@/schemas/tags/base.schema";
import Dropdown from "@/components/dropdown/dropdown";
import Dots from "@/components/icons/dots";
import formatAmount from "@/utils/format-amount";
import { useEdit, useSetEdit } from "../../edit-context/edit.context";

type TagProps = {
  data: TagBaseSchema;
  onDelete: (id: TagBaseSchema["id"]) => void;
};
function Tag({ data, onDelete }: TagProps) {
  const tag = useEdit();
  const setEdit = useSetEdit();

  return (
    <li
      className={`list-group-item ${styles.tagListItem} ${tag?.id === data?.id ? " bg-info-subtle" : ""}`}
    >
      <div>
        <p className="fw-bold m-0 lh-1">{data.name}</p>
        <span className="my-fs-sm">{formatDateTime(data.updatedAt)}</span>
      </div>
      <h2
        className={`fs-5 ${data.balance >= 0 ? "text-success" : "text-danger"}`}
      >
        {formatAmount(data.balance)}
      </h2>
      <Dropdown>
        <Dropdown.ToggleButton className={styles.dropdownToggle}>
          <Dots />
        </Dropdown.ToggleButton>
        <Dropdown.DropdownMenu>
          <Dropdown.DropdownItem onClick={() => setEdit(data)}>
            Edit
          </Dropdown.DropdownItem>
          <Dropdown.DropdownItem
            className="text-danger"
            onClick={() => onDelete(data.id)}
          >
            Delete
          </Dropdown.DropdownItem>
        </Dropdown.DropdownMenu>
      </Dropdown>
    </li>
  );
}

const TagCard = memo(Tag);

export default TagCard;
