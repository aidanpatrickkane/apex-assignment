import React, { createContext, useState, ReactNode } from 'react';

interface NoteProps {
  id: string;
  title: string;
  content: string;
  time: Date;
  isFavorite: boolean;
}

interface NotesContextProps {
  notes: NoteProps[];
  addNote: (note: NoteProps) => void;
  updateNote: (updatedNote: NoteProps) => void;
  deleteNote: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

export const NotesContext = createContext<NotesContextProps>({
  notes: [],
  addNote: () => {},
  updateNote: () => {},
  deleteNote: () => {},
  toggleFavorite: () => {},
});

interface NotesProviderProps {
  children: ReactNode;
}

export const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
  const [notes, setNotes] = useState<NoteProps[]>([]);

  const addNote = (note: NoteProps) => {
    setNotes(prevNotes => [note, ...prevNotes]);
  };

  const updateNote = (updatedNote: NoteProps) => {
    setNotes(prevNotes =>
      prevNotes.map(note => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const deleteNote = (id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
      )
    );
  };

  return (
    <NotesContext.Provider
      value={{ notes, addNote, updateNote, deleteNote, toggleFavorite }}
    >
      {children}
    </NotesContext.Provider>
  );
};

