import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { userId: string };

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { userId } = await params;
  const res = await proxy(req, `/users/${userId}/profile/`);
  const data = await res.json().catch(() => null);
  if (!data || res.status !== 200) return Response.json({ success: false }, { status: res.status });
  // Backend returns { user, profile, followers_count, following_count, is_following }
  // UI expects { success, data: { user, profile, followers, following, isFollowing } }
  return Response.json({
    success: true,
    data: {
      ...data,
      followers: data.followers_count ?? 0,
      following: data.following_count ?? 0,
      isFollowing: data.is_following ?? false,
    }
  });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { userId } = await params;
  const res = await proxy(req, `/users/${userId}/profile/`);
  const data = await res.json().catch(() => null);
  if (!data || res.status !== 200) return Response.json({ success: false }, { status: res.status });
  return Response.json({ success: true, data });
}
