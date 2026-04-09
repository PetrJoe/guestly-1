import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { community: string };

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { community } = await params;
  return proxy(req, `/communities/${community}/events/`);
}
