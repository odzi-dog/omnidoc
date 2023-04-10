export interface TextSection {
    id: string,
    type: 'text',
    payload: TextSectionPayload,
};

export interface TextSectionPayload {
    content: string,
};