import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { id: string, questionId: string };

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id, questionId } = await params;
  return proxy(req, `/events/${id}/qa/${questionId}/`);
}
export async function PATCH(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id, questionId } = await params;
  return proxy(req, `/events/${id}/qa/${questionId}/`);
}
