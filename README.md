# 📝 Content Summarizer

A lightweight CLI tool that uses the Claude AI API to instantly summarize articles and generate ready-to-post social media captions for your marketing team.

## ✨ Features

- **Article summarization** — generates a concise 2-3 sentence summary of any article
- **Social media captions** — produces tailored captions for Twitter/X, LinkedIn, and Instagram
- **Powered by Claude** — uses Anthropic's `claude-sonnet-4-20250514` model

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- An [Anthropic API key](https://console.anthropic.com/)

### Installation

```bash
git clone https://github.com/huntertigert/content-summarizer.git
cd content-summarizer
npm install
```

### Configuration

Create a `.env` file in the root of the project:

```
ANTHROPIC_API_KEY=your_api_key_here
```

> ⚠️ Never commit your `.env` file. It's listed in `.gitignore` by default.

## 🛠️ Usage

Run the summarizer with:

```bash
npx tsx index.ts
```

By default, the tool runs against a sample article hardcoded in `index.ts`. To summarize your own content, replace the `testArticle` variable with your text.

### Example Output

```
Summary:
Anthropic has released Claude 3, its most capable AI model yet, available in three
versions: Haiku, Sonnet, and Opus. The model leads benchmarks in coding, reasoning,
and creative writing while maintaining a strong focus on safety.

Twitter/X:
🚀 Anthropic just dropped Claude 3 — and it's rewriting the AI benchmark leaderboard.
Three versions, one mission: powerful AND safe. #AI #Claude3

LinkedIn:
Anthropic's Claude 3 marks a significant step forward in AI capability and safety.
With three model tiers tailored to different performance needs, teams can now choose
the right balance of speed and intelligence for their workflows...

Instagram:
Big news in AI! ✨ Claude 3 is here — smarter, faster, and built with safety at its
core. Which version are you most excited to try? 👇 #ArtificialIntelligence #Tech #Claude
```

## 🧰 Tech Stack

| Tool | Purpose |
|------|---------|
| [Anthropic SDK](https://github.com/anthropics/anthropic-sdk-typescript) | Claude API client |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| [tsx](https://github.com/privatenumber/tsx) | Run TypeScript directly |
| [dotenv](https://github.com/motdotla/dotenv) | Environment variable management |

## 📁 Project Structure

```
content-summarizer/
├── index.ts         # Main script
├── package.json
├── tsconfig.json
└── .env             # Your API key (not committed)
```

## 📄 License

ISC
