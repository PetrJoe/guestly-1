// Central proxy helper — all Next.js API routes forward to Django backend
import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_URL || "http://localhost:8000/api";

export async function proxy(
  req: NextRequest,
  path: string,
  options: { method?: string; body?: unknown } = {}
): Promise<NextResponse> {
  const url = new URL(req.url);
  const backendUrl = `${BACKEND}${path}${url.search}`;

  const method = options.method ?? req.method;
  const token = req.cookies.get("access_token")?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Token ${token}`;

  let body: string | undefined;
  if (options.body !== undefined) {
    body = JSON.stringify(options.body);
  } else if (!["GET", "HEAD", "DELETE"].includes(method)) {
    try {
      const raw = await req.text();
      body = raw || undefined;
    } catch {
      body = undefined;
    }
  }

  try {
    const res = await fetch(backendUrl, { method, headers, body });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Backend unavailable" }, { status: 503 });
  }
}
