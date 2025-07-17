import { Button, Flex, Input, Modal, Typography } from "antd";
import { MessageCircleReply } from "lucide-react";
import { useState } from "react";
import type { ChatMessage } from "../interfaces";

const ReplyModal = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [reply, setReply] = useState<string>("");

    const user = {
        userId: '01',
        userName: "jackson",
        userPhoto: "",
    }

    const showModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handleSend = () => {
        if (!user) return;
        const messageReply: Omit<ChatMessage, 'id'> = {
            text: reply,
            userId: user.userId,
            userName: user.userName,
            userPhoto: user.userPhoto,
            timestamp: new Date()
        }
        console.log(messageReply);
        setReply("");
        setIsModalOpen(false);

    }
    return (
        <>
            <Flex
                onClick={showModal}
                align="center"
                gap={2}
                style={{
                    cursor: "pointer"
                }}
            >
                <MessageCircleReply
                    size={18}
                    color="var(--color-primary)"
                />
                <Typography
                    style={{
                        color: "var(--color-text-secondary)"
                    }}
                >
                    Responder
                </Typography>
            </Flex>
            <Modal
                title="Responder"
                open={isModalOpen}
                onCancel={closeModal}
                footer={null}
                width={340}
            >
                <Input
                    value={reply}
                    onChange={e => setReply(e.target.value)}
                    onPressEnter={handleSend}
                    placeholder="Digite sua resposta..."
                    style={{
                        color: "var(--color-text-secondary)"
                    }}
                    className="custom-input"
                />
                <Flex
                    justify="flex-end"
                    gap={10}
                    style={{
                        marginTop: 16
                    }}
                >
                    <Button
                        onClick={closeModal}
                        style={{
                            color: "var(--color-text-secondary)",
                            borderColor: "var(--color-border-secondary)",
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSend}
                        disabled={!reply.trim()}
                        style={{
                            color: "var(--color-text-primary)",
                            borderColor: "var(--color-border-secondary)",
                            background: "var(--color-background-primary)",
                        }}
                    >
                        Enviar
                    </Button>
                </Flex>
            </Modal>
        </>
    );
}

export default ReplyModal;