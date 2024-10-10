import { CSSProperties, useEffect } from "react";

import { useAuth } from "../hooks/useAuth";

import KakaoButton from "../components/Buttons/KakaoButton";

const Login = () => {
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
        if (code) login(code);
    }, [login]);

    return (
        <div>
            <div style={layout}>
                <KakaoButton />
                <p style={text}>해당 홈페이지는 개인 정보를 저장하지 않습니다.</p>
                <p style={text}>크롬 브라우저에서 더 쾌적하게 할 수 있습니다.</p>
            </div>
        </div>
    );
};

export default Login;
