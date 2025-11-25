import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';

export interface ServiceCardContent {
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
    link: string;
    featured?: boolean;
    badge?: string;
}

interface ServiceCardProps extends ServiceCardContent {
    badge?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features, link, featured = false, badge }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.15 }
        );

        if (cardRef.current) observer.observe(cardRef.current);
        return () => {
            if (cardRef.current) observer.unobserve(cardRef.current);
        };
    }, []);

    if (featured) {
        return (
            <div ref={cardRef} data-animate className="group data-[animate]:animate-in h-full">
                <Card
                    variant="default"
                    className="relative bg-gradient-to-br from-primary to-primary-light text-white border-transparent shadow-2xl lg:scale-105 h-full flex flex-col"
                    hoverEffect={true}
                >
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 text-xs font-bold rounded-full uppercase tracking-wider">
                        Mais Procurado
                    </div>
                    <div className="w-16 h-16 flex items-center justify-center bg-white/20 rounded-xl mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                        {icon}
                    </div>
                    {badge ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 mb-3">
                            {badge}
                        </span>
                    ) : null}
                    <h3 className="text-2xl font-bold mb-3">{title}</h3>
                    <p className="text-gray-200/90 mb-5 flex-grow">{description}</p>
                    <ul className="space-y-2 mb-6 text-sm text-white/90">
                        {features.map((feature) => (
                            <li key={feature} className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <Link to={link} className="font-semibold text-white self-start group/link after:absolute after:inset-0">
                        Saiba mais{' '}
                        <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">
                            &rarr;
                        </span>
                    </Link>
                </Card>
            </div>
        );
    }

    return (
        <div ref={cardRef} data-animate className="group data-[animate]:animate-in h-full">
            <Card variant="glass" className="h-full flex flex-col" hoverEffect={true}>
                <div className="w-16 h-16 flex items-center justify-center bg-accent dark:bg-white/10 rounded-xl text-primary dark:text-white mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <span aria-hidden="true">{icon}</span>
                </div>
                {badge ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-primary dark:text-white bg-accent dark:bg-white/20 rounded-full mb-3">
                        {badge}
                    </span>
                ) : null}
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-5 flex-grow">{description}</p>
                <ul className="space-y-2 mb-6 text-sm text-gray-600 dark:text-gray-300">
                    {features.map((feature) => (
                        <li key={feature} className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-primary dark:text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                        </li>
                    ))}
                </ul>
                <Link
                    to={link}
                    className="font-semibold text-primary dark:text-[#C6D7FF] self-start group-hover:text-primary-light dark:group-hover:text-white after:absolute after:inset-0"
                >
                    Saiba mais{' '}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                        &rarr;
                    </span>
                </Link>
            </Card>
        </div>
    );
};

export default ServiceCard;
