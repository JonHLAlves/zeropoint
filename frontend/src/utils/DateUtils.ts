export function formatarData(value: string): string {
  const numeros = value.replace(/\D/g, '');
  if (numeros.length <= 2) {
    return numeros;
  } else if (numeros.length <= 4) {
    return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
  } else {
    return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4, 8)}`;
  }
}

export function validarData(dataStr: string): boolean {
  if (!dataStr.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
    return false;
  }
  const [dia, mes, ano] = dataStr.split('/').map(Number);
  const data = new Date(ano, mes - 1, dia); // meses em JS são 0-indexados
  return data.getDate() === dia && data.getMonth() === mes - 1 && data.getFullYear() === ano;
}