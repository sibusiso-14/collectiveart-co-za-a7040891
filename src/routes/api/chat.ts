import { createFileRoute } from "@tanstack/react-router";
import {
  convertToModelMessages,
  streamText,
  stepCountIs,
  tool,
  type UIMessage,
} from "ai";
import { z } from "zod";

import { createLovableAiGatewayProvider, getLovableAiGatewayRunId } from "@/lib/ai-gateway.server";
import { designers, instagramProfile, products } from "@/data/catalog";

type ChatRequestBody = { messages?: unknown; sessionId?: unknown };

const designerContext = designers
  .map(
    (d) =>
      `- ${d.name} (${d.discipline}, ${d.location}) — Instagram @${d.instagram} (${instagramProfile(d.instagram)}). ${d.bio}`,
  )
  .join("\n");

const productContext = products
  .map((p) => `- ${p.name} — ${p.designerSlug} — R${p.price} — ${p.category}`)
  .join("\n");

const systemPrompt = `You are CUTE bot, the friendly assistant for Collaborate.art — a curated South African marketplace for independent fashion designers.

How the site works:
- Collaborate.art is a directory, not a checkout. Customers browse pieces and then message the designer directly on Instagram to agree on size, colour, price and payment.
- Prices shown on the site are guide prices; the atelier confirms the final price.
- Pages: /shop (full catalogue), /designers (the roster), /apply (designers apply to sell), /terms (terms & conditions), /auth (sign in).
- Studio email: studio@collaborate.art

Designers on the platform:
${designerContext}

Pieces currently listed:
${productContext}

Your job:
1. Answer questions about the site, the designers, pieces, sizing, ordering and contact details. Be warm, brief and stylish — two or three short sentences, no waffle.
2. Always point customers to the right designer's Instagram handle when they want to order.
3. If a customer is too busy to contact a designer themselves, offer to take their details and pass the enquiry on. Use the capture_enquiry tool once you have at least their name, one contact method (email or phone) and what they want. Confirm warmly afterwards and tell them the studio will contact the designer on their behalf.
Never invent designers, prices or policies that are not listed above.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as ChatRequestBody;
        const messages = body.messages;
        const sessionId =
          typeof body.sessionId === "string" && body.sessionId.length >= 8
            ? body.sessionId.slice(0, 64)
            : null;

        if (!Array.isArray(messages) || !sessionId) {
          return new Response("Invalid request", { status: 400 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const uiMessages = messages as UIMessage[];
        const lastMessage = uiMessages[uiMessages.length - 1];
        const lastText =
          lastMessage?.role === "user"
            ? lastMessage.parts
                .map((part) => (part.type === "text" ? part.text : ""))
                .join("")
                .trim()
            : "";

        if (lastText) {
          const { error } = await supabaseAdmin
            .from("bot_messages")
            .insert({ session_id: sessionId, role: "user", content: lastText });
          if (error) console.error("Failed to save user message", error);
        }

        const gateway = createLovableAiGatewayProvider(key, getLovableAiGatewayRunId(request));

        const result = streamText({
          model: gateway("google/gemini-3.6-flash"),
          system: systemPrompt,
          messages: await convertToModelMessages(uiMessages),
          stopWhen: stepCountIs(50),
          tools: {
            capture_enquiry: tool({
              description:
                "Save a customer's contact details and enquiry so the Collaborate.art studio can contact the designer on their behalf.",
              inputSchema: z.object({
                name: z.string().describe("Customer's name"),
                email: z.string().describe("Email address, or empty string if not given"),
                phone: z.string().describe("Phone number, or empty string if not given"),
                designer: z
                  .string()
                  .describe("Designer or piece they are interested in, or empty string"),
                message: z.string().describe("What the customer wants, in their own words"),
              }),
              execute: async ({ name, email, phone, designer, message }) => {
                if (!name.trim() || (!email.trim() && !phone.trim())) {
                  return {
                    saved: false,
                    reason: "Need a name and at least one contact method.",
                  };
                }
                const { error } = await supabaseAdmin.from("customer_enquiries").insert({
                  session_id: sessionId,
                  name: name.trim().slice(0, 120),
                  email: email.trim().slice(0, 200) || null,
                  phone: phone.trim().slice(0, 40) || null,
                  designer: designer.trim().slice(0, 120) || null,
                  message: message.trim().slice(0, 2000),
                });
                if (error) {
                  console.error("Failed to save enquiry", error);
                  return { saved: false, reason: "Could not save right now." };
                }
                return { saved: true, name: name.trim() };
              },
            }),
          },
          onError: ({ error }) => console.error("CUTE bot stream error", error),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: uiMessages,
          onFinish: async ({ responseMessage }) => {
            const text = responseMessage.parts
              .map((part) => (part.type === "text" ? part.text : ""))
              .join("")
              .trim();
            if (!text) return;
            const { error } = await supabaseAdmin
              .from("bot_messages")
              .insert({ session_id: sessionId, role: "assistant", content: text });
            if (error) console.error("Failed to save assistant message", error);
          },
        });
      },
    },
  },
});
