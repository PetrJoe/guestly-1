import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { id: string };

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const limit = new URL(req.url).searchParams.get("limit") ?? "50";
  const res = await proxy(req, `/events/${id}/activity/?limit=${limit}`);
  const data = await res.json().catch(() => null);
  if (!data) return res;
  const list = Array.isArray(data) ? data : data.data ?? [];
  return Response.json({ success: true, data: list });
}
