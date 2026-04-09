import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";

export async function GET(req: NextRequest) { return proxy(req, "/push/preferences/"); }
export async function PATCH(req: NextRequest) { return proxy(req, "/push/preferences/"); }
