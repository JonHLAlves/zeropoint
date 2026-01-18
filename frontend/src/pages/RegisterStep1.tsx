// src/pages/RegisterStep1.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, AlertCircle } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';

interface FormDataStep1 {
  tipoPessoa: 'F' | 'J';
  nome: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterStep1: React.FC = () => {
  const [formData, setFormData] = useState<FormDataStep1>({
    tipoPessoa: 'F',
    nome: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (!formData.nome || !formData.email) {
      setError('Nome e e-mail são obrigatórios.');
      return;
    }

    // Armazenar dados temporariamente (localStorage ou sessionStorage)
    // Idealmente, use Context API ou Redux para gerenciar estado global de cadastro
    localStorage.setItem('tempUserData', JSON.stringify(formData));
    setIsLoading(false);
    navigate('/register-step2');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-slate-900 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-100">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Zero Point</h2>
          <p className="text-gray-500 text-sm mt-2">Etapa 1: Informações Básicas</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center text-sm">
            <AlertCircle size={16} className="mr-2" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Pessoa</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="tipoPessoa"
                  value="F"
                  checked={formData.tipoPessoa === 'F'}
                  onChange={handleChange}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2">Física</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="tipoPessoa"
                  value="J"
                  checked={formData.tipoPessoa === 'J'}
                  onChange={handleChange}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2">Jurídica</span>
              </label>
            </div>
          </div>

          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10"
              placeholder={formData.tipoPessoa === 'J' ? "Razão Social" : "Nome Completo"}
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10"
              type="email"
              placeholder="E-mail"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10"
              type="password"
              placeholder="Senha"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10"
              type="password"
              placeholder="Confirme sua senha"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            className={`mt-4 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] cursor-pointer'}`}
          >
            Continuar
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
          >
            Voltar para Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterStep1;