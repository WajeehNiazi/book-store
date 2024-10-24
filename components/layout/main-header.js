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
    }

    const addBooksHandler = async () => {
        const response = await fetch("/api/temp/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        console.log(data);
    }

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
                                <Link href="/login">Login</Link>
                            </li>
                            <li>
                                <Link href="/signup">Signup</Link>
                            </li>
                        </>
                    )}
                    <li>
                        <Link href="/books">View All Books</Link>
                    </li>
                    <li>
                        <Link href="/authors">View All Authors</Link>
                    </li>
                    <li>
                        <Link href="/info">View Information Page</Link>
                    </li>
                    {user && (
                        <>
                            <li>
                                <button onClick={logoutHandler} className={styles.logoutButton}>
                                    Logout
                                </button>
                            </li>
                            <li>
                                <button onClick={addBooksHandler} className={styles.logoutButton}>Add Books</button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}
