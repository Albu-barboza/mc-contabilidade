import React from 'react';

interface WhatsappFloatProps {
  isMobileNavOpen?: boolean;
  isContactOverlayOpen?: boolean;
}

const WhatsappFloat: React.FC<WhatsappFloatProps> = ({ isMobileNavOpen = false, isContactOverlayOpen = false }) => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER_FLOAT;
  const whatsappMessage = encodeURIComponent('Olá! Vim do site da MC Contabilidade e gostaria de mais informações');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  if (isMobileNavOpen || isContactOverlayOpen) {
    return null;
  }

  return (
    <a
      href={whatsappLink}
      className="group fixed bottom-8 left-8 z-50 hidden lg:flex items-center"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir conversa no WhatsApp com MC Contabilidade em nova aba"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform group-hover:scale-110 animate-pulse">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
          <path d="M12.051 0C5.494 0 .16 5.333.157 11.887c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.557 0 11.893-5.335 11.896-11.893A11.825 11.825 0 0020.464 3.48 11.815 11.815 0 0012.051 0z" />
        </svg>
      </div>
      <div className="absolute left-full ml-4 bg-white text-[#128C7E] px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        Fale Conosco
      </div>
    </a>
  );
};

export default WhatsappFloat;
