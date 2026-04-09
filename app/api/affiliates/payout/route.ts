import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";

// Affiliate requests their own payout — route to their own affiliate record
export async function POST(req: NextRequest) {
  // Get affiliate dashboard first to find their id, then call payout
  // Simpler: backend handles self-payout via dashboard endpoint
  return proxy(req, "/affiliates/dashboard/payout/", { method: "POST" });
}
