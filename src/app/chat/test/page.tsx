"use client"

import { Button, Textarea } from "@nextui-org/react";
import { useState } from "react"
import { getChatResponse } from "./actions";
import { readStreamableValue } from "ai/rsc";
import MessageShow from "@/components/MessageShow";
import { ChatMessage } from "@/utils/types";

const fakeInputs: Record<number, string> = {
    0: "Quiero ponerle mosaicos a mi baño, que es lo que voy a necesitar?",
    1: "Quiero ponerle mosaicos a mi baño, que es lo que voy a necesitar?",
    3: "Como se vería el baño finalizado si utilizo los mosaicos azules?",
    6: "",
}

export default function Chat() {
    const [messHist, setMessHist] = useState<ChatMessage[]>([]);

    const [formState, setFormState] = useState<'idle'|'submitting'|'error'>('idle');
    const [input, setInput] = useState("");

    async function handleSend() {
        if (input.length <= 0 || input.length !== fakeInputs[messHist.length].length) return;

        setFormState('submitting');
        const inputMessages: ChatMessage[] = [
            ...messHist,
            {
                owner: 'user',
                content: input,
            }
        ];

        setMessHist([...inputMessages]);
        setInput("");

        const response = await getChatResponse(messHist.length);
        for await (const cont of readStreamableValue(response)) {
            if (!cont) continue;

            setMessHist([
                ...inputMessages,
                ...cont,
            ]);
        }

        setFormState('idle');
    }

    return (
        <div className="flex flex-col gap-1">
            {messHist.map((message, index) => (
                <MessageShow
                    key={index}
                    message={message}
                />
            ))}

            <div className="flex gap-2">
                <Textarea
                    value={input}
                    onValueChange={(value) => {
                        const result = fakeInputs[messHist.length].slice(0, value.length);
                        setInput(result);
                    }}

                    disabled={formState !== 'idle'}
                />
                <Button
                    onClick={handleSend}

                    disabled={formState !== 'idle'}
                >Send</Button>
            </div>
        </div>
    )
}
