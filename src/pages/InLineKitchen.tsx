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
          style={{ backgroundImage: 'url("/In-Line/inlinemainbanner.jpg")' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fadeIn">
              IN-LINE KITCHEN
            </h1>
            <p className="text-xl md:text-2xl opacity-0 animate-fadeIn animation-delay-200">
              Cabinets In-Line Kitchens tailored to your space, your budget, your routine.
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
              <span className="text-gray-800">IN-LINE </span>
              <span className="text-[#e9212e] font-medium">MODULAR KITCHEN</span>
            </h2>

            <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

            <div className="space-y-8 leading-relaxed text-lg text-justify">
              <p>
                These modular kitchens are versatile and can be used in many ways. This layout can be used to
                accommodate a dining table if the space is large enough. Properly arranging kitchen items can provide
                storage space in the corners.
              </p>

              <p>
                The ideal L shaped Kitchen has the hob located at the junction between the sink and fridge, creating a
                triangle that separates wet work from storage.
              </p>
            </div>
          </div>

          {/* right column ─ image */}
          <figure
            className="flex items-start md:items-center ml-auto relative group cursor-zoom-in"
            role="button"
            tabIndex={0}
            aria-label="View In-Line kitchen image"
            onClick={() => openLightbox('/In-Line/main.jpg', 'In-Line Kitchen – Main')}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openLightbox('/In-Line/main.jpg', 'In-Line Kitchen – Main')}
          >
            <img
              src="/In-Line/main.jpg"
              alt="Modern inline modular kitchen with warm tones"
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
                title: 'Warm Timber One-Wall',
                description:
                  'Straight run of wood-grain drawers with a built-in oven tower and open shelving — a clean, airy inline layout for open-plan spaces.',
                image: '/In-Line/1.jpg',
              },
              {
                title: 'Graphite Linear With Island',
                description:
                  'Matte charcoal cabinetry along a single wall paired with a slim island; mirrored backsplash keeps the one-wall kitchen bright and spacious.',
                image: '/In-Line/2.jpg',
              },
              {
                title: 'Gloss Grey Linear',
                description:
                  'High-gloss grey fronts with warm wood accents create a sleek inline workstation with integrated tall storage and seamless appliances.',
                image: '/In-Line/3.jpg',
              },
              {
                title: 'Inline Breakfast Bar',
                description:
                  'Crisp white uppers and slate base cabinets along one wall, complemented by a casual bar counter for quick meals and extra prep.',
                image: '/In-Line/4.jpg',
              },
              {
                title: 'Taupe Seamless Run',
                description:
                  'Handle-less taupe cabinetry forms an extra-long continuous prep zone with built-in oven and pantry — pure inline minimalism.',
                image: '/In-Line/5.jpg',
              },
              {
                title: 'Nordic White and Black',
                description:
                  'White inline base cabinets set against a ribbed wood feature wall, balanced by a contrasting black appliance bank and open shelves.',
                image: '/In-Line/6.jpg',
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
            <span className="text-[#e9212e] font-medium">In-Line KITCHEN DESIGNS</span>
          </h2>

          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

          <p className="mb-6">
            Straight Modular Kitchens are packed with incredible features that allow you to enjoy the process of
            cooking. The straight line kitchens offer extra convenience with sliding and pocket doors, increasing
            storage space and reducing visible clutter.
          </p>
          <p>
            The work triangle is placed in the kitchen design. The location of the kitchen sink is so that users have
            the most space between them. A straight modular kitchen is designed to use the space to place the dining
            table in the kitchen. This will enhance the interactivity of the kitchen.
          </p>
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
            <span className="text-[#e9212e] font-medium">STRAIGHT MODULAR KITCHEN</span>
          </h2>

        <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

          <ul className="list-disc list-inside space-y-1">
            <li> In-Line kitchens are elegant and stylish and offer a wonderful experience in cooking. </li>
            <li>
              A straight-line kitchen design allows for space management to be done efficiently. This means that you
              have ample storage space without clutter.
            </li>
            <li> Modular kitchens can be very practical if you make good use of the space available. </li>
          </ul>
        </div>
      </section>

      {/* KEEP IN MIND Section */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-8 bg-grey opacity-0 animate-fadeIn"
      >
        <div className="max-w-7xl mx-auto px-4 leading-relaxed text-left">
          <h2 className="text-w-4xl sm:text-2xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">HERE ARE A FEW THINGS TO KEEP IN MIND WHEN </span>
            <span className="text-[#e9212e] font-medium">DESIGNING AN IN-LINE KITCHEN</span>
          </h2>

          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

          <p className="mb-6">
            Straight modular kitchen designs looks more good than regular ones, and they are very practical and easy to
            use. The design of a kitchen is not a permanent task. However, the problem of maintaining the kitchen's
            cleanliness can be solved by using top-quality materials and functionality in modular kitchens.
          </p>

          <h2 className="text-w-4xl sm:text-l font-bold tracking-tight mb-4">
            <span className="text-gray-800">
              <strong>Essentials for designing a straight kitchen </strong>
            </span>
          </h2>

          <ul className="list-disc list-inside space-y-1 mt-6 mb-6">
            <li>
              <strong>Budget: </strong>This is the most important factor in a straight-line kitchen. It eventually
              allows you to choose from a variety of furniture materials.
            </li>
            <li>
              <strong>In-Line Kitchen Layout: </strong>You can make your kitchen layout as personal as you like or get
              expert advice.
            </li>
            <li>
              <strong>Material: </strong>Modular kitchens can be made from many materials, including wood, marble, and
              granite. Choose the material that suits as per your needs and budget.
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