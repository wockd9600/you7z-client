import MainBox from "components/MainBox";
import DropdownMenu from "../components/DropdownMenu";

const Home = () => {
    return (
        <section style={{ position: "relative", height: "100%" }}>
            <DropdownMenu></DropdownMenu>
            <MainBox />
        </section>
    );
};

export default Home;
