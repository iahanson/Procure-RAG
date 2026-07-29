import styles from "./Tips.module.css";

export const Tips = () => {
    return (
        <div className={styles.tipsContainer}>
            <ul className={styles.tipsText}>
                <li>
                    Read the{" "}
                    <a href="https://officesharedservice.sharepoint.com/sites/RBKCAIHub/SitePages/Resources.aspx" target="_blank">
                        guidelines
                    </a>{" "}
                    on the K&C AI Hub.
                </li>
            </ul>
            <ul className={styles.tipsText}>
                <li>
                    This is a Retrieval Augmented Generation application.{" "}
                    <a href="https://officesharedservice.sharepoint.com/sites/RBKCAIHub/SitePages/Retrieval-Augmented-Generation-(RAG).aspx" target="_blank">
                        {" "}
                        Find out more
                    </a>
                </li>
            </ul>
            <ul className={styles.tipsText}>
                <li>
                    Not getting the response you expected? Try altering your{" "}
                    <a
                        href="https://officesharedservice.sharepoint.com/:b:/r/sites/RBKCAIHub/Shared%20Documents/AI%20Builder%20Prompting%20Guide.pdf#page=3?csf=1&web=1&e=1aF1Ts"
                        target="_blank"
                    >
                        prompt
                    </a>{" "}
                </li>
            </ul>
            <ul className={styles.tipsText}>
                <li>
                    List of included{" "}
                    <a
                        href="https://officesharedservice.sharepoint.com/:b:/r/sites/RBKCAIHub/Shared%20Documents/Procurement%20Knowledge%20Base.pdf?csf=1&web=1&e=QMooq3"
                        target="_blank"
                    >
                        documents
                    </a>{" "}
                    in the knowledge base for this app
                </li>
            </ul>
        </div>
    );
};
