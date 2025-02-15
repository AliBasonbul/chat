"use client";
import { useChat } from "../../hooks/useChat";
import ChatBox from "../../components/ChatBox";

export default function Chat() {
  const { messages, message, setMessage, username, setUsername, sendMessage, users, isLoggedIn, handleLogin } = useChat();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="w-full max-w-2xl p-6 bg-white shadow-2xl rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Nice to see you, <span className="text-blue-500">{username}</span> ! Let's start chatting 🎉
        </h1>

        {!isLoggedIn ? (
          <div className="flex flex-col items-center">
            <input
              type="text"
              className="w-full p-2 mb-4 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your username..."
              value={username}
              onChange={(e:any) => setUsername(e.target.value)}
            />
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-200" onClick={handleLogin}>
              Join Chat
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            {/* قائمة المستخدمين */}
            <div className="w-full bg-gray-200 p-2 rounded-lg shadow-md mb-4 flex overflow-x-auto gap-2">
              {users.map((user) => (
                <span key={user.id} className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">{user.username}</span>
              ))}
            </div>

            {/* استخدام ChatBox بدلًا من كتابة الكود مباشرة */}
            <div className="flex flex-col h-[400px] sm:h-[500px] border border-gray-300 rounded-lg overflow-auto">
              <ChatBox messages={messages} currentUser={username} />

            </div>
              <div className="flex gap-2 p-2 bg-white">
                <input type="text" className="flex-1 p-2 border rounded" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="message..." />
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded" onClick={sendMessage}>Send</button>
              </div>
          </div>
        )}
      </div>
    </div>
  );
}
