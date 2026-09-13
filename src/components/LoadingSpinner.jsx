function LoadingSpinner() {
  return (
    <div className="flex items-center gap-2 text-pine">
      <span className="flex gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-pine animate-bounce [animation-delay:-0.3s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-pine animate-bounce [animation-delay:-0.15s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-pine animate-bounce" />
      </span>
      <span className="text-sm font-medium">Drafting your captions</span>
    </div>
  );
}

export default LoadingSpinner;