import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { StatHighlightItem } from '../../data/home';

interface StatHighlightProps {
    stat: StatHighlightItem;
    delayMs?: number;
}

const StatHighlight: React.FC<StatHighlightProps> = ({ stat, delayMs = 0 }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const statRef = useScrollReveal<HTMLDivElement>({ threshold: 0.4 });

    useEffect(() => {
        const element = statRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                }
            },
            { threshold: 0.4 }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [hasAnimated, statRef]);

    useEffect(() => {
        if (!hasAnimated) return;
        let start: number | null = null;
        const duration = 1500;

        const animate = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(stat.value * eased));
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        const frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [hasAnimated, stat.value]);

    return (
        <div ref={statRef} className="scroll-reveal text-center" style={{ transitionDelay: `${delayMs}ms` }}>
            <p className="text-2xl sm:text-3xl font-bold text-[#1F3A5F] dark:text-slate-100 leading-tight">
                {stat.prefix || ''}
                {count.toLocaleString('pt-BR')}
                {stat.suffix || ''}
            </p>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-slate-300">{stat.label}</p>
        </div>
    );
};

export default StatHighlight;
