export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-card rounded-lg w-fit" data-testid="typing-indicator">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 bg-accent rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}
