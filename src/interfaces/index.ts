export interface ChatMessage {
    id: string;
    text: string;
    userId: string;
    userName: string;
    userPhoto: string;
    timestamp: number | object;
    replyTo?: ChatMessage;
}