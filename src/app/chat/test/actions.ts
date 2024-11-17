"use server"

import { ChatMessage, ToolContent } from "@/utils/types";
import { createStreamableValue } from "ai/rsc"
import { aiImage } from "./_components/aiImage";

// const responses: Record<number, string> = {
//     0: "Para colocar mosaicos en tu baño necesitaras lo siguiente:\n*Catalogo mosaicos (14m2)*\n*Catálogo pegamento para azulejos (55kg)*",
//     2: "*Imagen* Aquí tienes una visualización de cómo se vería tu baño con los mosaicos azules.",
// };

const responses: Record<number, ({ type: 'str', cont: string }|{ type: 'tool', cont: ToolContent })[]> = {
    0: [{ type: 'str', cont: 'Para colocar mosaicos en tu baño necesitaras lo siguiente:\n*Catalogo mosaicos (14m2)*\n*Catálogo pegamento para azulejos (55kg)*' }],
    2: [{ type: 'tool', cont: { type: 'image', data: aiImage } }, { type: 'str', cont: 'Aquí tienes una visualización de cómo se vería tu baño con los mosaicos azules.' }],
};

export async function getChatResponse(responseId: number) {
    if (!(responseId in responses)) throw Error("Response does not exists!");

    let result: ChatMessage[] = [];
    const stream = createStreamableValue<ChatMessage[]>([...result]);

    (async () => {
        for (const resp of responses[responseId]) {
            stream.update([...result]);

            if (resp.type === 'tool') {
                await new Promise(f => setTimeout(f, 300));
                result = [
                    ...result,
                    {
                        owner: 'tool',
                        content: resp.cont,
                    },
                ];
                continue;
            } 

            let charQuant = 0;
            while (charQuant < resp.cont.length) {
                const randomNum = Math.random();
                if (randomNum < 0.6) {
                    await new Promise(f => setTimeout(f, 100));
                    charQuant += 4;
                } else if (randomNum < 0.9) {
                    await new Promise(f => setTimeout(f, 200));
                    charQuant += 8;
                } else {
                    await new Promise(f => setTimeout(f, 400));
                    charQuant += 12;
                }

                stream.update([
                    ...result,
                    {
                        owner: 'ai',
                        content: resp.cont.slice(0, charQuant),
                    }
                ]);
            }
            result = [
                ...result,
                {
                    owner: 'ai',
                    content: resp.cont,
                }
            ]
        }

        

        stream.done([...result]);
    })();

    return stream.value;
}
