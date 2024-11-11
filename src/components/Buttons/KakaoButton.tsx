import Button from "components/Common/Button";

function KakaoButton() {
    const button = {
        width: "260px",
        height: "80px",
        padding: "0 20px",
        fontSize: "39px",
    };

    const kakaoLogin = function () {
        const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
        const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
        const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

        window.location.href = kakaoURL;
    };

    return <Button text="카카오 로그인" className="buttonHover" onClick={kakaoLogin} style={button} />;
}

export default KakaoButton;
