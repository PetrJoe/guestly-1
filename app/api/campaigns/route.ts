import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";

export async function GET(req: NextRequest) {
  const res = await proxy(req, "/campaigns/");
  const data = await res.json().catch(() => null);
  if (!data) return res;
  const list = Array.isArray(data) ? data : data.data ?? [];
  // UI expects { campaigns: [] }
  return Response.json({ campaigns: list, data: list });
}

export async function POST(req: NextRequest) {
  return proxy(req, "/campaigns/");
}
