import React from 'react';

interface OptimizedImageProps {
  src: string;
  webpSrc?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  lazy?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  webpSrc,
  alt,
  className,
  width,
  height,
  lazy = true,
  fetchPriority = 'auto',
}) => {
  return (
    <picture>
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <source srcSet={src} type="image/jpeg" />
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        fetchPriority={fetchPriority}
      />
    </picture>
  );
};

export default OptimizedImage;