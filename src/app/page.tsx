"use client";

import { useState } from "react";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatPage() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setIsThinking(true);

    // Simular respuesta del asistente
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now(),
        text: "Gracias por tu mensaje. ¿En qué más puedo ayudarte?",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsThinking(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header - Estilo actualizado */}
      <header className="bg-white px-6 py-6 max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold">
          Hola! <span className="text-red-600">Soy Ceci</span>, <span>tu </span>
          <span className="text-red-600">asistente</span>{" "}
          <span className="text-purple-600">virtual</span>
        </h1>
        <p className="text-gray-400 mt-2">
          ¿Qué necesitas saber acerca de nuestros productos disponibles?
        </p>
      </header>

      {/* Messages Container - Con borde y esquinas redondeadas */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 overflow-hidden">
        <div className="bg-white rounded-2xl border border-blue-200 h-full p-6 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`inline-block px-4 py-3 rounded-2xl ${
                  message.isUser
                    ? "bg-white border border-blue-200 text-gray-800"
                    : "bg-white border border-blue-200 text-gray-800"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-xl">
                <span className="text-purple-600">Pensando...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Form - Fijo en la parte inferior */}
      <div className="max-w-3xl mx-auto w-full px-4 py-4 bg-gray-50">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Pregúntame lo que necesites..."
            className="w-full px-4 py-4 pr-12 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent bg-white"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-blue-500 hover:text-blue-600"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14m-7-7l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
