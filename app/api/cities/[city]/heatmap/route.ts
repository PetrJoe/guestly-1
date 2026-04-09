import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { city: string };

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { city } = await params;
  return proxy(req, `/cities/${city}/heatmap/`);
}
