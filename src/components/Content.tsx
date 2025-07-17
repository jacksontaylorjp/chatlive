import { Avatar, Dropdown, Flex, List, Space, Typography } from "antd";
import { Ellipsis } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReplyModal from "./ReplyModal";
import DeleteModal from "./DeleteModal";
import { useAuth } from "../hooks/useAuth";
import { deleteMessage, onMessageUpdate } from "../services/ChatService";
import type { ChatMessage } from "../interfaces";
import { formtTimesTemp } from "../utils/formatTimesTamp";

const Content = () => {
    const { user } = useAuth();
    const [messages, setmessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(true);

    const handleDelete = async (id: string) => {
        await deleteMessage(id);
    }

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onMessageUpdate(
            (mgs) => {
                setmessages(mgs);
                setLoading(false);
            }
        );
        return () => unsubscribe();
    }, [])

    const endRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])
    return (
        <List
            dataSource={messages}
            split={false}
            loading={loading}
            style={{
                width: "100%"
            }}
            renderItem={(msg) => {
                const menuItems = [];
                if (msg.userId !== user?.uid) {
                    menuItems.push({
                        key: 'reply',
                        label:
                            <ReplyModal msg={msg} />
                    })
                }
                if (msg.userId === user?.uid) {
                    menuItems.push({
                        key: "delete",
                        label:
                            <DeleteModal onConfirm={() => handleDelete(msg.id)} message={"messagem"} />
                    })
                }
                return (
                    <List.Item
                        style={{
                            justifyContent: (msg.userId === user?.uid) ? "flex-end" : "flex-start",
                        }}
                    >
                        <div
                            style={{
                                position: "relative",
                                display: "inline-block",
                                maxWidth: "90%"
                            }}
                        >
                            <Dropdown
                                menu={{ items: menuItems }}
                                trigger={["click"]}
                                placement="bottomRight"
                                arrow
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 5,
                                        right: 7,
                                        zIndex: 1,
                                        cursor: "pointer"
                                    }}
                                >
                                    {user && <Ellipsis size={18} color="var(--color-primary)" />}
                                </div>
                            </Dropdown>

                            <Space
                                direction="vertical"
                                align={msg.userId === user?.uid ? "end" : "start"}
                                style={{
                                    backgroundColor: "var(--color-background-message-default)",
                                    padding: "12px 12px",
                                    borderRadius: 8,
                                }}
                            >
                                <Typography.Title
                                    level={5}
                                    style={{
                                        color: "var(--color-text-secondary)",
                                        fontWeight: "bold",
                                        margin: 8
                                    }}
                                >
                                    {msg.text}
                                </Typography.Title>
                                {msg.replyTo && (
                                    <Flex
                                        style={{
                                            background: "var(--color-background-message-reply)",
                                            borderLeft: "3px solid var(--color-primary)",
                                            padding: "6px 10px",
                                            borderRadius: "6px 6px 6px 2px",
                                        }}
                                    >
                                        <Flex style={{ flex: 1 }} vertical>
                                            <Typography.Text
                                                style={{
                                                    color: "var(--color-text-secondary)",
                                                    fontSize: 12,
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {msg.replyTo.text}
                                            </Typography.Text>
                                            <Flex>
                                                <Avatar
                                                    size={16}
                                                    src={msg.replyTo.userPhoto}
                                                    style={{ marginRight: 4 }}
                                                />
                                                <Typography.Text
                                                    style={{
                                                        fontSize: 10,
                                                        color: "var(--color-text-secondary)"
                                                    }}
                                                >
                                                    {msg.replyTo.userName} · {formtTimesTemp(msg.replyTo.timestamp)}
                                                </Typography.Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                )}
                                <Space
                                    size={4}
                                >
                                    <Avatar
                                        size="small"
                                        src={msg.userPhoto}
                                    />
                                    <Typography.Text
                                        style={{
                                            fontSize: 10,
                                            color: "var(--color-text-secondary)"
                                        }}
                                    >
                                        {msg.userName} · {formtTimesTemp(msg.timestamp)}
                                    </Typography.Text>
                                </Space>
                            </Space>
                        </div>
                    </List.Item>
                );
            }}
        >
            <div ref={endRef} />
        </List>
    );
}

export default Content;