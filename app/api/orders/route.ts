import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";

export async function GET(req: NextRequest) {
  const id = new URL(req.url).searchParams.get("id");
  // UI calls GET /api/orders?id=X to fetch a single order
  if (id) return proxy(req, `/orders/${id}/`);
  return proxy(req, "/orders/");
}

export async function POST(req: NextRequest) {
  return proxy(req, "/orders/");
}
