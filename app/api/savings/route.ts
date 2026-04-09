import { NextRequest } from "next/server";
import { proxy } from "@/lib/proxy";

export async function GET(req: NextRequest) { return proxy(req, "/savings/"); }
export async function POST(req: NextRequest) { return proxy(req, "/savings/"); }
export async function PATCH(req: NextRequest) { return proxy(req, "/savings/"); }
export async function DELETE(req: NextRequest) { return proxy(req, "/savings/"); }
