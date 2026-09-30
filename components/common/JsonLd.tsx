
import React, { useEffect } from 'react';

interface JsonLdProps {
  schema: object;
}

const JsonLd: React.FC<JsonLdProps> = ({ schema }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    // textContent (e não innerHTML): o JSON entra como texto puro, sem ser interpretado como HTML
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [schema]);

  return null;
};

export default JsonLd;