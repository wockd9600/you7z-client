function KakaoButton() {
    const button = {
        height: "36px",
        fontSize: "16px",
    };

    const kakaoLogin = function () {
        const REST_API_KEY = "0cfbf0d886ba5383f9d0b4462f8ac4ab";
        const REDIRECT_URI = "http://localhost:3000";
        const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

        window.location.href = kakaoURL;
    };

    return (
        <button type="button" style={button} onClick={kakaoLogin}>
            카카오 로그인
        </button>
    );
}

export default KakaoButton;
