import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";

export async function GET(req: NextRequest) {
  const eventId = new URL(req.url).searchParams.get("eventId");
  const path = eventId ? `/tickets/?event_id=${eventId}` : "/tickets/";
  const res = await proxy(req, path);
  const data = await res.json().catch(() => null);
  if (!data) return res;
  const tiers = Array.isArray(data) ? data : data.data ?? [];
  // UI expects { availability: { General: { price, available, sold }, VIP: {...} } }
  const availability: Record<string, { price: number; available: number; sold: number }> = {};
  for (const t of tiers) {
    availability[t.tier_type] = { price: parseFloat(t.price), available: t.available, sold: t.sold };
  }
  return Response.json({ availability, tiers, data: tiers });
}
