import { useState } from "react";
import { useRouter } from "next/router";

const SignupPage = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage("");

        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            console.log(response);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to sign up");
            }

            alert("Signup successful! Redirecting to login...");
            router.push("/");
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <h1>Signup</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={onSubmit} className="signup-form">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Enter your name" />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    minLength="6"
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Signing up..." : "Signup"}
                </button>
            </form>

            <style jsx>{`
                .signup-container {
                    max-width: 400px;
                    margin: 50px auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    font-family: Arial, sans-serif;
                }

                h1 {
                    text-align: center;
                    color: #333;
                }

                .error-message {
                    color: red;
                    text-align: center;
                    margin-bottom: 15px;
                }

                .signup-form {
                    display: flex;
                    flex-direction: column;
                }

                label {
                    margin-bottom: 5px;
                    font-weight: bold;
                    color: #555;
                }

                input {
                    margin-bottom: 15px;
                    padding: 10px;
                    font-size: 14px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }

                button {
                    padding: 10px;
                    background-color: #007bff;
                    color: white;
                    font-size: 16px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }

                button:disabled {
                    background-color: #aaa;
                    cursor: not-allowed;
                }

                button:hover:not(:disabled) {
                    background-color: #0056b3;
                }
            `}</style>
        </div>
    );
};

export default SignupPage;