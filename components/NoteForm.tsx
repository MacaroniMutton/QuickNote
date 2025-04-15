'use client';

import { useState, FormEvent } from 'react';

interface NoteFormProps {
  onSubmit: (title: string, content: string) => Promise<void>;
  initialTitle?: string;
  initialContent?: string;
  isEditing?: boolean;
}

export default function NoteForm({ 
  onSubmit, 
  initialTitle = '', 
  initialContent = '', 
  isEditing = false 
}: NoteFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(title, content);
      if (!isEditing) {
        setTitle('');
        setContent('');
      }
    } catch (error) {
      console.error('Failed to save note:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-form space-y-4 p-6 bg-white rounded-lg shadow-md mb-8">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Note Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title..."
          className="w-full px-4 py-2 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-1">
          Note Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here..."
          className="w-full px-4 py-2 rounded-md min-h-32"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`btn-primary px-6 py-2 rounded-md ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? 'Saving...' : isEditing ? 'Update Note' : 'Save Note'}
      </button>
    </form>
  );
}