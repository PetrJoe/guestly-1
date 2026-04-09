import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { orderId: string };

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { orderId } = await params;
  return proxy(req, `/merch/orders/${orderId}/`);
}
export async function PATCH(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { orderId } = await params;
  return proxy(req, `/merch/orders/${orderId}/`);
}
