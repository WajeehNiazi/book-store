import {useContext} from "react";
import AuthContext from "@/store/auth-context";

const UserInfo = () => {
    const authCtx = useContext(AuthContext);

    return (
        <div>
            <h2>User Info</h2>
            {authCtx.user ? (
                <div>
                    <p><strong>User ID:</strong> {authCtx.user.id}</p>
                    <p><strong>Email:</strong> {authCtx.user.email}</p>
                </div>
            ): (
                <p>No user is logged in.</p>
            )}
        </div>
    )
}

export default UserInfo;