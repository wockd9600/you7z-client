import React, { CSSProperties } from "react";
import Modal from "../Common/Modal";

interface SetNameModalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen: boolean;
    onClose: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}

const SetNameModal = ({ isOpen, onClose }: SetNameModalProps) => {
    const divStyle = {
        marginTop: 10,
    };
    const inputStyle: CSSProperties = {
        width: 200,
        height: 30,
        marginRight: 10,
        fontSize: 16,
    };

    const buttonStyle: CSSProperties = {
        height: 30,
        fontSize: 16,
    };

    const messageStyle: CSSProperties = {
        margin: 0,
        marginTop: 4,
        fontSize: 16,
        color: "#009000",
        textAlign: "center",
    };

    const isMessage = false;
    let message = '변경 완료';

    const setName = () => {
        //*server
        console.log("set name");
    };

    const userName = 'ㅇㅇ'

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div style={divStyle}>
                <input type="text" style={inputStyle} value={userName}/>
                <button type="button" style={buttonStyle} onClick={setName}>
                    변경
                </button>
                {isMessage ? <p style={messageStyle}>{message}</p> : null}
            </div>
        </Modal>
    );
};

export default SetNameModal;
