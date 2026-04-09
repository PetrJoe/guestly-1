import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { id: string, pollId: string };

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id, pollId } = await params;
  return proxy(req, `/events/${id}/polls/${pollId}/`);
}
export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id, pollId } = await params;
  return proxy(req, `/events/${id}/polls/${pollId}/`);
}
