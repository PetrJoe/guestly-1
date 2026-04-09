import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { requestId: string };

export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { requestId } = await params;
  return proxy(req, `/organizer/wallet/withdraw/${requestId}/`, { method: "PATCH", body: { status: "rejected" } });
}
