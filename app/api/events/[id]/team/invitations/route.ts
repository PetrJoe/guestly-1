import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { id: string };

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const res = await proxy(req, `/events/${id}/team/invitations/`);
  const data = await res.json().catch(() => null);
  if (!data) return res;
  const list = Array.isArray(data) ? data : data.data ?? [];
  return Response.json({ success: true, data: list });
}
