import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isKitchenOpen, setIsKitchenOpen] = useState(false);
  const [isWardrobeOpen, setIsWardrobeOpen] = useState(false);
  const [topBarVisible, setTopBarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const location = useLocation();

  const heroRoutes = ['/', '/kitchen-design', '/modular-kitchen-design'];
  const hasHero = heroRoutes.includes(location.pathname);

  const solidBg = isScrolled || !hasHero;

  const linkClr = solidBg ? 'text-gray-900' : 'text-white';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setTopBarVisible(currentScrollY < lastScrollY || currentScrollY < 50);
      setIsScrolled(currentScrollY > 0);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed w-full z-40 transition-all duration-300
                  ${topBarVisible ? 'top-8' : 'top-0'}
                  ${solidBg ? 'bg-white shadow-lg' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-start items-center h-20 gap-40">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="http://cabinets.com.pk/Files/cropped8-removebg.png"
                alt="CABINETS"
                className="w-32 h-auto"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`transition-colors duration-300 hover:text-[#e9212e] ${linkClr}`}>Home</Link>
            <Link to="/about-us" className={`transition-colors duration-300 hover:text-[#e9212e] ${linkClr}`}>About Us</Link>
            
            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}  /* fires only when leaving both areas */
            >
              <button
                className={`flex items-center space-x-1 transition-colors duration-300 hover:text-[#e9212e] ${linkClr}`}
              >
                <span>Products</span>
                <ChevronDown
                  size={16}
                  className={`transform transition-transform duration-300 ${
                    isProductsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isProductsOpen && (
                <ul className="absolute left-0 top-full w-64 bg-white rounded-lg shadow-xl">
                  {['Modular Kitchen', 'Modular Kitchen Design', 'Kitchen Design',
                    'Modular Wardrobe', 'TV Panel', 'Bathroom Vanity'].map((item) => (
                    <li key={item}>
                      <Link
                        to={`/products/${item.toLowerCase().replace(/ /g, '-')}`}
                        className="block px-4 py-2 text-gray-800 hover:bg-red-100"
                        onClick={() => setIsProductsOpen(false)}      /* close after click */
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Kitchen Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsKitchenOpen(true)}
              onMouseLeave={() => setIsKitchenOpen(false)}
            >
              <button
                className={`flex items-center space-x-1 transition-colors duration-300
                            hover:text-[#e9212e] ${linkClr}`}
              >
                <span>Kitchen</span>
                <ChevronDown
                  size={16}
                  className={`transform transition-transform duration-300
                              ${isKitchenOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isKitchenOpen && (
                <ul className="absolute left-0 top-full w-64 bg-white rounded-lg shadow-xl">
                  {[
                    'L Shaped Kitchen', 'U Shaped Kitchen', 'G Shaped Kitchen',
                    'In-Line Kitchen', 'Parallel Kitchen', 'Island Kitchen',
                    'Italian Kitchen', 'German Kitchen'
                  ].map(item => (
                    <li key={item}>
                      <Link
                        to={`/kitchen/${item.toLowerCase().replace(/ /g, '-')}`}
                        className="block px-4 py-2 text-gray-800 hover:bg-red-100"
                        onClick={() => setIsKitchenOpen(false)}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Wardrobe Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsWardrobeOpen(true)}
              onMouseLeave={() => setIsWardrobeOpen(false)}
            >
              <button className={`flex items-center space-x-1 transition-colors duration-300 hover:text-[#e9212e] ${linkClr}`}>
                <span>Wardrobe</span>
                <ChevronDown size={16} className={`transform transition-transform duration-300 ${isWardrobeOpen ? 'rotate-180' : ''}`} />
              </button>
              {isWardrobeOpen && (
                <ul className="absolute left-0 top-full w-64 bg-white rounded-lg shadow-xl">
                  {['Walk in Closet', 'Sliding Doors', 'Openable Shutter'].map(item => (
                    <li key={item}>
                      <Link
                        to={`/wardrobe/${item.toLowerCase().replace(/ /g, '-')}`}
                        className="block px-4 py-2 text-gray-800 hover:bg-red-100"
                        onClick={() => setIsWardrobeOpen(false)}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link to="/our-process" className={`transition-colors duration-300 hover:text-[#e9212e] ${linkClr}`}>Our Process</Link>

            <Link to="/testimonials" className={`transition-colors duration-300 hover:text-[#e9212e] ${linkClr}`}>Testimonial</Link>

            <a href="tel:+1234567890" className="bg-[#e9212e] text-white px-4 py-2 rounded-full hover:bg-red-700">Shop Now</a>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
