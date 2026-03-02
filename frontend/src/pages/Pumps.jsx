import { usePumps } from '../hooks/pumps'
import { Smartphone, Banknote, CreditCard, HelpCircle, Hourglass, Fuel, Car, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

const PTYPE_CONFIG = {
    0: { label: "Mobil", color: "bg-blue-100 text-blue-700", icon: <Smartphone size={16} /> },
    1: { label: "Nakit", color: "bg-green-100 text-green-700", icon: <Banknote size={16} /> },
    2: { label: "Kredi Kartı", color: "bg-purple-100 text-purple-700", icon: <CreditCard size={16} /> },
    default: { label: "Bilinmiyor", color: "bg-gray-100 text-gray-600", icon: <HelpCircle size={16} /> }
};


const FTYPE_CONFIG = {
    0: { label: "Kart Okunması Bekleniyor", color: "bg-blue-100 text-blue-700", icon: <Hourglass size={16} /> },
    1: { label: "Dolum Yapılıyor", color: "bg-green-100 text-green-700", icon: <Fuel size={16} /> },
    2: { label: "Araç Tanınıyor", color: "bg-purple-100 text-purple-700", icon: <Car size={16} /> },
    default: { label: "Bilinmiyor", color: "bg-gray-100 text-gray-600", icon: <HelpCircle size={16} /> }
};


const STATUS_CONFIG = {
    0: {
        label: "Beklemede",
        color: "bg-slate-100 text-slate-600",
        icon: <Clock size={16} />
    },
    1: {
        label: "Hazır",
        color: "bg-emerald-100 text-emerald-700",
        icon: <CheckCircle2 size={16} />
    },
    2: {
        label: "Hata",
        color: "bg-red-100 text-red-700",
        icon: <AlertTriangle size={16} />
    },
    default: {
        label: "Bilinmiyor",
        color: "bg-gray-100 text-gray-600",
        icon: <HelpCircle size={16} />
    }
};

const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return `${dateStr.substring(6, 8)}.${dateStr.substring(4, 6)}.${dateStr.substring(0, 4)} ${dateStr.substring(8, 10)}:${dateStr.substring(10, 12)}`;
};

export default function Pumps() {
    const { pumps } = usePumps();

    const pumpCards = pumps.map((pump,index) => {
        const pType = PTYPE_CONFIG[pump.saleVariables.ptype] || PTYPE_CONFIG.default;
        const fType = FTYPE_CONFIG[pump.saleVariables.ftype] || FTYPE_CONFIG.default;
        const status = STATUS_CONFIG[pump.status.pump] || STATUS_CONFIG.default;


        // Mantığı ayıklayıp sadeleştirdik
        const statusVal = parseInt(pump.status.ecr) | (parseInt(pump.status.pump) << 1) | (parseInt(pump.status.scu) << 2);
        const isActive = statusVal > 0;

        return (
            <div key={index} className={`bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md relative overflow-hidden flex flex-col`}>
                {/* Durum Şeridi */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isActive ? 'bg-blue-500' : 'bg-blue-500'}`} />


                <div className="flex justify-between items-start mb-6 pl-2">
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pompa</span>
                        <h3 className="text-2xl font-black text-slate-800">#{pump.pumpNo}</h3>
                    </div>

                    <div className="flex items-center justify-center gap-3 px-6 py-4 bg-slate-50 border-2 border-slate-300 rounded-xl shadow-inner my-2">
                        <Car size={24} className="text-slate-600" />
                        <span className="text-2xl font-mono font-black text-slate-900 tracking-widest uppercase">
                            {pump.saleVariables.fiscalNumber || "00-XXX-000"}
                        </span>
                    </div>
                </div>


                <div className="space-y-4 flex-grow">

                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-slate-50 p-3 rounded-xl">
                            <p className="text-[10px] text-slate-400 uppercase font-semibold text-center">Tutar</p>
                            <p className="text-lg font-bold text-indigo-600 text-center">{pump.saleVariables.amount} ₺</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl">
                            <p className="text-[10px] text-slate-400 uppercase font-semibold text-center">Hacim</p>
                            <p className="text-lg font-bold text-slate-700 text-center">{pump.saleVariables.volume} L</p>
                        </div>
                    </div>

                    <div className="space-y-2.5 pt-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Tabanca No</span>
                            <span className="font-semibold text-slate-800">{pump.saleVariables.nozzleNo}</span>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">Durum</span>
                            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${fType.color}`}>
                                {fType.icon} {fType.label}
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">Ödeme</span>
                            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${pType.color}`}>
                                {pType.icon} {pType.label}
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">Pompa Durum</span>
                            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${status.color}`}>
                                {status.icon} {status.label}
                            </div>
                        </div>

                    </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 text-[10px] text-slate-400 flex justify-between items-center">
                    <span>Birim Fiyat: {pump.saleVariables.unitPrice} ₺</span>
                    <span className="font-mono">{formatDate(pump.saleVariables.datetime)}</span>
                </div>
            </div>
        );
    });

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <h1 className="text-xl font-bold text-slate-800 mb-6">Akaryakıt Pompaları</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {pumpCards}
            </div>
        </div>
    );
}