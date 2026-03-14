import { useCallback, useState } from 'react';

import TagCard from './components/tag-card';
import Form from './components/form.tag';
import Loader from '@/components/loader';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { type TagBaseSchema } from '@/schemas/tags/base.schema';
import { api } from '@/api';
import Summary from './components/summary/summary';
import { selectTags, selectTagsLoading } from '@/redux/tag/tag.selectors';
import { removeTag } from '@/redux/tag/tag.slice';

export default function TagPage() {
  const [edit, setEdit] = useState<TagBaseSchema | null>(null);
  const [loading, setLoading] = useState(false);

  const tags = useAppSelector(selectTags);
  const tagLoading = useAppSelector(selectTagsLoading);
  const dispatch = useAppDispatch();

  const handleDelete = useCallback(async (id: TagBaseSchema["id"]) => {
    if (window.confirm('Are You Sure You Want To Delete This Tag!')) {
      try {
        setLoading(true);
        await api.tags.delete(id);
        dispatch(removeTag(id));
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
            onEdit={setEdit}
            onDelete={handleDelete}
          ></TagCard>
        ))}
      </ul>
    </div>
  );
}