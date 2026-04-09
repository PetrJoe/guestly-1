import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { id: string, docId: string };

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id, docId } = await params;
  return proxy(req, `/events/${id}/documents/${docId}/`);
}
export async function PATCH(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id, docId } = await params;
  return proxy(req, `/events/${id}/documents/${docId}/`);
}
export async function DELETE(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id, docId } = await params;
  return proxy(req, `/events/${id}/documents/${docId}/`);
}
