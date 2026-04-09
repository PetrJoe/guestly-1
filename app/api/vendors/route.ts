import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  // ?userId=X — find vendor by user id (use vendor profile endpoint)
  if (userId) {
    const res = await proxy(req, `/vendor/profile/`);
    const data = await res.json().catch(() => null);
    if (!data || res.status !== 200) return Response.json({ success: true, data: [] });
    return Response.json({ success: true, data: [data] });
  }
  const res = await proxy(req, "/vendors/");
  const data = await res.json().catch(() => null);
  if (!data) return res;
  return Response.json({ success: true, data: data.data ?? data });
}
