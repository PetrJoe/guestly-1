import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { id: string };

export async function PATCH(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const res = await proxy(req, `/wallet/groups/${id}/admin/`);
  const data = await res.json().catch(() => null);
  return Response.json({ success: res.status < 300, data, error: data?.error });
}
