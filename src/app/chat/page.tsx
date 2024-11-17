"use client";

import React, { useState, FormEvent, ChangeEvent, EventHandler } from "react";
import { Image, Send, Sparkles } from "lucide-react";
import { ChatMessage } from "@/utils/types";
import { getChatResponse } from "./test/actions";
import { readStreamableValue } from "ai/rsc";
import MessageShow from "@/components/MessageShow";
import { beforeImage } from "./test/_components/aiImage";

const fakeInputs: Record<number, string> = {
  0: "Quiero ponerle mosaicos a mi baño, que es lo que voy a necesitar?",
  1: "Quiero ponerle mosaicos a mi baño, que es lo que voy a necesitar?",
  4: "Como se vería el baño finalizado si utilizo los mosaicos azules?",
  7: "",
};

const ChatbotInterface: React.FC = () => {
  const [messHist, setMessHist] = useState<ChatMessage[]>([]);

  const [formState, setFormState] = useState<"idle" | "submitting" | "error">(
    "idle",
  );
  const [input, setInput] = useState("");

  async function handleSend(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      formState !== "idle" ||
      input.length <= 0 ||
      input.length !== fakeInputs[messHist.length].length
    )
      return;

    setFormState("submitting");
    const inputMessages: ChatMessage[] = [
      ...messHist,
      {
        owner: "user",
        content: input,
      },
    ];

    setMessHist([...inputMessages]);
    setInput("");

    const response = await getChatResponse(messHist.length);
    for await (const cont of readStreamableValue(response)) {
      if (!cont) continue;

      setMessHist([...inputMessages, ...cont]);
    }

    setFormState("idle");
  }

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
            {messHist.map((message, index) => (
              <MessageShow key={index} message={message} />
            ))}
          </div>
          {/* Input Area */}
          <div className="p-4 bg-white border-t">
            <form onSubmit={handleSend} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  const result = fakeInputs[messHist.length].slice(
                    0,
                    e.target.value.length,
                  );
                  setInput(result);
                }}
                disabled={formState !== "idle"}
                placeholder="Preguntame lo que necesites..."
                className="w-full px-4 py-4 pr-12 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#3800B4] text-gray-600 placeholder-gray-400"
              />
              {/* Send */}
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
                disabled={formState !== "idle"}
              >
                <div className="bg-gradient-to-r from-[#FF0032] to-[#3800B4] rounded-xl p-2">
                  <Send size={20} className="text-white" />
                </div>
              </button>

              {/* Image */}
              <button
                onClick={() => {
                  if (messHist.length > 0) return;
                  setMessHist([
                    {
                      owner: "tool",
                      content: {
                        type: "image",
                        data: beforeImage,
                        owner: "user",
                      },
                    },
                  ]);
                }}
                className="absolute right-14 top-1/2 -translate-y-1/2 p-2"
                disabled={formState !== "idle"}
              >
                <div className="rounded-xl p-2 hover:bg-gray-200 transition-colors">
                  <Image size={20} className="text-gray-400" />
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
