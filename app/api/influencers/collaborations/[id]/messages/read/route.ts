import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { id: string };

// Mark messages as read — update collab metrics
export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  return proxy(req, `/influencers/collaborations/${id}/metrics/`, { method: "PATCH", body: { messages_read: true } });
}
