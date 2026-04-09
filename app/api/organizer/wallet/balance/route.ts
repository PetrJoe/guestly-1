import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";

export async function GET(req: NextRequest) {
  const res = await proxy(req, "/organizer/wallet/balance/");
  const data = await res.json().catch(() => null);
  if (!data || res.status !== 200) return res;
  return Response.json({ success: true, data });
}
