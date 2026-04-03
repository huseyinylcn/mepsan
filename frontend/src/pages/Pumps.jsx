import { usePumps } from '../hooks/pumps'
import { Smartphone, Banknote, CreditCard, HelpCircle, Hourglass, Fuel, Car, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

const PTYPE_CONFIG = {
    0: { label: "Mobile", color: "bg-blue-500/10 text-blue-400 border border-blue-500/20", icon: <Smartphone size={14} /> },
    1: { label: "Cash", color: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20", icon: <Banknote size={14} /> },
    2: { label: "Credit Card", color: "bg-purple-500/10 text-purple-400 border border-purple-500/20", icon: <CreditCard size={14} /> },
    default: { label: "Unknown", color: "bg-slate-900 text-slate-500", icon: <HelpCircle size={14} /> }
};

const FTYPE_CONFIG = {
    0: { label: "Pending", color: "bg-amber-500/10 text-amber-400 border border-amber-500/20", icon: <Hourglass size={14} /> },
    1: { label: "Filling", color: "bg-blue-500/10 text-blue-400 border border-blue-500/20", icon: <Fuel size={14} /> },
    2: { label: "Recognized", color: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20", icon: <Car size={14} /> },
    default: { label: "Unknown", color: "bg-slate-900 text-slate-500", icon: <HelpCircle size={14} /> }
};

const STATUS_CONFIG = {
    0: { label: "On hold", color: "bg-slate-800 text-slate-400", icon: <Clock size={14} /> },
    1: { label: "Ready", color: "bg-emerald-500/20 text-emerald-400", icon: <CheckCircle2 size={14} /> },
    2: { label: "Error", color: "bg-red-500/20 text-red-400", icon: <AlertTriangle size={14} /> },
    default: { label: "Unknown", color: "bg-slate-800 text-slate-400", icon: <HelpCircle size={14} /> }
};

const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return `${dateStr.substring(6, 8)}.${dateStr.substring(4, 6)}.${dateStr.substring(0, 4)} ${dateStr.substring(8, 10)}:${dateStr.substring(10, 12)}`;
};

export default function Pumps() {
    const { pumps } = usePumps();

    const pumpCards = pumps.map((pump, index) => {
        const pType = PTYPE_CONFIG[pump.saleVariables.ptype] || PTYPE_CONFIG.default;
        const fType = FTYPE_CONFIG[pump.saleVariables.ftype] || FTYPE_CONFIG.default;
        const status = STATUS_CONFIG[pump.status.pump] || STATUS_CONFIG.default;

        const statusVal = parseInt(pump.status.ecr) | (parseInt(pump.status.pump) << 1) | (parseInt(pump.status.scu) << 2);
        const isActive = statusVal > 0;

        return (
            <div key={index} className="bg-[#0f172a] p-5 rounded-xl border border-slate-800 shadow-xl hover:border-slate-700 transition-all flex flex-col group">
                <div className="flex justify-between items-start mb-5 pl-1">
                    <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Pump Unit</span>
                        <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">#{pump.pumpNo}</h3>
                    </div>
                    <div className="px-3 py-2 bg-slate-900/50 border border-slate-800 rounded-lg text-sm font-mono font-bold text-slate-200">
                        {pump.saleVariables.fiscalNumber || "TR-PLATE"}
                    </div>
                </div>

                <div className="space-y-4 flex-grow">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/50 text-center">
                            <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Amount</p>
                            <p className="text-xl font-black text-emerald-400">{pump.saleVariables.amount} ₺</p>
                        </div>
                        <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/50 text-center">
                            <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Volume</p>
                            <p className="text-xl font-black text-blue-400">{pump.saleVariables.volume} L</p>
                        </div>
                    </div>

                    <div className="space-y-2.5 pt-2">
                        <div className="flex justify-between items-center text-[12px]">
                            <span className="text-slate-400">Filling</span>
                            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold ${fType.color}`}>
                                {fType.icon} {fType.label}
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-[12px]">
                            <span className="text-slate-400">Payment</span>
                            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold ${pType.color}`}>
                                {pType.icon} {pType.label}
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-[12px]">
                            <span className="text-slate-400">Status</span>
                            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold ${status.color}`}>
                                {status.icon} {status.label}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 text-[10px] text-slate-500 flex justify-between items-center">
                    <span className="bg-slate-900 px-2 py-0.5 rounded">{pump.saleVariables.unitPrice} ₺/L</span>
                    <span className="font-mono opacity-60 tracking-tighter">{formatDate(pump.saleVariables.datetime)}</span>
                </div>
            </div>
        );
    });

    return (
        /* ARKA PLAN: Navbar'daki bg-slate-950 ile birebir aynı (#020617) */
        <div className="min-h-screen bg-[#020617] text-slate-100 p-6 w-full overflow-x-hidden">

            
            {/* GRID: Geniş ekranı full kullanan yapı */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-6 w-full">
                {pumpCards}
            </div>
        </div>
    );
}