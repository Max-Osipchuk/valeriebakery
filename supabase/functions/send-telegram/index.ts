import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const allowedOrigins = new Set([
  "https://valeriebakery.ru",
  "https://www.valeriebakery.ru",
  "https://valeriebakery.lovable.app",
  "https://id-preview--1c136435-14e5-41ff-a327-b07ec97b2e95.lovable.app",
]);

const getCorsHeaders = (origin: string | null) => {
  const allowOrigin = origin && allowedOrigins.has(origin) ? origin : "https://valeriebakery.ru";

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
};

interface TelegramRequest {
  name: string;
  phone: string;
  email?: string;
  marketingConsent?: boolean;
  social?: string;
  delivery?: "pickup" | "yandex";
  comment?: string;
}

const LIMITS = {
  name: 100,
  phone: 30,
  social: 100,
  email: 254,
  comment: 500,
} as const;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;");

const normalizeText = (value: unknown, maxLength: number) => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ");
  if (trimmed.length > maxLength) return null;
  return trimmed;
};

const normalizeTelegramBotToken = (value: string) => value.trim().replace(/^bot/i, "");

const validatePayload = (payload: unknown): TelegramRequest | null => {
  if (!payload || typeof payload !== "object") return null;

  const data = payload as Record<string, unknown>;
  const name = normalizeText(data.name, LIMITS.name);
  const phone = normalizeText(data.phone, LIMITS.phone);
  const email = normalizeText(data.email ?? "", LIMITS.email) ?? "";
  const social = normalizeText(data.social ?? "", LIMITS.social) ?? "";
  const comment = normalizeText(data.comment ?? "", LIMITS.comment) ?? "";
  const marketingConsent = Boolean(data.marketingConsent && email);
  const delivery = data.delivery === "pickup" || data.delivery === "yandex" ? data.delivery : null;

  if (!name || !phone || !delivery) return null;
  if (!email && !social) return null;
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return null;

  return { name, phone, email, marketingConsent, social, delivery, comment };
};

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req.headers.get("Origin"));

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    // Require Supabase anon JWT to deter unauthenticated direct calls
    const authHeader = req.headers.get("Authorization") ?? req.headers.get("authorization");
    const apiKeyHeader = req.headers.get("apikey");
    if (!authHeader?.startsWith("Bearer ") && !apiKeyHeader) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const TELEGRAM_BOT_TOKEN = normalizeTelegramBotToken(Deno.env.get("TELEGRAM_BOT_TOKEN") ?? "");
    const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID")?.trim();

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Missing Telegram configuration");
      return new Response(
        JSON.stringify({ error: "Service temporarily unavailable" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let payload: unknown;
    try {
      payload = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid request body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validated = validatePayload(payload);

    if (!validated) {
      return new Response(
        JSON.stringify({ error: "Invalid request data" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { name, phone, email, marketingConsent, social, delivery, comment } = validated;
    const deliveryText = delivery === "pickup" ? "🏠 Самовывоз" : "🚗 Яндекс Доставка";

    const message = `🎂 <b>Новая заявка с сайта Valerie Bakery</b>

👤 <b>Имя:</b> ${escapeHtml(name)}
📞 <b>Телефон:</b> ${escapeHtml(phone)}
${email ? `📧 <b>Email:</b> ${escapeHtml(email)}` : ""}
${marketingConsent ? "✅ <b>Подписка на рассылку:</b> да" : ""}
${social ? `📱 <b>Соцсеть:</b> ${escapeHtml(social)}` : ""}
${deliveryText ? `📦 <b>Доставка:</b> ${deliveryText}` : ""}
${comment ? `💬 <b>Комментарий:</b> ${escapeHtml(comment)}` : ""}

📅 <i>${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}</i>`;

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const telegramResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!telegramResponse.ok) {
      const errorText = await telegramResponse.text();
      console.error("Telegram API error", { status: telegramResponse.status, body: errorText, chatId: TELEGRAM_CHAT_ID });
      return new Response(
        JSON.stringify({ error: "Failed to send request" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    await telegramResponse.text();

    return new Response(
      JSON.stringify({ success: true, message: "Request sent successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in send-telegram function:", error instanceof Error ? error.message : "Unknown error");
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
