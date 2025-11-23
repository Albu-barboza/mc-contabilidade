import { useCallback } from 'react';

export const formatPhoneValue = (input: string) =>
  input
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');

const usePhoneMask = () => {
  const format = useCallback((value: string) => formatPhoneValue(value), []);
  return format;
};

export default usePhoneMask;
