import { useState } from 'react';
// 1. useNavigate importu kaldırıldı
import { useLogin } from '../hooks/login';
import { useAuth } from '../context/AuthContext';
import mepsanLogo from '../assets/logo.png';
import loginBg from '../assets/0_33.webp';

// 2. setActivePage prop olarak eklendi
export default function Login({ setActivePage }) {
    const { handleLogin, loading, error } = useLogin();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { checkAuth } = useAuth();
    // 3. const navigate = useNavigate(); silindi

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await handleLogin({ "Name": username, "Password": password });
            if (res) {
                await checkAuth();
                // 4. Yönlendirme artık state üzerinden yapılıyor
                setActivePage("dashboard"); 
            }
        } catch (err) {
            console.error("Giriş hatası:", err);
        }
    };

    return (
        <div className="flex h-screen w-full bg-white">

            {/* Dış kapsayıcı: Ekran ortasında kalmasını sağlar */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-16">
                
                {/* KUTU (Kart) Yapısı */}
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                    
                    {/* Logo (Mobil için kart içinde) */}
                    <div className="flex justify-center mb-6 md:hidden">
                        <img src={mepsanLogo} alt="MEPSAN" className="h-10 w-auto" />
                    </div>

                    <div className="mb-8 text-center">
                        <h1 className="text-2xl font-bold text-slate-900">Giriş Yap</h1>
                        <p className="text-slate-500 mt-2 text-sm">MEPSAN Personel Paneline hoş geldiniz.</p>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">
                                Hatalı kullanıcı adı veya şifre.
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Kullanıcı Adı</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                                placeholder="Kullanıcı adınız"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Şifre</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-700 text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/10"
                        >
                            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                        </button>
                    </form>
                </div>
            </div>

            <div className="hidden md:!flex w-1/2 h-full !items-center !justify-center overflow-hidden my-style">
                <img 
                    src={loginBg} 
                    alt="MEPSAN Background" 
                    className="max-h-[70%] max-w-[80%] object-contain" 
                />
            </div>
        </div>
    );
}