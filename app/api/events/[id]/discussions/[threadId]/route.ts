import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { id: string, threadId: string };

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id, threadId } = await params;
  return proxy(req, `/events/${id}/discussions/${threadId}/`);
}
export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id, threadId } = await params;
  return proxy(req, `/events/${id}/discussions/${threadId}/`);
}
export async function DELETE(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id, threadId } = await params;
  return proxy(req, `/events/${id}/discussions/${threadId}/`);
}
