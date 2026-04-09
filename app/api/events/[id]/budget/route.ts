import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { id: string };

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const res = await proxy(req, `/events/${id}/budget/`);
  const data = await res.json().catch(() => null);
  if (!data) return res;
  return Response.json({ ok: true, data });
}

export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  return proxy(req, `/events/${id}/budget/`);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  return proxy(req, `/events/${id}/budget/`);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  return proxy(req, `/events/${id}/budget/`);
}
