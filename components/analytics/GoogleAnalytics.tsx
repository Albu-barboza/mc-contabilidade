import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Estende a interface Window para incluir a função gtag e evitar erros de TypeScript.
declare global {
    interface Window {
        gtag?: (command: string, eventName: string, params?: object) => void;
    }
}

const GoogleAnalytics = () => {
    const location = useLocation();

    useEffect(() => {
        // O ID de Métrica (GA_MEASUREMENT_ID) já foi configurado no index.html.
        // Este efeito garante que uma nova visualização de página ('page_view') seja enviada
        // ao Google Analytics toda vez que a rota da aplicação muda.
        if (window.gtag) {
            window.gtag('event', 'page_view', {
                page_path: location.pathname + location.search + location.hash,
                page_location: window.location.href,
                page_title: document.title,
            });
        }
    }, [location]); // O efeito é re-executado toda vez que a 'location' (URL) muda.

    // Este componente não renderiza nada na tela, ele apenas executa a lógica de rastreamento.
    return null;
};

export default GoogleAnalytics;