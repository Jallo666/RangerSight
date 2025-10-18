import { useSelector } from "react-redux";
import Login from "./login/Login.jsx";
import { selectIsLogged } from "./store/slices/session/sessionSelectors";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./store/slices/session/sessionSlice";
import LogoutButton from "./shared/components/LogoutButton.jsx";

export default function App() {
  const isLogged = useSelector(selectIsLogged);
    const dispatch = useDispatch();

  useEffect(() => {
    const storage = localStorage.getItem("session")
    if (storage) {
      const sessionData = JSON.parse(storage);
      dispatch(login(sessionData.username, true));
    }
  }, [dispatch])

  return (
    <div>
      {isLogged ? (
        <div>
          <LogoutButton>LogOut</LogoutButton>
          <LogoutButton minimized={true}></LogoutButton>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
