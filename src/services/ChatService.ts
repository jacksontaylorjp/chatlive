import { push, ref } from "firebase/database"
import { db } from "../firebase"
import type { ChatMessage } from "../interfaces"

export const sendMessage = async (message: Omit<ChatMessage, 'id'>) => {
    try {
        await push(ref(db, "messages"), message)
    } catch (error) {
        console.error('Erro ao enviar uma mensagem', error)
    }
}