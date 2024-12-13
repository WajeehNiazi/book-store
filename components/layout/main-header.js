import Link from "next/link";
import styles from "./main-header.module.css";
import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import { useRouter } from "next/router";

export default function MainHeader() {
    const { user, logout } = useContext(AuthContext);
    const router = useRouter();

    const logoutHandler = () => {
        logout();
        router.push("/");
    };

    const addBooksHandler = async () => {
        const response = await fetch("/api/temp/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        console.log(data);
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">Book Store</Link>
            </div>
            <nav className={styles.navigation}>
                <ul>
                    {!user && (
                        <>
                            <li>
                                <Link href="/login">
                                    <button className={styles.navButton}>Login</button>
                                </Link>
                            </li>
                            <li>
                                <Link href="/signup">
                                    <button className={styles.navButton}>Signup</button>
                                </Link>
                            </li>
                        </>
                    )}
                    <li>
                        <Link href="/books">
                            <button className={styles.navButton}>View All Books</button>
                        </Link>
                    </li>
                    <li>
                        <Link href="/authors">
                            <button className={styles.navButton}>View All Authors</button>
                        </Link>
                    </li>
                    <li>
                        <Link href="/info">
                            <button className={styles.navButton}>View Information Page</button>
                        </Link>
                    </li>
                    {user && (
                        <>
                            <li>
                                <Link href="">
                                    <button onClick={logoutHandler} className={styles.navButton}>
                                        Logout
                                    </button>
                                </Link>
                                
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}
