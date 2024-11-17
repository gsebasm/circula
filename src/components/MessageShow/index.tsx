import { ChatMessage } from "@/utils/types";
import ToolMessage from "./ToolMessage"

interface MessageShowProps {
    message: ChatMessage,
}

export default function MessageShow({ message }: MessageShowProps) {
    switch (message.owner) {
        case "tool":
            return <ToolMessage message={message}/>;
        default:
            return (
                <div
                    className={`flex ${message.owner === "user" ? "justify-end" : "justify-start"}`}
                >
                    <div
                        className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                            message.owner === "user"
                            ? "bg-[#F5F5F5] text-gray-900"
                            : "bg-gradient-to-r from-[#FF0032] to-[#3800B4] text-white"
                        }`}
                    >
                        {message.content}
                    </div>
                </div>
            )
    }
}
