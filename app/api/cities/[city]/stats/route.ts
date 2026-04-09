import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { city: string };

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { city } = await params;
  const res = await proxy(req, `/cities/${city}/stats/`);
  const data = await res.json().catch(() => null);
  if (!data || res.status !== 200) return res;
  // UI expects { data: stats }
  return Response.json({ data });
}
