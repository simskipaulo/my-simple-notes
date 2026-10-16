import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Notas — Caderno simples" },
      { name: "description", content: "Uma página simples para escrever e organizar suas notas." },
      { property: "og:title", content: "Notas — Caderno simples" },
      { property: "og:description", content: "Uma página simples para escrever e organizar suas notas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type Note = { id: number; text: string; date: string };

function Index() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [text, setText] = useState("");

  const add = () => {
    const t = text.trim();
    if (!t) return;
    setNotes([
      { id: Date.now(), text: t, date: new Date().toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" }) },
      ...notes,
    ]);
    setText("");
  };

  return (
    <main className="min-h-screen bg-background px-5 py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-5xl text-foreground">Notas</h1>
        <p className="mt-2 text-muted-foreground">Escreva algo. Ctrl + Enter para salvar.</p>

        <div className="mt-8 rounded-lg border border-border bg-card p-4 shadow-sm">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) add();
            }}
            placeholder="Nova nota…"
            rows={4}
            className="w-full resize-none bg-transparent text-card-foreground outline-none placeholder:text-muted-foreground"
          />
          <div className="flex justify-end">
            <button
              onClick={add}
              disabled={!text.trim()}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-40"
            >
              Adicionar
            </button>
          </div>
        </div>

        <ul className="mt-10 space-y-4">
          {notes.length === 0 && (
            <li className="text-center text-muted-foreground">Nenhuma nota ainda.</li>
          )}
          {notes.map((n) => (
            <li key={n.id} className="group rounded-lg border border-border bg-card p-4">
              <p className="whitespace-pre-wrap text-card-foreground">{n.text}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>{n.date}</span>
                <button
                  onClick={() => setNotes(notes.filter((x) => x.id !== n.id))}
                  className="opacity-0 transition hover:text-destructive group-hover:opacity-100"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
