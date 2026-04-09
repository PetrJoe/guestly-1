import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { eventId: string };

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { eventId } = await params;
  return proxy(req, `/influencers/media-kit/${eventId}/`);
}

// /generate just returns the same media kit data
export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { eventId } = await params;
  return proxy(req, `/influencers/media-kit/${eventId}/`);
}
