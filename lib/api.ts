import axios from 'axios';
import { Note } from '../types/note';

const API_URL = 'https://notehub-public.goit.study/api';

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  search: string
): Promise<FetchNotesResponse> => {
  const { data } = await axios.get<FetchNotesResponse>(`${API_URL}/notes`, {
    params: {
      page,
      perPage: 12,
      search,
    },
  });

  return data;
};

export const createNote = async (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> => {
  const { data } = await axios.post<Note>(`${API_URL}/notes`, note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axios.delete<Note>(`${API_URL}/notes/${id}`);
  return data;
};