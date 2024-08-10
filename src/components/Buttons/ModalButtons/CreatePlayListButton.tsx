import Button from "../../Common/Button";

const CreatePlayListButton = () => {
    const clickButton = () => {
        console.log("click");
    };

    return <Button text="노래모음 만들기" onClick={clickButton} />
};

export default CreatePlayListButton;
