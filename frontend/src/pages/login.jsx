import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/login'
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const { handleLogin, loading, error } = useLogin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { checkAuth } = useAuth();


    const navigate = useNavigate();


    const onSubmit = async (e) => {

        try {

            e.preventDefault();

            const res = await handleLogin({ "Name": email, "Password": password });

            if (res) {
                await checkAuth()
                navigate("/dashboard");
            }

        } catch (error) {
            console.log("rttrtr ", error)
        }

    };


    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-slate-900">Hoş Geldiniz</h1>
                    <p className="text-slate-500 mt-2">Lütfen hesabınıza giriş yapın</p>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                            username or password error
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Name
                        </label>
                        <input
                            type="Name"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="username"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Şifre
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                    </button>
                </form>
            </div>
        </div>
    );
}