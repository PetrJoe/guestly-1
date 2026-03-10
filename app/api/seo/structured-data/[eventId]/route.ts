import { NextRequest, NextResponse } from 'next/server';
import { generateStructuredData } from '@/lib/marketing';

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

    const structuredData = generateStructuredData(eventId);

    if (!structuredData) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(structuredData);
  } catch (error) {
    console.error('Error generating structured data:', error);
    return NextResponse.json(
      { error: 'Failed to generate structured data' },
      { status: 500 }
    );
  }
}
