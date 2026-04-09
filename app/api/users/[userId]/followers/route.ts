import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { userId: string };

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { userId } = await params;
  return proxy(req, `/users/${userId}/followers/`);
}
