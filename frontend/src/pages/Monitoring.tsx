// src/pages/Monitoring.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Server, 
  Database, 
  RefreshCw, 
  Target, 
  CheckCircle,
  Cpu,
  HardDrive
} from 'lucide-react';

// Tipos para os dados que esperamos receber da API do backend Flask
interface TrueNasApp {
  name: string;
  status: string; // Ex: 'running', 'stopped', 'error'
  // Outros campos que a API do TrueNAS retorna
}

interface TrueNasPool {
  name: string;
  status: string; // Ex: 'online', 'offline'
  used_percent: number;
  // Outros campos
}

interface SystemInfo {
  // Defina os campos relevantes da info do sistema TrueNAS
  // cpu_usage?: number;
  // memory_used?: string;
}

// Tipos para os dados formatados para o componente
interface ServiceStatus {
  name: string;
  status: string; // online, warning, offline
  uptime: string; // ou '-' se não aplicável
  load: string;   // ou '%' de uso, ou '-'
}

const Monitoring: React.FC = () => {
  const [truenasData, setTruenasData] = useState<{ apps: ServiceStatus[], pools: ServiceStatus[] }>({ apps: [], pools: [] });
  // Os dados de metas diárias podem continuar sendo mockados ou buscados de outra rota
  const [dailyGoals] = useState({
    progress: 60,
    tasks: [
      { id: 1, title: 'Revisar Logs de Erro', completed: true },
      { id: 2, title: 'Atualizar Dependências', completed: true },
      { id: 3, title: 'Deploy no Staging', completed: true },
      { id: 4, title: 'Escrever Testes Unitários', completed: false },
      { id: 5, title: 'Documentar API', completed: false },
    ]
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dados mockados para backup (ou busque de uma rota futura)
  const backupInfo = {
    lastRun: 'Hoje, 03:00 AM',
    nextRun: 'Amanhã, 03:00 AM',
    size: '4.2 GB',
    status: 'success'
  };

  useEffect(() => {
    const fetchTrueNasData = async () => {
      try {
        setLoading(true);
        setError(null); // Limpa erros anteriores

        const token = localStorage.getItem('access_token'); // Obtém o token JWT
        if (!token) {
          throw new Error("Token de autenticação não encontrado.");
        }

        const headers = {
          'Authorization': `Bearer ${token}`, // Inclui o token no header
          'Content-Type': 'application/json',
        };

        // Fetch Apps
        const appsResponse = await fetch('http://localhost:5000/api/v1/monitoramento/truenas/apps', { headers });
        if (!appsResponse.ok) {
          const errorText = await appsResponse.text(); // Pega o corpo da resposta de erro
          throw new Error(`Erro na API Apps: ${appsResponse.status} - ${errorText}`);
        }
        const rawAppsData: TrueNasApp[] = await appsResponse.json();
        console.log("Dados brutos de Apps:", rawAppsData); // Para debug

        // Transforma os dados dos Apps para o formato esperado pelo componente
        const formattedApps: ServiceStatus[] = rawAppsData.map(app => ({
          name: app.name,
          status: app.status, // O backend Flask deve mapear o status do TrueNAS para 'online', 'warning', 'offline'
          uptime: '-', // Pode vir do TrueNAS se disponível
          load: '-',  // Pode vir do TrueNAS se disponível
        }));

        // Fetch Pools
        const poolsResponse = await fetch('http://localhost:5000/api/v1/monitoramento/truenas/pools', { headers });
        if (!poolsResponse.ok) {
          const errorText = await poolsResponse.text();
          throw new Error(`Erro na API Pools: ${poolsResponse.status} - ${errorText}`);
        }
        const rawPoolsData: TrueNasPool[] = await poolsResponse.json();
        console.log("Dados brutos de Pools:", rawPoolsData); // Para debug

        // Transforma os dados dos Pools para o formato esperado pelo componente
        const formattedPools: ServiceStatus[] = rawPoolsData.map(pool => ({
          name: `Pool: ${pool.name}`,
          status: pool.status, // O backend Flask deve mapear o status do TrueNAS para 'online', 'warning', 'offline'
          uptime: '-', // Não se aplica
          load: `${pool.used_percent.toFixed(2)}%`, // Usando como exemplo de carga
        }));

        setTruenasData({ apps: formattedApps, pools: formattedPools });

      } catch (err: any) {
        console.error("Erro ao buscar dados do TrueNAS:", err);
        setError(err.message || "Erro ao carregar dados de monitoramento.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrueNasData();
  }, []); // Executa uma vez ao montar o componente

  // Função para obter a cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'offline':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 md:p-10">Carregando dados do TrueNAS...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 md:p-10">Erro: {error}</div>;
  }

  // Combina os dados formatados de Apps e Pools
  const systemStatus = [...truenasData.apps, ...truenasData.pools];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      {/* Header */}
      <div className="mb-8">
        <Link 
          to="/dashboard" 
          className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-2 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} className="mr-1" />
          Voltar ao Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Monitoramento</h1>
        <p className="text-gray-500 mt-1">Visão geral da infraestrutura TrueNAS e produtividade.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Coluna 1 e 2: Status do Sistema (Agora com dados reais do TrueNAS) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Cards de Serviços */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Server size={20} className="text-indigo-500" />
              Status dos Serviços (TrueNAS)
            </h2>
            {systemStatus.length === 0 ? (
              <p>Nenhum serviço encontrado ou erro ao carregar.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {systemStatus.map((service, idx) => (
                  <div key={idx} className="p-4 rounded-lg border border-gray-100 bg-gray-50 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-gray-700">{service.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full border font-medium uppercase ${getStatusColor(service.status)}`}>
                        {service.status}
                      </span>
                    </div>
                    <div className="flex gap-4 text-xs text-gray-500 mt-2">
                      <span className="flex items-center gap-1"><Cpu size={12}/> {service.load}</span>
                      <span className="flex items-center gap-1"><RefreshCw size={12}/> {service.uptime}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Backup Card (Mock ou de outra rota futura) */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                <Database size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Backup Automático (Mock)</h3>
                <p className="text-sm text-gray-500">Última execução: {backupInfo.lastRun}</p>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <span className="block text-lg font-bold text-gray-800">{backupInfo.size}</span>
              <span className="text-xs text-green-600 font-medium">Backup Seguro ✅</span>
            </div>
          </div>
        </div>

        {/* Coluna 3: Metas e Produtividade (Mock) */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-fit">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Target size={20} className="text-emerald-500" />
            Metas Diárias (Mock)
          </h2>
          
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Progresso</span>
              <span className="font-bold text-indigo-600">{dailyGoals.progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-1000" 
                style={{ width: `${dailyGoals.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Task List */}
          <ul className="space-y-3">
            {dailyGoals.tasks.map((task) => (
              <li key={task.id} className="flex items-start gap-3 text-sm">
                <div className={`mt-0.5 min-w-[16px] h-4 rounded-full flex items-center justify-center border ${
                  task.completed ? 'bg-emerald-100 border-emerald-500' : 'bg-white border-gray-300'
                }`}>
                  {task.completed && <CheckCircle size={12} className="text-emerald-600" />}
                </div>
                <span className={`${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                  {task.title}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Monitoring;