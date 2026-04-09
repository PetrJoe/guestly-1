import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";

export async function GET(req: NextRequest) { return proxy(req, "/wallet/crypto-deposit/"); }
export async function POST(req: NextRequest) { return proxy(req, "/wallet/crypto-deposit/"); }
