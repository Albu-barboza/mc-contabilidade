import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
    threshold?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    delay = 0,
    className = '',
    direction = 'up',
    threshold = 0.2
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold]);

    const getTransform = () => {
        if (isVisible) return 'translate-x-0 translate-y-0';

        switch (direction) {
            case 'up':
                return 'translate-y-8';
            case 'down':
                return '-translate-y-8';
            case 'left':
                return 'translate-x-8';
            case 'right':
                return '-translate-x-8';
            case 'fade':
                return '';
            default:
                return 'translate-y-8';
        }
    };

    const visibilityClass = isVisible ? 'opacity-100' : 'opacity-0';
    const transformClass = getTransform();
    const delayStyle = delay ? { transitionDelay: `${delay}ms` } : {};

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${visibilityClass} ${transformClass} ${className}`}
            style={delayStyle}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
