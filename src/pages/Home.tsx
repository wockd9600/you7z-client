// 더보기
import { CSSProperties, useState } from "react";

import CreateRoomButton from "components/Buttons/ActionButtons/CreateRoomButton";
import { CreatePlayListButton, EnterRoomButton, PlayListButton } from "components/Buttons/ModalButtons";
import DropdownMenu from "../components/DropdownMenu";

import { DropdownOption } from "constants/enums";

const Home = () => {
    const homeContainer: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    };

    const iconContainer: CSSProperties = {
        position: "absolute",
        top: "8px",
        right: "8px",
        cursor: "pointer",
    };

    const [isMore, setIsMore] = useState(false);

    const toggleMore = () => {
        setIsMore(!isMore);
    };

    return (
        <section style={{ height: "100%" }}>
            <article style={iconContainer}>
                <DropdownMenu options={[DropdownOption.SET_NAME, DropdownOption.LOGOUT]}></DropdownMenu>
            </article>

            <article style={homeContainer}>
                <CreateRoomButton />
                <EnterRoomButton />
                {isMore ? (
                    <div className="more">
                        <CreatePlayListButton />
                        <PlayListButton />
                    </div>
                ) : (
                    <p style={{ marginTop: "8px", cursor: "pointer" }} onClick={toggleMore}>
                        더보기..
                    </p>
                )}
            </article>

        </section>
    );
};

export default Home;
