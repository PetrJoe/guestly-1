import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { vendorId: string };

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { vendorId } = await params;
  const res = await proxy(req, `/vendors/${vendorId}/`);
  const data = await res.json().catch(() => null);
  if (!data || res.status !== 200) return res;
  // Wrap in shape the UI expects: { success, data: { vendor, reviews } }
  return Response.json({ success: true, data: { vendor: data, reviews: [] } });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { vendorId } = await params;
  return proxy(req, `/vendors/${vendorId}/`);
}
