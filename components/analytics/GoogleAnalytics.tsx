import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ID_GA, MEDICAO_ATIVA, aoEscolher, lerEscolha } from './consentimento';

// Estende a interface Window para incluir a função gtag e evitar erros de TypeScript.
declare global {
    interface Window {
        gtag?: (command: string, eventName: string, params?: object) => void;
        dataLayer?: unknown[];
    }
}

// O Google Analytics só entra na página com um ID de verdade (G-XXXX) E com o "aceito" do visitante
// no aviso de cookies. Sem as duas coisas, nenhum script do Google é carregado.
let carregado = false;
function carregarGtag() {
    if (carregado || !MEDICAO_ATIVA) return;
    carregado = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments);
    } as Window['gtag'];
    window.gtag!('js', new Date() as unknown as string);
    window.gtag!('config', ID_GA, { send_page_view: false });
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ID_GA)}`;
    document.head.appendChild(s);
}

// caminho da rota (o site usa #/rota): '/sobre', '/servicos/mei'...
function enviarPagina(caminho = window.location.hash.replace(/^#/, '') || '/') {
    window.gtag?.('event', 'page_view', {
        page_path: caminho,
        page_location: window.location.href,
        page_title: document.title,
    });
}

const GoogleAnalytics = () => {
    const location = useLocation();

    useEffect(() => {
        if (!MEDICAO_ATIVA) return;
        if (lerEscolha() === 'sim') carregarGtag();
        // quem aceita no aviso passa a ser medido a partir da página em que está
        return aoEscolher((v) => {
            if (v !== 'sim') return;
            carregarGtag();
            enviarPagina();
        });
    }, []);

    useEffect(() => {
        // envia uma visualização de página a cada troca de rota (só existe gtag depois do aceite);
        // espera um instante para o título da página nova já estar no lugar
        const id = window.setTimeout(() => enviarPagina(location.pathname + location.search), 0);
        return () => window.clearTimeout(id);
    }, [location]);

    return null;
};

export default GoogleAnalytics;
