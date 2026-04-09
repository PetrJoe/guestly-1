import { NextRequest, NextResponse } from "next/server";
import { proxy } from "@/lib/proxy";

export async function POST(req: NextRequest) {
  await proxy(req, "/auth/logout/", { method: "POST" });
  const res = NextResponse.json({ ok: true });
  for (const c of ["access_token", "refresh_token", "role", "user_id"]) {
    res.cookies.set(c, "", { maxAge: 0, path: "/" });
  }
  return res;
}
