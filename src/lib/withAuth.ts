import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export function protectedRoute<TContext = unknown>(
  handler: (
    req: NextRequest,
    context?: TContext
  ) => Promise<Response> | Response
): (req: NextRequest, context?: TContext) => Promise<Response> | Response {
  return async (req: NextRequest, context?: TContext) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return handler(req, context);
  };
}
