import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Folder, 
  Image, 
  FileText, 
  Book, 
  MoreVertical, 
  Clock, 
  HardDrive 
} from 'lucide-react';

const Contents: React.FC = () => {
  // Dados Mockados
  const folders = [
    { 
      id: 1, 
      name: 'Documentos', 
      count: '12 arquivos', 
      size: '24 MB', 
      icon: <FileText className="text-blue-500" size={24} />, 
      bg: 'bg-blue-50' 
    },
    { 
      id: 2, 
      name: 'Galeria de Fotos', 
      count: '345 itens', 
      size: '1.2 GB', 
      icon: <Image className="text-purple-500" size={24} />, 
      bg: 'bg-purple-50' 
    },
    { 
      id: 3, 
      name: 'Cadernos de Notas', 
      count: '5 blocos', 
      size: '150 KB', 
      icon: <Book className="text-emerald-500" size={24} />, 
      bg: 'bg-emerald-50' 
    },
    { 
      id: 4, 
      name: 'Projetos Pessoais', 
      count: '8 pastas', 
      size: '450 MB', 
      icon: <Folder className="text-amber-500" size={24} />, 
      bg: 'bg-amber-50' 
    },
  ];

  const recentFiles = [
    { name: 'Contrato_Aluguel_2025.pdf', type: 'PDF', date: 'Há 2 horas', size: '2.4 MB' },
    { name: 'Viagem_Praia.jpg', type: 'IMG', date: 'Ontem', size: '4.1 MB' },
    { name: 'Anotações_React.md', type: 'DOC', date: '20 Dez', size: '12 KB' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-2 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} className="mr-1" />
            Voltar ao Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Conteúdos Pessoais</h1>
          <p className="text-gray-500 mt-1">Gerencie seus documentos, mídias e anotações.</p>
        </div>
        
        {/* Widget de Armazenamento */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm w-full md:w-64 flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
            <HardDrive size={20} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-gray-700">1.7 GB usados</span>
              <span className="text-gray-400">de 5 GB</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-indigo-600 h-1.5 rounded-full w-[34%]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Pastas */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Pastas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {folders.map((folder) => (
          <div 
            key={folder.id} 
            className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${folder.bg} group-hover:scale-110 transition-transform`}>
                {folder.icon}
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={18} />
              </button>
            </div>
            <h3 className="font-semibold text-gray-800">{folder.name}</h3>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>{folder.count}</span>
              <span>{folder.size}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lista de Recentes */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Clock size={20} className="text-gray-400" />
        Arquivos Recentes
      </h2>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
            <tr>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3 hidden sm:table-cell">Tipo</th>
              <th className="px-6 py-3 hidden sm:table-cell">Tamanho</th>
              <th className="px-6 py-3 text-right">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recentFiles.map((file, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3 font-medium text-gray-800 flex items-center gap-2">
                  <FileText size={16} className="text-gray-400" />
                  {file.name}
                </td>
                <td className="px-6 py-3 hidden sm:table-cell">{file.type}</td>
                <td className="px-6 py-3 hidden sm:table-cell">{file.size}</td>
                <td className="px-6 py-3 text-right text-gray-500">{file.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contents;