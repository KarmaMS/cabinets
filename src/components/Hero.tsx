import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const slides = [
  { image: '/1.jpg', title: 'Crafting Luxury Living Spaces', description: 'Transform your home with our bespoke designs and exceptional craftsmanship' },
  { image: '/2.jpg', title: 'Modern Kitchen Solutions', description: 'Experience the perfect blend of style and functionality' },
  { image: '/3.jpg', title: 'Premium Quality Materials', description: 'Every detail crafted with excellence and precision' },
  { image: '/4.jpg', title: 'Crafting Luxury Living Spaces', description: 'Transform your home with our bespoke designs and exceptional craftsmanship' },
  { image: '/5.jpg', title: 'Modern Kitchen Solutions', description: 'Experience the perfect blend of style and functionality' },
  { image: '/7.jpg', title: 'Premium Quality Materials', description: 'Every detail crafted with excellence and precision' },
  { image: '/8.jpg', title: 'Crafting Luxury Living Spaces', description: 'Transform your home with our bespoke designs and exceptional craftsmanship' },
  { image: '/6.jpg', title: 'Modern Kitchen Solutions', description: 'Experience the perfect blend of style and functionality' },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToProducts = () => {
    // If we're already on the homepage, smooth-scroll to the Products section
    if (location.pathname === '/') {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Otherwise navigate to the homepage with the hash; browser will jump to it
      navigate('/#products');
    }
  };

  const WHATSAPP_URL =
    'https://wa.me/923224440070?text=Hi%20Cabinets%2C%20I%27d%20like%20a%20free%20quote.';

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slider */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url("${slide.image}")`, transform: 'scale(1.1)' }}
          >
            <div className="absolute inset-0"></div>
          </div>
        </div>
      ))}

      {/* Fixed Content Container */}
      <div className="absolute inset-0">
        <div className="absolute left-8 top-[60%] -translate-y-1/2 w-full max-w-lg">
          <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#e9212e] to-transparent"></div>
          <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#e9212e] rounded-full"></div>

          <div className="relative bg-black/30 backdrop-blur-md p-6 rounded-lg overflow-hidden border border-white/10">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#e9212e]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#e9212e]/5 rounded-full blur-3xl"></div>

            <div className="relative mb-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                {slides[currentSlide].title}
              </h1>
              <div className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-[#e9212e] rounded-full"></div>
            </div>

            <p className="text-base md:text-lg text-gray-200 mb-6 font-light leading-relaxed">
              {slides[currentSlide].description}
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-4">
              {/* Explore Our Work → Products section */}
              <button
                onClick={goToProducts}
                className="group bg-[#e9212e] text-white px-6 py-2.5 rounded-full flex items-center hover:bg-[#d11d29] transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl hover:shadow-[#e9212e]/20 text-sm"
              >
                <span className="mr-2">Explore Our Work</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Get Free Quote → WhatsApp */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden px-6 py-2.5 rounded-full group text-sm"
              >
                <span className="relative z-10 text-white group-hover:text-[#e9212e] transition-colors duration-300">
                  Get Free Quote
                </span>
                <div className="absolute inset-0 border border-white rounded-full group-hover:bg-white transition-all duration-300"></div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;