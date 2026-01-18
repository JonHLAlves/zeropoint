import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Terminal, 
  FileJson, 
  Hash, 
  Calculator, 
  Search,
  ExternalLink 
} from 'lucide-react';

const Tools: React.FC = () => {
  // Simulação de ferramentas para popular a tela
  const tools = [
    {
      id: 1,
      name: 'JSON Formatter',
      description: 'Valide e indente seus arquivos JSON automaticamente.',
      icon: <FileJson className="text-orange-500" size={24} />,
      status: 'Ativo'
    },
    {
      id: 2,
      name: 'Gerador de Hash',
      description: 'Crie hashes MD5, SHA-256 e outros algoritmos.',
      icon: <Hash className="text-blue-500" size={24} />,
      status: 'Em Breve'
    },
    {
      id: 3,
      name: 'Calculadora CIDR',
      description: 'Cálculos de sub-redes e máscaras de IP.',
      icon: <Calculator className="text-green-500" size={24} />,
      status: 'Ativo'
    },
    {
      id: 4,
      name: 'Log Viewer',
      description: 'Visualizador de logs do servidor em tempo real.',
      icon: <Terminal className="text-purple-500" size={24} />,
      status: 'Manutenção'
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      {/* Header com Navegação */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-2 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} className="mr-1" />
            Voltar ao Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Ferramentas Úteis</h1>
          <p className="text-gray-500 mt-1">Scripts e utilitários para o dia a dia.</p>
        </div>

        {/* Barra de Busca */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Buscar ferramenta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white shadow-sm"
          />
        </div>
      </div>

      {/* Grid de Ferramentas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <div 
            key={tool.id} 
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                {tool.icon}
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                tool.status === 'Ativo' ? 'bg-green-100 text-green-700' : 
                tool.status === 'Em Breve' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {tool.status}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{tool.name}</h3>
            <p className="text-gray-500 text-sm mb-4 h-10">{tool.description}</p>
            
            <button 
              disabled={tool.status !== 'Ativo'}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ExternalLink size={16} />
              Acessar
            </button>
          </div>
        ))}

        {filteredTools.length === 0 && (
          <div className="col-span-full text-center py-10 text-gray-400">
            Nenhuma ferramenta encontrada para "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default Tools;