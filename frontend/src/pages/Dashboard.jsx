import {
  Fuel,
  Settings,
  Database,
  Archive,
  FileText,
  Network,
  Cpu,
  Layers,
  Users

} from "lucide-react";


const items = [
  {
    title: "Pumps",
    icon: Fuel,
    size: "big",
    description: "Live monitoring of pumps",
    id: "pumps"
  },
  {
    title: "Archive",
    icon: Archive,
    description: "Back up files in the archive or restore the backup.",
    id: "archive"

  },
  {
    title: "Users Management",
    icon: Users,
    description: "Users Management Settings ",
    id: "admin"

  },
  {
    title: "Device Configuration",
    icon: Cpu,
    size: "wide",
    description: "Device Configuration Settings",
    id: "deviceSettings"
  },
  {
    title: "Pump Configuration",
    icon: Settings,
    description: "Pump Configuration Settings",
    id: "pumpSettings"

  },
  {
    title: "Automation Configuration",
    icon: Settings,
    description: "Automation Configuration Settings",
    id: "automationSettings"
  },
  {
    title: "ECR Configuration",
    icon: Settings,
    description: "ECR Configuration Settings",
    id: "ecrSettings"
  },
  {
    title: "Port Settings",
    icon: Network,
    size: "wide",
    description: "View or update port settings.",
    id: "portSettings"
  }

  ,
  {
    title: "General Settings",
    icon: FileText,
    description: "",
    id: "MainSettingsDashboard",
  },



];



export default function Dashboard({ setActivePage, targetSetId }) {

  return (

    <div className="flex-1 flex justify-center p-8">

      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 auto-rows-[160px]">
          {items.map((item, index) => {

            const Icon = item.icon;

            let sizeClass = "";
            if (item.size === "big") sizeClass = "row-span-2";
            if (item.size === "wide") sizeClass = "col-span-2";

            return (
              <button
                key={index}
                onClick={() => { targetSetId(-1); setActivePage(item.id); }}
                title={item.description}
                className={`
                ${sizeClass}
                bg-slate-900
                border border-slate-800
                rounded-2xl
                p-6
                flex flex-col
                justify-center
                items-center
                gap-3
                transition
                hover:border-slate-500
                `}
              >
                <Icon className="w-10 h-10 text-slate-300 shrink-0" />

                <div className="flex flex-col items-center gap-1">
                  <span className="text-base text-slate-200 font-medium text-center">
                    {item.title}
                  </span>

                  <span className="text-xs text-slate-500 text-center leading-tight line-clamp-2 px-2">
                    {item.description}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}