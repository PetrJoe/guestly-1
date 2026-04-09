import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { id: string; threadId: string };

// Replies are just child threads — proxy to the thread detail endpoint
export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id, threadId } = await params;
  const res = await proxy(req, `/events/${id}/discussions/${threadId}/`);
  const data = await res.json().catch(() => ({}));
  const replies = data.replies ?? [];
  return Response.json({ replies, data: replies });
}

export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id, threadId } = await params;
  return proxy(req, `/events/${id}/discussions/${threadId}/`);
}
