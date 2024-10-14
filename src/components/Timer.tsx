import React, { useState, useEffect } from "react";

interface TimerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isMobile: boolean;
}

const Timer = ({ isMobile = false }: TimerProps) => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        // 1초마다 상태 업데이트
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds < 54) {
                    return prevSeconds + 1;
                } else {
                    clearInterval(interval); // 타이머 멈춤
                    return prevSeconds;
                }
            });
        }, 1000);

        // 컴포넌트가 언마운트되거나 타이머가 멈출 때 클린업
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ position: "absolute", right: 10, bottom: isMobile ? "125px" : undefined }}>
            <h1>{54 - seconds}초</h1>
        </div>
    );
};

export default Timer;
