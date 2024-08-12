// 더보기

import MainBox from "components/MainBox";
import DropdownMenu from "../components/DropdownMenu";

import { DropdownOption } from "constants/enums";

const Home = () => {
    return (
        <section style={{ height: "100%" }}>
            <DropdownMenu options={[DropdownOption.SET_NAME, DropdownOption.LOGOUT]}></DropdownMenu>
            <MainBox />
        </section>
    );
};

export default Home;
