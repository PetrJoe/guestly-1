import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { id: string };

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const res = await proxy(req, `/events/${id}/documents/`);
  const data = await res.json().catch(() => null);
  if (!data) return res;
  const list = Array.isArray(data) ? data : data.data ?? [];
  return Response.json({ ok: true, data: list });
}

export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  return proxy(req, `/events/${id}/documents/`);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const docId = new URL(req.url).searchParams.get("docId");
  if (docId) return proxy(req, `/events/${id}/documents/${docId}/`);
  return Response.json({ error: "docId required" }, { status: 400 });
}
