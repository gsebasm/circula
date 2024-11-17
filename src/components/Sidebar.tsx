import React, { useState } from "react";
import {
  Home,
  Users,
  Search,
  Upload,
  MessageCircle,
  User,
  ShoppingCart,
  Settings,
  Menu,
  X,
  LucideIcon,
} from "lucide-react";

interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
  isActive?: boolean;
}

interface SidebarProps {
  className?: string;
  onNavigate: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className = "", onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const menuItems: MenuItem[] = [
    { icon: Home, label: "Inicio", path: "/" },
    { icon: Users, label: "Nosotros", path: "/nosotros" },
    { icon: Search, label: "Explorar", path: "/explorar" },
    { icon: Upload, label: "Publicar", path: "/publicar" },
    { icon: MessageCircle, label: "Chat Ceci", path: "/chat", isActive: true },
  ];

  const bottomMenuItems: MenuItem[] = [
    { icon: User, label: "Perfil", path: "/perfil" },
    { icon: ShoppingCart, label: "Carrito", path: "/carrito" },
    { icon: Settings, label: "Configuración", path: "/configuracion" },
  ];

  const handleClick = (path: string): void => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const getButtonClasses = (item: MenuItem): string => {
    const baseClasses =
      "w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors text-left text-black hover:bg-gray-100";
    if (item.isActive) {
      return `${baseClasses} bg-gradient-to-r from-[#FF0032] to-[#3800B4] bg-clip-text text-transparent font-medium underline decoration-[#FF0032] underline-offset-4`;
    }
    return baseClasses;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out z-40 
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 ${className}`}
      >
        <div className="flex flex-col h-full w-64 py-8">
          {/* Logo */}
          <div className="px-6 mb-8">
            <h1 className="text-2xl font-bold text-black">circula</h1>
            <p className="text-xs text-gray-500">by cemex</p>
          </div>
          {/* Main Menu */}
          <nav className="flex-1 px-4">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleClick(item.path)}
                    className={getButtonClasses(item)}
                  >
                    <item.icon
                      size={20}
                      className={item.isActive ? "text-[#FF0032]" : ""}
                    />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          {/* Bottom Menu */}
          <nav className="px-4 mt-auto">
            <ul className="space-y-2">
              {bottomMenuItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleClick(item.path)}
                    className={getButtonClasses(item)}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
