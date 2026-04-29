export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      return Response.redirect(new URL(next, request.url));
    } else {
      return Response.redirect(
        new URL(`/auth/error?error=${error.message}`, request.url)
      );
    }
  }

  return Response.redirect(
    new URL(`/auth/error?error=No token hash or type`, request.url)
  );
}