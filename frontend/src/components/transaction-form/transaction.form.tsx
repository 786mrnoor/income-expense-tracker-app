import styles from './transaction.form.module.css';
import { useForm } from 'react-hook-form';
import Loader from '../loader';
import { DEFAULT_VALUES, getDefaultValues, transactionFormSchema, type TransactionFormData, type TransactionFormInput } from './form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppSelector } from '@/redux/hooks';
import { selectTags } from '@/redux/tag/tag.selectors';
import { selectAccounts } from '@/redux/account/account.selectors';

type TransactionFormProps = {
  onSubmit: (data: TransactionFormData) => Promise<boolean>;
  transaction?: TransactionFormInput;
}
export default function TransactionForm({ onSubmit, transaction }: TransactionFormProps) {
  const tags = useAppSelector(selectTags);
  const accounts = useAppSelector(selectAccounts);

  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm<TransactionFormInput, any, TransactionFormData>({
    defaultValues: transaction || DEFAULT_VALUES,
    resolver: zodResolver(transactionFormSchema),
  });

  async function onValid(formData: TransactionFormData) {
    try {
      const shouldReset = await onSubmit(formData);
      if (shouldReset) {
        reset(getDefaultValues());
      }
    } catch (error) {
      console.error(error);
    }
  }

  const inputClass = (error: string | undefined, type: 'text' | 'select' = 'text') => `${type === 'text' ? 'form-control' : 'form-select'} ${error ? 'is-invalid' : ''}`;

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onValid)}>
        <div className="input-group input-group-sm has-validation">
          <label htmlFor="type" className="input-group-text">Type</label>
          <select className={inputClass(errors?.type?.message, 'select')} {...register('type')}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <div className="invalid-feedback">{errors?.type?.message}</div>
        </div>

        <div className="input-group input-group-sm has-validation">
          <label htmlFor="status" className="input-group-text">Status</label>
          <select className={inputClass(errors?.status?.message, 'select')} {...register('status')}>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <div className="invalid-feedback">{errors?.status?.message}</div>
        </div>

        <div className="input-group input-group-sm has-validation">
          <label htmlFor="amount" className="input-group-text">Amount</label>
          <input
            type="number"
            className={inputClass(errors?.amount?.message)}
            {...register('amount')}
          />
          <div className="invalid-feedback">{errors?.amount?.message}</div>
        </div>

        <div className="input-group input-group-sm has-validation">
          <label htmlFor="method" className="input-group-text">Method</label>
          <select className={inputClass(errors?.method?.message, 'select')} {...register('method')}>
            <option value=''>--select--</option>
            <option value='cash'>CASH</option>
            <option value='upi'>UPI</option>
            <option value='card'>CARD</option>
            <option value='bank'>BANK</option>
          </select>
          <div className="invalid-feedback">{errors?.method?.message}</div>
        </div>

        <div className="input-group input-group-sm has-validation">
          <label htmlFor="category" className="input-group-text">Tag</label>
          <select className={inputClass(errors?.tagId?.message, 'select')} {...register('tagId')}>
            <option value="">--select--</option>
            {tags.map((c) => (
              <option key={c?.id} value={c?.id}>
                {c?.name}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{errors?.tagId?.message}</div>
        </div>

        <div className="input-group input-group-sm has-validation">
          <label htmlFor="category" className="input-group-text">Account</label>
          <select className={inputClass(errors?.accountId?.message, 'select')} {...register('accountId')}>
            <option value="">--select--</option>
            {accounts.map((c) => (
              <option key={c?.id} value={c?.id}>
                {c?.name}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{errors?.accountId?.message}</div>
        </div>

        <div className="input-group input-group-sm has-validation">
          <label htmlFor="note" className="input-group-text">Note</label>
          <input
            type="text"
            className={inputClass(errors?.note?.message)}
            {...register('note')}
          />
          <div className="invalid-feedback">{errors?.note?.message}</div>
        </div>

        <div className="input-group input-group-sm has-validation">
          <label htmlFor="note" className="input-group-text">Date</label>
          <input
            type="datetime-local"
            className={inputClass(errors?.date?.message)}
            {...register('date')}
          />
          <div className="invalid-feedback">{errors?.date?.message}</div>
        </div>

        <div className="btn-group btn-group-sm">
          <button className="btn btn-danger" type="button" onClick={() => reset(getDefaultValues())}>Reset</button>
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
      <Loader show={isSubmitting} />
    </>
  );
}