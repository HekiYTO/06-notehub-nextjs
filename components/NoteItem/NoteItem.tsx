'use client';

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Note } from '@/types/note';
import { deleteNote } from '@/lib/api';
import css from '../NoteList/NoteList.module.css';

type Props = {
  item: Note;
};

const NoteItem = ({ item }: Props) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteMutation.mutate(item.id);
    }
  };

  return (
    <li className={css.listItem}>
      <h3 className={css.title}>{item.title}</h3>
      <p className={css.content}>{item.content}</p>
      <div className={css.footer}>
        <span className={css.tag}>{item.tag}</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link href={`/notes/${item.id}`} className={css.link}>
            View details
          </Link>
          <button 
            className={css.button}
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </li>
  );
};

export default NoteItem;
