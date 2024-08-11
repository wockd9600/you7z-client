import { CSSProperties } from "react";
import KakaoButton from "../components/Buttons/KakaoButton";

const Login = () => {
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

    const code = new URL(window.location.href).searchParams.get("code");

    if (code) {
        // (server) kakao login
        return null;
    }

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
