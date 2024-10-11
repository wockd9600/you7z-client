// 더보기
import YouTube, { YouTubeEvent } from "react-youtube";

import { CSSProperties, useEffect, useRef, useState } from "react";

import { useAuth } from "../hooks/useAuth";

import KakaoButton from "../components/Buttons/KakaoButton";
import Button from "components/Common/Button";

const Login = () => {
    function isDesktop(): boolean {
        const userAgent = navigator.userAgent.toLowerCase();

        // 모바일 기기에 해당하는 문자열이 포함되어 있는지 확인
        const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

        return !isMobile; // 모바일이 아니면 데스크톱으로 판단
    }

    interface YouTubePlayer {
        playVideo: () => void;
        stopVideo: () => void;
        mute: () => void;
    }

    const playerRef1 = useRef<YouTubePlayer | null>(null);

    const [isPlaySongButtonForSafari, setIsPlaySongButtonForSafari] = useState(false);

    setTimeout(() => {
        handlePlaySong();
    }, 1000);

    const _onReadyTemp = (event: YouTubeEvent) => {
        playerRef1.current = event.target;
    };

    const handlePlaySong = (possibleAudioPlayer = true) => {
        // 모바일은 자동재생이 안된다.
        // 자동재생이고(클릭x) 모바일이면 => 재생 버튼을 생성한다.
        console.log(possibleAudioPlayer, !isDesktop())
        if (possibleAudioPlayer && !isDesktop()) {
            setIsPlaySongButtonForSafari(true);
            return;
        }

        if (playerRef1.current) playerRef1.current.playVideo();
    };

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
            {isPlaySongButtonForSafari && <Button text={"노래 재생"} onClick={() => handlePlaySong(false)} style={{ width: "80%", height: "40px" }} />}
            <YouTube videoId="ZSeRwk632G0" onReady={_onReadyTemp} />
            </div>

        </div>
    );
};

export default Login;
