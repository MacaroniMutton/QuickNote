'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import NoteForm from '@/components/NoteForm';
import Link from 'next/link';
import { Note } from '@/types';

export default function EditNotePage() {
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`/api/notes/${id}`);
        if (!response.ok) {
          throw new Error('Note not found');
        }
        const data = await response.json();
        setNote(data);
      } catch (error) {
        setError('Failed to load note');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchNote();
    }
  }, [id]);

  const handleUpdateNote = async (title: string, content: string) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error('Failed to update note');
      }

      router.push('/');
    } catch (error) {
      console.error('Failed to update note:', error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-8 text-center">
        Loading note...
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
          {error || 'Note not found'}
        </div>
        <Link href="/" className="btn-secondary px-4 py-2 rounded-md inline-block">
          Back to Notes
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit Note</h1>
        <Link href="/" className="btn-secondary px-4 py-2 rounded-md">
          Back to Notes
        </Link>
      </div>

      <NoteForm
        initialTitle={note.title}
        initialContent={note.content}
        onSubmit={handleUpdateNote}
        isEditing={true}
      />
    </div>
  );
}
