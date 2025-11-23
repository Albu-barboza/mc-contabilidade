/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID: string;
  readonly VITE_WHATSAPP_NUMBER_FLOAT: string;
  readonly VITE_FORMSPREE_NEWSLETTER_URL: string;
  readonly VITE_WHATSAPP_NUMBER_FOOTER: string;
  readonly VITE_CONTACT_EMAIL: string;
  readonly VITE_COMPANY_CNPJ: string;
  readonly VITE_COMPANY_CRC: string;
  readonly VITE_FORMSPREE_CONTACT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: object) => void;
  }
}
