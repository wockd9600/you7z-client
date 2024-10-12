import React from "react";
import styles from "./button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    style?: { width?: string; height?: string; fontSize?: string; marginBottom?: string; padding?: string };
    disabled?: boolean;
}

const Button = ({ text, onClick, style, disabled }: ButtonProps) => {
    return (
        <button className={styles.button} style={style} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
};

export default Button;
