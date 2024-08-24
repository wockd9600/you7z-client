import { useSelector } from "react-redux";
import { RootState } from "redux/store";

import styles from "./css/GameBox.module.css";

const UserPanel = () => {
    const users = useSelector((state: RootState) => state.game.users);

    const isManager = true;

    const kickUser = (id: number) => {
        //kick user
        console.log("kick", id);
    };

    return (
        <article className={styles.userPanelContainer}>
            {users.map((item, index) => {
                return (
                    <ul key={index} className={styles.userRow}>
                        <li className={`${styles.userColor} user-color${index + 1}`}></li>
                        <li>{item.nickname}</li>
                        <li>{item.score}</li>
                        {isManager && (
                            <li onClick={() => kickUser(item.userId)} style={{ color: "red", cursor: "pointer" }}>
                                x
                            </li>
                        )}
                    </ul>
                );
            })}
        </article>
    );
};

export default UserPanel;
