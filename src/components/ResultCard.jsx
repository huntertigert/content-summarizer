import { useState } from 'react';

const PLATFORM_LIMITS = {
  twitter: 280,
  linkedin: 3000,
  instagram: 2200,
};

function ResultCard({ platform, content }) {
  const [copied, setCopied] = useState(false);
  const limit = PLATFORM_LIMITS[platform];
  const overLimit = content.length > limit;

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="border border-line rounded-md p-5 bg-surface">
      <div className="flex justify-between items-baseline mb-3">
        <span className="font-medium capitalize text-ink">{platform}</span>
        <span className={`text-xs font-mono ${overLimit ? 'text-red-600' : 'text-ink/40'}`}>
          {content.length}/{limit}
        </span>
      </div>
      <p className="text-ink/90 whitespace-pre-wrap leading-relaxed">{content}</p>
      <button
        onClick={handleCopy}
        className="mt-4 text-sm px-3 py-1.5 border border-line rounded-md hover:bg-paper transition-colors"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

export default ResultCard;