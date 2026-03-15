import Loader from '@/components/loader';
import type { TagBaseSchema } from '@/schemas/tags/base.schema';
import React, { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { api } from '@/api';
import { addTag, setTag } from '@/redux/tag/tag.slice';
import toast from 'react-hot-toast';

type FormProps = {
  tag: TagBaseSchema | null;
  onUpdated: () => void;
}
function Form({ tag, onUpdated }: FormProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [previousTag, setPreviousTag] = useState(tag);

  const dispatch = useAppDispatch();

  if (previousTag !== tag) {
    setPreviousTag(tag);
    if (tag) {
      setName(tag.name);
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

      if (tag) {
        const data = await api.tags.update(tag.id, { name });
        dispatch(setTag(data));
        toast.success('Tag updated successfully.');
      } else {
        const data = await api.tags.add({ name });
        dispatch(addTag(data));
        toast.success('Tag added successfully.');
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
        <button className="btn btn-primary">{tag ? 'Update' : 'Add'}</button>
        {tag && (
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