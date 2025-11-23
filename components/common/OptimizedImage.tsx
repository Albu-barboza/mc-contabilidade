import React from 'react';
import { getAssetUrl } from '../../utils/assets';

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
  const finalSrc = getAssetUrl(src);
  const finalWebpSrc = webpSrc ? getAssetUrl(webpSrc) : undefined;

  return (
    <picture>
      {finalWebpSrc && <source srcSet={finalWebpSrc} type="image/webp" />}
      <source srcSet={finalSrc} type="image/jpeg" />
      <img
        src={finalSrc}
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