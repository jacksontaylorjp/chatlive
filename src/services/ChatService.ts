import { onValue, push, ref, remove } from "firebase/database"
import { db } from "../firebase"
import type { ChatMessage } from "../interfaces"

export const sendMessage = async (message: Omit<ChatMessage, 'id'>) => {
    try {
        await push(ref(db, "messages"), message)
    } catch (error) {
        console.error('Erro ao enviar uma mensagem', error)
    }
}

export const onMessageUpdate = (callback: (messages: ChatMessage[]) => void) => {
    const messagesRef = ref(db, "messages");
    return onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        const messageList: ChatMessage[] = [];
        if (data) {
            Object.entries(data).forEach(([id, value]) => {
                const { id: _, ...rest } = value as ChatMessage;
                messageList.push({ id, ...rest });
            })
        }
        callback(messageList);
    })
}

export const deleteMessage = async (id: string) => {
    try {
        await remove(ref(db, `messages/${id}`));
    } catch (error) {
        console.error("Erro ao deletar a mensagem", error);
    }
}

export const replyMessage = async (
    replyMessage: Omit<ChatMessage, 'id'>,
    repliedMessage: ChatMessage
) => {
    try {
        await push(ref(db, "messages"), {
            ...replyMessage,
            replyTo: repliedMessage,
        })
    } catch (error) {
        console.error("Erro ao responder a mensagem", error);
    }
}