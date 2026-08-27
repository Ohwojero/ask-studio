import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { bookingSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = bookingSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid booking details." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { error } = await supabase.from("bookings").insert({
      full_name: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      service: parsed.data.service,
      preferred_date: parsed.data.preferredDate,
      preferred_time: parsed.data.preferredTime || null,
      message: parsed.data.message,
      status: "new",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Supabase is not configured." },
      { status: 500 },
    );
  }
}
