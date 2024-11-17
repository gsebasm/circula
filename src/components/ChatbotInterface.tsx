import React, { useState, FormEvent, ChangeEvent } from "react";
import { Send, Sparkles } from "lucide-react";

interface Message {
  type: "user" | "bot";
  content: string;
}

const ChatbotInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isThinking, setIsThinking] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        content: inputValue,
      },
    ]);
    setInputValue("");
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: "Esta es una respuesta de ejemplo.",
        },
      ]);
    }, 1500);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-4">
      {/* Título principal centrado */}
      <div className="max-w-2xl mx-auto mb-6 text-center">
        <h1 className="text-[2rem] leading-tight bg-gradient-to-r from-black via-[#FF0032] to-[#3800B4] inline-block text-transparent bg-clip-text">
          Hola! Soy Ceci, tu asistente virtual
        </h1>
        <p className="text-gray-400 text-lg mt-2">
          ¿Qué necesitas saber acerca de nuestros productos disponibles?
        </p>
      </div>
      {/* Contenedor del chatbot */}
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Chat Area */}
        <div className="h-[600px] flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                    message.type === "user"
                      ? "bg-[#F5F5F5] text-gray-900"
                      : "bg-gradient-to-r from-[#FF0032] to-[#3800B4] text-white"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 text-[#3800B4] animate-spin">
                  <Sparkles className="w-full h-full" />
                </div>
                <div className="bg-[#F3F0FF] text-[#3800B4] px-6 py-3 rounded-2xl font-medium">
                  Pensando...
                </div>
              </div>
            )}
          </div>
          {/* Input Area */}
          <div className="p-4 bg-white border-t">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Preguntame lo que necesites..."
                className="w-full px-4 py-4 pr-12 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#3800B4] text-gray-600 placeholder-gray-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
              >
                <div className="bg-gradient-to-r from-[#FF0032] to-[#3800B4] rounded-xl p-2">
                  <Send size={20} className="text-white" />
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotInterface;
