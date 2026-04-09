import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { id: string };

export async function PATCH(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  return proxy(req, `/notifications/${id}/`);
}
export async function DELETE(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  return proxy(req, `/notifications/${id}/`);
}
