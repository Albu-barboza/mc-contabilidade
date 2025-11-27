import React from 'react';

type ClassValue = string | false | null | undefined;

interface SectionProps {
  id?: string;
  title: string;
  eyebrow?: string;
  description?: string;
  children: React.ReactNode;
  sectionClassName?: string;
  containerClassName?: string;
  headerClassName?: string;
  eyebrowClassName?: string;
  headerWrapper?: (header: React.ReactNode) => React.ReactNode;
}

const mergeClasses = (...classes: ClassValue[]) => classes.filter(Boolean).join(' ');

const Section: React.FC<SectionProps> = ({
  id,
  title,
  eyebrow,
  description,
  children,
  sectionClassName,
  containerClassName,
  headerClassName,
  eyebrowClassName,
  headerWrapper
}) => {
  const header = (
    <div className={mergeClasses('text-center max-w-3xl mx-auto mb-16', headerClassName)}>
      {eyebrow && (
        <span
          className={mergeClasses(
            'inline-block px-4 py-1.5 bg-white dark:bg-white/10 text-[#1F3A5F] dark:text-[#C6D7FF] text-sm font-semibold rounded-full mb-4',
            eyebrowClassName
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {description}
        </p>
      )}
    </div>
  );

  return (
    <section id={id} className={mergeClasses('py-24', sectionClassName)}>
      <div className={mergeClasses('container mx-auto px-6', containerClassName)}>
        {headerWrapper ? headerWrapper(header) : header}
        {children}
      </div>
    </section>
  );
};

export default Section;
