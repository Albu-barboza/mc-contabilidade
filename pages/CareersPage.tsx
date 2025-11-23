import React, { useState } from 'react';
import JsonLd from '../components/common/JsonLd';
import Seo from '../components/common/Seo';
import { env } from '../config/env';

const heroStats = [
    { value: '70+', label: 'Colaboradores', detail: 'Times em hubs e modelo remote-first.' },
    { value: '86', label: 'NPS interno', detail: 'Feedbacks trimestrais e planos vivos.' },
    { value: '8', label: 'Squads', detail: 'Células consultivas por segmento.' }
];

const experienceHighlights: { title: string; description: string; icon: React.ReactNode }[] = [
    {
        title: 'Squads consultivos',
        description: 'Contabilidade, fiscal e sucesso do cliente trabalham juntos para cada vertical.',
        icon: (
            <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
                focusable="false"
            >
                <path d="M12 3v18M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="4" />
            </svg>
        )
    },
    {
        title: 'Playbook digital',
        description: 'Ferramentas proprietárias, rituais semanais e acompanhamento em dashboards.',
        icon: (
            <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
                focusable="false"
            >
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M7 8h10M7 12h6M7 16h4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        title: 'Experiência humana',
        description: 'Mentorias, bolsas de estudo e trilhas claras para crescer com autonomia.',
        icon: (
            <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
                focusable="false"
            >
                <path
                    d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <circle cx="10" cy="7" r="4" />
                <path d="M20 8v6M17 11h6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    }
];

const cultureTimeline = [
    { year: '2009', title: 'Fundação', description: 'Começamos como uma boutique na Av. Paulista com 4 pessoas.' },
    { year: '2015', title: 'Escala tech', description: 'Adotamos squads multidisciplinares e plataformas digitais.' },
    { year: '2020', title: 'Remote first', description: 'Criamos hubs colaborativos e benefícios flexíveis.' },
    { year: 'Hoje', title: 'Expansão nacional', description: 'Times em 5 estados atendendo clientes em todo o Brasil.' }
];

const perksList = [
    { label: 'R$ 3k/ano', title: 'Formação contínua', description: 'Bolsa anual para certificações, eventos e mentorias.' },
    { label: 'Bem-estar', title: 'Day-off + saúde', description: 'Plano médico, apoio psicológico e day-off no aniversário.' },
    { label: 'Experience hubs', title: 'Studios MC', description: 'Ambientes assinados para encontros e labs presenciais.' }
];

const openRoles = [
    {
        area: 'Consultoria Fiscal e Tributária',
        description: 'Especialistas em planejamento tributário, revisão fiscal e projetos de eficiência.',
        tags: ['Híbrido · SP', 'Pleno/Sênior', 'Squad Indústria']
    },
    {
        area: 'Contábil & Controladoria',
        description: 'Controllers e contadores para liderar fechamentos, DRE e conteúdo consultivo.',
        tags: ['Remoto-first', 'Pleno/Sênior', 'Squad Serviços']
    },
    {
        area: 'Onboarding & Customer Success',
        description: 'Executivos(as) de contas e CS para conduzir implantação e rituais com clientes.',
        tags: ['Híbrido', 'Pleno', 'Tribo Growth']
    },
    {
        area: 'Gente, Operações e Produto',
        description: 'Talentos para pessoas & cultura, financeiro, comunicação e produto interno.',
        tags: ['Remoto', 'Júnior/Pleno', 'Backoffice']
    }
];

const processJourney = [
    { step: '01', title: 'Aplicação + fit cultural', text: 'Conte sua trajetória e como gera valor para clientes.' },
    { step: '02', title: 'Conversa com liderança', text: 'Bate-papo estruturado com quem lidera a squad.' },
    { step: '03', title: 'Case guiado', text: 'Desafio rápido com buddy para entendermos seu raciocínio.' },
    { step: '04', title: 'Proposta personalizada', text: 'Feedback transparente e plano de desenvolvimento.' }
];

const softSkills = [
    'Pensamento analítico para transformar dados em planos acionáveis.',
    'Colaboração e comunicação transparente com clientes e squads.',
    'Autonomia responsável e priorização orientada a impacto.',
    'Vontade de aprender, ensinar e evoluir continuamente.'
];

const CareersPage: React.FC = () => {
    const description =
        'Faça parte da MC Contabilidade. Conheça nossa cultura, squads consultivos e oportunidades para contadores, fiscais e especialistas em sucesso do cliente.';

    const [formState, setFormState] = useState({ nome: '', email: '', area: '', mensagem: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const careersEndpoint = env.formspreeCareersUrl;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!careersEndpoint) {
            setStatus('error');
            return;
        }
        setStatus('sending');
        try {
            const response = await fetch(careersEndpoint, {
                method: 'POST',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formState, origem: 'careers_page' })
            });
            if (!response.ok) throw new Error();
            setStatus('success');
            setFormState({ nome: '', email: '', area: '', mensagem: '' });
            setTimeout(() => setStatus('idle'), 4000);
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    // Mesma base visual de cards da Home
    const neutralCardClasses =
        'relative rounded-2xl border bg-white/60 dark:bg-slate-900/70 border-gray-200 dark:border-white/20 ' +
        'backdrop-blur-md shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:border-gray-300 ' +
        'dark:hover:border-white/40 hover:-translate-y-3';

    const blueCardClasses =
        'relative rounded-2xl border border-transparent bg-gradient-to-br from-[#1F3A5F] to-[#2E4F7E] text-white ' +
        'backdrop-blur-md shadow-2xl p-8 transition-all duration-300 hover:-translate-y-3';

    const neutralLargeCardClasses =
        'relative rounded-[32px] border bg-white/60 dark:bg-slate-900/70 border-gray-200 dark:border-white/20 ' +
        'backdrop-blur-xl shadow-xl p-8 md:p-10';

    const blueLargeCardClasses =
        'relative rounded-[32px] border border-transparent bg-gradient-to-br from-[#1F3A5F] to-[#2E4F7E] text-white ' +
        'backdrop-blur-xl shadow-2xl p-8 md:p-10';

    return (
        <>
            <Seo title="Trabalhe na MC Contabilidade" description={description} />
            <JsonLd
                schema={{
                    '@context': 'https://schema.org',
                    '@type': 'WebPage',
                    name: 'Trabalhe Conosco - MC Contabilidade',
                    description: 'Faça parte do time consultivo da MC Contabilidade.'
                }}
            />

            <main className="text-slate-800 dark:text-slate-100">
                {/* Hero Section */}
                <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24">
                    <div className="absolute inset-0">
                        <img src={`${import.meta.env.BASE_URL}images/equipe.webp`} alt="Equipe MC Contabilidade" className="w-full h-full object-cover animate-kenBurns" />
                        <div className="absolute inset-0 bg-slate-300/60 dark:bg-slate-900/75" />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-slate-400/20" />
                        <div className="absolute -right-12 top-10 w-56 h-56 bg-white/15 blur-3xl" />
                        <div className="absolute -left-10 bottom-0 w-72 h-72 bg-slate-400/15 blur-3xl" />
                    </div>

                    <div className="relative z-10 container mx-auto px-4 sm:px-6">
                        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 items-center">
                            <div className="space-y-6">
                                <p className="text-xs uppercase tracking-[0.45em] text-[#1F3A5F] dark:text-white/90">
                                    Trabalhe conosco
                                </p>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
                                    Transforme sua carreira na{' '}
                                    <span className="text-gradient">contabilidade consultiva</span> que une dados e pessoas
                                </h1>
                                <p className="text-base sm:text-lg text-gray-700 dark:text-white/90">
                                    Buscamos pessoas curiosas, colaborativas e com vontade de criar experiências financeiras estratégicas
                                    para MEIs e empresas em expansão.
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    <span className="px-4 py-2 rounded-full bg-white/80 dark:bg-white/15 border border-gray-200 dark:border-white/20 text-sm backdrop-blur text-gray-800 dark:text-white">
                                        Modelo remote-first
                                    </span>
                                    <span className="px-4 py-2 rounded-full bg-white/80 dark:bg-white/15 border border-gray-200 dark:border-white/20 text-sm backdrop-blur text-gray-800 dark:text-white">
                                        Squads orientados a dados
                                    </span>
                                    <span className="px-4 py-2 rounded-full bg-white/80 dark:bg-white/15 border border-gray-200 dark:border-white/20 text-sm backdrop-blur text-gray-800 dark:text-white">
                                        Trilhas personalizadas
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-4 pt-6 pb-4">
                                    <a
                                        href="#talentos"
                                        className="inline-flex items-center justify-center min-w-[200px] px-8 py-3 rounded-full bg-gradient-to-r from-[#1F3A5F] to-[#2E4F7E] text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                    >
                                        Quero enviar meu perfil
                                    </a>
                                    <a
                                        href="#oportunidades"
                                        className="inline-flex items-center justify-center min-w-[200px] px-8 py-3 rounded-full border-2 border-[#1F3A5F] dark:border-white/60 text-[#1F3A5F] dark:text-white font-semibold hover:-translate-y-1 transition"
                                    >
                                        Conhecer oportunidades
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Como trabalhamos – cards seguindo a base de Serviços da Home */}
                <section className="py-16 sm:py-20">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <p className="text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-white/80">Como trabalhamos</p>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                                Experiência desenhada para alto impacto
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 mt-3">
                                Processos claros, tecnologia proprietária e cultura que incentiva autonomia com responsabilidade.
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            {experienceHighlights.map((highlight, index) => (
                                <div
                                    key={highlight.title}
                                    className={`${index === 0 ? blueCardClasses : neutralCardClasses} flex flex-col`}
                                >
                                    <div
                                        className={[
                                            'w-12 h-12 flex items-center justify-center rounded-xl mb-4',
                                            index === 0
                                                ? 'bg-white/20 text-white'
                                                : 'bg-[#E8EDF4] dark:bg-white/10 text-[#1F3A5F] dark:text-white'
                                        ].join(' ')}
                                    >
                                        {highlight.icon}
                                    </div>
                                    <h3
                                        className={[
                                            'text-xl font-semibold mb-2',
                                            index === 0 ? 'text-white' : 'text-slate-900 dark:text-white'
                                        ].join(' ')}
                                    >
                                        {highlight.title}
                                    </h3>
                                    <p
                                        className={
                                            index === 0
                                                ? 'text-white/90'
                                                : 'text-gray-600 dark:text-gray-300'
                                        }
                                    >
                                        {highlight.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Nossa cultura + Benefícios vivos – glass igualado */}
                <section className="py-16 sm:py-20">
                    <div className="container mx-auto px-4 sm:px-6 grid gap-10 lg:grid-cols-2">
                        {/* Neutro vidro */}
                        <div className={neutralLargeCardClasses}>
                            <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-white/80">Nossa cultura</p>
                            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-2 mb-6">
                                Momentos que moldam quem somos
                            </h2>
                            <div className="space-y-6">
                                {cultureTimeline.map(moment => (
                                    <div key={moment.year} className="flex gap-4">
                                        <div className="text-sm font-semibold text-[#1F3A5F] dark:text-[#A9C1FF] uppercase tracking-[0.3em] mt-1">
                                            {moment.year}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{moment.title}</h3>
                                            <p className="text-slate-600 dark:text-slate-300">{moment.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Azul vidro */}
                        <div className={`${blueLargeCardClasses} text-white`}>
                            <p className="text-xs uppercase tracking-[0.35em] text-white/90">Benefícios vivos</p>
                            <h2 className="text-2xl font-semibold mt-2 mb-6">Cuidamos de quem cuida dos clientes</h2>
                            <div className="space-y-5">
                                {perksList.map(perk => (
                                    <div
                                        key={perk.title}
                                        className="rounded-2xl border border-white/30 bg-white/10 backdrop-blur-xl p-5 shadow-lg"
                                    >
                                        <p className="text-sm uppercase tracking-[0.35em] text-white/80">{perk.label}</p>
                                        <h3 className="text-lg font-semibold text-white">{perk.title}</h3>
                                        <p className="text-white/90">{perk.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Oportunidades – cards neutros = ServiceCard neutro, primeiro = destaque azul */}
                <section id="oportunidades" className="py-20">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-10">
                            <div>
                                <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-white/80">Oportunidades</p>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Papéis em destaque</h2>
                                <p className="text-slate-600 dark:text-slate-300 mt-2">
                                    Não encontrou a vaga ideal? Envie mesmo assim: adoramos conhecer histórias diferentes.
                                </p>
                            </div>
                            <a
                                href="#talentos"
                                className="px-6 py-3 rounded-2xl bg-[#1F3A5F] text-white font-semibold shadow-lg hover:-translate-y-1 transition"
                            >
                                Enviar currículo
                            </a>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {openRoles.map((role, index) => (
                                <div
                                    key={role.area}
                                    className={index === 0 ? blueCardClasses : neutralCardClasses}
                                >
                                    <h3
                                        className={[
                                            'text-xl font-semibold',
                                            index === 0 ? 'text-white' : 'text-slate-900 dark:text-slate-100'
                                        ].join(' ')}
                                    >
                                        {role.area}
                                    </h3>
                                    <p
                                        className={
                                            index === 0
                                                ? 'mt-2 text-white/90'
                                                : 'mt-2 text-slate-600 dark:text-slate-300'
                                        }
                                    >
                                        {role.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {role.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className={[
                                                    'px-3 py-1 rounded-full text-xs font-semibold',
                                                    index === 0
                                                        ? 'bg-white/18 text-white border border-white/30'
                                                        : 'bg-[#E8EDF4] text-[#1F3A5F] dark:bg-slate-800 dark:text-slate-100'
                                                ].join(' ')}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Processo seletivo + O que valorizamos */}
                <section className="py-16 sm:py-20">
                    <div className="container mx-auto px-4 sm:px-6 grid gap-10 lg:grid-cols-2">
                        {/* Neutro vidro */}
                        <div className={neutralLargeCardClasses}>
                            <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-white/80">
                                Processo seletivo
                            </p>
                            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-2 mb-6">
                                Transparente do começo ao fim
                            </h2>
                            <div className="space-y-5">
                                {processJourney.map(step => (
                                    <div key={step.step} className="flex gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-[#E8EDF4] dark:bg-slate-800 text-[#1F3A5F] dark:text-white font-bold flex items-center justify-center">
                                            {step.step}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{step.title}</h3>
                                            <p className="text-slate-600 dark:text-slate-300">{step.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Azul vidro */}
                        <div className={`${blueLargeCardClasses} text-white`}>
                            <p className="text-xs uppercase tracking-[0.35em] text-white/90">O que valorizamos</p>
                            <h2 className="text-2xl font-semibold mt-2 mb-6">Soft skills que brilham por aqui</h2>
                            <ul className="space-y-4 text-white/90">
                                {softSkills.map(skill => (
                                    <li key={skill} className="flex gap-3">
                                        <span className="mt-1 h-2 w-2 rounded-full bg-white/80" />
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Talentos – permanece com o vidro que você já curtiu */}
                <section id="talentos" className="relative py-20 overflow-hidden">
                    <div className="absolute inset-0">
                        <img src={`${import.meta.env.BASE_URL}images/analise.webp`} alt="Análise de dados" className="w-full h-full object-cover animate-kenBurns" />
                        <div className="absolute inset-0 bg-slate-900/50 dark:bg-slate-950/60" />
                    </div>
                    <div className="absolute -right-14 top-6 w-64 h-64 bg-[#A5B4FC]/20 blur-3xl" />
                    <div className="absolute -left-10 bottom-4 w-64 h-64 bg-[#F9A8D4]/20 blur-3xl" />

                    <div className="relative container mx-auto px-4 sm:px-6">
                        <div className="rounded-[36px] border border-white/20 dark:border-white/10 bg-[#1F3A5F]/10 dark:bg-[#2E4F7E]/10 backdrop-blur-xl shadow-2xl grid lg:grid-cols-2 gap-10 p-8 md:p-12">
                            <div className="space-y-5">
                                <p className="text-xs uppercase tracking-[0.35em] text-white/90">Conte sua história</p>
                                <h2 className="text-3xl font-bold text-white">Mostre seu talento para nossos times</h2>
                                <p className="text-white/90">
                                    Responda com links, cases ou um pitch rápido. Respondemos todos os contatos em até 5 dias úteis.
                                </p>
                                <div className="rounded-2xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 p-5">
                                    <p className="text-sm uppercase tracking-[0.35em] text-white/90">Dica do time</p>
                                    <p className="text-white/90">
                                        Inclua LinkedIn, portfólio ou um áudio/vídeo curto. Adoramos conhecer seu raciocínio.
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    className="w-full rounded-2xl px-4 py-3 bg-white/85 dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[#1F3A5F]/40 dark:focus:ring-white/30 text-slate-800 dark:text-white"
                                    name="nome"
                                    placeholder="Nome completo *"
                                    value={formState.nome}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    className="w-full rounded-2xl px-4 py-3 bg-white/85 dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[#1F3A5F]/40 dark:focus:ring-white/30 text-slate-800 dark:text-white"
                                    name="email"
                                    type="email"
                                    placeholder="E-mail profissional *"
                                    value={formState.email}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="area" className="text-sm font-semibold text-white/90">
                                    Área de interesse
                                </label>
                                <select
                                    id="area"
                                    className="w-full rounded-2xl px-4 py-3 bg-white/85 dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[#1F3A5F]/40 dark:focus:ring-white/30 text-slate-800 dark:text-white"
                                    name="area"
                                    value={formState.area}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecione uma área</option>
                                    {openRoles.map(role => (
                                        <option key={role.area} value={role.area}>
                                            {role.area}
                                        </option>
                                    ))}
                                </select>
                                <textarea
                                    className="w-full rounded-2xl px-4 py-3 bg-white/85 dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[#1F3A5F]/40 dark:focus:ring-white/30 text-slate-800 dark:text-white"
                                    name="mensagem"
                                    placeholder="LinkedIn, portfólio, vídeo ou resumo do seu momento"
                                    rows={4}
                                    value={formState.mensagem}
                                    onChange={handleChange}
                                />
                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full rounded-2xl bg-[#1F3A5F] text-white font-semibold py-3 shadow-lg hover:-translate-y-1 transition disabled:opacity-70"
                                >
                                    {status === 'sending'
                                        ? 'Enviando...'
                                        : status === 'success'
                                            ? 'Recebido, obrigado!'
                                            : status === 'error'
                                                ? 'Ops, tente novamente'
                                                : 'Enviar meu currículo'}
                                </button>
                                {status === 'success' && (
                                    <p className="text-sm text-green-600 dark:text-green-400 text-center">
                                        Recebemos seu perfil. Falaremos em breve!
                                    </p>
                                )}
                                {status === 'error' && (
                                    <p className="text-sm text-red-600 dark:text-rose-400 text-center">
                                        Não conseguimos enviar agora. Tente novamente.
                                    </p>
                                )}
                                <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                                    Dados protegidos. Usamos suas informações apenas para contato interno.
                                </p>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default CareersPage;
