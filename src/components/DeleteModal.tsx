import { Button, Flex, Modal, Typography } from "antd";
import { MessageCircleX } from "lucide-react";
import { useState } from "react";

const DeleteModal = ({ onConfirm, message }: { onConfirm: () => void, message: string }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const showModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }
    const handleDelete = () => {
        onConfirm();
        closeModal();
    }
    return (
        <>
            <Flex
                onClick={showModal}
                align="center"
                gap={2}
            >
                <MessageCircleX
                    size={18}
                    color="var(--color-error)"
                />
                <Typography
                    style={{
                        cursor: "pointer",
                        color: "var(--color-error)"
                    }}
                >
                    Excluir
                </Typography>
            </Flex>
            <Modal
                title="Exclusão"
                open={isModalOpen}
                onCancel={closeModal}
                footer={null}
                width={340}
            >
                <Typography>
                    {`Tem certeza que deseja excluir esta ${message}?`}
                </Typography>
                <Flex
                    justify="flex-end"
                    gap={10}
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
                        style={{
                            backgroundColor: "var(--color-error)",
                            color: "var(--color-text-primary)"
                        }}
                        onClick={handleDelete}
                        className="custom-button-error"
                    >
                        Excluir
                    </Button>
                </Flex>
            </Modal>
        </>
    );
}

export default DeleteModal;