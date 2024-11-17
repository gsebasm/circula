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
};
