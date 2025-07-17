import { Button, Flex, Typography } from "antd";
import { GoogleOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../hooks/useAuth";
import { AuthService } from "../services/AuthService";

const Header = () => {
    const { user } = useAuth();
    const authService = new AuthService();
    console.log("user",user);

    return (
        <Flex
            align="center"
            justify="space-between"
            style={{
                padding: "12px 24px",
                background: "var(--color-background-primary)"
            }}
        >
            <Typography.Title
                level={3}
                style={{
                    margin: 0,
                    color: "var(--color-text-primary)"
                }}
            >
                ChatLive
            </Typography.Title>
            <Button
                type="text"
                style={{
                    color: "var(--color-text-primary)"
                }}
                icon={user ?
                    <LogoutOutlined /> :
                    <GoogleOutlined />
                }
                onClick={
                    user ?
                        authService.logout :
                        authService.login
                }
            >
                {user ? "Sair" : "Entrar com Google"}
            </Button>
        </Flex>
    );
}

export default Header;