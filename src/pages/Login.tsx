import { CSSProperties, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import KakaoButton from "../components/Buttons/KakaoButton";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const layout: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    };

    const text: CSSProperties = {
        marginTop: "34px",
        fontSize: "14px",
    };

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");

        const handleLogin = async () => {
            if (code) {
                try {
                    await login(code);
                    navigate("/");
                } catch (error) {
                    console.error("Login failed");
                }
            }
        };

        handleLogin();
    }, [login, navigate]);

    return (
        <div>
            <div style={layout}>
                <KakaoButton />
                <p style={text}>해당 홈페이지는 개인 정보를 저장하지 않습니다.</p>
            </div>
        </div>
    );
};

export default Login;
