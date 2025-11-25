import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'glass' | 'outlined';
    hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({
    children,
    variant = 'default',
    hoverEffect = true,
    className = '',
    ...props
}) => {
    const baseStyles = 'rounded-2xl p-6 transition-all duration-300';

    const variants = {
        default: 'bg-white dark:bg-slate-800 shadow-md border border-gray-100 dark:border-slate-700',
        glass: 'bg-white/60 dark:bg-slate-900/70 backdrop-blur-md border border-gray-200 dark:border-white/10',
        outlined: 'bg-transparent border border-gray-200 dark:border-slate-700',
    };

    const hoverStyles = hoverEffect ? 'hover:shadow-xl hover:-translate-y-1' : '';

    return (
        <div className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`} {...props}>
            {children}
        </div>
    );
};

export default Card;
