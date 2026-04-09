import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";

export async function GET(req: NextRequest) {
  const res = await proxy(req, "/notifications/geo/");
  const data = await res.json().catch(() => null);
  if (!data) return res;
  const list = Array.isArray(data) ? data : data.data ?? [];
  return Response.json({ success: true, data: list });
}

export async function POST(req: NextRequest) {
  const res = await proxy(req, "/notifications/geo/");
  const data = await res.json().catch(() => null);
  return Response.json({ success: res.status < 300, data, error: data?.error });
}
