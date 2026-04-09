import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { depositId: string };

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { depositId } = await params;
  return proxy(req, `/wallet/crypto-deposit/${depositId}/`);
}
export async function PATCH(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { depositId } = await params;
  return proxy(req, `/wallet/crypto-deposit/${depositId}/`);
}
