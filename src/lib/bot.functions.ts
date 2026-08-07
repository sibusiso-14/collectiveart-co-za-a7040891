import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SessionInput = z.object({ sessionId: z.string().min(8).max(64) });

export type StoredBotMessage = { role: "user" | "assistant"; content: string };

export const getBotHistory = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => SessionInput.parse(input))
  .handler(async ({ data }): Promise<StoredBotMessage[]> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("bot_messages")
      .select("role, content")
      .eq("session_id", data.sessionId)
      .order("created_at", { ascending: true })
      .limit(100);

    if (error) {
      console.error("getBotHistory failed", error);
      return [];
    }

    return (rows ?? []).filter(
      (row): row is StoredBotMessage => row.role === "user" || row.role === "assistant",
    );
  });

export const clearBotHistory = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => SessionInput.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("bot_messages")
      .delete()
      .eq("session_id", data.sessionId);
    if (error) console.error("clearBotHistory failed", error);
    return { ok: !error };
  });
