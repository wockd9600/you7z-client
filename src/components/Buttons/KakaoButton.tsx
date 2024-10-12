function KakaoButton() {
    const button = {
        height: "48px",
        padding: "0 20px",
        fontSize: "18px",
    };

    const kakaoLogin = function () {
        const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
        const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
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
