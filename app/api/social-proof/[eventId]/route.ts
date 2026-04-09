import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { eventId: string };

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { eventId } = await params;
  return proxy(req, `/social-proof/${eventId}/`);
}
