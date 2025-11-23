export interface StatHighlightItem {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface HeroBenefit {
  title: string;
  description: string;
  icon: string;
}

export interface ProofBadge {
  label: string;
}

export interface CtaStep {
  number: string;
  title: string;
  description: string;
}

export type ContactItemKind = 'address' | 'email' | 'hours';

export interface ContactItem {
  kind: ContactItemKind;
  label: string;
  value: string;
  href?: string;
}

export interface TrustBadge {
  title: string;
  description: string;
}

const configuredContactEmail = import.meta.env.VITE_CONTACT_EMAIL;
const contactEmailValue = configuredContactEmail || 'contato@mccontabilidade.com.br';
const contactEmailHref = configuredContactEmail ? `mailto:${configuredContactEmail}` : undefined;

export const statHighlights: StatHighlightItem[] = [
  { value: 500, prefix: '+', label: 'Empresas atendidas' },
  { value: 15, suffix: ' anos', label: 'de experiência' },
  { value: 35, suffix: '%', label: 'economia média em tributos' },
  { value: 24, suffix: 'h', label: 'para retorno ao contato' }
];

export const proofBadges: ProofBadge[] = [
  { label: 'Parceiro Google Workspace' },
  { label: 'Escala SEBRAE' },
  { label: 'Clientes em 8 estados' }
];

export const heroBenefits: HeroBenefit[] = [
  { title: 'Retorno em até 24h', description: 'Contato rápido e direto com a equipe.', icon: '⚡' },
  { title: 'Especialistas CRC', description: 'Time 100% certificado à disposição.', icon: '🧑‍💼' },
  { title: 'Atendimento próximo', description: 'Linguagem clara, sem “contabilês”.', icon: '🎯' }
];

export const ctaSteps: CtaStep[] = [
  { number: '01', title: 'Primeiro contato', description: 'Você nos conta rapidamente o que precisa.' },
  { number: '02', title: 'Análise da equipe', description: 'Entendemos o cenário e preparamos a resposta.' },
  { number: '03', title: 'Retorno em até 24h', description: 'Voltamos com orientações e próximos passos.' }
];

export const contactItems: ContactItem[] = [
  {
    kind: 'address',
    label: 'Endereço',
    value: 'Av. Paulista, 1000 - Sala 1205 · São Paulo/SP'
  },
  {
    kind: 'email',
    label: 'E-mail',
    value: contactEmailValue,
    href: contactEmailHref
  },
  {
    kind: 'hours',
    label: 'Atendimento',
    value: 'Segunda a Sexta · 8h às 18h'
  }
];

export const trustBadges: TrustBadge[] = [
  { title: '15 anos', description: 'experiência comprovada' },
  { title: 'CRC-SP', description: 'equipe regularizada' },
  { title: '100% digital', description: 'assinaturas e arquivos' }
];
