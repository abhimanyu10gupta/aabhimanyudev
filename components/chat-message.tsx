interface ChatMessageProps {
  message: string
  isUser: boolean
  timestamp: string
}

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3 animate-slide-up`}>
      <div
        className={`max-w-[80%] ${
          isUser
            ? "bg-primary/10 border border-primary/30 text-foreground"
            : "bg-background/50 border border-border text-foreground"
        } backdrop-blur-sm p-3 relative`}
      >
        <div className="absolute top-0 left-0 h-1 w-1 bg-primary/40"></div>
        <p className="text-xs">{message}</p>
        <div className="flex justify-end mt-1">
          <span className="text-[10px] text-foreground/50">{timestamp}</span>
        </div>
      </div>
    </div>
  )
}
