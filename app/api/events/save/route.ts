import { NextRequest, NextResponse } from "next/server";
import { saveEvent, incrementEventSaves, clearCityStatsCache } from "@/lib/store";
import { getEventById } from "@/lib/events";

function userId(req: NextRequest) {
  const role = req.cookies.get("role")?.value;
  return role === "attendee" ? "attendee-user" : "organiser-user";
}

export async function POST(req: NextRequest) {
  let eventId: string | undefined;
  const body = await req.json().catch(() => undefined);
  if (body && typeof body === "object") {
    const obj = body as { eventId?: string };
    eventId = obj.eventId;
  }
  if (!eventId) {
    const fd = await req.formData().catch(() => undefined);
    eventId = fd?.get("eventId")?.toString();
  }
  if (!eventId) return NextResponse.json({ ok: false, error: "eventId required" }, { status: 400 });
  
  saveEvent(userId(req), eventId);
  
  // Update event metrics and clear city cache for trending calculation
  incrementEventSaves(eventId);
  const event = getEventById(eventId);
  if (event) {
    clearCityStatsCache(event.city);
  }
  
  return NextResponse.json({ ok: true });
}
