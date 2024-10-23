import React from "react";
import styles from "./button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string | any;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    style?: React.CSSProperties;
    disabled?: boolean;
}

const Button = ({ className, text, onClick, style, disabled }: ButtonProps) => {
    return (
        <button className={styles.button} style={style} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
};

export default Button;
