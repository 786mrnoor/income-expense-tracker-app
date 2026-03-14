import { memo } from 'react'
import type { TransactionBaseSchema } from '@/schemas/transactions/base.schema'
import styles from './transaction.card.module.css'
import { formatDateTime } from "@/utils/format-datetime"
import type { TagBaseSchema } from '@/schemas/tags/base.schema'
import type { AccountBaseSchema } from '@/schemas/accounts/base.schema'
import Dropdown from '../dropdown/dropdown'
import Dots from '../icons/dots'
import { api } from '@/api'
import { useAppDispatch } from '@/redux/hooks'
import { removeTransaction } from '@/redux/transaction/transaction.slice'
import { useNavigate } from 'react-router'
import { confirm } from '../toasts/confirm/confirm'
import toast from 'react-hot-toast'

type TransactionCardProps = {
  data: TransactionBaseSchema,
  tagName: TagBaseSchema["name"];
  accountName: AccountBaseSchema["name"]
}
export function TransactionCard({ data, tagName, accountName }: TransactionCardProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function deleteTransaction(id: TransactionBaseSchema["id"]) {
    try {
      const confirmed = await confirm({
        title: 'Delete Transaction',
        message: 'Are You Sure, You Want To Delete This Transaction!'
      });

      if (confirmed) {
        await api.transactions.delete(id);
        dispatch(removeTransaction(id));
        toast.success('Transaction Deleted Successfully!');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.card + ' list-group-item list-group-item-action'}>
      <div className={styles.content}>
        <div className={styles.cardHeader}>
          <h2>{data.note ? data.note + ' | ' : ''}{data.method}</h2>
          <h2 className={data.type === 'income' ? 'text-success' : 'text-danger'}>{data.type === 'income' ? '+' : '-'} ₹{data.amount}</h2>
        </div>
        <div className={styles.cardBody}>
          <p>{formatDateTime(data.date)}</p>
          <p>{accountName}</p>
        </div>
        <div className={styles.cardFooter}>
          <p>Tag: {tagName}</p>
          <p>Method: {data.method}</p>
        </div>
      </div>
      <Dropdown>
        <Dropdown.ToggleButton className={styles.dropdownToggle}><Dots /></Dropdown.ToggleButton>
        <Dropdown.DropdownMenu>
          <Dropdown.DropdownItem onClick={() => navigate(`/edit-transaction/${data.id}`)}>Edit</Dropdown.DropdownItem>
          <Dropdown.DropdownItem onClick={() => deleteTransaction(data.id)}>Delete</Dropdown.DropdownItem>
        </Dropdown.DropdownMenu>
      </Dropdown>
    </div>
  )
};

export const MemoizedTransactionCard = memo(TransactionCard);