'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import NoteList from '@/components/NoteList/NoteList';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import Pagination from '@/components/Pagination/Pagination';
import { getNotes } from '@/lib/api';
import css from '@/components/NotesPage/NotesPage.module.css';

const NotesClient = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => getNotes(page, search),
    refetchOnMount: false,
  });

  const totalPages = data?.totalPages || 1;
  const notes = data?.notes || [];

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  if (isLoading && notes.length === 0) {
    return <p>Loading, please wait...</p>;
  }

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onSearch={handleSearchChange} />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note
        </button>
      </div>

      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <NoteForm onClose={handleModalClose} />
        </Modal>
      )}

      {error && <p>Error loading notes.</p>}
      {notes.length > 0 && <NoteList notes={notes} />}
      
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default NotesClient;
