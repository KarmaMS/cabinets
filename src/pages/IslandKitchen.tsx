import React, { useEffect, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';

const ModularKitchen = () => {
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
          style={{ backgroundImage: 'url("/Island/islandmainbanner.jpg")' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fadeIn">ISLAND KITCHEN</h1>
            <p className="text-xl md:text-2xl opacity-0 animate-fadeIn animation-delay-200">
              Cabinets Island Kitchens tailored to your space, your budget, your routine.
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
            <h2 className="text-w-4xl sm:text-3xl font-extrabold tracking-tight mb-4">
              <span className="text-gray-800">ISLAND </span>
              <span className="text-[#e9212e] font-medium">MODULAR KITCHEN</span>
            </h2>

            <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

            <div className="space-y-8 leading-relaxed text-lg text-justify">
              <p>
                Modular Kitchens are a modern, well-designed kitchen that uses modular storage cabinets. This allows
                for a hassle-free cooking experience and maximizes space. An Island Kitchen ideal layout is one that
                has a straight or L-shaped layout with a central Island.
              </p>

              <p>Although the Island is primarily a hob, it can be used as a dry-working area or breakfast table.</p>
            </div>
          </div>

          {/* RIGHT column ─ image */}
          <figure
            className="flex items-start md:items-center ml-auto relative group cursor-zoom-in"
            role="button"
            tabIndex={0}
            aria-label="View Island kitchen image"
            onClick={() => openLightbox('/Island/main.jpg', 'Island Kitchen – Main')}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openLightbox('/Island/main.jpg', 'Island Kitchen – Main')}
          >
            <img
              src="/Island/main.jpg"
              alt="Modern island modular kitchen with white cabinets and warm accents"
              className="w-full rounded-lg shadow-md"
              loading="lazy"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                if (el.dataset.err !== '1') {
                  el.dataset.err = '1';
                  el.src = swapExtension(el.src);
                }
              }}
            />
            <div className="pointer-events-none absolute inset-0 rounded-lg bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <Maximize2 className="w-6 h-6 text-white" />
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
                title: 'Gloss Grey Galley',
                description:
                  'High gloss grey cabinetry on both sides with long uninterrupted worktops. A true Island layout for fast, efficient cooking.',
                image: '/Island/1.jpg',
              },
              {
                title: 'Light Oak Island',
                description:
                  'White cabinets with warm oak shelving facing a second counter run. Big windows brighten the galley for a welcoming family kitchen.',
                image: '/Island/2.jpg',
              },
              {
                title: 'Urban Grey Island With Island',
                description:
                  'Handleless grey fronts form two facing runs while a compact Island adds extra prep and serving space.',
                image: '/Island/3.jpg',
              },
              {
                title: 'Warm Oak and White Galley',
                description:
                  'Two straight counters in white and oak with a clear central aisle. Quick movement between sink and hob for everyday efficiency.',
                image: '/Island/4.jpg',
              },
              {
                title: 'Soft White Island With Feature Wall',
                description:
                  'Matte white units run wall to wall on both sides. A stone feature wall and central Island make it a social cook zone.',
                image: '/Island/5.jpg',
              },
              {
                title: 'Mustard High Gloss Galley',
                description:
                  'Bold yellow overheads with black countertops on twin lines. A bright corridor kitchen that is easy to clean and maintain.',
                image: '/Island/6.jpg',
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

      {/* FEATURES */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-8 bg-grey opacity-0 animate-fadeIn"
      >
        <div className="max-w-7xl mx-auto px-4 leading-relaxed text-left">
          <h2 className="text-w-4xl sm:text-2xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">FEATURES OF </span>
            <span className="text-[#e9212e] font-medium">ISLAND KITCHEN DESIGNS</span>
          </h2>

          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

          <ul className="list-disc list-inside space-y-1">
            <li> Island Modular Kitchen has amazing features that allow you to fully enjoy the process of cooking. </li>
            <li>
              These cabinets are available in Island kitchen designs with sliding or pocket doors. They not only
              increase storage space but also reduce visible clutter.
            </li>
          </ul>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-8 bg-grey opacity-0 animate-fadeIn"
      >
        <div className="max-w-7xl mx-auto px-4 leading-relaxed text-left">
          <h2 className="text-w-4xl sm:text-2xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">ADVANTAGES OF </span>
            <span className="text-[#e9212e] font-medium">ISLAND KITCHEN</span>
          </h2>

          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

          <ul className="list-disc list-inside space-y-1">
            <li> These kitchens are elegant and modern and offer a wonderful experience in cooking. </li>
            <li>
              Designing an Island-line kitchen has been a success in terms of space management. This means that there is
              ample storage space without clutter.
            </li>
            <li> Modular kitchens can be very practical if you make good use of the space available. </li>
          </ul>
        </div>
      </section>

      {/* KEEP IN MIND section */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-8 bg-grey opacity-0 animate-fadeIn"
      >
        <div className="max-w-7xl mx-auto px-4 leading-relaxed text-left">
          <h2 className="text-w-4xl sm:text-2xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">WHAT YOU SHOULD KEEP IN MIND WHILE CHOOSING </span>
            <span className="text-[#e9212e] font-medium">THE ISLAND KITCHEN DESGINS?</span>
          </h2>

          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

          <p className="mb-6">
            The Island Modular Kitchen Designs are ideal for homes with enough space for a kitchen. The design of a
            kitchen is not a permanent task. However, Island modular kitchens are made of high-quality materials that
            make it easy to maintain.
          </p>

          <h2 className="text-w-4xl sm:text-l font-bold tracking-tight mb-4">
            <span className="text-gray-800">
              <strong>Essentials for designing an Island Kitchen </strong>
            </span>
          </h2>

          <ul className="list-disc list-inside space-y-1 mt-6 mb-6">
            <li>
              <strong>Budget: </strong>This is the most important aspect of Island Modular Kitchen. It allows you to
              choose from a variety of furniture materials.
            </li>
            <li>
              <strong>Island Kitchen Layout: </strong>You can make your kitchen layout as personal as you like or get
              expert advice.
            </li>
            <li>
              <strong>Material: </strong>Modular kitchens can be made from many materials, including wood, marble, and
              granite. You have the option to choose the material that best suits your needs and budget.
            </li>
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

export default ModularKitchen;
