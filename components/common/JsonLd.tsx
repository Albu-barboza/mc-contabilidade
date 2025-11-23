
import React, { useEffect } from 'react';

interface JsonLdProps {
  schema: object;
}

const JsonLd: React.FC<JsonLdProps> = ({ schema }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [schema]);

  return null;
};

export default JsonLd;