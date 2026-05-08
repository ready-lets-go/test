# ShopMind — AI Shopping Assistant Prototype

An AI-powered shopping chat that pulls real product images via Google Custom Search. Built to test the product image search mechanic with real users.

## Tech Stack

- **Frontend**: Single `index.html` (vanilla JS, no build step)
- **Backend**: Two Vercel serverless functions (`/api/chat`, `/api/search`)
- **AI**: Anthropic Claude via `/api/chat` proxy
- **Images**: Google Custom Search API via `/api/search` proxy

---

## Setup

### 1. Get your API keys

**Anthropic API key:**
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create an API key

**Google Custom Search:**
1. Go to [console.cloud.google.com](https://console.cloud.google.com) → enable **Custom Search API** → create an API key
2. Go to [programmablesearchengine.google.com](https://programmablesearchengine.google.com) → create a search engine
3. In settings: turn on **"Search the entire web"** and **"Image search"**
4. Copy your **Search Engine ID (cx)**

---

### 2. Deploy to Vercel

```bash
npm i -g vercel
vercel
```

When prompted, set these environment variables (or add them in the Vercel dashboard under **Settings → Environment Variables**):

| Variable | Value |
|---|---|
| `ANTHROPIC_API_KEY` | `sk-ant-...` |
| `GOOGLE_API_KEY` | your Google API key |
| `GOOGLE_CX` | your Search Engine ID |

---

### 3. Done

Vercel gives you a URL like `https://shopmind-xyz.vercel.app`. Share that with testers — no API keys needed on their end.

---

## File Structure

```
/
├── index.html        ← frontend (served by Vercel as static)
├── vercel.json       ← routing config
├── api/
│   ├── chat.js       ← Anthropic proxy (keeps API key secret)
│   └── search.js     ← Google Custom Search proxy
└── README.md
```

## Local Development

```bash
vercel dev
```

This runs both the static frontend and API functions locally at `http://localhost:3000`.
