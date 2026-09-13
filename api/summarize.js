// api/summarize.js
// Vercel serverless function — POST /api/summarize
// Body: { text: string }
// Returns: { twitter: string, linkedin: string, instagram: string }

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body || {};

  // Basic validation — fail fast with a clear message
  if (!text || typeof text !== 'string' || text.trim().length < 20) {
    return res.status(400).json({
      error: 'Please provide at least 20 characters of article text.',
    });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929', // check console.anthropic.com for latest model string
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: `Summarize the following article in 2-3 sentences, then write social media captions for Twitter/X, LinkedIn, and Instagram based on it.

STRICT REQUIREMENT: The "twitter" field MUST be 260 characters or fewer (leaving room for a link). Count carefully and stay under this limit — this is a hard constraint, not a suggestion.

Respond ONLY with valid JSON in this exact shape, no markdown fences, no preamble:
{"summary": "...", "twitter": "...", "linkedin": "...", "instagram": "..."}

Article:
${text}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error('Anthropic API error:', response.status, errBody);
      return res.status(502).json({ error: 'The summarization service failed. Please try again.' });
    }

    const data = await response.json();

    // Extract the text block from Claude's response
    const rawText = data.content?.find((block) => block.type === 'text')?.text || '';

    // Claude sometimes wraps JSON in fences despite instructions — strip defensively
    const cleaned = rawText.replace(/```json|```/g, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error('Failed to parse model output:', rawText);
      return res.status(502).json({ error: 'Received an unexpected response format. Please try again.' });
    }

    // After parsing `parsed` from the model response:
    if (parsed.twitter && parsed.twitter.length > 280) {
    parsed.twitter = parsed.twitter.slice(0, 277) + '...';
    }

    return res.status(200).json(parsed);
  } catch (err) {
    console.error('Unexpected error in /api/summarize:', err);
    return res.status(500).json({ error: 'Something went wrong on our end. Please try again shortly.' });
  }
}