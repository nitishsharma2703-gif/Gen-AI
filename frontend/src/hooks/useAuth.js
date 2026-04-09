import { useContext, useEffect } from "react";
import { AuthContext } from "../compounds/authContext.jsx";
import { login, register, logout, getMe } from "../services/auth.api.js"; // ✅ FIXED PATH

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  // ✅ LOGIN
  const handleLogin = async ({ email, password }) => {
    try {
      setLoading(true);
      const data = await login({ email, password });
      setUser(data.user);
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

const handleRegister = async ({ username, email, password }) => {
  try {
    setLoading(true);

    const data = await register({ username, email, password });

    setUser(data.user);

    return data; // ✅ THIS FIXES YOUR FLOW

  } catch (error) {
    console.error("Register Error:", error);

    throw error; // ✅ THIS LETS UI HANDLE ERROR

  } finally {
    setLoading(false);
  }
};

  // ✅ LOGOUT
  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ GET CURRENT USER (FIXED LOADING BUG)
  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        setLoading(true);
        const data = await getMe();
        setUser(data.user);
      } catch (error) {
        setUser(null); // user not logged in
      } finally {
        setLoading(false); // ✅ ALWAYS STOP LOADING
      }
    };

    getAndSetUser();
  }, [setUser, setLoading]);

  return { user, loading, handleLogin, handleRegister, handleLogout };
};
