import { ChatMessage } from "@/utils/types";
import Image from "next/image";

interface ToolMessage {
    message: ChatMessage & { owner: 'tool' },
}

export default function ToolMessage({ message }: ToolMessage) {
    switch (message.content.type) {
        case "image":
            return (
                <div>
                    <Image
                        src={message.content.data}
                        width={120}
                        height={170}
                        alt="Picture"
                        className="rounded"
                    />
                </div>
            )
    }
}
