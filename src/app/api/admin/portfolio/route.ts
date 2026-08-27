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
      .from("portfolio_items")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ items: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Supabase is not configured." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData();
  const title = String(formData.get("title") ?? "");
  const category = String(formData.get("category") ?? "");
  const description = String(formData.get("description") ?? "");
  const sortOrder = Number(formData.get("sortOrder") ?? 0);
  const isPublished = formData.get("isPublished") === "on";
  const file = formData.get("image");

  if (!title || !category || !(file instanceof File)) {
    return NextResponse.json({ error: "Title, category, and image are required." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdminClient();
    const extension = file.name.split(".").pop() || "jpg";
    const path = `${category}/${crypto.randomUUID()}.${extension}`;

    const upload = await supabase.storage.from("portfolio").upload(path, file, {
      contentType: file.type,
      upsert: false,
    });

    if (upload.error) {
      return NextResponse.json({ error: upload.error.message }, { status: 500 });
    }

    const { data: publicUrl } = supabase.storage.from("portfolio").getPublicUrl(path);
    const { error } = await supabase.from("portfolio_items").insert({
      title,
      category,
      description: description || null,
      image_url: publicUrl.publicUrl,
      sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
      is_published: isPublished,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, imageUrl: publicUrl.publicUrl });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Supabase is not configured." },
      { status: 500 },
    );
  }
}
