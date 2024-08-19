import PageButton from "components/Buttons/PageButton";
import styles from "../css/BoardTypeModal.module.css";

interface PageNavigationProps {
    page: number;
    songsLength: number;
    handlePageChange: (newPage: number) => void;
}

const PageNavigation = ({ page, songsLength, handlePageChange }: PageNavigationProps) => {
    return (
        <article className={styles.pageButton}>
            {page > -1 && <PageButton direction="&lt;" onClick={() => handlePageChange(page - 1)} />}
            {songsLength !== 0 && page < songsLength && <PageButton direction="&gt;" onClick={() => handlePageChange(page + 1)} />}
        </article>
    );
};

export default PageNavigation;
