import { useForm } from 'react-hook-form';
import styles from './filter.form.module.css'
import { DEFAULT_VALUES, filterFormSchema, getDefaultValues, type FilterFormData, type FilterFormIinput } from './filter-from.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toLocalDate } from '@/utils/date';
import { useSuspenseQueries } from '@tanstack/react-query';
import { tagsQueries } from '@/queries/tags';
import { accountsQueries } from '@/queries/accounts';

type FilterFormProps = {
  onFilter: (data: FilterFormData) => void;
};

export default function FilterForm({ onFilter }: FilterFormProps) {

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FilterFormIinput, unknown, FilterFormData>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(filterFormSchema),
  });

  async function onSubmit(formData: FilterFormData) {
    const toDate = toLocalDate(formData.toDate);
    toDate.setHours(23, 59, 59, 999);

    onFilter({
      ...formData,
      fromDate: toLocalDate(formData.fromDate).toISOString(),
      toDate: toDate.toISOString(),
    })
  }

  const [{ data: accounts }, { data: tags }] = useSuspenseQueries({
    queries: [ accountsQueries.all, tagsQueries.all ]
  });

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
        <select className={inputClass(errors?.type?.message, 'select')} {...register('type')}>
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <div className="invalid-feedback">{errors?.type?.message}</div>
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
    </form>
  );
}