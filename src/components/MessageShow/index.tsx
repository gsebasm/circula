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
                <div className="flex gap-1">
                    <p>{message.owner}:</p>
                    <p>{message.content}</p>
                </div>
            )
    }
}
