import { useEffect } from "react";

export default function useWindowFocus(onFocusCallback: Function, onBlurCallback: Function) {
    useEffect(() => {
        /** AOS일때 focus 함수 적용 **/
        const onWindowFocus = () => {
            onFocusCallback();
        };

        const onWindowBlur = () => {
            onBlurCallback();
        };

        /** IOS일때 focus 함수 적용 **/
        const onVisibilityChange = () => {
            if (!document.hidden) {
                alert("visible focus")
                onFocusCallback();
            } else {
                alert("visible blur")
                onBlurCallback();
            }
        };

        document.addEventListener("visibilitychange", onVisibilityChange);
        document.addEventListener("webkitvisibilitychange", onVisibilityChange);
        window.addEventListener("focus", onWindowFocus);
        window.addEventListener("blur", onWindowBlur);

        return () => {
            document.removeEventListener("visibilitychange", onVisibilityChange);
            document.removeEventListener("webkitvisibilitychange", onVisibilityChange);
            window.removeEventListener("focus", onWindowFocus);
            window.addEventListener("blur", onWindowBlur);
        };
    }, []);
    return null;
}
