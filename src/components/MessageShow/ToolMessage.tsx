import { ChatMessage } from "@/utils/types";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import CatalogItemShow from "./CatalogItem";

interface ToolMessage {
  message: ChatMessage & { owner: "tool" };
}

export default function ToolMessage({ message }: ToolMessage) {
  switch (message.content.type) {
    case "image":
      const [isGen, setIsGen] = useState(message.content.owner === "ai");

      useEffect(() => {
        (async () => {
          if (!isGen) return;
          await new Promise((f) => setTimeout(f, 5732));
          setIsGen(false);
        })();
      }, []);
      return (
        <div
          className={`flex ${message.content.owner === "user" ? "justify-end" : "justify-start"}`}
        >
          {isGen ? (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 text-[#3800B4] animate-spin">
                <Sparkles className="w-full h-full" />
              </div>
              <div className="bg-[#F3F0FF] text-[#3800B4] px-6 py-3 rounded-2xl font-medium">
                Generando...
              </div>
            </div>
          ) : (
            <Image
              src={message.content.data}
              width={120}
              height={170}
              alt="Picture"
              className="rounded"
            />
          )}
        </div>
      );
    case "catalog":
      return (
        <div className="border border-gray-100 px-5 py-3 rounded-xl bg-white">
          <p className="text-base font-medium mb-4">
            {message.content.title} - {message.content.quant}
          </p>
          <div className="flex flex-wrap gap-6">
            {message.content.items.map((item, index) => (
              <CatalogItemShow key={index} item={item} />
            ))}
          </div>
        </div>
      );
  }
}
