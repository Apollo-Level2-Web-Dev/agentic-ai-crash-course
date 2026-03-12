# Agentic AI Crash Course

A beginner-friendly crash course on building **Agentic AI** applications using Node.js, the OpenAI SDK, and [OpenRouter](https://openrouter.ai) for model routing.

---

## What is Agentic AI?

Agentic AI refers to AI systems that can autonomously plan, reason, and take actions to accomplish goals — going beyond simple question-answering to actively interacting with tools, APIs, and environments.

---

## Project Structure

```
agentic-ai-crash-course/
├── backend/
│   ├── ai-agents.js      # Main AI agent script
│   ├── package.json      # Node.js dependencies
│   └── pnpm-lock.yaml    # Lockfile (pnpm)
└── README.md
```

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Node.js](https://nodejs.org) | JavaScript runtime |
| [OpenAI SDK](https://www.npmjs.com/package/openai) | API client for chat completions |
| [OpenRouter](https://openrouter.ai) | Unified API gateway for multiple LLMs |
| [dotenv](https://www.npmjs.com/package/dotenv) | Environment variable management |
| [pnpm](https://pnpm.io) | Fast, efficient package manager |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download) v18+
- [pnpm](https://pnpm.io/installation) v10+
- An [OpenRouter API key](https://openrouter.ai/keys)

### Installation

```bash
# Clone the repository
git clone <REPO_URL>
cd <REPO_NAME>/backend

# Install dependencies
pnpm install
```

### Configuration

Create a `.env` file in the `backend/` directory:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

### Run

```bash
node ai-agents.js
```

---

## How It Works

`ai-agents.js` initializes the OpenAI client pointed at the OpenRouter base URL, then sends a chat completion request to the `stepfun/step-3.5-flash:free` model asking *"What is Agentic AI?"*. The response is printed to the console.

---

## Resources

### Agentic AI
- [What is Agentic AI? — IBM](https://www.ibm.com/think/topics/agentic-ai)
- [Agentic AI Overview — Anthropic](https://www.anthropic.com/research/building-effective-agents)
- [LLM Agents — Lilian Weng's Blog](https://lilianweng.github.io/posts/2023-06-23-agent/)

### OpenRouter
- [OpenRouter Docs](https://openrouter.ai/docs)
- [OpenRouter Free Models](https://openrouter.ai/models?q=free)

### OpenAI SDK
- [openai npm package](https://www.npmjs.com/package/openai)
- [OpenAI Node.js SDK Docs](https://github.com/openai/openai-node)

### Node.js & Tooling
- [Node.js Official Docs](https://nodejs.org/en/docs)
- [dotenv Docs](https://github.com/motdotla/dotenv)
- [pnpm Docs](https://pnpm.io/motivation)

---