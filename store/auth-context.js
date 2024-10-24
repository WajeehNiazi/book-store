import { createContext, useState } from 'react';

const AuthContext = createContext({
    user: null,
    login: function(user) {},
    logout: function() {}
});

export function AuthContextProvider(props) {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);

    async function loginHandler(credentials) {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }
        const data = await response.json();

        setAuthenticatedUser({
            id: data.id,
            email: data.email,
        });
    }

    function logoutHandler() {
        setAuthenticatedUser(null);
    }

    const context = {
        user: authenticatedUser,
        login: loginHandler,
        logout: logoutHandler
    };

    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;