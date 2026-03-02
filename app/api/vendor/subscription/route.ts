import { NextRequest, NextResponse } from "next/server";
import { activateVendorSubscription, getVendorSubscription, type VendorPlan } from "@/lib/store";

function userId(req: NextRequest) {
  const uid = req.cookies.get("user_id")?.value;
  if (!uid) throw new Error("Unauthorized");
  return uid;
}

export async function GET(req: NextRequest) {
  try {
    const sub = getVendorSubscription(userId(req));
    return NextResponse.json({ ok: true, subscription: sub });
  } catch {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const plan = body?.plan as VendorPlan | undefined;
    if (!plan || !["1m", "3m", "6m", "12m"].includes(plan)) {
      return NextResponse.json({ ok: false, error: "Invalid plan" }, { status: 400 });
    }
    const sub = activateVendorSubscription(userId(req), plan);
    return NextResponse.json({ ok: true, subscription: sub });
  } catch {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

