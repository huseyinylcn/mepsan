import { Trash2, Save, Phone, Languages, UserCircle, Loader2, X, Plus } from 'lucide-react';
import { useUsers } from "../hooks/users";
import { useState } from "react";
const userTypes = {
    0: { label: "Stajer", color: "bg-red-100 text-red-700" },
    1: { label: "Admin", color: "bg-amber-100 text-amber-700" },
    2: { label: "Üye", color: "bg-sky-100 text-sky-700" },
};

export default function AdminDashboard() {


    const { loading, users, setUsers, triggerUsersUpdate, loading2, triggerUsersDelete, loading3,triggerAddUser,triggerusers } = useUsers();
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
        triggerusers()
        setIsModalOpen(false);
        setFormData({ Name: '', Surname: '', Password: '', Language: 'tr', Type: 2, Phone: '' });
    };


    // İlk yükleme anı
    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center text-slate-500">
                <Loader2 className="animate-spin mr-2" /> Yükleniyor...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 pt-12 md:pt-8">
            <header className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">System Users</h1>
                    <p className="text-sm text-slate-500 mt-1">You can edit user information or assign new permissions.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus size={18} /> Add New User
                </button>
            </header>




            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-lg font-bold text-slate-800">New User</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <input type="text" placeholder="Name" className="w-full p-2.5 border rounded-lg outline-none focus:border-indigo-500" onChange={e => setFormData({ ...formData, Name: e.target.value })} value={formData.Name} />
                            <input type="text" placeholder="Surname" className="w-full p-2.5 border rounded-lg outline-none focus:border-indigo-500" onChange={e => setFormData({ ...formData, Surname: e.target.value })} value={formData.Surname} />
                            <input type="password" placeholder="Password" className="w-full p-2.5 border rounded-lg outline-none focus:border-indigo-500" onChange={e => setFormData({ ...formData, Password: e.target.value })} value={formData.Password} />
                            <input type="text" placeholder="Phone (5xx...)" className="w-full p-2.5 border rounded-lg outline-none focus:border-indigo-500" onChange={e => setFormData({ ...formData, Phone: e.target.value })} value={formData.Phone} />
                            <div className="flex gap-2">
                                <input type="text" placeholder="Language" className="w-20 p-2.5 border rounded-lg" onChange={e => setFormData({ ...formData, Language: e.target.value })} value={formData.Language} />
                                <select className="flex-1 p-2.5 border rounded-lg" onChange={e => setFormData({ ...formData, Type: parseInt(e.target.value) })} value={formData.Type}>
                                    {Object.entries(userTypes).map(([key, { label }]) => <option key={key} value={key}>{label}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="p-6 pt-0">
                            <button onClick={handleAddNewUser} className="w-full py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">Kaydet</button>
                        </div>
                    </div>
                </div>
            )}









            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
                <table className="w-full text-left table-auto min-w-[900px]">
                    <thead className="border-b border-slate-200 bg-slate-50/50">
                        <tr>
                            <th className="p-5 text-xs font-semibold text-slate-500 uppercase tracking-wider w-16 ">ID</th>
                            <th className="p-5 text-xs font-semibold text-slate-500 uppercase tracking-wider ">Name Surname</th>
                            <th className="p-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</th>
                            <th className="p-5 text-xs font-semibold text-slate-500 uppercase tracking-wider ">Language</th>
                            <th className="p-5 text-xs font-semibold text-slate-500 uppercase tracking-wider w-40 ">Role</th>
                            <th className="p-5 text-xs font-semibold text-slate-500 uppercase tracking-wider ">Processes</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {users.map((user) => (
                            <tr key={user.ID} className="hover:bg-indigo-50/30 transition-colors group">
                                <td className="p-5 text-sm font-medium text-slate-500 tabular-nums">#{user.ID}</td>
                                <td className="p-5">
                                    <div className="flex items-center gap-3 ">

                                        <div className="flex flex-col gap-1 w-40">
                                            <input
                                                type="text"
                                                value={user.Name}
                                                onChange={(e) => handleChange(user.ID, 'Name', e.target.value)}
                                                className="w-full p-1 rounded border border-transparent hover:border-slate-200 focus:border-indigo-400 bg-transparent outline-none font-semibold text-slate-900 transition-all"
                                            />
                                            <input
                                                type="text"
                                                value={user.Surname}
                                                onChange={(e) => handleChange(user.ID, 'Surname', e.target.value)}
                                                className="w-full p-1 rounded border border-transparent hover:border-slate-200 focus:border-indigo-400 bg-transparent outline-none text-xs text-slate-500 transition-all"
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="p-5">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Phone size={14} className="text-slate-400" />
                                        <input
                                            type="text"
                                            value={user.Phone}
                                            onChange={(e) => handleChange(user.ID, 'Phone', e.target.value)}
                                            className="w-full p-1 rounded border border-transparent hover:border-slate-200 focus:border-indigo-400 bg-transparent outline-none tabular-nums transition-all"
                                        />
                                    </div>
                                </td>
                                <td className="p-5">
                                    <div className="flex items-center gap-2 text-sm text-slate-600 uppercase font-medium">
                                        <Languages size={14} className="text-slate-400" />
                                        <input
                                            type="text"
                                            value={user.Language}
                                            maxLength={2}
                                            onChange={(e) => handleChange(user.ID, 'Language', e.target.value)}
                                            className="w-12 text-center p-1 rounded border border-transparent hover:border-slate-200 focus:border-indigo-400 bg-transparent outline-none transition-all"
                                        />
                                    </div>
                                </td>
                                <td className="p-5">
                                    <select
                                        value={user.Type}
                                        onChange={(e) => handleChange(user.ID, 'Type', parseInt(e.target.value))}
                                        className={`px-3 py-1 text-xs font-bold rounded-full border-none appearance-none cursor-pointer focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300 outline-none ${userTypes[user.Type].color}`}
                                    >
                                        {Object.entries(userTypes).map(([key, { label }]) => (
                                            <option key={key} value={key} className="bg-white text-slate-900 font-normal">{label}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="p-5 text-right">
                                    <div className="flex justify-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleUpdate(user.ID)}
                                            disabled={loading2 || loading3}
                                            title="Değişiklikleri Kaydet"
                                            className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading2 ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.ID)}
                                            disabled={loading2 || loading3}
                                            title="Kullanıcıyı Sil"
                                            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
    );
}