import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#e9212e]/20 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-[#e9212e]/20 to-transparent rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img
                src="http://cabinets.com.pk/Files/cropped8-removebg.png"
                alt="CABINETS"
                className="h-auto w-32"
              />
            </div>
            <p className="text-gray-400">
              Crafting luxury living spaces with precision and elegance. Transform your home with our bespoke designs.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, href: 'https://www.facebook.com/cabinets.com.pk' },
                { Icon: Instagram, href: 'https://www.instagram.com/cabinetspk/' },
                { Icon: Youtube, href: 'https://www.youtube.com/@cabinetspk' },
                { Icon: Linkedin, href: 'https://linkedin.com' },
              ].map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-[#e9212e] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#e9212e]/20"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { label: 'Home', to: '/' },
                { label: 'About', to: '/about-us' },
                { label: 'Services', to: '/our-process' },      // or '/#products' if you prefer
                { label: 'Portfolio', to: '/products/modular-kitchen-design' },
                { label: 'Contact', to: '/contact' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              {[
                { Icon: Phone, text: '+92 322 4440070' },
                { Icon: Mail, text: 'sales@cabinets.com.pk' },
                { Icon: MapPin, text: '3 W, CCA 2, Phase VIII, DHA, Lahore' }
              ].map(({ Icon, text }, index) => (
                <div key={index} className="flex items-start space-x-3 group">
                  <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-[#e9212e] transition-all duration-300">
                    <Icon size={20} />
                  </div>
                  <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-gray-800 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e9212e] transition-all duration-300"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                />
                <button
                  type="submit"
                  className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#e9212e] flex items-center justify-center transition-all duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-sm text-gray-400">
                Subscribe to our newsletter for updates and exclusive offers.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Cabinets. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;