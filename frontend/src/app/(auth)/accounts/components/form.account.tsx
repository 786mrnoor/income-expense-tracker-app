import Loader from '@/components/loader';
import React, { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { api } from '@/api';
import type { AccountBaseSchema } from '@/schemas/accounts/base.schema';
import { addAccount, updateAccount } from '@/redux/account/account.slice';

type FormProps = {
  account: AccountBaseSchema | null;
  onUpdated: () => void;
}
function Form({ account, onUpdated }: FormProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [previousAccount, setPreviousAccount] = useState(account);

  const dispatch = useAppDispatch();

  if (previousAccount !== account) {
    setPreviousAccount(account);
    if (account) {
      setName(account.name);
    }
  }

  function handleReset() {
    onUpdated();
    setName('');
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      if (account) {
        const data = await api.accounts.update(account.id, { name });
        dispatch(updateAccount({
          id: data.id,
          changes: data
        }));
      } else {
        const data = await api.accounts.add({ name });
        dispatch(addAccount(data));
      }

      handleReset();
    } catch (error: any) {
      console.error(error);
      let message = error?.errors?.body?.name?.[0] || error?.message || 'Something went wrong.';
      setError(message);
    } finally {
      setLoading(false);
    }
    return;
  }

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-body-secondary my-border-bottom">
      <Loader show={loading} />
      <div className="input-group">
        <span className="input-group-text">Name</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          required
        />
        <button className="btn btn-primary">{account ? 'Update' : 'Add'}</button>
        {account && (
          <button className="btn btn-danger" onClick={handleReset}>
            Reset
          </button>
        )}
      </div>
      {error && <p className="text-danger m-0">{error}</p>}
    </form>
  );
}

export default Form;