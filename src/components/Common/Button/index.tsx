import React from "react";
import styles from "./button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    style?: { width?: string, height?: string, fontSize?: string, marginBottom?: string };
}

const Button = ({ text, onClick, style }: ButtonProps) => {
    return (
        <button className={styles.button} style={style} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
