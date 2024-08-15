import styles from "./css/GameBox.module.css";

const UserPanel = () => {
    const isManager = true;
    const users = [
        { name: "안녕하세요 저예요", score: 0 },
        { name: "그렇습니까?", score: 0 },
        { name: "우치하 김동현", score: 0 },
        { name: "가낟라마바사", score: 0 },
        { name: "박딴딴", score: 0 },
        { name: "박딴딴", score: 0 },
        { name: "박딴딴", score: 0 },
    ];

    const kickUser = () => {
        //kick user
    }

    return (
        <article className={styles.userPanelContainer}>
            {users.map((item, index) => {
                return (
                    <ul key={index} className={styles.userRow}>
                        <li className={`${styles.userColor} user-color${index + 1}`}></li>
                        <li>{item.name}</li>
                        <li>{item.score}</li>
                        {isManager && <li onClick={kickUser} style={{ color: "red", cursor: "pointer" }}>x</li>}
                    </ul>
                );
            })}
        </article>
    );
};

export default UserPanel;
