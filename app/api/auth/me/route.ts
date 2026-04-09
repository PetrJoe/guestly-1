import { NextRequest, NextResponse } from "next/server";
import { proxy } from "@/lib/proxy";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  if (!token) return NextResponse.json({ ok: false }, { status: 401 });
  const res = await proxy(req, "/auth/me/");
  const data = await res.json().catch(() => ({}));
  if (res.status !== 200) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true, role: data.role, userId: data.id, user: data });
}

export async function PATCH(req: NextRequest) {
  return proxy(req, "/auth/me/");
}
