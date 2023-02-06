export const maskCPF = (value: string): string => {
  if (!value) return '';
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

export const maskName = (value: string): string => {
  if (!value) return '';
  return value
    .replace(/\d/g, '');
}
