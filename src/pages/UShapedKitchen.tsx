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

  return (
    <div className="pt-20">
      {/* Hero Section with Parallax */}
      <div className="relative h-screen overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/U-Shaped/ushapedmainbanner.jpg")' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fadeIn">
              U-SHAPED KITCHEN
            </h1>
            <p className="text-xl md:text-2xl opacity-0 animate-fadeIn animation-delay-200">
              Cabinets U-Shaped Kitchens tailored to your space, your budget, your routine.
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
          {/* LEFT column — headline + body */}
          <div className="max-w-xl">
            <h2 className="text-4xl sm:text-3xl font-extrabold tracking-tight mb-4">
              <span className="text-gray-800">U-SHAPED </span>
              <span className="text-[#e9212e] font-medium">MODULAR KITCHEN</span>
            </h2>

            <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

            <div className="space-y-8 leading-relaxed text-lg text-justify">
              <p>
                Modular Kitchens are a modern, well-designed kitchen that uses space efficiently and features
                factory-made storage cabinets.
              </p>

              <p>
                U Shaped Kitchen design is great for small and large rooms as they can be adapted to any space. These
                kitchens offer a great work surface and are also very versatile. These kitchens also have plenty of
                storage space that will benefit their owners.
              </p>
            </div>
          </div>

          {/* RIGHT column — image */}
          <figure
            className="flex items-start md:items-center ml-auto relative group cursor-zoom-in"
            role="button"
            tabIndex={0}
            aria-label="View U-shaped kitchen image"
            onClick={() => openLightbox('/U-Shaped/main.jpg', 'U-Shaped Modular Kitchen')}
            onKeyDown={(e) =>
              (e.key === 'Enter' || e.key === ' ') && openLightbox('/U-Shaped/main.jpg', 'U-Shaped Modular Kitchen')
            }
          >
            <img
              src="/U-Shaped/main.jpg"
              alt="U-Shaped Modular Kitchen"
              className="w-full rounded-lg shadow-md"
              loading="lazy"
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
                title: 'Bright Scandinavian U-Kitchen',
                description:
                  'Crisp white cabinetry with charcoal worktops and integrated oven; a clean U-layout around twin windows keeps the space light and efficient.',
                image: '/U-Shaped/1.jpg',
              },
              {
                title: 'Two-Tone Gourmet Peninsula',
                description:
                  'Glossy ivory uppers with rich coffee-brown bases form a sleek U; a waterfall breakfast peninsula adds prep space and casual seating.',
                image: '/U-Shaped/2.jpg',
              },
              {
                title: 'Aqua Accent U-Kitchen',
                description:
                  'White cabinets are paired with bold aqua fronts and a compact breakfast ledge; the U-configuration nails an easy, ergonomic work triangle.',
                image: '/U-Shaped/3.jpg',
              },
              {
                title: 'Soft-Grey U with Curved Island',
                description:
                  'Matte grey doors and warm wood flooring surround a rounded central island—extra prep space without breaking the U-shaped flow.',
                image: '/U-Shaped/4.jpg',
              },
              {
                title: 'Fresh Green Backsplash',
                description:
                  'Bright green accent wall enlivens white cabinetry; full-height fridge and wraparound counters deliver storage across the U.',
                image: '/U-Shaped/5.jpg',
              },
              {
                title: 'Calm Grey & Blue Nook',
                description:
                  'Pale-grey units with a muted blue feature wall and picture window; a practical U-layout with generous drawers and integrated appliances.',
                image: '/U-Shaped/6.jpg',
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
                  />
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <Maximize2 className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* hover overlay text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-semibold mb-2">{style.title}</h3>
                    <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {style.description}
                    </p>
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-8 bg-gray-50 opacity-0 animate-fadeIn"
      >
        <div className="max-w-7xl mx-auto px-4 leading-relaxed text-left">
          <h2 className="text-4xl sm:text-2xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">FEATURES OF </span>
            <span className="text-[#e9212e] font-medium">U-SHAPED KITCHEN DESIGNS</span>
          </h2>

          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

          <p>
            U Shaped Kitchen design has unique features that allow you to enjoy the process of cooking thoroughly. This
            Modular Kitchen makes the most of every inch of space. Cabinets are available in this kitchen design and
            have sliding and pocket doors. They increase storage space and reduce visible clutter. The fridge is
            directly in front of your kitchen sink, which gives you maximum workspace for efficient cooking.
          </p>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-8 bg-gray-50 opacity-0 animate-fadeIn"
      >
        <div className="max-w-7xl mx-auto px-4 leading-relaxed text-left">
          <h2 className="text-4xl sm:text-2xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">ADVANTAGES OF </span>
            <span className="text-[#e9212e] font-medium">U-Shaped KITCHEN</span>
          </h2>

          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

          <ul className="list-disc list-inside space-y-1">
            <li>
              To maximize efficiency in cooking, a U shaped kitchen was created. This kitchen is an excellent example of
              the "working triangle", which we frequently hear about when it comes to kitchen design. It is easy to
              move between the sink, ovens/cooktops and refrigerator. This layout is often regarded as the most
              efficient, because it uses a narrow working triangle that separates the work area.
            </li>
            <li>
              A U shaped kitchen has the advantage of two or more cooks working simultaneously. This is great for
              entertaining large families or when you have many people to feed. It also allows for less traffic flow,
              which is great for keeping people away from your head while you cook.
            </li>
            <li>This island bench top allows you to separate your kitchen from the dining area, so that entertaining is easy.</li>
          </ul>
        </div>
      </section>

      {/* KEEP IN MIND */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-8 bg-gray-50 opacity-0 animate-fadeIn"
      >
        <div className="max-w-7xl mx-auto px-4 leading-relaxed text-left">
          <h2 className="text-4xl sm:text-2xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">WHAT YOU SHOULD KEEP IN MIND WHILE CHOOSING </span>
            <span className="text-[#e9212e] font-medium">THE U-SHAPED KITCHEN DESIGNS?</span>
          </h2>

          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

          <p className="mb-6">
            Although the U Shaped modular kitchen design might be more expensive than other kitchens, it is worth the
            extra cost for the style and convenience they provide to your Kitchen. The design of a kitchen is not a
            permanent task. However, the problem of maintaining the Kitchen can be solved by the use of top-quality
            materials in U-shaped modular kitchens.
          </p>

          <h3 className="text-4xl sm:text-xl font-bold tracking-tight mb-4">
            <span className="text-gray-800">
              <strong>Essentials for designing a U-Shaped Kitchen</strong>
            </span>
          </h3>

          <ul className="list-disc list-inside space-y-1 mt-6 mb-6">
            <li>
              <strong>Budget: </strong>This is the most important factor in U Shaped Kitchen design. It allows you to
              choose from a variety of furniture materials.
            </li>
            <li>
              <strong>U-Shaped Kitchen Layout: </strong>This is the essential aspect of the Kitchen. It can be customized
              to your liking, or you can seek expert advice.
            </li>
            <li>
              <strong>Material: </strong> Modular kitchens are available in a variety of materials including wood,
              granite, and marble. You can choose the material that best suits your budget and needs.
            </li>
          </ul>

          <p>
            Cabinets also offer other designs such as Modular wardrobes, Bathroom Vanity design &amp; LCD Panel Designs.
            Cabinets has a wide variety of Modular Kitchen designs like an In-line kitchen, Parallel Kitchen, U-shaped
            kitchen, G-shaped Kitchen, Island Kitchen, German Kitchen, and Italian Kitchen.
          </p>
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