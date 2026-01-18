/**
 * Formata um RG para o padrão XX.XXX.XXX-X (padrão mais comum no Brasil)
 * Obs: RGs podem variar entre estados, então isso é uma aproximação.
 */
export function formatarRG(value: string): string {
  const numeros = value.replace(/\D/g, '');
  if (numeros.length <= 2) {
    return numeros;
  } else if (numeros.length <= 5) {
    return `${numeros.slice(0, 2)}.${numeros.slice(2)}`;
  } else if (numeros.length <= 8) {
    return `${numeros.slice(0, 2)}.${numeros.slice(2, 5)}.${numeros.slice(5)}`;
  } else {
    return `${numeros.slice(0, 2)}.${numeros.slice(2, 5)}.${numeros.slice(5, 8)}-${numeros.slice(8, 9)}`;
  }
}

/**
 * Validação simples de RG: verifica se tem entre 7 e 10 dígitos após limpar caracteres
 * Obs: A validação real de RG varia por estado e é complexa. Esta é uma verificação básica.
 */
export function validarRG(rg: string): boolean {
  const numeros = rg.replace(/\D/g, '');
  return numeros.length >= 7 && numeros.length <= 10; // Tamanho comum no Brasil
}