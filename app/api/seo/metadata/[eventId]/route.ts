import { NextRequest, NextResponse } from 'next/server';
import { generateSEOMetadata } from '@/lib/marketing';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId } = await params;

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    const metadata = generateSEOMetadata(eventId);

    if (!metadata) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Error generating SEO metadata:', error);
    return NextResponse.json(
      { error: 'Failed to generate SEO metadata' },
      { status: 500 }
    );
  }
}
