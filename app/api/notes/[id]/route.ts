import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Get a single note
export async function GET(request: NextRequest) {
  try {
    // Extract the ID from the URL path
    const id = request.url.split('/').pop();
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }
    
    const note = await prisma.note.findUnique({
      where: { id },
    });
    
    if (!note) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(note);
  } catch (error) {
    console.error('Error fetching note:', error);
    return NextResponse.json(
      { error: 'Failed to fetch note' },
      { status: 500 }
    );
  }
}

// Update a note
export async function PUT(request: NextRequest) {
  try {
    // Extract the ID from the URL path
    const id = request.url.split('/').pop();
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }
    
    const { title, content } = await request.json();
    
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }
    
    const note = await prisma.note.update({
      where: { id },
      data: { title, content },
    });
    
    return NextResponse.json(note);
  } catch (error) {
    console.error('Error updating note:', error);
    return NextResponse.json(
      { error: 'Failed to update note' },
      { status: 500 }
    );
  }
}

// Delete a note
export async function DELETE(request: NextRequest) {
  try {
    // Extract the ID from the URL path
    const id = request.url.split('/').pop();
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }
    
    await prisma.note.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json(
      { error: 'Failed to delete note' },
      { status: 500 }
    );
  }
}