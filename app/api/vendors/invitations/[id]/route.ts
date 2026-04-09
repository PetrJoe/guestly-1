import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { id: string }; // id is eventId from UI

export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params; // this is eventId
  const body = await req.json().catch(() => ({}));
  // UI sends { status: "accepted"|"declined" }, backend expects { action: "accepted"|"declined" }
  // First find the EventVendorLink by event — backend handles lookup by event+vendor
  return proxy(req, `/vendors/invitations/${id}/respond/`, {
    method: "POST",
    body: { action: body.status ?? body.action },
  });
}
