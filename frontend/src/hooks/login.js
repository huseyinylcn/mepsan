
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
      localStorage.setItem("token", res.result.token);
      localStorage.setItem("Name", res.result.Name);
      localStorage.setItem("Surname", res.result.Surname);
      localStorage.setItem("Language", res.result.Language);
      localStorage.setItem("Type", res.result.Type);
      localStorage.setItem("Phone", res.result.Phone);



      return res; 
    } catch (err) {
      setError(err.message || "Giriş başarısız.");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
}