// src/pages/RegisterStep2.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, AlertCircle } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import { formatarData, validarData } from '../utils/DateUtils';
import { formatarCPF, validarCPF } from '../utils/CPFUtils';
import { formatarTelefone } from '../utils/PhoneUtils';

interface FormDataStep1 {
  tipoPessoa: 'F' | 'J';
  nome: string;
  email: string;
  password: string;
  confirmPassword: string; // Não será enviado
}

interface FormDataStep2 {
  telefone: string;
  nomeFantasia?: string;
  cpf?: string; // Removido 'rg'
  // rg?: string; // <-- Removido
  dataNascimento?: string; // Formato DD/MM/AAAA
  sexo?: 'M' | 'F' | 'O';
  cnpj?: string;
  inscricaoEstadual?: string;
  nomeResponsavel?: string;
  papeisId: number;
}

const RegisterStep2: React.FC = () => {
  const [formData, setFormData] = useState<FormDataStep2>({
    telefone: '',
    nomeFantasia: '',
    cpf: undefined,
    // rg: undefined, // <-- Removido
    dataNascimento: undefined,
    sexo: undefined,
    cnpj: undefined,
    inscricaoEstadual: undefined,
    nomeResponsavel: undefined,
    papeisId: 3 // Padrão: Cliente
  });
  const [userData, setUserData] = useState<FormDataStep1 | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('tempUserData');
    if (!storedData) {
      navigate('/register'); // Redirecionar se não houver dados da etapa 1
      return;
    }
    const parsedData = JSON.parse(storedData) as FormDataStep1;
    setUserData(parsedData);

    // Definir valor padrão para sexo se for pessoa física
    if (parsedData.tipoPessoa === 'F') {
      setFormData(prev => ({ ...prev, sexo: 'M' }));
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'telefone') { // Aplicar máscara de telefone
      const valorFormatado = formatarTelefone(value);
      setFormData(prev => ({ ...prev, telefone: valorFormatado }));
      return;
    }

    if (name === 'dataNascimento') {
      const valorFormatado = formatarData(value);
      setFormData(prev => ({ ...prev, dataNascimento: valorFormatado }));
      return;
    }

    if (name === 'cpf') { // Aplicar máscara de CPF
      const valorFormatado = formatarCPF(value);
      setFormData(prev => ({ ...prev, cpf: valorFormatado }));
      return;
    }

    // Removido o bloco de máscara do RG

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!userData) {
      setError('Dados da etapa 1 não encontrados.');
      setIsLoading(false);
      return;
    }

    if (userData.tipoPessoa === 'F') {
      if (!formData.cpf) {
        setError('CPF é obrigatório para pessoa física.');
        setIsLoading(false);
        return;
      }
      // Validação do CPF
      if (!validarCPF(formData.cpf)) {
        setError('CPF inválido.');
        setIsLoading(false);
        return;
      }
    }

    if (userData.tipoPessoa === 'J' && !formData.cnpj) {
      setError('CNPJ é obrigatório para pessoa jurídica.');
      setIsLoading(false);
      return;
    }

    if (formData.dataNascimento && !validarData(formData.dataNascimento)) {
      setError('Data de nascimento inválida.');
      setIsLoading(false);
      return;
    }

    let dataNascimentoBackend: string | undefined = undefined;
    if (formData.dataNascimento) {
      const [dia, mes, ano] = formData.dataNascimento.split('/');
      dataNascimentoBackend = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
    }

    const payload = {
      tipo_pessoa: userData.tipoPessoa,
      nome: userData.nome,
      nome_fantasia: formData.nomeFantasia,
      telefone: formData.telefone,
      email: userData.email,
      password: userData.password,
      ...(userData.tipoPessoa === 'F' && {
        cpf: formData.cpf,
        // rg: formData.rg, // <-- Removido do payload
        data_nascimento: dataNascimentoBackend,
        sexo: formData.sexo
      }),
      ...(userData.tipoPessoa === 'J' && {
        cnpj: formData.cnpj,
        inscricao_estadual: formData.inscricaoEstadual,
        nome_responsavel: formData.nomeResponsavel
      }),
      papeis_id: formData.papeisId
    };

    console.log('Enviando dados completos:', payload); // Log para debug

    try {
      const response = await fetch('http://localhost:5000/api/v1/usuarios', { // 👈 Rota correta
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao registrar.');
      }

      const result = await response.json();
      console.log('Usuário criado com sucesso:', result);

      // Limpar dados temporários
      localStorage.removeItem('tempUserData');

      // Simular login e redirecionar
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard');

    } catch (err: any) {
      setError(err.message || 'Erro ao registrar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-slate-900 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-100">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">Carregando...</h2>
          <p className="text-gray-500">Verificando dados do cadastro.</p>
        </div>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-slate-900 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-100">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Zero Point</h2>
          <p className="text-gray-500 text-sm mt-2">Etapa 2: Informações Adicionais</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center text-sm">
            <AlertCircle size={16} className="mr-2" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campo de Telefone */}
          <div className="relative">
            <Input
              className="pl-10"
              type="tel"
              inputMode="tel"
              placeholder="Telefone (Opcional)"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
            />
          </div>

          {/* Campo de Nome Fantasia/Apelido */}
          <div className="relative">
            <Input
              className="pl-10"
              placeholder={userData.tipoPessoa === 'J' ? "Nome Fantasia (Opcional)" : "Apelido (Opcional)"}
              name="nomeFantasia"
              value={formData.nomeFantasia || ''}
              onChange={handleChange}
            />
          </div>

          {/* Campos Condicionais */}
          {userData.tipoPessoa === 'F' && (
            <>
              {/* CPF */}
              <div className="relative">
                <Input
                  className="pl-10"
                  placeholder="CPF"
                  name="cpf"
                  value={formData.cpf || ''}
                  onChange={handleChange} // A máscara agora é aplicada em handleChange
                  required
                />
              </div>

              {/* Removido: RG
              <div className="relative">
                <Input
                  className="pl-10"
                  placeholder="RG (Opcional)"
                  name="rg"
                  value={formData.rg || ''}
                  onChange={handleChange}
                />
              </div>
              */}

              {/* Data de Nascimento */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  className="pl-10"
                  type="text"
                  inputMode="numeric"
                  placeholder="Data de Nascimento (DD/MM/AAAA)"
                  name="dataNascimento"
                  value={formData.dataNascimento || ''}
                  onChange={handleChange}
                  maxLength={10}
                />
              </div>

              {/* Sexo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sexo</label>
                <select
                  name="sexo"
                  value={formData.sexo || 'M'}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                  <option value="O">Outro</option>
                </select>
              </div>
            </>
          )}

          {userData.tipoPessoa === 'J' && (
            <>
              {/* CNPJ */}
              <div className="relative">
                <Input
                  className="pl-10"
                  placeholder="CNPJ"
                  name="cnpj"
                  value={formData.cnpj || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, cnpj: e.target.value.replace(/\D/g, '') }))}
                  required
                />
              </div>

              {/* Inscrição Estadual */}
              <div className="relative">
                <Input
                  className="pl-10"
                  placeholder="Inscrição Estadual (Opcional)"
                  name="inscricaoEstadual"
                  value={formData.inscricaoEstadual || ''}
                  onChange={handleChange}
                />
              </div>

              {/* Nome do Responsável */}
              <div className="relative">
                <Input
                  className="pl-10"
                  placeholder="Nome do Responsável"
                  name="nomeResponsavel"
                  value={formData.nomeResponsavel || ''}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {/* Papel (papeis_id) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Papel</label>
            <select
              name="papeisId"
              value={formData.papeisId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value={3}>Cliente</option>
              <option value={2}>Colaborador</option>
              <option value={4}>Gerente</option>
              <option value={1}>Admin</option>
            </select>
          </div>

          {/* Botão de Submissão */}
          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            className={`mt-4 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] cursor-pointer'}`}
          >
            {isLoading ? 'Criando conta...' : 'Finalizar Cadastro'}
          </Button>
        </form>

        <div className="mt-6 text-center space-x-4">
          <button
            onClick={() => navigate('/register')}
            className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterStep2;