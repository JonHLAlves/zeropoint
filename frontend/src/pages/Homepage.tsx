// ./pages/Homepage.tsx (CORRIGIDO)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  // LogOut, // Remova se for mover para Layout/Sidebar
  Rocket, 
  ShieldCheck, 
  Zap, 
  LayoutDashboard, 
  ArrowRight 
} from 'lucide-react';

const Homepage: React.FC = () => {
  const navigate = useNavigate();

  // Considere remover ou mover para Layout/Sidebar
  // const handleLogout = () => {
  //   localStorage.removeItem('isLoggedIn');
  //   navigate('/');
  // };

  const features = [
    {
      icon: <Zap className="text-yellow-500" size={24} />,
      title: 'Alta Performance',
      desc: 'Arquitetura otimizada com Vite e Tailwind.'
    },
    {
      icon: <ShieldCheck className="text-emerald-500" size={24} />,
      title: 'Segurança Total',
      desc: 'Proteção de rotas e autenticação via Token.'
    },
    {
      icon: <LayoutDashboard className="text-blue-500" size={24} />,
      title: 'Gestão Centralizada',
      desc: 'Ferramentas, monitoramento e estudos em um só lugar.'
    }
  ];

  // REMOVA: min-h-screen, flex flex-col, bg-gray-50
  return (
    <div className="p-6 text-center"> {/* Mantenha apenas o necessário para o conteúdo */}
      {/* REMOVA: navbar e footer se estiverem no Layout */}
      {/* Hero Section - Mantenha o conteúdo central */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center"> {/* Mantenha classes de espaçamento e alinhamento */}
        <div className="max-w-3xl space-y-8 animate-fade-in-up">

          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold tracking-wide border border-indigo-100">
              v1.0.0 Stable
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Bem-vindo ao <span className="text-indigo-600">Sistema</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Esta é a página inicial protegida. Você está autenticado e pronto para acessar seus recursos.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="group bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-semibold text-lg shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all flex items-center gap-2 cursor-pointer"
            >
              Acessar Dashboard
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 bg-gray-50 w-fit p-3 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Homepage;