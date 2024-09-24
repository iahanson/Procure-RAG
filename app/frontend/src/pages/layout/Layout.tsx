import { Outlet, NavLink, Link } from "react-router-dom";

import rbkc_logo from "../../assets/RBKC.png";

import styles from "./Layout.module.css";

import { useLogin } from "../../authConfig";

import { LoginButton } from "../../components/LoginButton";

const Layout = () => {
    return (
        <div className={styles.layout}>
            <header className={styles.header} role={"banner"}>
                <div className={styles.headerContainer}>
                    <Link to="/" className={styles.headerTitleContainer}>
                        <h3 className={styles.headerTitle}>GPT3.5 + RBKC Enterprise data</h3>
                    </Link>
                    <nav>
                        <ul className={styles.headerNavList}>
                            {/* {<li>
                                <NavLink to="/" className={({ isActive }) => (isActive ? styles.headerNavPageLinkActive : styles.headerNavPageLink)}>
                                    Chat
                                </NavLink>
                            </li>}
                            {<li className={styles.headerNavLeftMargin}>
                               <NavLink to="/qa" className={({ isActive }) => (isActive ? styles.headerNavPageLinkActive : styles.headerNavPageLink)}>
                                   Ask a question
                                </NavLink>
                            </li>} */}

                            <li className={styles.headerNavLeftMargin}>
                                <a
                                    href="https://officesharedservice.sharepoint.com/sites/RBKCProcurementAct2023"
                                    target={"_blank"}
                                    title="Procurement SharePoint Page"
                                >
                                    Procurement SharePoint Page
                                    {/* <img
                                        src={rbkc_logo}
                                        alt="RBKC logo"
                                        // aria-label="Link to github repository"
                                        width="200px"
                                        height="40px"
                                        className={styles.rbkcLogo}
                                    /> */}
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <h4 className={styles.headerRightText}>Azure OpenAI + AI Search</h4>
                    {useLogin && <LoginButton />}
                </div>
            </header>

            <Outlet />
        </div>
    );
};

export default Layout;
