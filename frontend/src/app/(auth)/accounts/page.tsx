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
import { confirm } from '@/components/toasts/confirm/confirm';
import toast from 'react-hot-toast';

export default function AccountPage() {
  const [edit, setEdit] = useState<AccountBaseSchema | null>(null);
  const [loading, setLoading] = useState(false);

  const accounts = useAppSelector(selectAccounts);
  const accountLoading = useAppSelector(selectAccountsLoading);
  const dispatch = useAppDispatch();

  const handleDelete = useCallback(async (id: AccountBaseSchema["id"]) => {
    const confirmed = await confirm({
      title: "Delete Account",
      message: "Are You Sure You Want To Delete This Account!",
    })
    if (confirmed) {
      try {
        setLoading(true);
        await api.accounts.delete(id);
        dispatch(removeAccount(id));
        toast.success('Account deleted successfully.');
      } catch (error: any) {
        console.error(error);
        if (error.message) {
          toast.error(error.message);
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