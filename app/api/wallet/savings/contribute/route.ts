import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";

export async function POST(req: NextRequest) {
  return proxy(req, "/wallet/savings/contribute/");
}

// DELETE ?targetId=X → cancel recurring on that savings target (PATCH recurring_amount=null)
export async function DELETE(req: NextRequest) {
  const targetId = new URL(req.url).searchParams.get("targetId");
  return proxy(req, "/wallet/savings/", {
    method: "PATCH",
    body: { target_id: targetId, recurring_amount: null, recurring_frequency: "" },
  });
}
