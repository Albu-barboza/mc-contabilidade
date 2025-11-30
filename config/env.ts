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
    const value = import.meta.env[key];
    if (!value && fallback === undefined) {
        console.warn(`Missing environment variable: ${key}`);
        return '';
    }
    return value || fallback || '';
};

export const env: EnvConfig = {
    contactEmail: getEnv('VITE_CONTACT_EMAIL', 'contato@empresa.com'),
    whatsappNumber: getEnv('VITE_WHATSAPP_NUMBER_FLOAT'),
    formspreeContactUrl: getEnv('VITE_FORMSPREE_CONTACT_URL'),
    formspreeCareersUrl: getEnv('VITE_FORMSPREE_CAREERS_URL'),
    gaMeasurementId: getEnv('VITE_GA_MEASUREMENT_ID'),
};

export const getWhatsappLink = (message: string = 'Ola! Gostaria de falar com a equipe (em atualizacao).'): string => {
    const raw = env.whatsappNumber;
    if (!raw) return '#';

    const clean = raw.replace(/\D/g, '');
    const number = clean.length === 11 ? `55${clean}` : clean;

    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};
