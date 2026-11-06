# 🌿 Steady: your pocket mental coach

Welcome! This is the Next.js front end for the FastAPI coach in [`/api`](../api). You type what's on your mind, and the coach (powered by OpenAI's `gpt-5`) writes back. Deep breaths, zero setup drama.

## 🧩 How it fits together

```
Browser  →  Next.js /api/chat  →  FastAPI /api/chat  →  OpenAI
            (src/app/api/chat/route.js)
```

The browser only ever talks to Next.js. Next.js passes the message along to FastAPI, and your OpenAI key stays with the backend, far away from the browser.

## 🚀 Run it locally

You'll need two terminals, because the coach and the UI are separate servers. You'll also need Node.js 20.9 or newer.

**Terminal 1: wake up the backend** (from the repo root)

```bash
uv run uvicorn api.index:app --reload
```

This expects `OPENAI_API_KEY` to be set. See [`api/README.md`](../api/README.md) for details.

**Terminal 2: start the UI** (from this folder)

```bash
npm install
npm run dev
```

Now open [http://localhost:3000](http://localhost:3000) and say hi. 👋

## ⚙️ Configuration

| Variable | Default | What it does |
| --- | --- | --- |
| `BACKEND_URL` | `http://127.0.0.1:8000` | Where the FastAPI server lives. It's server-only, so it never reaches the browser. |

Running the backend somewhere else? Put the variable in `frontend/.env.local`.

## 🧠 Good to know

- **The coach has a goldfish memory.** The backend handles each message on its own, so it won't recall what you said earlier. The UI says so too.
- **Enter sends, Shift+Enter adds a new line.**
- **Fresh start?** Hit **New chat** to clear the screen. Chats aren't saved anywhere, so once it's gone, it's gone.
- **Light or dark?** Steady follows your system setting.

## 🛠️ Handy commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the dev server with hot reload |
| `npm run build` | Builds for production |
| `npm run start` | Serves the production build |
| `npm run lint` | Checks the code with ESLint |
