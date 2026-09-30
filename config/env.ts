/**
 * Centralized environment configuration.
 * Validates and exports environment variables with fallbacks.
 */

interface EnvConfig {
    contactEmail: string;
    whatsappNumber: string;
    formspreeContactUrl: string;
    formspreeCareersUrl: string;
    gaMeasurementId: string;
}

const getEnv = (key: string, fallback?: string): string => {
    const value = (import.meta.env[key] || '').trim();
    if (!value && fallback === undefined) {
        // só avisa enquanto o site está sendo montado; o visitante não precisa ver isso no console
        if (import.meta.env.DEV) console.warn(`Missing environment variable: ${key}`);
        return '';
    }
    return value || fallback || '';
};

export const env: EnvConfig = {
    // sem e-mail configurado, fica vazio: um endereço de exemplo no ar pareceria verdadeiro
    contactEmail: getEnv('VITE_CONTACT_EMAIL'),
    whatsappNumber: getEnv('VITE_WHATSAPP_NUMBER_FLOAT'),
    formspreeContactUrl: getEnv('VITE_FORMSPREE_CONTACT_URL'),
    formspreeCareersUrl: getEnv('VITE_FORMSPREE_CAREERS_URL'),
    gaMeasurementId: getEnv('VITE_GA_MEASUREMENT_ID'),
};

// Dados legais do escritório. Aparecem no rodapé, na política de privacidade e nos termos
// quando preenchidos; vazios, o texto se ajusta e não mostra nada inventado.
export const empresa = {
    razaoSocial: getEnv('VITE_COMPANY_RAZAO_SOCIAL'),
    cnpj: getEnv('VITE_COMPANY_CNPJ'),
    crc: getEnv('VITE_COMPANY_CRC'),
    endereco: getEnv('VITE_COMPANY_ENDERECO'),
    email: env.contactEmail,
    // encarregado de dados (LGPD). Escritório de pequeno porte pode dispensar, mantendo o e-mail como canal.
    encarregado: getEnv('VITE_ENCARREGADO_NOME', ''),
};

export const getWhatsappLink = (message: string = 'Olá! Vim pelo site da MC Contabilidade e gostaria de conversar.'): string => {
    const raw = env.whatsappNumber;
    if (!raw) return '#';

    const clean = raw.replace(/\D/g, '');
    const number = clean.length === 11 ? `55${clean}` : clean;

    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};
