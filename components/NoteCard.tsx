'use client';

import { Note } from '@/types';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => Promise<void>;
}

export default function NoteCard({ note, onDelete }: NoteCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this note?')) {
      setIsDeleting(true);
      try {
        await onDelete(note.id);
      } catch (error) {
        console.error('Failed to delete note:', error);
        setIsDeleting(false);
      }
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/notes/${note.id}`);
  };

  const formattedDate = new Date(note.createdAt).toLocaleDateString();

  return (
    <div className="note-card p-4 rounded-lg shadow-sm mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg">{note.title}</h3>
        <div className="space-x-2">
          <button 
            onClick={handleEdit}
            className="btn-secondary text-xs px-2 py-1 rounded"
          >
            Edit
          </button>
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="btn-primary text-xs px-2 py-1 rounded"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
      <p className="text-sm mb-2 whitespace-pre-wrap">{note.content}</p>
      <div className="text-xs text-gray-500">{formattedDate}</div>
    </div>
  );
}