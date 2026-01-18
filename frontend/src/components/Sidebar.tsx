import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PenTool, 
  Activity, 
  FolderOpen, 
  BookOpen, 
  LogOut,
  Rocket
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };
  
  const handleLogoClick = () => {
    navigate('/home'); // ou '/' se for a homepage pública
  };

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Ferramentas', path: '/tools', icon: <PenTool size={20} /> },
    { name: 'Monitoramento', path: '/monitoring', icon: <Activity size={20} /> },
    { name: 'Conteúdos', path: '/contents', icon: <FolderOpen size={20} /> },
    { name: 'Estudos', path: '/studies', icon: <BookOpen size={20} /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col border-r border-slate-800 shadow-xl z-50">
      
      {/* Logo Area */}
        <div
          className="p-6 border-b border-slate-800 flex items-center gap-3 cursor-pointer hover:bg-slate-700 transition-colors" // Adicionado cursor e hover
          onClick={handleLogoClick} // Adicionado o manipulador de clique
        >
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <Rocket className="text-white" size={20} />
          </div>
          <h2 className="text-lg font-bold tracking-wide">Zero Point</h2>
        </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive(item.path) 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-950/30 hover:text-red-300 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          Sair do Sistema
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;