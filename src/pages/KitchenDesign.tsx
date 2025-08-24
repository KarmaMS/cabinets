import React, { useEffect, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';

const KitchenDesign = () => {
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
          style={{ backgroundImage: 'url("/kitchen-design-banner.jpg")' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fadeIn">
              Luxury Kitchen Design
            </h1>
            <p className="text-xl md:text-2xl opacity-0 animate-fadeIn animation-delay-200">
              Elevate your culinary space with our bespoke designs
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-4xl sm:text-4xl font-extrabold tracking-tight mb-4 mt-10">
            <span className="text-gray-800">KITCHEN </span>
            <span className="text-[#e9212e] font-medium">DESIGN</span>
          </h2>
          <hr className="border-t-2 border-dotted border-gray-300 mb-4" />
        </div>
      </div>

      {/* intro */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <div className="space-y-8 leading-relaxed text-lg text-justify">
            <p>
              The basis of a beautiful and useful house is a well-organized Kitchen Design. Modern kitchen layouts are
              the right solution for today's lifestyle since they smoothly combine creativity, functionality and
              quality. The secret is to plan a kitchen that perfectly mixes together both appearance and function, no
              matter how big or small your area is.
            </p>
            <p>
              The modular kitchen is one of the major developments in kitchen design. Customization has been given the
              most importance in these designs, which improve space use by providing a variety of storage options like
              pull-out drawers, corner units and tall cabinets. Along with improving the room's attraction, clean
              counters and long-lasting finishes like laminate and granite provide long-term durability from common
              everyday use.
            </p>
            <p>
              The lighting of modern kitchen interiors is important. By matching natural, task, and decorative lighting
              and multicolored lighting results in a warm and useful space. The overall experience has been improved
              even better by smart technology, which includes factors like motion-activated lighting and appliances that
              are energy-saving made for the environment and ease of use.
            </p>
            <p>
              Making your kitchen ideas a reality is our main objective at Cabinets. We provide specialized solutions
              that match with your space and choice of style since we have an excellent understanding of creating modern
              kitchen design. Our team of professionals makes sure that every detail matches your expectations and
              uniqueness, whether you're looking for a luxurious installation or a simple design.
            </p>
          </div>
        </div>

        {/* RIGHT column -image */}
        <div
          className="relative flex items-start md:items-center ml-auto cursor-zoom-in group rounded-lg overflow-hidden"
          role="button"
          tabIndex={0}
          onClick={() => openLightbox('/kitchen-design.jpg', 'Luxury kitchen design inspiration')}
          onKeyDown={(e) =>
            (e.key === 'Enter' || e.key === ' ') && openLightbox('/kitchen-design.jpg', 'Luxury kitchen design inspiration')
          }
        >
          <img
            src="/kitchen-design.jpg"
            alt="Luxury kitchen design inspiration"
            className="w-full h-full object-cover shadow-md transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <Maximize2 className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Heading */}
      <div className="max-w-6xl mx-auto px-4">
        <div>
          <h2 className="text-4xl sm:text-2xl font-extrabold tracking-tight mb-4 mt-12">
            <span className="text-gray-800">KITCHEN DESIGN IDEAS</span>
            <span className="text-[#e9212e] font-medium"> TO INSPIRE YOU</span>
          </h2>
          <hr className="border-t-2 border-dotted border-gray-300" />
        </div>
      </div>

      {/* Gallery grid #1 (zoomable) */}
      <div className="max-w-6xl mx-auto px-4">
        <div
          ref={(el) => el && sectionsRef.current.push(el)}
          className="mt-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {(() => {
            const files = [
              'aesthetic-white-modular-kitchen-design.jpg',
              'almond-color-modular-kitchen-design.jpg',
              'Ambient-Off-White-Modular-Kitchen-Design.jpg',
              'beige-modular-kitchen-design.jpg',
              'black-and-white-modular-kitchen-design.jpg',
              'Brownish-Shiny-Modular-Kitchen-Design.jpg',
              'chalk-white-modular-kitchen-design.jpg',
              'classic-white-modular-kitchen-design.jpg',
              'clean-white-modular-kitchen-design.jpg',
              'Contrasting-Brown-Modular-Kitchen-Design.jpg',
              'creamy-almond-modular-kitchen-design.jpg',
              'creamy-island-shaped-modular-kitchen-design.jpg',
              'creamy-pale-modular-kitchen-design.jpg',
              'creamy-white-modular-kitchen-design.jpg',
              'creamy-wooden-modular-kitchen-design.jpg',
              'dark-shade-modular-kitchen-design.jpg',
              'glossy-black-and-white-modular-kitchen-design.jpg',
              'glossy-cream-color-modular-kitchen-design.jpg',
              'glossy-grey-modular-kitchen-design.jpg',
              'grey-and-white-modular-kitchen-design.png',
              'grey-theme-modern-modular-kitchen-design.jpg',
              'luminous-white-modular-kitchen-design.jpg',
              'milk-white-modular-kitchen-design.jpg',
              'Off-Shade-Small-Modular-Kitchen-Design.jpg',
              'Off-White-and-Black-modular-kitchen-design.jpg',
              'Off-White-and-Black-Sleek-Modular-Kitchen-Design.jpg',
              'Off-White-Shade-Modular-Kitchen-Design.png',
              'pale-modular-kitchen-design.jpg',
              'parallel-white-modular-kitchen-design.jpg',
              'sleek-white-modular-kitchen-design.jpg',
              'small-cream-white-modular-kitchen-design.jpg',
              'small-elegant-modular-kitchen-design.jpg',
              'spacious-white-modular-kitchen-design.jpg',
              'Strip-Lighting-Wooden-Modular-Kitchen-Design.png',
              'sunlight-welcoming-white-modular-kitchen-design.jpg',
              'translucent-modular-kitchen-design.jpg',
            ];

            const toLabel = (f: string) => {
              const base = f.replace(/\.(?:jpe?g|png)$/i, '').replace(/-/g, ' ');
              const main = base.replace(/modular kitchen design$/i, '').trim();
              const pretty =
                main
                  .replace(/\bu shaped\b/gi, 'U Shaped')
                  .replace(/\boff white\b/gi, 'Off-White')
                  .replace(/\b\w/g, (m) => m.toUpperCase())
                  .trim() + ' ';
              const isSleek = /sleek/i.test(base);
              return { title: pretty, title2: isSleek ? 'SLEEK KITCHEN DESIGN' : 'KITCHEN DESIGN' };
            };

            return files.map((file) => {
              const { title, title2 } = toLabel(file);
              const src = `/ModularKitchenDesign/Bottom/${file}`;
              const alt = `${title}${title2}`;
              return (
                <figure
                  key={file}
                  className="overflow-hidden rounded-md shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-zoom-in group"
                  role="button"
                  tabIndex={0}
                  onClick={() => openLightbox(src, alt)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openLightbox(src, alt)}
                >
                  <div className="relative w-full pb-[75%]">
                    <img
                      src={src}
                      alt={alt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <Maximize2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <figcaption className="px-4 py-3 text-center text-sm font-bold tracking-tight uppercase">
                    <span className="text-gray-800">{title}</span>
                    <span className="text-[#e9212e]">{title2}</span>
                  </figcaption>
                </figure>
              );
            });
          })()}
        </div>

        {/* Gallery grid #2 (zoomable) */}
        <div
          ref={(el) => el && sectionsRef.current.push(el)}
          className="mt-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {(() => {
            const files = [
              'u-shaped-grey-and-white-modular-kitchen-design.jpg',
              'U-Shaped-Luminous-Modular-Kitchen-Design.jpg',
              'warm-lighting-creamish-modular-kitchen-design.jpg',
              'warm-lighting-island-modular-kitchen-design.jpg',
              'white-ambient-sleek-modular-kitchen-design.jpg',
              'white-strip-light-modular-kitchen-design.jpg',
              'wooden-and-dark-grey-modular-kitchen-design.jpg',
              'wooden-finish-modular-kitchen-design.jpg',
              'wooden-island-modular-kitchen-design.jpg',
            ];

            const toLabel = (f: string) => {
              const base = f.replace(/\.(?:jpe?g|png)$/i, '').replace(/-/g, ' ');
              const main = base.replace(/modular kitchen design$/i, '').trim();
              const pretty =
                main
                  .replace(/\bu shaped\b/gi, 'U Shaped')
                  .replace(/\boff white\b/gi, 'Off-White')
                  .replace(/\b\w/g, (m) => m.toUpperCase())
                  .trim() + ' ';
              const isSleek = /sleek/i.test(base);
              return { title: pretty, title2: isSleek ? 'SLEEK KITCHEN DESIGN' : 'KITCHEN DESIGN' };
            };

            return files.map((file) => {
              const { title, title2 } = toLabel(file);
              const src = `/ModularKitchenDesign/Bottom/${file}`;
              const alt = `${title}${title2}`;
              return (
                <figure
                  key={file}
                  className="overflow-hidden rounded-md shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-zoom-in group"
                  role="button"
                  tabIndex={0}
                  onClick={() => openLightbox(src, alt)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openLightbox(src, alt)}
                >
                  <div className="relative w-full pb-[75%]">
                    <img
                      src={src}
                      alt={alt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <Maximize2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <figcaption className="px-4 py-3 text-center text-sm font-bold tracking-tight uppercase">
                    <span className="text-gray-800">{title}</span>
                    <span className="text-[#e9212e]">{title2}</span>
                  </figcaption>
                </figure>
              );
            });
          })()}
        </div>
      </div>

      {/* Copy sections (kept as-is, with brand fix) */}
      <div className="max-w-6xl mx-auto px-4">
        <div>
          <h2 className="text-4xl sm:text-xl font-extrabold tracking-tight mb-4 mt-6">
            <span className="text-gray-800">What Makes a</span>
            <span className="text-[#e9212e]"> Modern Kitchen Design Special? </span>
          </h2>
        </div>

        {/* list #1 ... (unchanged content) */}
        {/* ... */}
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl sm:text-xl font-extrabold tracking-tight mb-4 mt-6">
          Why a <span className="text-[#e9212e]">Well-Designed Kitchen</span> is Great
        </h2>
        <ol className="list-decimal pl-5 space-y-6">
          <li>
            <p className="font-bold">Makes Cooking Easy and Quick</p>
            <p>
              When everything is in its proper location, cooking is easy. You do not need to walk a lot or look for
              equipment. Cooking becomes fun and time-saving with the help of modern kitchen layouts from <strong>Cabinets</strong>.
            </p>
          </li>
          {/* remaining bullets unchanged */}
        </ol>
      </div>

      {/* Conclusion */}
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-xl font-extrabold mt-10 mb-4">Conclusion</h3>
        <p className="mb-12">
          In conclusion, a well-designed kitchen improves everyday life and your whole experience of living in the house
          by perfectly achieving natural beauty and benefits. With brilliant storage, energy-saving equipment and
          beautiful finishes, <strong>Cabinets</strong> provides a modern kitchen design that makes cooking simple and
          satisfying. Investing in a well-designed kitchen not only increases productivity and comfort, but also boosts
          the value of your home and creates a welcoming, valuable area.
        </p>
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

export default KitchenDesign;
