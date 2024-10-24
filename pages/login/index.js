import { useContext, useState } from 'react';
import AuthContext from '../../store/auth-context';
import {useRouter} from 'next/router';

export default function LoginPage() {
    const {login} = useContext(AuthContext);
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await login({email, password});
            router.push('/');
        } catch (error) {
            console.error("Login failed", error.message);
        }
    } 

    return (
        <div>
            <h1>Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}