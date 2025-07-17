import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  FileText,
  FolderOpen,
  LayoutDashboard,
  List,
  Settings,
  ChevronLeft,
  ChevronRight,
  Users,
  PanelBottomOpen,
} from "lucide-react";

const sidebarLinks = [
  {
    title: "Paínel",
    path: "/",
    icon: <LayoutDashboard className="h-5 w-5 text-white" />,
  },
  {
    title: "Pessoas",
    path: "/pessoas",
    icon: <Users className="h-5 w-5 text-white" />,
  },
  {
    title: "Processos",
    path: "/processes",
    icon: <FileText className="h-5 w-5 text-white" />,
  },
  {
    title: "RACI",
    path: "/RACI",
    icon: <List className="h-5 w-5 text-white" />,
  },
  {
    title: "Projetos",
    path: "/projetos",
    icon: <PanelBottomOpen className="h-5 w-5 text-white" />,
  },
  {
    title: "Configurações",
    path: "/settings",
    icon: <Settings className="h-5 w-5 text-white" />,
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      style={{ backgroundColor: "#002266" }}
      className={`transition-all duration-300 ease-in-out h-screen flex flex-col border-r border-[#003080] ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div
        style={{ borderColor: "#003080" }}
        className="flex items-center justify-between p-4 border-b"
      >
        {!collapsed && <p className="text-white">Sistema de Processos</p>}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:bg-[#003080]"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-2 px-2">
          {sidebarLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center p-2 rounded-md transition-colors",
                    isActive
                      ? "bg-[#001944] text-white" // COR MAIS ESCURA AQUI
                      : "text-white hover:bg-[#003080]",
                    collapsed ? "justify-center" : "space-x-3"
                  )
                }
              >
                {link.icon}
                {!collapsed && (
                  <span className="font-normal">{link.title}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div style={{ borderColor: "#003080" }} className="p-4 border-t">
        {!collapsed && (
          <p className="text-left text-xs text-white opacity-70">
            by Eduardo Junqueira
          </p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
