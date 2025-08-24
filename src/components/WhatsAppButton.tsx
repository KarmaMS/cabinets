import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/923224440070"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 group"
      aria-label="Contact on WhatsApp"
    >
      <div className="relative">
        {/* Ripple effect */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25"></div>
        <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-50"></div>
        
        {/* Button */}
        <div className="relative bg-green-500 text-white p-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-12">
          <MessageCircle size={28} className="animate-bounce" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black text-white px-4 py-2 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap">
          Chat with us on WhatsApp
          {/* Triangle */}
          <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 border-8 border-transparent border-l-black"></div>
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;