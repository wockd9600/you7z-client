import { useEffect } from "react";

const isIOS = () => {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
};

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
                onFocusCallback();
            } else {
                onBlurCallback();
            }
        };

        if (isIOS()) {
            document.addEventListener("visibilitychange", onVisibilityChange);
            document.addEventListener("webkitvisibilitychange", onVisibilityChange);
        } else {
            window.addEventListener("focus", onWindowFocus);
            window.addEventListener("blur", onWindowBlur);
        }

        return () => {
            if (isIOS()) {
                document.removeEventListener("visibilitychange", onVisibilityChange);
                document.removeEventListener("webkitvisibilitychange", onVisibilityChange);
            } else {
                window.removeEventListener("focus", onWindowFocus);
                window.addEventListener("blur", onWindowBlur);
            }
        };
    }, []);
    return null;
}
