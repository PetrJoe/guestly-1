import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { id: string, userId: string };

export async function PATCH(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id, userId } = await params;
  return proxy(req, `/events/${id}/team/${userId}/`);
}
export async function DELETE(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id, userId } = await params;
  return proxy(req, `/events/${id}/team/${userId}/`);
}
