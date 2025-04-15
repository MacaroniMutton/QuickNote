'use client'

import NoteForm from '@/components/NoteForm';
import NoteList from '@/components/NoteList';

export default function Home() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        <span className="text-primary">Quick</span>Note
      </h1>
      
      <section className="mb-10">
        <NoteForm 
          onSubmit={async (title, content) => {
            const response = await fetch('/api/notes', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ title, content }),
            });
            
            if (!response.ok) {
              throw new Error('Failed to create note');
            }

            // Force a refresh of the page to show the new note
            window.location.reload();
          }} 
        />
      </section>
      
      <section>
        <NoteList />
      </section>
    </main>
  );
}