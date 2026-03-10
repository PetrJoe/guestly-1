import { NextRequest, NextResponse } from "next/server";
import { filterEvents, Event } from "@/lib/events";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || undefined;
  const category = (searchParams.get("category") || undefined) as Event["category"] | undefined;
  const city = (searchParams.get("city") || undefined) as Event["city"] | undefined;
  const community = searchParams.get("community") || undefined;
  const communityType = (searchParams.get("communityType") || undefined) as Event["communityType"] | undefined;
  const startDate = searchParams.get("startDate") || undefined;
  const endDate = searchParams.get("endDate") || undefined;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "6", 10);
  const result = filterEvents({ q, category, city, community, communityType, startDate, endDate, page, pageSize });
  return NextResponse.json({ ok: true, ...result });
}

