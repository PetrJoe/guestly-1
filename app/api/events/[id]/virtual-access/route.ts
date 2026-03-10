import { NextRequest, NextResponse } from "next/server";
import {
  generateVirtualAccess,
  getUserVirtualAccess,
  getUserTicketOrder,
} from "@/lib/store";
import { getEventById } from "@/lib/events";

/**
 * POST /api/events/[id]/virtual-access
 * Generate or retrieve virtual access link for authenticated user with valid ticket
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const eventId = id;
  const userId = req.cookies.get("user_id")?.value;

  // Check authentication
  if (!userId) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized. Please log in to access virtual events." },
      { status: 401 }
    );
  }

  // Verify event exists
  const event = getEventById(eventId);
  if (!event) {
    return NextResponse.json(
      { ok: false, error: "Event not found" },
      { status: 404 }
    );
  }

  // Check if event supports virtual access
  if (event.eventType !== "Virtual" && event.eventType !== "Hybrid") {
    return NextResponse.json(
      {
        ok: false,
        error: "This event does not support virtual access. Only Virtual and Hybrid events can be accessed online.",
      },
      { status: 400 }
    );
  }

  // Check if streaming is configured
  if (!event.streamingConfig) {
    return NextResponse.json(
      {
        ok: false,
        error: "Virtual access is not configured for this event. Please contact the organizer.",
      },
      { status: 400 }
    );
  }

  // Check if user already has valid access
  const existingAccess = getUserVirtualAccess(userId, eventId);
  if (existingAccess) {
    return NextResponse.json({
      ok: true,
      access: existingAccess,
      message: "Virtual access already granted",
    });
  }

  // Verify user has a paid ticket for this event
  const ticketOrderId = getUserTicketOrder(userId, eventId);
  if (!ticketOrderId) {
    return NextResponse.json(
      {
        ok: false,
        error: "No valid ticket found. Please purchase a ticket to access this virtual event.",
      },
      { status: 403 }
    );
  }

  // Generate new virtual access
  const access = generateVirtualAccess(eventId, userId, ticketOrderId, event.date);

  return NextResponse.json({
    ok: true,
    access,
    message: "Virtual access granted successfully",
  });
}

/**
 * GET /api/events/[id]/virtual-access
 * Retrieve existing virtual access for authenticated user
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const eventId = id;
  const userId = req.cookies.get("user_id")?.value;

  // Check authentication
  if (!userId) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Verify event exists
  const event = getEventById(eventId);
  if (!event) {
    return NextResponse.json(
      { ok: false, error: "Event not found" },
      { status: 404 }
    );
  }

  // Get existing access
  const access = getUserVirtualAccess(userId, eventId);

  if (!access) {
    return NextResponse.json(
      {
        ok: false,
        error: "No virtual access found. Please request access first.",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ok: true,
    access,
  });
}

