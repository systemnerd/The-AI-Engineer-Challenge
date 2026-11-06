"use client";

import { useEffect, useRef, useState } from "react";

const STARTER_PROMPTS = [
  "I'm feeling overwhelmed today",
  "Help me get ready for a hard conversation",
  "I keep putting off something important",
];

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  // { message, text }: what went wrong, and the text to resend on retry.
  const [failure, setFailure] = useState(null);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  // Lets "New chat" cancel a reply that is still on its way.
  const pendingRequestRef = useRef(null);

  // Keep the latest message, typing indicator or error in view.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages, isSending, failure]);

  async function requestReply(text) {
    const controller = new AbortController();
    pendingRequestRef.current = controller;
    setIsSending(true);
    setFailure(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
        signal: controller.signal,
      });
      const data = await response.json().catch(() => ({}));

      // The chat was reset while the body was loading, so drop this reply.
      if (controller.signal.aborted) return;

      if (!response.ok) {
        setFailure({ message: data.error ?? "Something went wrong.", text });
        return;
      }
      setMessages((current) => [...current, { role: "coach", text: data.reply }]);
    } catch {
      if (controller.signal.aborted) return;
      setFailure({ message: "Can't reach the app. Check your connection.", text });
    } finally {
      // After a reset, startNewChat has already cleaned up, and a newer
      // request may be running that this must not interfere with.
      if (!controller.signal.aborted) {
        setIsSending(false);
        inputRef.current?.focus();
      }
    }
  }

  function startNewChat() {
    pendingRequestRef.current?.abort();
    setMessages([]);
    setFailure(null);
    setIsSending(false);
    inputRef.current?.focus();
  }

  function send(rawText) {
    const text = rawText.trim();
    if (!text || isSending) return;

    setMessages((current) => [...current, { role: "user", text }]);
    setDraft("");
    requestReply(text);
  }

  function handleKeyDown(event) {
    // Enter sends and Shift+Enter adds a line. isComposing leaves Enter alone
    // while an input method (for example, for Japanese) is confirming text.
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      send(draft);
    }
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-dvh flex-col">
      <header className="border-b border-line">
        <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-3 px-4 py-4">
          <div className="flex items-baseline gap-3">
            <h1 className="font-display text-2xl font-medium">Steady</h1>
            <p className="hidden text-sm text-muted sm:block">Your supportive mental coach</p>
          </div>
          {!isEmpty && (
            <button
              type="button"
              onClick={startNewChat}
              className="rounded-xl border border-line bg-surface px-3 py-1 text-sm font-medium transition-colors hover:border-accent"
            >
              New chat
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div
          role="log"
          aria-label="Conversation"
          className="mx-auto flex min-h-full w-full max-w-2xl flex-col gap-5 px-4 py-6"
        >
          {isEmpty && (
            <div className="my-auto py-8">
              <h2 className="font-display text-3xl leading-tight font-medium sm:text-4xl">
                What’s on your mind?
              </h2>
              <p className="mt-3 text-muted">
                Say it however it comes out, or start with one of these.
              </p>
              <div className="mt-6 flex flex-col items-start gap-2">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => send(prompt)}
                    className="rounded-2xl border border-line bg-surface px-4 py-2 text-left transition-colors hover:border-accent"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages are only ever appended, so the index is a stable key. */}
          {messages.map((message, index) =>
            message.role === "user" ? (
              <p
                key={index}
                className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-accent px-4 py-2.5 wrap-anywhere whitespace-pre-wrap text-on-accent"
              >
                {message.text}
              </p>
            ) : (
              <p key={index} className="leading-relaxed wrap-anywhere whitespace-pre-wrap">
                {message.text}
              </p>
            )
          )}

          {isSending && (
            <p role="status" className="flex items-center gap-2 text-muted">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="sr-only">The coach is replying</span>
            </p>
          )}

          {failure && (
            <div
              role="alert"
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-danger-soft px-4 py-3 text-danger"
            >
              <span>{failure.message}</span>
              <button
                type="button"
                onClick={() => requestReply(failure.text)}
                className="rounded-lg border border-current px-3 py-1 text-sm font-medium"
              >
                Try again
              </button>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </main>

      <footer className="border-t border-line">
        <form
          className="mx-auto w-full max-w-2xl px-4 pt-3 pb-2"
          onSubmit={(event) => {
            event.preventDefault();
            send(draft);
          }}
        >
          <div className="flex items-end gap-2 rounded-2xl border border-line bg-surface p-2 focus-within:border-accent">
            <textarea
              ref={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              autoFocus
              aria-label="Your message"
              placeholder="Type a message"
              className="field-sizing-content max-h-48 min-w-0 flex-1 resize-none bg-transparent px-2 py-1.5 outline-none placeholder:text-muted"
            />
            <button
              type="submit"
              disabled={!draft.trim() || isSending}
              className="rounded-xl bg-accent px-4 py-1.5 font-medium text-on-accent transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              Send
            </button>
          </div>
          <p className="mt-2 text-center text-xs text-muted">
            Each message starts fresh, so the coach won’t remember earlier ones. Not a substitute
            for professional care.
          </p>
        </form>
      </footer>
    </div>
  );
}
