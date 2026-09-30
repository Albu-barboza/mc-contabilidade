import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Estende a interface Window para incluir a função gtag e evitar erros de TypeScript.
declare global {
    interface Window {
        gtag?: (command: string, eventName: string, params?: object) => void;
        dataLayer?: unknown[];
    }
}

const ID = (import.meta.env.VITE_GA_MEASUREMENT_ID || '').trim();
// só carrega o Google Analytics com um ID de verdade (G-XXXX); sem ele, nenhum script do Google entra na página
const ID_VALIDO = /^G-[A-Z0-9]{4,}$/.test(ID) && ID !== 'G-XXXXXXXXXX';

let carregado = false;
function carregarGtag() {
    if (carregado || !ID_VALIDO) return;
    carregado = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments);
    } as Window['gtag'];
    window.gtag!('js', new Date() as unknown as string);
    window.gtag!('config', ID, { send_page_view: false });
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ID)}`;
    document.head.appendChild(s);
}

const GoogleAnalytics = () => {
    const location = useLocation();

    useEffect(() => {
        carregarGtag();
    }, []);

    useEffect(() => {
        // envia uma visualização de página a cada troca de rota
        if (window.gtag) {
            window.gtag('event', 'page_view', {
                page_path: location.pathname + location.search + location.hash,
                page_location: window.location.href,
                page_title: document.title,
            });
        }
    }, [location]);

    return null;
};

export default GoogleAnalytics;
