import { useState, useEffect } from "react";

import { Workflow, Cpu, ArrowLeft, Fuel, CreditCard, Network, Orbit, Terminal } from "lucide-react";

import PumpSettings from "../components/PumpSettings";
import DeviceSettings from "../components/DeviceSettings";
import DispenserProtocolSettings from "../components/DİspenserProtocolSettings";
import SettingsPorts from "../components/SettingsPorts";
import AutomationSettings from "../components/AutomationSettings";
import AutomationProtocolSettings from "../components/AutomationProtocolSettings";
import ECRSettings from "../components/ECRSettings";
import ECRProtocolsSettings from "../components/ECRProtocolsSettings";
import DotSettings from "../components/DotSettings";
import LogSettings from "../components/LogSettings";













export default function Dashboard() {


  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeDashboardTab") || "menu";
  });
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("dashboardHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem("activeDashboardTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem("dashboardHistory", JSON.stringify(history));
  }, [history]);


  const [selectedDeviceId, setSelectedDeviceId] = useState(null)
  const navigateTo = (nextTab, id = null) => {
    setHistory((prev) => [...prev, activeTab]);
    setSelectedDeviceId(id); 
    setActiveTab(nextTab);
  };




  const goBack = () => {
    if (history.length > 0) {
      const lastPage = history[history.length - 1];
      const newHistory = history.slice(0, -1);

      setHistory(newHistory);
      setActiveTab(lastPage);
    } else {
      setActiveTab("menu");
    }
  };




  const actions = [
    {
      id: "pompa",
      title: "Pump Configuration",
      icon: <Fuel size={24} />,
      color: "bg-blue-600"
    },
    {
      id: "automation",
      title: "Automation Configuration",
      icon: <Workflow size={24} />, 
      color: "bg-indigo-600"
    },
    {
      id: "ecr",
      title: "ECR Configuration",
      icon: <CreditCard size={24} />, 
      color: "bg-rose-600" 
    },
    {
      id: "device",
      title: "Device Settings",
      icon: <Cpu size={24} />, 
      color: "bg-emerald-600"
    },
    {
      id: "settingsPorts",
      title: "Settings Ports",
      icon: <Network size={24} />, 
      color: "bg-slate-700" 
    },
    {
      id: "dotSettings",
      title: "Settings Dot",
      icon: <Orbit size={24} />, 
      color: "bg-indigo-700" 
    },
    {
      id: "logSettings",
      title: "Settings Log",
      icon: <Terminal size={24} />, 
      color: "bg-indigo-700" 
    },
  ];

  if (activeTab === "menu") {
    return (
      <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-12">System Control Panel</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {actions.map((item) => (
            <button
              key={item.id}
             onClick={() => navigateTo(item.id, -1)}
              className="p-8 bg-white rounded-3xl shadow-sm border hover:shadow-md transition-all flex flex-col items-center"
            >
              <div className={`${item.color} text-white p-4 rounded-xl mb-4`}>
                {item.icon}
              </div>
              <span className="font-bold">{item.title}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }




  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto">
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6"
        >
          <ArrowLeft size={20} />Go back
        </button>




        <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
          {activeTab === "pompa" && <PumpSettings onNavigate={navigateTo} targetId={selectedDeviceId}/>}
          {activeTab === "automation" && <AutomationSettings onNavigate={navigateTo} targetId={selectedDeviceId}/>}
          {activeTab === "ecr" && <ECRSettings onNavigate={navigateTo} targetId={selectedDeviceId}/>}


          {activeTab === "device" && <DeviceSettings onNavigate={navigateTo} targetId={selectedDeviceId} />}
          {activeTab === "dispenserProtocol" && <DispenserProtocolSettings onNavigate={navigateTo} targetId={selectedDeviceId}  />}
          {activeTab === "settingsPorts" && <SettingsPorts onNavigate={navigateTo} targetId={selectedDeviceId}/>}
          {activeTab === "automationProtocols" && <AutomationProtocolSettings onNavigate={navigateTo} targetId={selectedDeviceId} />}
          {activeTab === "ecrProtocols" && <ECRProtocolsSettings onNavigate={navigateTo} targetId={selectedDeviceId}/>}
          {activeTab === "dotSettings" && <DotSettings onNavigate={navigateTo} targetId={selectedDeviceId}/>}
          {activeTab === "logSettings" && <LogSettings onNavigate={navigateTo} targetId={selectedDeviceId}/>}







        </div>



      </div>
    </div>
  );
}


