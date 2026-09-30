import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/common/Seo';
import CabecalhoPagina from '../components/paginas/CabecalhoPagina';

// Endereço que não existe: diz o que houve e oferece o caminho de volta.
const NotFoundPage: React.FC = () => (
  <>
    <Seo title="Página não encontrada" description="Esta página não existe ou mudou de endereço." />
    <CabecalhoPagina titulo="Página não encontrada" lead="Este endereço não existe ou mudou de lugar. Os caminhos abaixo levam de volta.">
      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/" className="pressionar rounded-full bg-latao px-7 py-4 text-sm font-bold text-noite hover:bg-latao-claro">
          Ir para o início
        </Link>
        <Link to="/servicos" className="pressionar rounded-full border border-marfim/40 px-7 py-4 text-sm font-bold text-marfim hover:border-marfim">
          Ver os serviços
        </Link>
      </div>
    </CabecalhoPagina>
  </>
);

export default NotFoundPage;
