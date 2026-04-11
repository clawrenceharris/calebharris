import { Folder, Mail, NotebookPen } from "lucide-react";
import MagicDock from "./magicdock";

export function Navbar({onTabChange}: {onTabChange: (value: string) => void}) {
 
  const dockItems = [
   
    {
      id: 2,
      icon: <NotebookPen className="text-white" size={24} />, // Changed to Book icon to better represent the About section
      label: "About",
      description: "Learn more about me",
      onClick: () => onTabChange("about")
 
    },
    {
      id: 3,
      icon: <Folder className="text-white" size={24} />, // Changed to BookOpen to better represent a "Projects" section
 
      label: "Projects",
      description: "View my projects",
      onClick: () => onTabChange("projects")
    },
    {
      id: 4,
      icon: <Mail className="text-white" size={24} />,
      label: "Contact",
      description: "Get in touch with me",
      onClick: () => onTabChange("contact")
      }
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 w-full flex justify-center items-end pb-4">

      <MagicDock
        className="w-full items-center justify-center"
        items={dockItems}
        variant="tooltip"
        magnification={70}
        baseItemSize={48}
        distance={0}
      />
    </div>
  );
}
