// --- Nova Função: Telefone ---
/**
 * Formata um número de telefone celular brasileiro para o padrão (XX) X XXXX-XXXX
 * ou (XX) XXXX-XXXX (para fixos antigos).
 * Assume que números com 11 dígitos são celulares e 10 são fixos.
 */
export function formatarTelefone(value: string): string {
  const numeros = value.replace(/\D/g, '');

  // Se tiver 11 dígitos (celular com 9)
  if (numeros.length <= 2) {
    return numeros;
  } else if (numeros.length <= 6) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  } else if (numeros.length <= 10) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
  } else {
    // 11 dígitos ou mais (celular com 9)
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 3)} ${numeros.slice(3, 7)}-${numeros.slice(7, 11)}`;
  }
}

/**
 * Validação simples de número de telefone brasileiro.
 * Verifica se tem 10 (fixo) ou 11 (móvel) dígitos após limpar caracteres.
 * Pode-se adicionar validação de DDD real ou operadora no futuro.
 */
export function validarTelefone(telefone: string): boolean {
  const numeros = telefone.replace(/\D/g, '');
  return (numeros.length === 10 || numeros.length === 11) && !/^(\d)\1{9,10}$/.test(numeros); // Evita 9999999999
}