import React, { useEffect, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';

const TVPanel = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
      sectionsRef.current.forEach((section) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom >= 0;
        if (isVisible) section.classList.add('animate-fadeIn');
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openLightbox = (src: string, alt: string) => setLightbox({ src, alt });
  const closeLightbox = () => setLightbox(null);

  useEffect(() => {
    if (!lightbox) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeLightbox();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox]);

  return (
    <div className="pt-20">
      {/* Hero Section with Parallax */}
      <div className="relative h-screen overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/lcdmainbanner.jpg")' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fadeIn">
              LCD Panel Design
            </h1>
            <p className="text-2xl md:text-2xl opacity-0 animate-fadeIn animation-delay-200">
              Elegant entertainment units for modern living
            </p>
          </div>
        </div>
      </div>

      {/* Panel Styles */}
      <div
        ref={(el) => el && sectionsRef.current.push(el)}
        className="py-20 bg-white opacity-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-4xl font-extrabold tracking-tight">
              <span className="text-gray-800">TV </span>
              <span className="text-[#e9212e] font-medium">CABINET</span>
            </h2>
            <p className=" font-extrabold mt-4 text-l text-gray-700">
              Renovate Your Living Room with Classy TV Panel
            </p>
          </div>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {[
              { file: '1.jpg', title: 'LUXE MARBLE TV PANEL', desc: 'Veined white-marble slab, flanked by open back-lit niches for a five-star hotel vibe.' },
              { file: '2.jpg', title: 'LED-LIT ACCENT WALL', desc: 'Glossy neutral surround framed by a vivid green light box – adds drama to any lounge.' },
              { file: '3.jpg', title: 'MARBLE & WOOD FEATURE WALL', desc: 'Warm timber fins and floating console soften the elegance of the stone backdrop.' },
              { file: '4.jpg', title: 'MINIMALIST MONOCHROME PANEL', desc: 'Sleek black-glass TV surface with low, handle-less storage – perfect for modern flats.' },
              { file: '5.jpg', title: 'ARTISTIC MURAL MEDIA WALL', desc: 'Hand-painted floral graphic and colour-blocked ceiling tray create a bespoke statement.' },
              { file: '6.jpg', title: 'MODULAR PLUM WALL UNIT', desc: 'High-gloss white cabinets pop against a rich plum backdrop for bold contemporary style.' },
              { file: '7.jpg', title: 'CLEAN-LINE FLOATING MEDIA WALL', desc: 'Matte white panels with punchy red display cubes give a playful, Scandinavian feel.' },
              { file: '8.jpg', title: 'GRAND MARBLE COFFERED PANEL', desc: 'Twin illuminated marble columns frame the screen, lending an air of formal elegance.' },
              { file: '9.jpg', title: 'SLAB MARBLE WITH RECESSED LED', desc: 'Continuous stone backdrop edged with hidden strip-lighting for a gallery-like ambience.' },
            ].map(({ file, title, desc }) => {
              const src = `/TV/${file}`;
              return (
                <figure
                  key={file}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition cursor-zoom-in"
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${title}`}
                  onClick={() => openLightbox(src, title)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openLightbox(src, title)}
                >
                  <div className="relative w-full pb-[66.666%]">
                    <img
                      src={src}
                      alt={title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <Maximize2 className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* hover overlay text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-l font-semibold tracking-tight">{title}</h3>
                      <p className="mt-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                        {desc}
                      </p>
                    </div>
                  </div>
                </figure>
              );
            })}
          </div>

          <hr className="border-t-2 border-dotted border-gray-300 mt-14 mb-6" />
          <p className=" mt-4 text-l text-gray-700">
            Television brings the whole family together at the end of the workday to watch a movie or other entertainment. A Tv panel is a crucial piece of furniture in any home. It is second in importance to guests, after the center table. A Tv panel is a crucial piece of furniture in any home. It is second in importance to guests, after the center table. It is essential to choose a TV cabinet that not only serves its purpose but also looks great. By placing your TV unit against the wall, you can create an entertainment area in your living space. A TV panel that is well designed will enhance the living space&apos;s ambiance and provide storage. The TV unit design has changed with technological advances. The TV cabinet is stylish and sleek, which stores your TV and improves the appearance of your living space. A TV cabinet that provides support and is strong can be chosen. Cabinets offers a variety of TV units, from wall-mounted to bookshelf designs. You can find many TV unit designs for various decor styles, including wall-mounted and closed TV units. A wide TV cabinet that covers the wall would look great in large living rooms. A wall-mounted TV cabinet would be a better option for smaller spaces.
          </p>

        </div>
      </div>

      {/* Lightbox Overlay */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <figure className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeLightbox}
              className="absolute -top-3 -right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={lightbox.src} alt={lightbox.alt} className="w-full h-auto rounded-xl shadow-2xl" />
            <figcaption className="mt-3 text-center text-white text-sm">{lightbox.alt}</figcaption>
          </figure>
        </div>
      )}
    </div>
  );
};

export default TVPanel;