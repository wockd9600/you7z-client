import { CSSProperties } from "react";
import { EnterRoomButton, CreateRoomButton } from "components/Buttons/index";
// import MainBoxMore from "./MainBoxMore";

const MainBox = () => {
    const homeContainer: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: "39px",
    };

    return (
        <article style={homeContainer}>
            <CreateRoomButton />
            <EnterRoomButton />
            {/* <MainBoxMore /> */}
        </article>
    );
};

export default MainBox;
