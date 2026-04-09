import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { id: string };

function normalize(ev: Record<string, unknown>) {
  // Add camelCase aliases for fields the UI expects
  return {
    ...ev,
    eventType: ev.event_type ?? ev.eventType,
    streamingConfig: ev.streaming_config ?? ev.streamingConfig,
    communityType: ev.community_type ?? ev.communityType,
    postEventMerchSales: ev.post_event_merch_sales ?? ev.postEventMerchSales,
    postEventCommunityAccess: ev.post_event_community_access ?? ev.postEventCommunityAccess,
    ticketTiers: ev.ticket_tiers ?? ev.ticketTiers,
    organiserName: ev.organiser_name ?? ev.organiserName,
    isSaved: ev.is_saved ?? false,
  };
}

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const res = await proxy(req, `/events/${id}/`);
  const data = await res.json().catch(() => null);
  if (!data || res.status !== 200) return res;
  return Response.json(normalize(data));
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  return proxy(req, `/events/${id}/`);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  return proxy(req, `/events/${id}/`);
}
