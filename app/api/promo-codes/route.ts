import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";

export async function GET(req: NextRequest) {
  const res = await proxy(req, "/promo-codes/");
  const data = await res.json().catch(() => null);
  if (!data) return res;
  const list = Array.isArray(data) ? data : data.data ?? [];
  return Response.json({ promoCodes: list, data: list });
}

export async function POST(req: NextRequest) {
  return proxy(req, "/promo-codes/");
}
