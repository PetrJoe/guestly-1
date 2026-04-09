import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { id: string; questionId: string };

export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id, questionId } = await params;
  const body = await req.json().catch(() => ({}));
  return proxy(req, `/events/${id}/qa/${questionId}/`, { method: "PATCH", body: { action: "answer", answer: body.answer } });
}
