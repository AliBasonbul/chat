import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export function useChat() {
    const [messages, setMessages] = useState<{ username: string; message: string }[]>([]);
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [users, setUsers] = useState<{ id: string; username: string }[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        socket.on("receiveMessage", (newMessage) => {
            setMessages((prev) => [...prev, newMessage]);
        });

        socket.on("activeUsers", (activeUsers) => {
            setUsers(activeUsers);
        });

        return () => {
            socket.off("receiveMessage");
            socket.off("activeUsers");
        };
    }, []);

    const handleLogin = () => {
        if (!username.trim()) return;
        socket.emit("join", username);
        setIsLoggedIn(true);
    };

    const sendMessage = () => {
        if (message.trim() && username.trim()) {
            socket.emit("sendMessage", { username, message });
            setMessage("");
        }
    };

    return { messages, message, setMessage, username, setUsername, sendMessage, users, isLoggedIn, handleLogin };
}
