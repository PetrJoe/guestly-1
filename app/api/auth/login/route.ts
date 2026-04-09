import { NextRequest, NextResponse } from "next/server";
import { proxy } from "@/lib/proxy";

// POST /api/auth/login → sets cookies from Django token response
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const res = await proxy(req, "/auth/login/", { method: "POST", body });
  const data = await res.json().catch(() => ({}));

  if (data.token) {
    const out = NextResponse.json({ ok: true, role: data.role, user: data.user });
    const maxAge = 60 * 60 * 24 * 7;
    out.cookies.set("access_token", data.token, { httpOnly: true, sameSite: "lax", path: "/", maxAge });
    out.cookies.set("role", data.role ?? "attendee", { httpOnly: true, sameSite: "lax", path: "/", maxAge });
    out.cookies.set("user_id", String(data.user?.id ?? ""), { httpOnly: true, sameSite: "lax", path: "/", maxAge });
    return out;
  }
  return NextResponse.json({ ok: false, error: data.error ?? "Invalid credentials" }, { status: 400 });
}
