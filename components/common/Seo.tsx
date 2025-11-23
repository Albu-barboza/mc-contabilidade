import React, { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
}

const SITE_NAME = 'MC Contabilidade';
const DEFAULT_IMAGE = '/images/background.webp';

const upsertMetaTag = (attribute: 'name' | 'property', value: string, content: string) => {
  if (typeof document === 'undefined') return;

  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${value}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const upsertLinkTag = (rel: string, href: string) => {
  if (typeof document === 'undefined') return;

  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
};

const Seo: React.FC<SeoProps> = ({ title, description, image = DEFAULT_IMAGE, canonical }) => {
  useEffect(() => {
    const formattedTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

    if (typeof document !== 'undefined') {
      document.title = formattedTitle;
    }

    upsertMetaTag('name', 'description', description);

    const imageUrl =
      typeof window !== 'undefined' && !image.startsWith('http')
        ? `${window.location.origin}${image}`
        : image;

    const url = canonical || (typeof window !== 'undefined' ? window.location.href : '');

    // Open Graph
    upsertMetaTag('property', 'og:title', formattedTitle);
    upsertMetaTag('property', 'og:description', description);
    upsertMetaTag('property', 'og:image', imageUrl);
    upsertMetaTag('property', 'og:type', 'website');
    upsertMetaTag('property', 'og:site_name', SITE_NAME);
    upsertMetaTag('property', 'og:url', url);

    // Twitter
    upsertMetaTag('name', 'twitter:card', 'summary_large_image');
    upsertMetaTag('name', 'twitter:title', formattedTitle);
    upsertMetaTag('name', 'twitter:description', description);
    upsertMetaTag('name', 'twitter:image', imageUrl);

    // Canonical
    if (url) {
      upsertLinkTag('canonical', url);
    }

  }, [title, description, image, canonical]);

  return null;
};

export default Seo;
