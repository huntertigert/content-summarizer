function InputForm({ text, setText, onSubmit, isLoading }) {
  return (
    <div className="bg-surface border border-line rounded-md p-5">
      <label className="block text-sm font-medium text-ink/70 mb-2">
        Paste your article
      </label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border border-line rounded-md p-3 text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-pine/40 focus:border-pine resize-none"
        rows={7}
        placeholder="Drop in an article, blog post, or announcement — we'll turn it into captions for Twitter/X, LinkedIn, and Instagram."
      />
      <div className="mt-3 flex justify-end">
        <button
          onClick={onSubmit}
          disabled={isLoading || text.trim().length < 20}
          className="px-4 py-2 bg-pine text-white text-sm font-medium rounded-md hover:bg-pine-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Summarizing…' : 'Summarize'}
        </button>
      </div>
    </div>
  );
}

export default InputForm;