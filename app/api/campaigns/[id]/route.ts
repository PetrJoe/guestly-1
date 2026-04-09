import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { id: string };

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const res = await proxy(req, `/campaigns/${id}/`);
  const data = await res.json().catch(() => null);
  if (!data || res.status !== 200) return res;
  // UI expects { campaign: ... }
  return Response.json({ campaign: data, ...data });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  return proxy(req, `/campaigns/${id}/`);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  return proxy(req, `/campaigns/${id}/`);
}
