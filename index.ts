import Anthropic from "@anthropic-ai/sdk";
import * as dotenv from "dotenv";
dotenv.config();

const client = new Anthropic();

async function summarize(text: string) {
  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `You are a helpful assistant for a marketing team.

Given the following article, return:
1. A 2-3 sentence summary
2. Three social media captions (one for Twitter/X, one for LinkedIn, one for Instagram)

Article:
${text}`,
      },
    ],
  });

  const response = message.content[0];
  if (response.type === "text") {
    console.log(response.text);
  }
}

const testArticle = `
Anthropic has released Claude 3, its most capable AI model to date. 
The new model outperforms competitors on a range of benchmarks including 
coding, reasoning, and creative writing. Claude 3 comes in three versions: 
Haiku, Sonnet, and Opus, catering to different speed and performance needs. 
Anthropic says safety remains a core focus, with new techniques to reduce 
harmful outputs. The model is available via API starting today.
`;

summarize(testArticle);