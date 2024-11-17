"use server"

import { ChatMessage, ToolContent } from "@/utils/types";
import { createStreamableValue } from "ai/rsc"
import { aiImage } from "./_components/aiImage";

// const responses: Record<number, string> = {
//     0: "Para colocar mosaicos en tu baño necesitaras lo siguiente:\n*Catalogo mosaicos (14m2)*\n*Catálogo pegamento para azulejos (55kg)*",
//     2: "*Imagen* Aquí tienes una visualización de cómo se vería tu baño con los mosaicos azules.",
// };

const responses: Record<number, ({ type: 'str', cont: string }|{ type: 'tool', cont: ToolContent })[]> = {
    1: [
        { type: 'str', cont: 'Para colocar mosaicos en tu baño necesitaras lo siguiente:\n*Catalogo mosaicos (14m2)*\n*Catálogo pegamento para azulejos (55kg)*' },
        { 
            type: 'tool', 
            cont: {
                type: 'catalog',
                title: 'Mozaicos',
                quant: '14m²',
                items: [
                    {
                        image: 'https://img.freepik.com/fotos-premium/conjunto-azulejos-flores-azules-blancas_662214-31638.jpg',
                        name: 'Floral azul',
                        price: '$103.00/m²',
                        footprint: '15%',
                    },
                    {
                        image: 'https://i.etsystatic.com/17225584/r/il/fa3552/3732560944/il_570xN.3732560944_6nmp.jpg',
                        name: 'Ajedrez verde',
                        price: '$97.00/m²',
                        footprint: '10%',
                    },
                    {
                        image: 'https://m.media-amazon.com/images/I/61qiURwDm6L._AC_UF894,1000_QL80_.jpg',
                        name: 'Menta',
                        price: '$134.00/m²',
                        footprint: '17%',
                    },
                    {
                        image: 'https://plomeriagarcia.com.mx/wp-content/uploads/2023/08/piso-ceramico-antiderrapante-color-blanco-20x30-semibrillante-interior-marmol-abadeza-lamosa-3-ok.jpg',
                        name: 'Marmol',
                        price: '$105.00/m²',
                        footprint: '12%',
                    },
                ]
            }
        }
    ],
    4: [{ type: 'tool', cont: { type: 'image', data: aiImage, owner: 'ai' } }, { type: 'str', cont: 'Aquí tienes una visualización de cómo se vería tu baño con los mosaicos azules.' }],
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
