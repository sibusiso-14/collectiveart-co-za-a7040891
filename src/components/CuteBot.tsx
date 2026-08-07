import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";

import botMark from "@/assets/cute-bot.png";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput } from "@/components/ai-elements/tool";
import { getBotHistory, clearBotHistory } from "@/lib/bot.functions";

const SESSION_KEY = "cute-bot-session";

function readSessionId() {
  if (typeof window === "undefined") return null;
  let id = window.localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function CuteBot() {
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [initialMessages, setInitialMessages] = useState<UIMessage[] | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setSessionId(readSessionId());
  }, []);

  const loadHistory = useServerFn(getBotHistory);
  const clearHistory = useServerFn(clearBotHistory);

  useEffect(() => {
    if (!open || !sessionId || initialMessages) return;
    let cancelled = false;
    loadHistory({ data: { sessionId } })
      .then((rows) => {
        if (cancelled) return;
        setInitialMessages(
          rows.map((row, index) => ({
            id: `stored-${index}`,
            role: row.role,
            parts: [{ type: "text" as const, text: row.content }],
          })),
        );
      })
      .catch(() => !cancelled && setInitialMessages([]));
    return () => {
      cancelled = true;
    };
  }, [open, sessionId, initialMessages, loadHistory]);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: () => ({ sessionId }),
      }),
    [sessionId],
  );

  const ready = Boolean(sessionId && initialMessages);

  return (
    <>
      {open && ready ? (
        <ChatPanel
          key={sessionId ?? "cute-bot"}
          sessionId={sessionId!}
          initialMessages={initialMessages!}
          transport={transport}
          textareaRef={textareaRef}
          onClose={() => setOpen(false)}
          onClear={async () => {
            if (!sessionId) return;
            await clearHistory({ data: { sessionId } });
            setInitialMessages([]);
          }}
        />
      ) : null}

      {open && !ready ? (
        <div className="fixed bottom-24 right-4 z-50 w-[min(24rem,calc(100vw-2rem))] border border-border bg-background p-6 shadow-xl md:right-6">
          <Shimmer>Waking CUTE bot…</Shimmer>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close CUTE bot" : "Chat with CUTE bot"}
        className="fixed bottom-5 right-4 z-50 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background shadow-lg transition-transform duration-300 hover:scale-105 md:right-6"
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <img
            src={botMark}
            alt=""
            width={512}
            height={512}
            loading="lazy"
            className="h-12 w-12 object-contain"
          />
        )}
      </button>
    </>
  );
}

function ChatPanel({
  sessionId,
  initialMessages,
  transport,
  textareaRef,
  onClose,
  onClear,
}: {
  sessionId: string;
  initialMessages: UIMessage[];
  transport: DefaultChatTransport<UIMessage>;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  onClose: () => void;
  onClear: () => Promise<void>;
}) {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, setMessages, error } = useChat({
    id: sessionId,
    messages: initialMessages,
    transport,
  });

  const focusInput = useCallback(() => {
    requestAnimationFrame(() => textareaRef.current?.focus());
  }, [textareaRef]);

  useEffect(() => {
    focusInput();
  }, [focusInput]);

  useEffect(() => {
    if (status === "ready") focusInput();
  }, [status, focusInput]);

  const busy = status === "submitted" || status === "streaming";

  const handleSubmit = () => {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    void sendMessage({ text });
    focusInput();
  };

  return (
    <div className="fixed bottom-24 right-4 z-50 flex h-[min(32rem,calc(100vh-8rem))] w-[min(24rem,calc(100vw-2rem))] flex-col border border-border bg-background shadow-2xl md:right-6">
      <header className="flex items-center gap-3 border-b border-border px-4 py-3">
        <img
          src={botMark}
          alt=""
          width={512}
          height={512}
          loading="lazy"
          className="h-8 w-8 object-contain"
        />
        <div className="flex-1">
          <p className="font-serif text-lg leading-none">CUTE bot</p>
          <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
            Here to help
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setMessages([]);
            void onClear();
            focusInput();
          }}
          className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
        >
          New
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <Conversation className="flex-1">
        <ConversationContent className="gap-4">
          {messages.length === 0 ? (
            <div className="px-1 py-6 text-sm leading-relaxed text-muted-foreground">
              Hi — I'm CUTE bot. Ask me about a piece, a designer, sizing or how ordering works.
              Too busy to message a designer? Leave your details and we'll pass your enquiry on.
            </div>
          ) : null}

          {messages.map((message) => (
            <Message from={message.role} key={message.id}>
              <MessageContent
                className={
                  message.role === "assistant"
                    ? "bg-transparent p-0 text-foreground"
                    : "bg-primary text-primary-foreground"
                }
              >
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    return (
                      <MessageResponse key={index}>{part.text}</MessageResponse>
                    );
                  }
                  if (part.type === "tool-capture_enquiry") {
                    return (
                      <Tool defaultOpen={false} key={index}>
                        <ToolHeader type="tool-capture_enquiry" state={part.state} />
                        <ToolContent>
                          <ToolInput input={part.input} />
                          <ToolOutput output={part.output} errorText={part.errorText} />
                        </ToolContent>
                      </Tool>
                    );
                  }
                  return null;
                })}
              </MessageContent>
            </Message>
          ))}

          {status === "submitted" ? <Shimmer>Thinking…</Shimmer> : null}
          {error ? (
            <p className="text-sm text-destructive">
              Something went wrong. Please try again in a moment.
            </p>
          ) : null}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t border-border p-3">
        <PromptInput onSubmit={handleSubmit}>
          <PromptInputTextarea
            ref={textareaRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask CUTE bot…"
          />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit status={status} disabled={!input.trim() || busy} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}
