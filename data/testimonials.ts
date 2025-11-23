export interface OptimizedImagePaths {
    src: string;
    webp: string;
    alt: string;
}

export interface Testimonial {
    rating: number;
    text: string;
    author: string;
    role: string;
    image: OptimizedImagePaths;
}

export const testimonials: Testimonial[] = [
    {
        rating: 5,
        text: "A Contabilidade Premium transformou a gestão financeira da minha empresa. Conseguimos reduzir 35% da carga tributária de forma totalmente legal. O atendimento é impecável.",
        author: "Maria Silva",
        role: "CEO, TechFlow Solutions",
        image: {
            src: `${import.meta.env.BASE_URL}images/testimonials/icone.webp`,
            webp: `${import.meta.env.BASE_URL}images/testimonials/icone.webp`,
            alt: "Foto de Maria Silva"
        }
    },
    {
        rating: 5,
        text: "Profissionalismo de ponta a ponta. Abriram minha empresa em tempo recorde e me ajudaram a escolher o melhor regime tributário. Hoje tenho total tranquilidade para focar no meu negócio.",
        author: "João Oliveira",
        role: "Fundador, EcoMarket",
        image: {
            src: `${import.meta.env.BASE_URL}images/testimonials/icone.webp`,
            webp: `${import.meta.env.BASE_URL}images/testimonials/icone.webp`,
            alt: "Foto de João Oliveira"
        }
    },
    {
        rating: 5,
        text: "Como MEI, eu precisava de suporte sem burocracia. A equipe é extremamente atenciosa e sempre responde rapidamente. Os relatórios mensais me ajudam a entender melhor meu negócio.",
        author: "Ana Costa",
        role: "MEI, Designer Freelancer",
        image: {
            src: `${import.meta.env.BASE_URL}images/testimonials/icone.webp`,
            webp: `${import.meta.env.BASE_URL}images/testimonials/icone.webp`,
            alt: "Foto de Ana Costa"
        }
    },
    {
        rating: 5,
        text: "O serviço de planejamento financeiro nos deu uma clareza incrível sobre nossas finanças. Tomamos decisões muito mais assertivas agora. Recomendo fortemente!",
        author: "Pedro Martins",
        role: "Diretor, Construtora Aliança",
        image: {
            src: `${import.meta.env.BASE_URL}images/testimonials/icone.webp`,
            webp: `${import.meta.env.BASE_URL}images/testimonials/icone.webp`,
            alt: "Foto de Pedro Martins"
        }
    },
    {
        rating: 5,
        text: "Realizaram uma recuperação de impostos que eu nem sabia que tinha direito. O valor ajudou muito nosso fluxo de caixa. Equipe muito competente e honesta.",
        author: "Juliana Santos",
        role: "Sócia, Restaurante Sabor & Arte",
        image: {
            src: `${import.meta.env.BASE_URL}images/testimonials/icone.webp`,
            webp: `${import.meta.env.BASE_URL}images/testimonials/icone.webp`,
            alt: "Foto de Juliana Santos"
        }
    },
    {
        rating: 5,
        text: "Atendimento excepcional e profundo conhecimento técnico. A consultoria tributária deles é um divisor de águas para qualquer PME que busca crescer de forma sustentável.",
        author: "Fernando Gomes",
        role: "CFO, Logística Veloz",
        image: {
            src: `${import.meta.env.BASE_URL}images/testimonials/icone.webp`,
            webp: `${import.meta.env.BASE_URL}images/testimonials/icone.webp`,
            alt: "Foto de Fernando Gomes"
        }
    }
];