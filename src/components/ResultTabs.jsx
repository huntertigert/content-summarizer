import { useState } from 'react';
import ResultCard from './ResultCard';

function ResultTabs({ results }) {
  const platforms = ['twitter', 'linkedin', 'instagram'];
  const [activeTab, setActiveTab] = useState(platforms[0]);

  return (
    <div className="mt-6">
      <div className="flex gap-1 border-b border-line mb-4">
        {platforms.map((p) => (
          <button
            key={p}
            onClick={() => setActiveTab(p)}
            className={`px-4 py-2 text-sm font-medium capitalize border-b-2 -mb-px transition-colors ${
              activeTab === p
                ? 'border-pine text-pine'
                : 'border-transparent text-ink/50 hover:text-ink'
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <ResultCard platform={activeTab} content={results[activeTab]} />
    </div>
  );
}

export default ResultTabs;