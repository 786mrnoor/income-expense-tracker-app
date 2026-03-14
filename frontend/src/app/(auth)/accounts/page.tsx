import { useCallback, useState } from 'react';

import Loader from '@/components/loader';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Form from './components/form.account';
import { api } from '@/api';
import type { AccountBaseSchema } from '@/schemas/accounts/base.schema';
import AccountCard from './components/account-card';
import Summary from './components/summary/summary';
import { selectAccounts, selectAccountsLoading } from '@/redux/account/account.selectors';
import { removeAccount } from '@/redux/account/account.slice';

export default function AccountPage() {
  const [edit, setEdit] = useState<AccountBaseSchema | null>(null);
  const [loading, setLoading] = useState(false);

  const accounts = useAppSelector(selectAccounts);
  const accountLoading = useAppSelector(selectAccountsLoading);
  const dispatch = useAppDispatch();

  const handleDelete = useCallback(async (id: AccountBaseSchema["id"]) => {
    if (window.confirm('Are You Sure You Want To Delete This Account!')) {
      try {
        setLoading(true);
        await api.accounts.delete(id);
        dispatch(removeAccount(id));
        window.alert('Deleted Successfully');
      } catch (error: any) {
        console.error(error);
        if (error.message) {
          window.alert(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
  }, [])

  return (
    <div className="my-container">
      <Loader show={loading || accountLoading} />
      <Form account={edit} onUpdated={() => setEdit(null)} />

      <Summary />
      
      <ul className="sortable-list list-group p-3 mb-4">
        {accounts.map((tag) => (
          <AccountCard
            key={tag.id}
            data={tag}
            isEditing={tag.id === edit?.id}
            onEdit={setEdit}
            onDelete={handleDelete}
          />

        ))}
      </ul>
    </div>
  );
}