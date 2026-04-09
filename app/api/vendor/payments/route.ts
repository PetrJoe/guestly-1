import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";

export async function GET(req: NextRequest) {
  const res = await proxy(req, "/vendor/payments/");
  const data = await res.json().catch(() => null);
  if (!data) return res;
  const list = Array.isArray(data) ? data : data.data ?? [];
  const totalEarned = list.filter((p: { status: string }) => p.status === "paid")
    .reduce((s: number, p: { amount: string }) => s + parseFloat(p.amount || "0"), 0);
  const pending = list.filter((p: { status: string }) => p.status === "pending")
    .reduce((s: number, p: { amount: string }) => s + parseFloat(p.amount || "0"), 0);
  return Response.json({
    success: true,
    data: {
      payments: list,
      stats: { totalEarned, pending, totalPayments: list.length }
    }
  });
}

export async function POST(req: NextRequest) {
  const res = await proxy(req, "/vendor/payments/");
  const data = await res.json().catch(() => null);
  return Response.json({ success: res.status < 300, data, error: data?.error });
}
