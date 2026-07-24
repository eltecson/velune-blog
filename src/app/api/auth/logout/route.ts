import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { AuthError } from "@supabase/supabase-js";
import { isNonRetryable } from "@/lib/utils";
import { NETWORK_TIMEOUT } from "@/constants/error-messages";

export async function POST() {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.message
      }, {
        status: error.status
      })
    }

    revalidatePath("/dashboard", "layout");
    revalidatePath("/(landing)", "layout");
    revalidatePath("/(auth)", "layout");

    return NextResponse.json(
      {
        success: true,
        message: "Successfully logged out!",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Unexpected logout error:", error);

    return NextResponse.json(
      {
        success: false,
        message: NETWORK_TIMEOUT,
      },
      {
        status: 504,
      },
    );
  }
}
