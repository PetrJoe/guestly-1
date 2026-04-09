import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { userId: string };

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  // UI calls GET to check follow status — return from profile
  const { userId } = await params;
  const res = await proxy(req, `/users/${userId}/profile/`);
  const data = await res.json().catch(() => ({}));
  return Response.json({ success: true, data: { isFollowing: data.is_following ?? false } });
}

export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { userId } = await params;
  const res = await proxy(req, `/users/${userId}/follow/`);
  const data = await res.json().catch(() => ({}));
  return Response.json({ success: res.status < 300, data: { isFollowing: data.following ?? true } });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { userId } = await params;
  const res = await proxy(req, `/users/${userId}/follow/`);
  const data = await res.json().catch(() => ({}));
  return Response.json({ success: res.status < 300, data: { isFollowing: false } });
}
