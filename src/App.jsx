import { useState } from 'react';
import InputForm from './components/InputForm';
import ResultTabs from './components/ResultTabs';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [text, setText] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }
      setResults(data);
    } catch (err) {
      setError('Could not reach the server. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="font-serif text-3xl font-semibold text-ink mb-1">
          Content Caption Kit
        </h1>
        <p className="text-ink/60 mb-8">
          Paste an article. Get post copy for Twitter, LinkedIn, and Instagram.
        </p>

        <InputForm text={text} setText={setText} onSubmit={handleSubmit} isLoading={isLoading} />

        {isLoading && (
          <div className="mt-6">
            <LoadingSpinner />
          </div>
        )}
        {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
        {results && <ResultTabs results={results} />}
      </div>
    </div>
  );
}

export default App;