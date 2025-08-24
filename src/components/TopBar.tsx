import React, { useEffect, useState } from 'react';
import { Facebook, Instagram, Youtube, Linkedin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className={`fixed w-full bg-black text-white text-sm py-2 z-50 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Left Side Navigation */}
          <nav className="hidden md:flex space-x-6">
            {[
              { name: 'Contact Us', href: '/contact' },
              { name: 'Store Locator', href: '/stores' }
            ].map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="hover:text-[#e9212e] transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#e9212e] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            ))}
          </nav>

          {/* Right Side Social Links */}
          <div className="flex items-center space-x-4">
            {/* Contact Info */}
            <a
              href="tel:+923224440070"
              className="flex items-center hover:text-[#e9212e] transition-colors duration-300"
            >
              <Phone size={14} className="mr-1" />
              <span className="hidden sm:inline">+92 322 4440070</span>
            </a>
            <a
              href="mailto:enquiry@cabinets.com.pk"
              className="flex items-center hover:text-[#e9212e] transition-colors duration-300"
            >
              <Mail size={14} className="mr-1" />
              <span className="hidden sm:inline">enquiry@cabinets.com.pk</span>
            </a>

            {/* Social Links */}
            <div className="flex items-center space-x-3 border-l pl-4 border-gray-700">
              {[
                { Icon: Facebook, href: 'https://www.facebook.com/cabinets.com.pk' },
                { Icon: Instagram, href: 'https://www.instagram.com/cabinetspk/' },
                { Icon: Youtube, href: 'https://www.youtube.com/@cabinetspk' },
                { Icon: Linkedin, href: 'https://linkedin.com' }
              ].map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#e9212e] transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;