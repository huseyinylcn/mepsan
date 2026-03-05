
import { useState } from "react";
import { login } from "../api/api";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await login(data);



      return res; 
    } catch (err) {
      setError(err.message || "Giriş başarısız.");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
}