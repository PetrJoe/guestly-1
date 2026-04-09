import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { userId: string; type: string };

// Handles /api/users/[userId]/followers, /following, /profile, /follow
export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { userId, type } = await params;
  return proxy(req, `/users/${userId}/${type}/`);
}

export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { userId, type } = await params;
  return proxy(req, `/users/${userId}/${type}/`);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { userId, type } = await params;
  return proxy(req, `/users/${userId}/${type}/`);
}
