import React from 'react';
import { usePumps } from '../hooks/pumps'
import { Smartphone, Banknote, CreditCard, HelpCircle } from "lucide-react";

const PTYPE_CONFIG = {
    0: { label: "Mobil", color: "bg-blue-100 text-blue-700", icon: <Smartphone size={16} /> },
    1: { label: "Nakit", color: "bg-green-100 text-green-700", icon: <Banknote size={16} /> },
    2: { label: "Kredi Kartı", color: "bg-purple-100 text-purple-700", icon: <CreditCard size={16} /> },
    default: { label: "Bilinmiyor", color: "bg-gray-100 text-gray-600", icon: <HelpCircle size={16} /> }
};



const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return `${dateStr.substring(6, 8)}.${dateStr.substring(4, 6)}.${dateStr.substring(0, 4)} ${dateStr.substring(8, 10)}:${dateStr.substring(10, 12)}`;
};

export default function Pumps() {
    const { pumps, triggerPumps } = usePumps();





   const pumpCards =  pumps.map((pump) => {
        const pType = PTYPE_CONFIG[pump.saleVariables.ptype] || PTYPE_CONFIG.default;

        return (
            <div key={pump.pumpNo} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Pompa No</p>
                        <h3 className="text-3xl font-bold text-indigo-600">#{pump.pumpNo}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${(parseInt(pump.status.ecr) | (parseInt(pump.status.pump) << 1) | (parseInt(pump.status.scu) << 2)) > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {(parseInt(pump.status.ecr) | (parseInt(pump.status.pump) << 1) | (parseInt(pump.status.scu) << 2)) > 0 ? 'Aktif' : 'Pasif'}
                    </span>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span className="text-slate-600">Tutar:</span>
                        <span className="font-bold text-slate-900">{pump.saleVariables.amount} ₺</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span className="text-slate-600">Tabanca:</span>
                        <span className="font-bold text-slate-900">{pump.saleVariables.nozzleNo}</span>
                    </div>

                    <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span className="text-slate-600">Hacim:</span>
                        <span className="font-semibold text-slate-900">{pump.saleVariables.volume} L</span>
                    </div>


                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <span className="text-slate-600">Ödeme:</span>
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${pType.color}`}>
                            {pType.icon}
                            <span>{pType.label}</span>
                        </div>
                    </div>


                    <div className="flex justify-between">
                        <span className="text-slate-600 text-sm">Birim Fiyat:</span>
                        <span className="text-slate-700 font-medium">{pump.saleVariables.unitPrice} ₺</span>
                    </div>

                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 text-right">
                    {formatDate(pump.saleVariables.datetime)}
                </div>
            </div>

        )

    })














    return (
        <div className="min-h-screen bg-slate-50 p-6 pt-12 md:pt-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Akaryakıt Pompaları</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">







{pumpCards}










            </div>
        </div>
    );
}