import { useState } from "react";
import { login } from "../store/slices/session/sessionSlice";
import { useDispatch } from "react-redux";
import { authenticate } from "./services/authService";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [stayLogged, setStayLogged] = useState(false);
    const dispatch = useDispatch();

    const onLogin = async () => {
        try {
            const loginResponse = await authenticate(username, password);
            dispatch(login(loginResponse.username, stayLogged));
            if (stayLogged) {
                localStorage.setItem(
                    "session",
                    JSON.stringify({ token: loginResponse.token, username: loginResponse.username })
                );
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h1>Login</h1>

            <label>Username</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <label>Password</label>
            <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br />

            <label>
                <input
                    type="checkbox"
                    checked={stayLogged}
                    onChange={(e) => setStayLogged(e.target.checked)}
                />{" "}
                Rimani Connesso
            </label>

            <br />

            <button onClick={onLogin}>Login</button>
        </div>
    );
}
