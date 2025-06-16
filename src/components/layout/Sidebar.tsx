
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  FileText, 
  FolderOpen, 
  LayoutDashboard, 
  List, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

const sidebarLinks = [
  { 
    title: 'Paínel', 
    path: '/', 
    icon: <LayoutDashboard className="h-5 w-5" /> 
  },
    { 
    title: 'Pessoas', 
    path: '/pessoas', 
    icon: <List className="h-5 w-5" /> 
  },
  { 
    title: 'Processos', 
    path: '/processes', 
    icon: <List className="h-5 w-5" /> 
  },
    { 
    title: 'RACI', 
    path: '/processes', 
    icon: <List className="h-5 w-5" /> 
  },
  { 
    title: 'Documentos', 
    path: '/documents', 
    icon: <FileText className="h-5 w-5" /> 
  },
  { 
    title: 'Arquivos', 
    path: '/files', 
    icon: <FolderOpen className="h-5 w-5" /> 
  },
    { 
    title: 'Projetos', 
    path: '/files', 
    icon: <FolderOpen className="h-5 w-5" /> 
  },
  { 
    title: 'Configurações', 
    path: '/settings', 
    icon: <Settings className="h-5 w-5" /> 
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "bg-sidebar transition-all duration-300 ease-in-out h-screen flex flex-col border-r border-sidebar-border",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <h1 className="text-sidebar-foreground font-bold text-xl">Process Hub</h1>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      <nav className="flex-1 py-4">
        <ul className="space-y-2 px-2">
          {sidebarLinks.map((link) => (
            <li key={link.path}>
              <NavLink 
                to={link.path} 
                className={({ isActive }) => cn(
                  "flex items-center p-2 rounded-md transition-colors",
                  isActive 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent",
                  collapsed ? "justify-center" : "space-x-3"
                )}
              >
                {link.icon}
                {!collapsed && <span>{link.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <p className="text-sidebar-foreground text-sm opacity-50">
            Projetos e Processos
          </p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
