import { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import { useRouter } from "next/router";
import styles from "./loginpage.module.css";

export default function LoginPage() {
    const { user , login } = useContext(AuthContext);
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    if(user){
        router.push("/");
        return null;
    }

    const handleLogin = async () => {
        setLoading(true);
        setErrorMessage("");
        try {
            await login({ email, password });
            router.push("/");
        } catch (error) {
            console.error("Login failed", error.message);
            setErrorMessage("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.h1} >Login</h1>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}
                className={styles.form}
            >
                <label className={styles.label} htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    className = {styles.input}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label className={styles.label} htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    className = {styles.input}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className={styles.button} type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}
