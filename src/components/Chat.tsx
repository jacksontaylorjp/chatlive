import { Button, Flex, Grid, Input, message, Typography } from "antd";
import { useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import type { ChatMessage } from "../interfaces";

const Chat = () => {
    const [text, setText] = useState<string>("");
    const user = {
        uid: "123",
        displayName: "joão",
        photoURL: "https://avatars.githubusercontent.com/u/42698510?v=4"
    }
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const handleSend = () => {
        if (!text.trim) return;
        if (!user) return;
        const message: Omit<ChatMessage, 'id'> = {
            text,
            userId: user.uid,
            userName: user.displayName,
            userPhoto: user.photoURL,
            //colocar horario do server
            timestamp: new Date()
        }
        setText("");
        console.log(message)
    }
    return (
        <Flex
            align="center"
            justify="center"
            style={{
                height: "100vh",
                background: "var(--color-background-primary)"
            }}
            gap={4}
            vertical
        >
            <Typography.Title
                level={4}
                style={{
                    margin: 0,
                    color: "var(--color-text-primary)",
                    textAlign: "center"
                }}
            >
                Bem vindo ao ChatLive!
            </Typography.Title>
            <Flex
                style={{
                    background: "var(--color-background-secondary)",
                    height: "80vh",
                    width: screens.xs ? "80vw" : "50vw",
                    padding: 16,
                    borderRadius: 8

                }}
                vertical
            >
                <Flex
                    gap={8}
                >
                    <Input
                        placeholder="Digite sua mensagem..."
                        value={text}
                        disabled={!user}
                        onChange={(e) => setText(e.target.value)}
                        onPressEnter={handleSend}
                        style={{
                            color: "var(--color-text-secondary)"
                        }}
                        className="custom-input"
                    />
                    <Button
                        icon={<SendOutlined />}
                        disabled={!user}
                        onClick={handleSend}
                        style={{
                            color: "var(--color-text-secondary)",
                            borderColor: "var(--color-border-secondary)"

                        }}
                    />
                </Flex>
            </Flex>
        </Flex>
    );
}

export default Chat;