import { useForm } from 'react-hook-form';
import styles from './filter.form.module.css'
import { DEFAULT_VALUES, filterFormSchema, getDefaultValues, type FilterFormData, type FilterFormIinput } from './filter-from.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Loader from '@/components/loader';
import { api } from '@/api';
import { selectTags } from '@/redux/tag/tag.selectors';
import { selectAccounts } from '@/redux/account/account.selectors';
import { setTransactions } from '@/redux/transaction/transaction.slice';
import { toLocalDate } from '@/utils/date';

export default function FilterForm() {
  const tags = useAppSelector(selectTags);
  const accounts = useAppSelector(selectAccounts);
  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FilterFormIinput, any, FilterFormData>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(filterFormSchema),
  });


  async function onSubmit(formData: FilterFormData) {
    try {
      const data = await api.transactions.getAll({
        fromDate: toLocalDate(formData.fromDate).toISOString(),
        toDate: toLocalDate(formData.toDate).toISOString(),
        type: formData.transactionType,
        status: formData.status,
        method: formData.method,
        tagId: formData.tagId,
        accountId: formData.accountId
      });
      dispatch(setTransactions(data));
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  const inputClass = (error: string | undefined, type: 'text' | 'select' = 'text') => `${type === 'text' ? 'form-control' : 'form-select'} ${error ? 'is-invalid' : ''}`;

  return (
    <form className={`gx-3 gy-2 justify-content-center ${styles.filterForm}`} onSubmit={handleSubmit(onSubmit, console.log)} >
      <div className="input-group input-group-sm has-validation">
        <span className="input-group-text">From</span>
        <input type="date" className={inputClass(errors?.fromDate?.message)} {...register('fromDate')} />
        <span className="invalid-feedback">{errors?.fromDate?.message}</span>
      </div>

      <div className='input-group input-group-sm has-validation'>
        <span className="input-group-text">To</span>
        <input type="date" className={inputClass(errors?.toDate?.message)} {...register('toDate')} />
        <div className="invalid-feedback">{errors?.toDate?.message}</div>
      </div>

      <div className="input-group input-group-sm has-validation">
        <span className="input-group-text">Type</span>
        <select className={inputClass(errors?.transactionType?.message, 'select')} {...register('transactionType')}>
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <div className="invalid-feedback">{errors?.transactionType?.message}</div>
      </div>

      <div className="input-group input-group-sm has-validation">
        <span className="input-group-text">Status</span>
        <select className={inputClass(errors?.status?.message, 'select')} {...register('status')}>
          <option value="">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
        <div className="invalid-feedback">{errors?.status?.message}</div>
      </div>

      <div className="input-group input-group-sm has-validation">
        <span className="input-group-text">Method</span>
        <select className={inputClass(errors?.method?.message, 'select')} {...register('method')}>
          <option value=''>All</option>
          <option value='cash'>CASH</option>
          <option value='upi'>UPI</option>
          <option value='card'>CARD</option>
          <option value='bank'>BANK</option>
        </select>
        <div className="invalid-feedback">{errors?.method?.message}</div>
      </div>

      <div className="input-group input-group-sm has-validation">
        <span className="input-group-text">Tag</span>
        <select className={inputClass(errors?.tagId?.message, 'select')} {...register('tagId')}>
          <option value="">All</option>
          {tags.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">{errors?.tagId?.message}</div>
      </div>

      <div className="input-group input-group-sm has-validation">
        <span className="input-group-text">Account</span>
        <select className={inputClass(errors?.accountId?.message, 'select')} {...register('accountId')}>
          <option value="">All</option>
          {accounts.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">{errors?.accountId?.message}</div>
      </div>

      <div className="btn-group">
        <button className="btn btn-sm btn-outline-primary" type="button" onClick={() => reset(getDefaultValues())}>Clear All</button>
        <button className="btn btn-sm btn-success" type="submit">Apply</button>
      </div>
      <Loader show={isSubmitting} />
    </form>
  );
}