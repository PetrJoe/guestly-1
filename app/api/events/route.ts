import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";

export async function GET(req: NextRequest) {
  const res = await proxy(req, "/events/");
  const d = await res.json().catch(() => null);
  if (!d) return res;
  const pageSize = d.pageSize ?? 12;
  const total = d.total ?? 0;
  return Response.json({
    ok: true,
    data: d.data ?? [],
    total,
    page: d.page ?? 1,
    pageSize,
    pageCount: Math.ceil(total / pageSize),
  });
}

export async function POST(req: NextRequest) {
  return proxy(req, "/events/");
}
