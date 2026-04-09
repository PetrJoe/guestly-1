import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { id: string; userId: string };

export async function PATCH(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id, userId } = await params;
  const res = await proxy(req, `/events/${id}/team/${userId}/`);
  const data = await res.json().catch(() => null);
  return Response.json({ success: res.status < 300, data, error: data?.error });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id, userId } = await params;
  const res = await proxy(req, `/events/${id}/team/${userId}/`);
  const data = await res.json().catch(() => null);
  return Response.json({ success: res.status < 300, data, error: data?.error });
}
