'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { X, Send, Sparkles, Trash2, Loader2 } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  '介绍一下袁苏洋',
  '他参加过哪些项目？',
  '他的发明专利是什么？',
  '怎么联系到他？',
];

const INITIAL_GREETING =
  '你好呀～我是小溯，袁苏洋的赛博助手 ✦\n你想了解他的项目、技能还是联系方式呢？';

export default function FloatingMascot() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 600);
    return () => window.clearTimeout(t);
  }, []);

  // Auto-scroll to bottom on new message / streaming
  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, pending, open]);

  // Focus textarea when opening
  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 200);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  // Cancel pending request on unmount
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || pending) return;
      setError(null);

      const nextHistory: ChatMessage[] = [
        ...messages,
        { role: 'user', content: trimmed },
      ];
      // Add a placeholder assistant message we'll stream into
      setMessages([...nextHistory, { role: 'assistant', content: '' }]);
      setInput('');
      setPending(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: nextHistory }),
          signal: controller.signal,
        });
        if (!res.ok || !res.body) {
          throw new Error(`HTTP ${res.status}`);
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          // SSE: split by double newline
          const events = buffer.split('\n\n');
          buffer = events.pop() ?? '';

          for (const evt of events) {
            const lines = evt.split('\n');
            let event = 'message';
            let data = '';
            for (const line of lines) {
              if (line.startsWith('event:')) {
                event = line.slice(6).trim();
              } else if (line.startsWith('data:')) {
                // SSE spec: only strip a single leading space, preserve token internal whitespace
                data += line.slice(5).replace(/^ /, '');
              }
            }
            const payload = data.replace(/\\n/g, '\n');
            if (event === 'delta' && payload) {
              setMessages((prev) => {
                const copy = prev.slice();
                const last = copy[copy.length - 1];
                if (last && last.role === 'assistant') {
                  copy[copy.length - 1] = {
                    role: 'assistant',
                    content: last.content + payload,
                  };
                }
                return copy;
              });
            } else if (event === 'error') {
              throw new Error(payload || '出错了');
            }
          }
        }
      } catch (e) {
        if ((e as Error).name === 'AbortError') return;
        const msg = e instanceof Error ? e.message : '请求失败';
        setError(msg);
        setMessages((prev) => {
          const copy = prev.slice();
          const last = copy[copy.length - 1];
          if (last && last.role === 'assistant' && last.content === '') {
            copy.pop();
          }
          return copy;
        });
      } finally {
        setPending(false);
        abortRef.current = null;
      }
    },
    [messages, pending]
  );

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      sendMessage(input);
    },
    [input, sendMessage]
  );

  const handleClear = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setPending(false);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-700 ease-out ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
    >
      <div className="relative flex flex-col items-end gap-3">
        {/* Chat panel */}
        {open && (
          <div className="w-[340px] sm:w-[380px] max-h-[70vh] flex flex-col rounded-2xl border border-cyber-blue/30 bg-[#0a0d14]/95 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,212,255,0.18)] overflow-hidden animate-fade-in-up">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-cyber-blue/15 bg-gradient-to-r from-cyber-blue/8 to-transparent">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyber-blue" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400 border border-[#0a0d14] shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-tight">
                    小溯 · SY-Assistant
                  </p>
                  <p className="text-[10px] text-cyber-blue/60 tracking-wider font-mono">
                    ONLINE · 随时为你解答
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={messages.length === 0 && !pending}
                  aria-label="清空对话"
                  className="p-1.5 rounded-md text-slate-500 hover:text-cyber-blue hover:bg-cyber-blue/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title="清空对话"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="收起对话"
                  className="p-1.5 rounded-md text-slate-500 hover:text-cyber-blue hover:bg-cyber-blue/10 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[260px] max-h-[420px] scroll-smooth"
            >
              {/* Initial greeting */}
              {messages.length === 0 && (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-cyber-blue/15 border border-cyber-blue/30 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-cyber-blue" />
                    </div>
                    <div className="rounded-2xl rounded-tl-sm bg-[#0d1117] border border-cyber-blue/15 px-3.5 py-2.5 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap max-w-[78%]">
                      {INITIAL_GREETING}
                    </div>
                  </div>
                  <div className="pl-9 space-y-1.5">
                    <p className="text-[10px] text-slate-500 tracking-wider">
                      试试这些问题：
                    </p>
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => sendMessage(s)}
                        className="block w-fit text-left text-[11px] text-cyber-blue/80 hover:text-cyber-blue px-2.5 py-1 rounded-md border border-cyber-blue/20 hover:border-cyber-blue/50 hover:bg-cyber-blue/5 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-cyber-blue/15 border border-cyber-blue/30 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-cyber-blue" />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-wrap max-w-[78%] ${
                      m.role === 'user'
                        ? 'rounded-tr-sm bg-cyber-blue/15 border border-cyber-blue/30 text-white'
                        : 'rounded-tl-sm bg-[#0d1117] border border-cyber-blue/15 text-slate-200'
                    }`}
                  >
                    {m.content || (
                      <span className="inline-flex items-center gap-1.5 text-slate-500">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>小溯正在思考…</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {error && (
                <div className="text-[11px] text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
                  对话出错：{error}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-cyber-blue/15 bg-[#06080f]/80 px-3 py-3"
            >
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  placeholder="向小溯提问…（Enter 发送 / Shift+Enter 换行）"
                  rows={1}
                  maxLength={500}
                  className="flex-1 resize-none bg-[#0d1117] border border-cyber-blue/20 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyber-blue/50 focus:ring-1 focus:ring-cyber-blue/30 max-h-24 leading-relaxed"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || pending}
                  aria-label="发送"
                  className="flex-shrink-0 h-9 w-9 flex items-center justify-center rounded-lg bg-cyber-blue/20 border border-cyber-blue/40 text-cyber-blue hover:bg-cyber-blue/30 hover:border-cyber-blue transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {pending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-[9px] text-slate-600 tracking-wider text-center">
                AI 回答仅供参考 · Powered by 袁苏洋个人助手
              </p>
            </form>
          </div>
        )}

        {/* Mascot button */}
        <div className="relative group">
          {/* Glow ring */}
          <span className="pointer-events-none absolute inset-0 rounded-full bg-cyber-blue/15 blur-2xl scale-90 group-hover:scale-110 transition-transform duration-500" />

          {/* Mascot image */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? '收起对话' : '打开对话'}
            className={`relative block cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 ${
              !open ? 'animate-float-slow' : ''
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/mascot.png"
              alt="智能体小溯"
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-[0_8px_24px_rgba(0,212,255,0.35)] select-none"
              draggable={false}
            />

            {/* Status dot */}
            <span className="absolute bottom-2 right-2 flex h-3 w-3 items-center justify-center">
              <span
                className={`absolute inline-flex h-full w-full rounded-full bg-cyber-blue opacity-60 ${
                  !open ? 'animate-ping' : ''
                }`}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyber-blue shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
            </span>

            {/* CTA bubble when collapsed */}
            {!open && (
              <span className="absolute -top-2 -left-2 px-2 py-0.5 text-[9px] tracking-wider text-cyber-blue/90 bg-[#0d1117]/90 border border-cyber-blue/30 rounded-full whitespace-nowrap animate-pulse">
                CHAT
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
