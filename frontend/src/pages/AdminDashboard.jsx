import { Trash2, Save, Phone, Languages, UserCircle, Loader2, X, Plus, ShieldCheck, User } from 'lucide-react';
import { useUsers } from "../hooks/users";
import { useState } from "react";

const userTypes = {
    0: { label: "Stajer", color: "bg-red-500/10 text-red-400 border border-red-500/20" },
    1: { label: "Admin", color: "bg-amber-500/10 text-amber-400 border border-amber-500/20" },
    2: { label: "Üye", color: "bg-blue-500/10 text-blue-400 border border-blue-500/20" },
};

export default function AdminDashboard() {
    const { loading, users, setUsers, triggerUsersUpdate, loading2, triggerUsersDelete, loading3, triggerAddUser, triggerusers } = useUsers();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ Name: '', Surname: '', Password: '', Language: 'tr', Type: 2, Phone: '' });

    const handleChange = (id, field, value) => {
        setUsers(prev => prev.map(user =>
            user.ID === id ? { ...user, [field]: value } : user
        ));
    };

    const handleUpdate = (id) => {
        const userToUpdate = users.find(u => u.ID === id);
        triggerUsersUpdate(userToUpdate);
    };

    const handleDelete = (id) => {
        if (window.confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")) {
            setUsers(prev => prev.filter(user => user.ID !== id));
            triggerUsersDelete({ ID: id });
        }
    };

    const handleAddNewUser = async () => {
        await triggerAddUser(formData);
        triggerusers();
        setIsModalOpen(false);
        setFormData({ Name: '', Surname: '', Password: '', Language: 'tr', Type: 2, Phone: '' });
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#020617] text-slate-400">
                <Loader2 className="animate-spin mr-3 text-indigo-500" size={24} /> 
                <span className="font-medium tracking-widest uppercase text-xs">Sistem Yükleniyor...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] p-4 md:p-8 text-slate-100">
            <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-slate-800 gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white tracking-tight uppercase">User Management</h1>
                    <p className="text-sm text-slate-500 mt-1 font-medium">Sistem yetkilerini ve kullanıcı bilgilerini buradan yönetin.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-900/20 active:scale-95"
                >
                    <Plus size={18} /> Add New User
                </button>
            </header>

            {/* Modal - Dark Mode */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
                    <div className="bg-[#0F172A] border border-slate-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-900/50">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <UserCircle className="text-indigo-400" /> New User
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Kullanıcı Bilgileri</label>
                                <input type="text" placeholder="Name" className="w-full bg-[#020617] border border-slate-800 p-2.5 rounded-lg outline-none text-white focus:border-indigo-500 transition-all placeholder:text-slate-600" onChange={e => setFormData({ ...formData, Name: e.target.value })} value={formData.Name} />
                            </div>
                            <input type="text" placeholder="Surname" className="w-full bg-[#020617] border border-slate-800 p-2.5 rounded-lg outline-none text-white focus:border-indigo-500 transition-all placeholder:text-slate-600" onChange={e => setFormData({ ...formData, Surname: e.target.value })} value={formData.Surname} />
                            <input type="password" placeholder="Password" className="w-full bg-[#020617] border border-slate-800 p-2.5 rounded-lg outline-none text-white focus:border-indigo-500 transition-all placeholder:text-slate-600" onChange={e => setFormData({ ...formData, Password: e.target.value })} value={formData.Password} />
                            <input type="text" placeholder="Phone (5xx...)" className="w-full bg-[#020617] border border-slate-800 p-2.5 rounded-lg outline-none text-white focus:border-indigo-500 transition-all placeholder:text-slate-600 tabular-nums" onChange={e => setFormData({ ...formData, Phone: e.target.value })} value={formData.Phone} />
                            
                            <div className="flex gap-2">
                                <input type="text" placeholder="TR" className="w-20 bg-[#020617] border border-slate-800 p-2.5 rounded-lg text-white text-center outline-none focus:border-indigo-500 uppercase" onChange={e => setFormData({ ...formData, Language: e.target.value })} value={formData.Language} />
                                <select className="flex-1 bg-[#020617] border border-slate-800 p-2.5 rounded-lg text-white outline-none focus:border-indigo-500 cursor-pointer" onChange={e => setFormData({ ...formData, Type: parseInt(e.target.value) })} value={formData.Type}>
                                    {Object.entries(userTypes).map(([key, { label }]) => <option key={key} value={key} className="bg-[#0F172A]">{label}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="p-6 pt-0">
                            <button onClick={handleAddNewUser} className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-900/20 active:scale-95">
                                Kaydet
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Tablo Alanı */}
            <div className="bg-[#0F172A]/50 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left table-auto min-w-[900px]">
                        <thead className="border-b border-slate-800 bg-slate-900/30">
                            <tr>
                                <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest w-16 text-center">ID</th>
                                <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Kullanıcı Bilgisi</th>
                                <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">İletişim</th>
                                <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Dil</th>
                                <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest w-44">Rol / Yetki</th>
                                <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {users.map((user) => (
                                <tr key={user.ID} className="hover:bg-indigo-500/[0.03] transition-colors group">
                                    <td className="p-5 text-sm font-mono text-slate-600 text-center">#{user.ID}</td>
                                    <td className="p-5">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-all">
                                                <User size={20} />
                                            </div>
                                            <div className="flex flex-col gap-0.5 w-48">
                                                <input
                                                    type="text"
                                                    value={user.Name}
                                                    onChange={(e) => handleChange(user.ID, 'Name', e.target.value)}
                                                    className="w-full bg-transparent border-none p-0 outline-none font-bold text-white focus:text-indigo-400 transition-all"
                                                />
                                                <input
                                                    type="text"
                                                    value={user.Surname}
                                                    onChange={(e) => handleChange(user.ID, 'Surname', e.target.value)}
                                                    className="w-full bg-transparent border-none p-0 outline-none text-xs text-slate-500 focus:text-slate-300 transition-all"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        <div className="flex items-center gap-2 text-sm text-slate-400">
                                            <Phone size={14} className="text-slate-600" />
                                            <input
                                                type="text"
                                                value={user.Phone}
                                                onChange={(e) => handleChange(user.ID, 'Phone', e.target.value)}
                                                className="bg-transparent border-none outline-none tabular-nums text-slate-300 focus:text-white transition-all w-32"
                                            />
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        <div className="flex items-center gap-2 text-sm text-slate-400 font-bold">
                                            <Languages size={14} className="text-slate-600" />
                                            <input
                                                type="text"
                                                value={user.Language}
                                                maxLength={2}
                                                onChange={(e) => handleChange(user.ID, 'Language', e.target.value)}
                                                className="w-10 bg-slate-800/50 border border-transparent hover:border-slate-700 rounded text-center outline-none uppercase py-0.5 transition-all text-xs"
                                            />
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        <div className="relative inline-block w-full">
                                            <select
                                                value={user.Type}
                                                onChange={(e) => handleChange(user.ID, 'Type', parseInt(e.target.value))}
                                                className={`w-full px-3 py-1.5 text-[10px] font-black rounded-lg border appearance-none cursor-pointer outline-none transition-all uppercase tracking-wider ${userTypes[user.Type].color}`}
                                            >
                                                {Object.entries(userTypes).map(([key, { label }]) => (
                                                    <option key={key} value={key} className="bg-[#0F172A] text-white uppercase">{label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </td>
                                    <td className="p-5 text-right">
                                        <div className="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                            <button
                                                onClick={() => handleUpdate(user.ID)}
                                                disabled={loading2 || loading3}
                                                title="Kaydet"
                                                className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all disabled:opacity-30 active:scale-90"
                                            >
                                                {loading2 ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.ID)}
                                                disabled={loading2 || loading3}
                                                title="Sil"
                                                className="p-2.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all disabled:opacity-30 active:scale-90"
                                            >
                                                {loading3 ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}