// components/NoteList/NoteList.tsx

import { Note } from "@/types/note";
import NoteItem from "../NoteItem/NoteItem";
import css from './NoteList.module.css';

type Props = {
  notes: Note[];
};

const NoteList = ({ notes }: Props) => {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <NoteItem key={note.id} item={note} />
      ))}
    </ul>
  );
}

export default NoteList;
