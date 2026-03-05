import { createContext, useContext, useState, useEffect } from 'react';
import { meApi, logoutApi } from '../api/api'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Oturum durumunu kontrol et
  const checkAuth = async () => {
    setLoading(true);
    try {
      const data = await meApi();
      setUser(data.result);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Çıkış yapma fonksiyonu
  const logout = async () => {
    try {
      await logoutApi(); 
      setUser(null);     
    } catch (error) {
      console.error("Logout sırasında hata oluştu", error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, checkAuth, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);