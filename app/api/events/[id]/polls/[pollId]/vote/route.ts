import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { id: string; pollId: string };

export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id, pollId } = await params;
  const body = await req.json().catch(() => ({}));
  // UI sends { optionId }, backend expects { option_id }
  return proxy(req, `/events/${id}/polls/${pollId}/`, {
    method: "POST",
    body: { option_id: body.optionId ?? body.option_id },
  });
}
