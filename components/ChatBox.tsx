interface ChatBoxProps {
    messages: { username: string; message: string }[];
    currentUser: string;
}

export default function ChatBox({ messages, currentUser }: ChatBoxProps) {
    return (
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
  {messages.map((msg, index) => (
    <div
      key={index}
      className="chatbox"
      style={msg.username === currentUser ? {backgroundColor: "rgb(59 130 246)", textAlign: "right", marginLeft: "auto"} : {backgroundColor: "gray", textAlign: "left"}}
    >
      <strong className="block text-xs">{msg.username}</strong>
      <p className="whitespace-pre-wrap">
        {msg.message}
      </p>
    </div>
  ))}
</div>

    );
}
