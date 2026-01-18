import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  GraduationCap, 
  Clock, 
  Award, 
  PlayCircle,
  CheckCircle2,
  MoreHorizontal
} from 'lucide-react';

const Studies: React.FC = () => {
  // Dados Mockados
  const stats = [
    { label: 'Cursos em Andamento', value: '3', icon: <BookOpen className="text-blue-600" size={20} />, bg: 'bg-blue-100' },
    { label: 'Horas Estudadas', value: '124h', icon: <Clock className="text-purple-600" size={20} />, bg: 'bg-purple-100' },
    { label: 'Certificados', value: '12', icon: <Award className="text-amber-600" size={20} />, bg: 'bg-amber-100' },
  ];

  const courses = [
    {
      id: 1,
      title: 'React Avançado & Hooks',
      platform: 'Udemy',
      progress: 75,
      totalModules: 12,
      completedModules: 9,
      imageColor: 'bg-cyan-500'
    },
    {
      id: 2,
      title: 'Arquitetura de Software',
      platform: 'Alura',
      progress: 30,
      totalModules: 8,
      completedModules: 2,
      imageColor: 'bg-indigo-500'
    },
    {
      id: 3,
      title: 'UX/UI Design Fundamentals',
      platform: 'Coursera',
      progress: 10,
      totalModules: 20,
      completedModules: 2,
      imageColor: 'bg-pink-500'
    }
  ];

  const todayGoals = [
    { id: 1, text: 'Finalizar Capítulo 5 (React)', completed: false },
    { id: 2, text: 'Revisar anotações de SOLID', completed: true },
    { id: 3, text: 'Praticar Flexbox Froggy', completed: false },
  ];

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
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Meus Estudos</h1>
            <p className="text-gray-500 mt-1">Acompanhe seu progresso e mantenha o foco.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            <CheckCircle2 size={16} />
            <span>3 dias de ofensiva! 🔥</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna Principal: Cursos */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <GraduationCap size={24} className="text-indigo-600" />
            Continuar Aprendendo
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
            {courses.map((course) => (
              <div key={course.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4">
                    {/* Placeholder para Capa do Curso */}
                    <div className={`w-12 h-12 rounded-lg ${course.imageColor} flex items-center justify-center text-white font-bold text-xl shadow-sm`}>
                      {course.title.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-500">{course.platform} • {course.completedModules}/{course.totalModules} Módulos</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                {/* Barra de Progresso */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-gray-500">Progresso Geral</span>
                    <span className="text-indigo-600">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 hover:underline">
                    <PlayCircle size={16} />
                    Continuar Curso
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna Lateral: Metas e Anotações */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">Metas de Hoje</h3>
            <ul className="space-y-3">
              {todayGoals.map((goal) => (
                <li key={goal.id} className="flex items-start gap-3">
                  <div className={`mt-0.5 min-w-[18px] h-[18px] rounded border flex items-center justify-center cursor-pointer transition-colors ${
                    goal.completed ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 hover:border-indigo-400'
                  }`}>
                    {goal.completed && <CheckCircle2 size={14} className="text-white" />}
                  </div>
                  <span className={`text-sm ${goal.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                    {goal.text}
                  </span>
                </li>
              ))}
            </ul>
            <button className="w-full mt-6 py-2 border border-dashed border-gray-300 text-gray-500 rounded-lg text-sm hover:bg-gray-50 hover:border-gray-400 transition-all">
              + Adicionar nova meta
            </button>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-xl text-white shadow-lg">
            <h3 className="font-bold text-lg mb-2">Dica de Estudo 💡</h3>
            <p className="text-indigo-100 text-sm leading-relaxed mb-4">
              A técnica Pomodoro sugere 25 minutos de foco total seguidos por 5 minutos de descanso. Tente hoje!
            </p>
            <button className="bg-white/20 hover:bg-white/30 text-white text-xs py-2 px-4 rounded-lg transition-colors backdrop-blur-sm">
              Iniciar Timer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studies;