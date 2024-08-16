import React, { CSSProperties, useState } from "react";
import { useNavigate } from "react-router-dom";

import Icon from "./Icon";
import SetNameModal from "./Modals/SetNameModal";

import { useAuth } from "../hooks/useAuth";
import { DropdownOption } from "constants/enums";

interface DropdownProps {
    options: number[];
}

const liName = ["이름변경", "로그아웃"];

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
    const dropdownContainer: CSSProperties = {
        position: "absolute",
        top: "8px",
        right: "8px",
        cursor: "pointer",
    };

    const iconContainer: CSSProperties = {
        display: "flex",
        width: "150px",
        justifyContent: "right",
    };

    const navigate = useNavigate();
    const { logout } = useAuth();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isSetNameModalOpen, setSetNameModalOpen] = useState(false);

    const toggleDropdown = (): void => {
        setIsOpen(!isOpen);
    };

    const closeSetNameModal = () => setSetNameModalOpen(false);

    //* 내가 만든 플레이리스트, 내다 담은 플레이리스트 보기
    const handleOptionClick = (option: DropdownOption): void => {
        switch (option) {
            case DropdownOption.SET_NAME:
                setSetNameModalOpen(true);
                break;
            case DropdownOption.LOGOUT:
                logout();
                setTimeout(() => navigate("/"), 0);
                break;
            default:
                console.log("Unknown option selected");
        }

        setIsOpen(false);
    };

    return (
        <article style={dropdownContainer}>
            <div style={{ position: "relative", display: "inline-block" }}>
                <div style={iconContainer}>
                    <Icon name="setting" onClick={toggleDropdown} />
                </div>
                {isOpen && (
                    <article>
                        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0, 0, 0, 0)", display: "flex", justifyContent: "center", alignItems: "center", cursor: "auto" }} onClick={toggleDropdown}></div>

                        <ul
                            style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                width: "150px",
                                padding: 0,
                                margin: 0,
                                listStyleType: "none",
                                backgroundColor: "#fff",
                                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
                                zIndex: 1000,
                            }}
                        >
                            {options.map((option, index) => (
                                <li key={index} style={{ padding: "10px", cursor: "pointer" }} onClick={() => handleOptionClick(option)}>
                                    {liName[option]}
                                </li>
                            ))}
                        </ul>
                    </article>
                )}
                <article>{isSetNameModalOpen && <SetNameModal isOpen={isSetNameModalOpen} onClose={closeSetNameModal} />}</article>
            </div>
        </article>
    );
};

export default Dropdown;
