import { getAssetUrl } from '../utils/assets';

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

const baseTestimonial = 'Depoimento ilustrativo (em atualizacao). Relato ficticio usado enquanto coletamos cases reais.';

export const testimonials: Testimonial[] = [
    {
        rating: 5,
        text: baseTestimonial,
        author: 'Cliente 1',
        role: 'MEI em acompanhamento',
        image: {
            src: getAssetUrl('/images/testimonials/icone.webp'),
            webp: getAssetUrl('/images/testimonials/icone.webp'),
            alt: 'Icone de cliente'
        }
    },
    {
        rating: 5,
        text: baseTestimonial,
        author: 'Cliente 2',
        role: 'PME em implantacao',
        image: {
            src: getAssetUrl('/images/testimonials/icone.webp'),
            webp: getAssetUrl('/images/testimonials/icone.webp'),
            alt: 'Icone de cliente'
        }
    },
    {
        rating: 5,
        text: baseTestimonial,
        author: 'Cliente 3',
        role: 'Empreendedor digital',
        image: {
            src: getAssetUrl('/images/testimonials/icone.webp'),
            webp: getAssetUrl('/images/testimonials/icone.webp'),
            alt: 'Icone de cliente'
        }
    },
    {
        rating: 5,
        text: baseTestimonial,
        author: 'Cliente 4',
        role: 'Consultoria em andamento',
        image: {
            src: getAssetUrl('/images/testimonials/icone.webp'),
            webp: getAssetUrl('/images/testimonials/icone.webp'),
            alt: 'Icone de cliente'
        }
    },
    {
        rating: 5,
        text: baseTestimonial,
        author: 'Cliente 5',
        role: 'Planejamento financeiro',
        image: {
            src: getAssetUrl('/images/testimonials/icone.webp'),
            webp: getAssetUrl('/images/testimonials/icone.webp'),
            alt: 'Icone de cliente'
        }
    },
    {
        rating: 5,
        text: baseTestimonial,
        author: 'Cliente 6',
        role: 'Caso em revisao',
        image: {
            src: getAssetUrl('/images/testimonials/icone.webp'),
            webp: getAssetUrl('/images/testimonials/icone.webp'),
            alt: 'Icone de cliente'
        }
    }
];
