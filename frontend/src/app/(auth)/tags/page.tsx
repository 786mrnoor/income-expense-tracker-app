import { useCallback, useState } from 'react';
import TagCard from './components/tag-card';
import Form from './components/form.tag';
import Loader from '@/components/loader';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { type TagBaseSchema } from '@/schemas/tags/base.schema';
import { api } from '@/api';
import Summary from './components/summary/summary';
import { selectTags, selectTagsLoading } from '@/redux/tag/tag.selectors';
import { removeTag, setTag } from '@/redux/tag/tag.slice';
import { confirm } from '@/components/toasts/confirm/confirm';
import toast from 'react-hot-toast';

export default function TagPage() {
  const [edit, setEdit] = useState<TagBaseSchema | null>(null);
  const [loading, setLoading] = useState(false);

  const tags = useAppSelector(selectTags);
  const tagLoading = useAppSelector(selectTagsLoading);
  const dispatch = useAppDispatch();

  const handleDelete = useCallback(async (id: TagBaseSchema["id"]) => {
    const confirmed = await confirm({
      title: 'Delete Tag',
      message: 'Are you sure you want to delete this tag?',
    });

    if (confirmed) {
      try {
        setLoading(true);
        await api.tags.delete(id);
        dispatch(removeTag(id));
        toast.success('Tag deleted successfully.');
      } catch (error: any) {
        console.error(error);
        if (error.message) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const handleRefreshBalance = useCallback(async (id: TagBaseSchema["id"]) => {
    try {
      setLoading(true);
      const tag = await api.tags.getById(id);
      dispatch(setTag(tag));
      toast.success('Tag balance refreshed successfully.');
    } catch (error: any) {
      console.error(error);
      if (error.message) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="my-container">
      <Loader show={loading || tagLoading} />
      <Form tag={edit} onUpdated={() => setEdit(null)} />

      <Summary />

      <ul className="sortable-list list-group p-3 mb-4">
        {tags.map((tag) => (
          <TagCard
            key={tag.id}
            data={tag} isEditing={tag.id === edit?.id}
            onRefreshBalance={handleRefreshBalance}
            onEdit={setEdit}
            onDelete={handleDelete}
          ></TagCard>
        ))}
      </ul>
    </div>
  );
}