export type ServiceIconKey = 'company' | 'mei' | 'pme' | 'consultoria' | 'finance';

export interface ServiceCardContent {
  icon: ServiceIconKey;
  title: string;
  description: string;
  features: string[];
  link: string;
  featured?: boolean;
  badge?: string;
}

export const serviceCards: ServiceCardContent[] = [
  {
    icon: 'company',
    title: 'Abertura de Empresa',
    description: 'Orientacao e envio de documentos para registro do CNPJ e enquadramento inicial.',
    features: ['Orientacao sobre enquadramento', 'Checklist de documentacao', 'Acompanhamento online'],
    link: '/servicos/abertura-empresa',
    badge: 'Prazos em atualizacao'
  },
  {
    icon: 'mei',
    title: 'Contabilidade MEI',
    description: 'Rotina essencial para microempreendedores com suporte humano e direto.',
    features: ['Declaracao anual (DASN-SIMEI)', 'Emissao de guias quando configurada', 'Suporte consultivo'],
    link: '/servicos/mei',
    badge: 'Valores em atualizacao'
  },
  {
    icon: 'pme',
    title: 'Contabilidade PME',
    description: 'Operacao contabile e fiscal para pequenas e medias empresas com olhar consultivo.',
    features: ['Escrituracao contabile e fiscal', 'Folha completa e eSocial', 'Relatorios gerenciais combinados'],
    link: '/servicos/pme',
    featured: true,
    badge: 'Planos em revisao'
  },
  {
    icon: 'consultoria',
    title: 'Consultoria Tributaria',
    description: 'Analise e orientacao tributaria com foco em conformidade e clareza.',
    features: ['Analise de regime tributario', 'Revisao de obrigacoes', 'Acompanhamento continuo'],
    link: '/servicos/consultoria-tributaria',
    badge: 'Planejamento em revisao'
  },
  {
    icon: 'finance',
    title: 'Planejamento Financeiro',
    description: 'Controles e indicadores para apoiar decisoes de forma transparente.',
    features: ['Fluxo de caixa e DRE', 'Projecoes financeiras', 'KPIs combinados com o negocio'],
    link: '/servicos/planejamento-financeiro',
    badge: 'Visao financeira em revisao'
  }
];
