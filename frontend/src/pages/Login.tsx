import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle } from 'lucide-react'; // Ícones
import Button from '../components/Button';
import Input from '../components/Input';

const Login: React.FC = () => {
  const [username, setUsername] = useState(''); // Pode manter 'username' se for o campo do formulário
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Chamada real para o backend Flask
      const response = await fetch('http://localhost:5000/api/v1/login', { // Confirme o endereço/porta
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }), // Envia 'email' e 'password'. Ajuste se o backend espera 'username'.
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Erro na resposta do servidor.' }));
        throw new Error(errorData.message || 'Erro na autenticação.');
      }

      const data = await response.json();
      console.log("Resposta do backend:", data); 

      if (data.access_token) { // Verifica se o token JWT foi retornado
        // Armazena o token JWT no localStorage
        localStorage.setItem('access_token', data.access_token);
        console.log("Token recebido, redirecionando...");
        // Opcional: Armazenar dados do usuário
        localStorage.setItem('user_data', JSON.stringify(data.usuario));

        // Redireciona para o dashboard
        navigate('/dashboard');

      } else {
        // O backend pode retornar sucesso HTTP (200) mas com success: false ou token ausente
        throw new Error(data.message || 'Falha na autenticação.');
      }
    } catch (err: any) {
      console.error("Erro durante o login:", err);
      setError(err.message || 'Falha na conexão com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-slate-900 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-100">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Zero Point</h2>
          <p className="text-gray-500 text-sm mt-2">Acesse sua conta para continuar</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center text-sm">
            <AlertCircle size={16} className="mr-2" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10" // Padding para o ícone
              placeholder="Email" // Pode mudar para "Email" se preferir
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            className={`mt-4 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] cursor-pointer'}`}
          >
            {isLoading ? 'Autenticando...' : 'Entrar'}
          </Button>
        </form>
        <div className="mt-6 text-center space-x-4">
          <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline">
            Esqueceu sua senha?
          </a>
          <span className="text-gray-400">•</span>
          <button
            onClick={() => navigate('/register')}
            className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
          >
            Não tem conta? Registre-se
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;