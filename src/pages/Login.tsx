// 더보기
import { CSSProperties, useEffect, useState } from "react";

import { useAuth } from "../hooks/useAuth";

import KakaoButton from "../components/Buttons/KakaoButton";

const Login = () => {
    const { login } = useAuth();
    const [y, setY] = useState(0);

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

    useEffect(() => {
        let startTy: number;
        let isInArea: boolean;

        const touchStartHandler = (e: TouchEvent) => {
            console.log("start");
            const touches = e.touches[0];
            startTy = touches.clientY;
            setY(startTy);
            if (startTy < 20) isInArea = true;
            else isInArea = false;
        };

        const touchsMoveHandler = (e: TouchEvent) => {
            if (!isInArea) return;

            console.log("move");
            const touches = e.changedTouches[0];
            const endTy = touches.clientY;
            setY(endTy);
            const distanceY = endTy - startTy;

            if (distanceY > 20) {
                alert("warning!!!");
                isInArea = false;
            }
            console.log(endTy, distanceY);
        };
        const isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        window.addEventListener(isIos === true ? 'mouseout' : 'blur', () => {
            alert("d?")
        });
        window.addEventListener("touchstart", touchStartHandler);
        window.addEventListener("touchmove", touchsMoveHandler);

        return () => {
            // 컴포넌트 언마운트 시 이벤트 리스너 제거
            window.removeEventListener("touchstart", touchStartHandler);
            window.removeEventListener("touchmove", touchsMoveHandler);
        };
    }, []);

    return (
        <div>
            <div style={layout}>
                {y}
                <KakaoButton />
                <p style={text}>해당 홈페이지는 개인 정보를 저장하지 않습니다.</p>
                <p style={text}>크롬 브라우저에서 더 쾌적하게 할 수 있습니다.</p>
            </div>
        </div>
    );
};

export default Login;
