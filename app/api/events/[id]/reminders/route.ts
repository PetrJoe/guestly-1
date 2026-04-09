import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { id: string };

export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const res = await proxy(req, `/events/${id}/reminders/check/`);
  const data = await res.json().catch(() => ({}));
  // UI expects { success, data: { notifications: [] } }
  return Response.json({
    success: true,
    data: { notifications: [], checked: data.checked ?? 0 }
  });
}
