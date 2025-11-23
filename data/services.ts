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
    description: 'Processo completo de abertura de CNPJ, escolha do regime tributário ideal e registro nos órgãos competentes.',
    features: ['Consultoria para enquadramento', 'Documentação completa', 'Processo ágil e digital'],
    link: '/servicos/abertura-empresa',
    badge: 'CNPJ pronto em 7 dias'
  },
  {
    icon: 'mei',
    title: 'Contabilidade MEI',
    description: 'Gestão simplificada para microempreendedores com suporte completo e preço acessível.',
    features: ['Declaração anual (DASN-SIMEI)', 'Emissão de guias DAS', 'Suporte especializado'],
    link: '/servicos/mei',
    badge: 'a partir de R$ 99/mês'
  },
  {
    icon: 'pme',
    title: 'Contabilidade PME',
    description: 'Solução completa para pequenas e médias empresas crescerem com segurança.',
    features: ['Escrituração contábil e fiscal', 'Folha completa e eSocial', 'Relatórios gerenciais mensais'],
    link: '/servicos/pme',
    featured: true,
    badge: 'Plano consultivo'
  },
  {
    icon: 'consultoria',
    title: 'Consultoria Tributária',
    description: 'Planejamento tributário estratégico para reduzir custos legalmente e melhorar sua margem.',
    features: ['Análise de regime tributário', 'Recuperação de impostos', 'Compliance fiscal contínuo'],
    link: '/servicos/consultoria-tributaria',
    badge: 'Economia média de 28%'
  },
  {
    icon: 'finance',
    title: 'Planejamento Financeiro',
    description: 'Análises, projeções e indicadores para um crescimento sustentável.',
    features: ['Fluxo de caixa e DRE', 'Projeções financeiras', 'KPIs personalizados'],
    link: '/servicos/planejamento-financeiro',
    badge: 'Visibilidade < 30 dias'
  }
];
