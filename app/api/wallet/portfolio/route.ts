import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";

export async function GET(req: NextRequest) {
  const res = await proxy(req, "/wallet/portfolio/");
  const d = await res.json().catch(() => null);
  if (!d) return res;
  const wallet = d.wallet ?? {};
  const deposits = d.crypto_deposits ?? [];
  const cryptoTotal = parseFloat(d.crypto_total_usd ?? "0");
  const fiatBalance = parseFloat(wallet.balance ?? "0");
  const promoBalance = parseFloat(wallet.promo_balance ?? "0");
  return Response.json({
    success: true,
    data: {
      fiatBalance,
      promoBalance,
      cryptoBalances: deposits.map((dep: Record<string, unknown>) => ({
        symbol: dep.symbol,
        amount: parseFloat(String(dep.amount ?? 0)),
        usdValue: parseFloat(String(dep.usd_value ?? 0)),
      })),
      totalPortfolioValue: fiatBalance + promoBalance + cryptoTotal,
      wallet,
      crypto_deposits: deposits,
    }
  });
}
