// /api/payment is called by checkout as an alias for /api/orders/pay
import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  // Checkout sends { orderId, method } — backend expects { order_id, method }
  const mapped = { order_id: body.orderId ?? body.order_id, method: body.method ?? "wallet" };
  return proxy(req, "/orders/pay/", { method: "POST", body: mapped });
}
