import React, { useEffect, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';

const ModularCloset = () => {
  /* ─────────── parallax / fade-in hooks ─────────── */
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      /* parallax */
      if (parallaxRef.current) {
        const offset = window.scrollY * 0.5;
        parallaxRef.current.style.transform = `translateY(${offset}px)`;
      }
      /* fade-in */
      sectionsRef.current.forEach((section) => {
        if (!section) return;
        const r = section.getBoundingClientRect();
        const visible = r.top < window.innerHeight * 0.75 && r.bottom >= 0;
        if (visible) section.classList.add('animate-fadeIn');
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ─────────── lightbox helpers ─────────── */
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

  /* jpg ⇄ png fallback */
  const swapExtension = (path: string) =>
    path.toLowerCase().endsWith('.png') ? path.replace(/\.png$/i, '.jpg') : path.replace(/\.jpe?g$/i, '.png');

  return (
    <div className="pt-20">
      {/* Hero Section with Parallax */}
      <div className="relative h-screen overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: 'url("/sliding-doors.jpg")' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fadeIn">SLIDING DOORS</h1>
            <p className="text-xl md:text-2xl opacity-0 animate-fadeIn animation-delay-200">
              Cabinets Sliding Door Wardrobe tailored to your space, your budget, your routine.
            </p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-20 bg-white opacity-0 animate-fadeIn"
      >
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* LEFT column ─ headline + body */}
          <div className="max-w-xl">
            <h2 className="text-w-2xl sm:text-4xl font-extrabold tracking-tight mb-4">
              <span className="text-gray-800">SLIDING DOORS </span> <br />
              <span className="text-[#e9212e] font-medium">WARDROBE DESIGN</span>
            </h2>

            <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

            <div className="space-y-8 leading-relaxed text-lg text-justify">
              <p>
                No matter the form of your home, storage is an important priority. Your organizational skills are
                essential to ensure that your home is functional for all who live there. This applies to everyone,
                regardless of whether they live with their family or are living alone. Your wardrobes make up a large
                portion of your home's storage. It is essential to have adequate cabinets in your home, as closets are
                where most of your items are stored. Your wardrobe can contain more than clothing. It may also include
                footwear, jewellery, seasonal clothes, books, and other miscellaneous items that you don't have room
                for.
              </p>

              <p>
                Your wardrobe can become overwhelming and overcrowded if it takes up too much space. A sliding door
                wardrobe can make your bedroom appear more spacious and stylish.
              </p>
            </div>
          </div>

          {/* RIGHT column ─ image */}
          <figure
            className="ml-auto relative group overflow-hidden rounded-lg shadow-md cursor-zoom-in"
            role="button"
            tabIndex={0}
            aria-label="View sliding wardrobe hero image"
            onClick={() => openLightbox('/Sliding/main.jpg', 'Sliding Wardrobe – Main')}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openLightbox('/Sliding/main.jpg', 'Sliding Wardrobe – Main')}
          >
            <img
              src="/Sliding/main.jpg"
              alt="Modern sliding door wardrobe with warm wood and glass"
              className="block w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                if (el.dataset.err !== '1') {
                  el.dataset.err = '1';
                  el.src = el.src.toLowerCase().endsWith('.png')
                    ? el.src.replace(/\.png$/i, '.jpg')
                    : el.src.replace(/\.jpe?g$/i, '.png');
                }
              }}
            />
            {/* hover overlay */}
            <div className="pointer-events-none absolute inset-0 bg-black/30 opacity-0 md:group-hover:opacity-100 transition" />

            {/* center icon */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center
                            opacity-0 md:group-hover:opacity-100 transition">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-9 h-9 text-white drop-shadow-md transform transition will-change-transform
                          scale-90 md:group-hover:scale-100"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {/* lucide-style */}
                <polyline points="15 3 21 3 21 9" vectorEffect="non-scaling-stroke" />
                <line x1="21" y1="3" x2="14" y2="10" vectorEffect="non-scaling-stroke" />
                <polyline points="9 21 3 21 3 15" vectorEffect="non-scaling-stroke" />
                <line x1="3" y1="21" x2="10" y2="14" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
          </figure>

        </div>
      </section>

      {/* Gallery */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-8 bg-white opacity-0 animate-fadeIn"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Walnut Glow Sliding Wardrobe',
                description:
                  'Floor-to-ceiling walnut carcasses with soft-close sliding doors and warm LED strips; a bright end opening keeps the dressing aisle light and airy.',
                image: '/Sliding/1.jpg',
              },
              {
                title: 'Backlit Oak Sliding Showcase',
                description:
                  'Open oak hanging bays framed by glass sliding fronts with integrated lighting, plus a lounge corner for a boutique try-on experience.',
                image: '/Sliding/2.jpg',
              },
              {
                title: 'Curved Luxe Sliding Suite',
                description:
                  'Rich wood cabinetry with rounded ends and illuminated niches; wide sliding panels and a central ottoman create a dramatic, high-end dressing room.',
                image: '/Sliding/3.jpg',
              },
              {
                title: 'Charcoal Glass Sliding Wardrobe',
                description:
                  'Matte charcoal modules with smoked-glass sliding doors and a center dresser island under soft cove lighting for organized, premium storage.',
                image: '/Sliding/4.jpg',
              },
              {
                title: 'Bronze-Tinted Sliding Gallery',
                description:
                  'Full-height bronze glass sliders reveal a central dresser and illuminated rails, delivering a sleek, boutique showroom feel.',
                image: '/Sliding/5.jpg',
              },
              {
                title: 'Garden View Clear Sliding Closet',
                description:
                  'Transparent glass sliding doors with warm wood interiors and integrated lighting; open to greenery for a calm, luxurious dressing experience.',
                image: '/Sliding/6.jpg',
              },
            ].map((style, index) => (
              <figure
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-zoom-in"
                role="button"
                tabIndex={0}
                aria-label={`View ${style.title}`}
                onClick={() => openLightbox(style.image, style.title)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openLightbox(style.image, style.title)}
              >
                <div className="aspect-w-16 aspect-h-12 relative">
                  <img
                    src={style.image}
                    alt={style.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      if (el.dataset.err !== '1') {
                        el.dataset.err = '1';
                        el.src = swapExtension(style.image);
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <Maximize2 className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* hover overlay text */}
                <figcaption className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-semibold mb-2">{style.title}</h3>
                    <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {style.description}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT IS */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-8 bg-grey opacity-0 animate-fadeIn"
      >
        <div className="max-w-7xl mx-auto px-4 leading-relaxed text-left">
          <h2 className="text-w-4xl sm:text-2xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">WHAT IS A </span>
            <span className="text-[#e9212e] font-medium"> SLIDING DOOR WARDROBE</span>
          </h2>

          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

          <p>
            A sliding door wardrobe refers to a wardrobe with doors that slide to open the closet from one side to the
            other, as opposed to doors that open to the cabinet's exterior like an almirah. Sliding door wardrobes can
            be made from any material but mainly wood or plywood. Sliding wardrobe doors look modern and chic in every
            home. Cabinets offers a variety of sliding wardrobe designs.
          </p>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-8 bg-grey opacity-0 animate-fadeIn"
      >
        <div className="max-w-7xl mx-auto px-4 leading-relaxed text-left mb-4">
          <h2 className="text-w-4xl sm:text-2xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">ADVANTAGES OF SLIDING DOOR </span>
            <span className="text-[#e9212e] font-medium"> WARDROBE FOR YOUR HOME</span>
          </h2>

          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

          <p>
            A walk-in closet has the advantage of storing most of your clothes in one place, which can help free up
            space in other rooms. However, a walk-in closet would require additional space. Walk-in closets are typically
            considered a luxurious feature that is only found in wealthy homes.
          </p>

          <ul className="list-disc list-inside space-y-1">
            <li>Sliding door wardrobes use lesser space.</li>
            <li>Sliding door wardrobe designs are very diverse.</li>
            <li>Large wardrobes can be better served by sliding door wardrobes.</li>
            <li>Sliding door wardrobe designs look sleek.</li>
            <li>Slider wardrobes can make the most of wall space.</li>
          </ul>
        </div>
      </section>

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

export default ModularCloset;