import Button from "components/Common/Button";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    direction: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const PageButton = ({ direction, onClick }: ButtonProps) => {
    return <Button text={direction} onClick={onClick} />;
};

export default PageButton;
