import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { id: string; invitationId: string };

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id, invitationId } = await params;
  return proxy(req, `/events/${id}/team/invitations/${invitationId}/`);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id, invitationId } = await params;
  return proxy(req, `/events/${id}/team/invitations/${invitationId}/`);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id, invitationId } = await params;
  return proxy(req, `/events/${id}/team/invitations/${invitationId}/`);
}
