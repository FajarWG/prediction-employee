import { getItem, removeItem, setItem } from "@/utils/localstorage";
import { useState, useEffect } from "react";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const user = getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const login = (username: string, password: string) => {
    // In a real app, you'd validate credentials against an API
    if (username === "admin" && password === "password") {
      setItem("user", JSON.stringify({ username }));
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    removeItem("user");
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout };
}
