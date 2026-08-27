import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";

function isAuthorized(request: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  const provided = request.headers.get("x-admin-password");
  return Boolean(expected && provided && provided === expected);
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ bookings: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Supabase is not configured." },
      { status: 500 },
    );
  }
}
