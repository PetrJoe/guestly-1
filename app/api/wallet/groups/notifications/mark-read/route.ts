import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";

// Mark all group wallet notifications as read
export async function POST(req: NextRequest) {
  const res = await proxy(req, "/wallet/groups/notifications/");
  return Response.json({ success: true });
}
