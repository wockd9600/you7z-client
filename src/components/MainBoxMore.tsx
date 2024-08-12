import { useState } from "react";
import { CreatePlayListButton, PlayListButton } from "components/Buttons/index";

const MainBoxMore = () => {
    const [isMore, setIsMore] = useState(false);

    const toggleMore = () => {
        setIsMore(!isMore);
    };

    return (
        <article>
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
    );
};

export default MainBoxMore;
