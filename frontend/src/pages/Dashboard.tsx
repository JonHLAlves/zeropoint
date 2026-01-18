import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, PenTool, FolderOpen, BookOpen, LogOut } from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const cards = [
    { 
      title: 'Monitoramento', 
      icon: <Activity size={32} className="text-blue-500" />, 
      desc: 'Status de serviços e tarefas.',
      bg: 'bg-blue-50'
    },
    { 
      title: 'Ferramentas', 
      icon: <PenTool size={32} className="text-purple-500" />, 
      desc: 'Atalhos e utilitários úteis.',
      bg: 'bg-purple-50'
    },
    { 
      title: 'Conteúdos', 
      icon: <FolderOpen size={32} className="text-amber-500" />, 
      desc: 'Arquivos pessoais e docs.',
      bg: 'bg-amber-50'
    },
    { 
      title: 'Estudos', 
      icon: <BookOpen size={32} className="text-emerald-500" />, 
      desc: 'Cursos e anotações.',
      bg: 'bg-emerald-50'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Pessoal</h1>
          <p className="text-gray-500">Bem-vindo ao sistema Zero Point</p>
        </div>
      </header>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-100 group"
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${card.bg} group-hover:scale-110 transition-transform`}>
              {card.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;