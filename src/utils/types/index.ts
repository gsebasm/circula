export type ChatMessage = {
    owner: 'user'|'ai',
    content: string,
} | {
    owner: 'tool',
    content: ToolContent
};

export type ToolContent = {
    type: 'image',
    data: string,
    owner: 'user'|'ai',
} | {
    type: 'catalog',
    title: string,
    quant: string,
    items: CatalogItem[],
};

export type CatalogItem = {
    image: string,
    name: string,
    price: string,
    footprint: string,
}
