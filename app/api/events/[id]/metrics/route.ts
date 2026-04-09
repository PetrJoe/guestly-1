import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";
type Params = { id: string };

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const res = await proxy(req, `/events/${id}/metrics/`);
  const d = await res.json().catch(() => ({}));
  // Normalize to camelCase for UI
  return Response.json({
    ...d,
    totalRevenue: parseFloat(d.total_revenue ?? d.totalRevenue ?? 0),
    totalTickets: d.tickets_sold ?? d.totalTickets ?? 0,
    totalViews: d.views ?? d.totalViews ?? 0,
    conversionPct: d.conversion_rate ?? d.conversionPct ?? 0,
    dailyStats: d.dailyStats ?? [],
    ticketMix: d.ticketMix ?? [],
    trafficSources: d.trafficSources ?? [],
  });
}
