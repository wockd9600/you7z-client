import Button from "../../Common/Button";

const PlayListButton = () => {
    const clickButton = () => {
        console.log("click");
    };

    return <Button text="노래모음" onClick={clickButton} />
};

export default PlayListButton;