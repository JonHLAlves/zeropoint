/**
 * Formata um CPF para o padrão XXX.XXX.XXX-XX
 */
export function formatarCPF(value: string): string {
  const numeros = value.replace(/\D/g, '');
  if (numeros.length <= 3) {
    return numeros;
  } else if (numeros.length <= 6) {
    return `${numeros.slice(0, 3)}.${numeros.slice(3)}`;
  } else if (numeros.length <= 9) {
    return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6)}`;
  } else {
    return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-${numeros.slice(9, 11)}`;
  }
}

/**
 * Valida um CPF usando o algoritmo de validação
 */
export function validarCPF(cpf: string): boolean {
  const numeros = cpf.replace(/\D/g, '');
  if (numeros.length !== 11 || /^(\d)\1{10}$/.test(numeros)) {
    return false;
  }

  let soma = 0;
  let resto: number;

  // Primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(numeros[i - 1]) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(numeros[9])) return false;

  // Segundo dígito verificador
  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(numeros[i - 1]) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(numeros[10])) return false;

  return true;
}

