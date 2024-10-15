// 더보기
import { CSSProperties, useEffect } from "react";

import { useAuth } from "../hooks/useAuth";

import KakaoButton from "../components/Buttons/KakaoButton";
// import useWindowFocus from "hooks/useWindowFocus";

const Login = () => {
    const { login } = useAuth();
    // const [y, setY] = useState(0);

    const layout: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    };

    const text: CSSProperties = {
        marginTop: "34px",
        fontSize: "18px",
    };

    const smallText: CSSProperties = {
        marginTop: "34px",
        fontSize: "16px",
    };

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");
        if (code) login(code);
    }, [login]);

    // useEffect(() => {
    //     let startTy: number;
    //     let isInArea: boolean;

    //     const touchStartHandler = (e: TouchEvent) => {
    //         console.log("start");
    //         const touches = e.touches[0];
    //         startTy = touches.clientY;
    //         setY(startTy);
    //         if (startTy < 20) isInArea = true;
    //         else isInArea = false;
    //     };

    //     const touchsMoveHandler = (e: TouchEvent) => {
    //         if (!isInArea) return;

    //         console.log("move");
    //         const touches = e.changedTouches[0];
    //         const endTy = touches.clientY;
    //         setY(endTy);
    //         const distanceY = endTy - startTy;

    //         if (distanceY > 20) {
    //             alert("warning!!!");
    //             isInArea = false;
    //         }
    //         console.log(endTy, distanceY);
    //     };
    //     window.addEventListener("touchstart", touchStartHandler);
    //     window.addEventListener("touchmove", touchsMoveHandler);

    //     return () => {
    //         // 컴포넌트 언마운트 시 이벤트 리스너 제거
    //         window.removeEventListener("touchstart", touchStartHandler);
    //         window.removeEventListener("touchmove", touchsMoveHandler);
    //     };
    // }, []);

    /** 화면에서 나갔을때 **/
    // const onWindowBlur = () => {
    //     // 여기에 원하는 동작 구현
    //     alert("useWindowFocus blur");
    // };

    // /** 화면으로 복귀했을때 **/
    // const onWindowFocus = () => {
    //     // 여기에 원하는 동작 구현
    //     // alert("useWindowFocus focus");
    // };

    // useWindowFocus(onWindowFocus, onWindowBlur);

    // const a = () => {
    //     alert("d")
    // }
    
    // window.addEventListener("blur", () => a);
    // window.addEventListener("focus", () => a);

    return (
        <div>
            <div style={layout}>
                {/* {y} */}
                <KakaoButton />
                <p style={text}>해당 홈페이지는 개인 정보를 저장하지 않습니다.</p>
                <div style={smallText}>
                    <p>PC와 크롬에서 더 쾌적하게 할 수 있습니다.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
