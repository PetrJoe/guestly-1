import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";

export async function GET(req: NextRequest) {
  const res = await proxy(req, "/vendors/invitations/");
  const data = await res.json().catch(() => null);
  if (!data) return res;
  const list = Array.isArray(data) ? data : data.data ?? [];
  // Normalize: add eventId field from event.id if present
  const normalized = list.map((item: Record<string, unknown>) => ({
    ...item,
    eventId: item.event_id ?? (item.event as Record<string, unknown>)?.id ?? item.eventId,
  }));
  return Response.json({ success: true, data: normalized });
}
