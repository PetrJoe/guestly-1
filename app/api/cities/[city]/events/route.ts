import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { city: string };

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { city } = await params;
  const res = await proxy(req, `/cities/${city}/events/`);
  const data = await res.json().catch(() => null);
  if (!data || res.status !== 200) return res;
  // UI expects { data: events[] }
  const events = data.events ?? data.data ?? data;
  return Response.json({ data: Array.isArray(events) ? events : [] });
}
