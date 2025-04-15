'use client';

import { Note } from '@/types';
import NoteCard from './NoteCard';
import { useEffect, useState } from 'react';

export default function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/notes');
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);



  const handleDeleteNote = async (id: string) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setNotes(notes.filter(note => note.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete note:', error);
      throw error;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">My Notes</h2>
      
      {isLoading ? (
        <div className="text-center">Loading notes...</div>
      ) : notes.length === 0 ? (
        <div className="text-center text-gray-500">No notes yet. Create your first note above!</div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <NoteCard 
              key={note.id} 
              note={note} 
              onDelete={handleDeleteNote} 
            />
          ))}
        </div>
      )}
    </div>
  );
}