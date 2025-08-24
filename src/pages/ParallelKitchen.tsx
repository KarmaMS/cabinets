import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

const ModularKitchen = () => {
  /* ─────────── existing parallax / fade-in hooks ─────────── */
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const offset = window.scrollY * 0.5;
        parallaxRef.current.style.transform = `translateY(${offset}px)`;
      }
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

  const swapExt = (p: string) =>
    p.toLowerCase().endsWith('.png') ? p.replace(/\.png$/i, '.jpg') : p.replace(/\.jpe?g$/i, '.png');

  return (
    <div className="pt-20">
      {/* Hero Section with Parallax */}
      <div className="relative h-screen overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: 'url("/Parallel/parallelmainbanner.jpg")' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fadeIn">PARALLEL KITCHEN</h1>
            <p className="text-xl md:text-2xl opacity-0 animate-fadeIn animation-delay-200">
              Cabinets Parallel Kitchens tailored to your space, your budget, your routine.
            </p>
          </div>
        </div>
      </div>

      {/* ─────────── Intro ─────────── */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-20 bg-white opacity-0 animate-fadeIn"
      >
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* LEFT column ─ headline + body */}
          <div className="max-w-xl">
            <h2 className="text-w-4xl sm:text-3xl font-extrabold tracking-tight mb-4">
              <span className="text-gray-800">Parallel </span>
              <span className="text-[#e9212e] font-medium">MODULAR KITCHEN</span>
            </h2>

            <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

            <div className="space-y-8 leading-relaxed text-lg text-justify">
              <p>
                Modular Kitchens are a modern, well-designed kitchen that uses space efficiently and features
                factory-made storage cabinets. Parallel modular kitchens are made up of one of three components:
                the hob, sink and fridge. This kitchen arrangement splits the Kitchen into separate areas for dry and wet
                work.
              </p>
              <p>
                Kitchens with longitudinal areas or a passage connecting to the Kitchen will benefit from parallel line
                kitchen designs. Parallel Modular Kitchens are organized because they have multiple cabinets that can
                hold accessories and kitchenware. The Kitchen's components are all made from high-quality wood, granite
                and marble, and tile. It enhances the design's beauty and elegance.
              </p>
            </div>
          </div>

          {/* RIGHT column — image */}
          <figure
            className="ml-auto relative group overflow-hidden rounded-lg shadow-md cursor-zoom-in"
            role="button"
            tabIndex={0}
            aria-label="View parallel kitchen hero image"
            onClick={() => openLightbox('/Parallel/main.jpg', 'Parallel Kitchen – Main')}
            onKeyDown={(e) =>
              (e.key === 'Enter' || e.key === ' ') && openLightbox('/Parallel/main.jpg', 'Parallel Kitchen – Main')
            }
          >
            <img
              src="/Parallel/main.jpg"
              alt="Modern modular kitchen in high-gloss red"
              className="block w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement & { dataset: { err?: string } };
                if (el.dataset.err !== '1') {
                  el.dataset.err = '1';
                  el.src = swapExt('/Parallel/main.jpg');
                }
              }}
            />
            {/* hover overlay */}
            <div className="pointer-events-none absolute inset-0 bg-black/30 opacity-0 md:group-hover:opacity-100 transition" />
            {/* center icon*/}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-9 h-9 text-white drop-shadow-md transform transition will-change-transform scale-90 md:group-hover:scale-100"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="15 3 21 3 21 9" vectorEffect="non-scaling-stroke" />
                <line x1="21" y1="3" x2="14" y2="10" vectorEffect="non-scaling-stroke" />
                <polyline points="9 21 3 21 3 15" vectorEffect="non-scaling-stroke" />
                <line x1="3" y1="21" x2="10" y2="14" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
          </figure>
        </div>
      </section>

      {/* ─────────── Gallery ─────────── */}
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
                  'High gloss grey cabinetry on both sides with long uninterrupted worktops. A true parallel layout for fast, efficient cooking.',
                image: '/Parallel/1.jpg',
              },
              {
                title: 'Light Oak Parallel',
                description:
                  'White cabinets with warm oak shelving facing a second counter run. Big windows brighten the galley for a welcoming family kitchen.',
                image: '/Parallel/2.jpg',
              },
              {
                title: 'Urban Grey Parallel With Island',
                description:
                  'Handleless grey fronts form two facing runs while a compact island adds extra prep and serving space.',
                image: '/Parallel/3.jpg',
              },
              {
                title: 'Warm Oak and White Galley',
                description:
                  'Two straight counters in white and oak with a clear central aisle. Quick movement between sink and hob for everyday efficiency.',
                image: '/Parallel/4.jpg',
              },
              {
                title: 'Soft White Parallel With Feature Wall',
                description:
                  'Matte white units run wall to wall on both sides. A stone feature wall and central island make it a social cook zone.',
                image: '/Parallel/5.jpg',
              },
              {
                title: 'Mustard High Gloss Galley',
                description:
                  'Bold yellow overheads with black countertops on twin lines. A bright corridor kitchen that is easy to clean and maintain.',
                image: '/Parallel/6.jpg',
              },
            ].map(({ title, description, image }) => (
              <figure
                key={image}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-zoom-in"
                role="button"
                tabIndex={0}
                aria-label={`View ${title}`}
                onClick={() => openLightbox(image, title)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openLightbox(image, title)}
              >
                <div className="relative w-full pb-[66.666%]">
                  <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement & { dataset: { err?: string } };
                      if (el.dataset.err !== '1') {
                        el.dataset.err = '1';
                        el.src = swapExt(image);
                      }
                    }}
                  />
                </div>

                {/* hover tint */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300" />

                {/* caption */}
                {/* hover overlay text */}
                <figcaption className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                    <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {description}
                    </p>
                  </div>
                </figcaption>

                {/* center stroked maximize icon */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-9 h-9 drop-shadow-md transform transition scale-90 group-hover:scale-100"
                    aria-hidden="true"
                  >
                    <polyline points="15 3 21 3 21 9" vectorEffect="non-scaling-stroke" />
                    <line x1="21" y1="3" x2="14" y2="10" vectorEffect="non-scaling-stroke" />
                    <polyline points="9 21 3 21 3 15" vectorEffect="non-scaling-stroke" />
                    <line x1="3" y1="21" x2="10" y2="14" vectorEffect="non-scaling-stroke" />
                  </svg>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── FEATURES ─────────── */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-8 bg-grey opacity-0 animate-fadeIn"
      >
        <div className="max-w-7xl mx-auto px-4 leading-relaxed text-left">
          <h2 className="text-w-4xl sm:text-2xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">FEATURES OF </span>
            <span className="text-[#e9212e] font-medium">PARALLEL KITCHEN DESIGNS</span>
          </h2>
          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />
          <ul className="list-disc list-inside space-y-1">
            <li>
              Parallel Modular Kitchen has amazing features that will allow you to enjoy the process of cooking fully.
              Parallel Modular Kitchen's layout is designed to make life easier. Parallel Line kitchens come with
              sliding and pocket doors that increase storage space and reduce visible clutter.
            </li>
            <li>
              The working triangle forms an exact triangle adjacent to the refrigerator and sinks in the Parallel
              Kitchen layout. The kitchen sink is placed in line with the fridge, giving you maximum space between them.
              A parallel Modular Kitchen allows two people to work together in the Kitchen.
            </li>
          </ul>
        </div>
      </section>

      {/* ─────────── ADVANTAGES ─────────── */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-8 bg-grey opacity-0 animate-fadeIn"
      >
        <div className="max-w-7xl mx-auto px-4 leading-relaxed text-left">
          <h2 className="text-w-4xl sm:text-2xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">ADVANTAGES OF </span>
            <span className="text-[#e9212e] font-medium">PARALLEL KITCHEN</span>
          </h2>
          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />
          <ul className="list-disc list-inside space-y-1">
            <li>These kitchens are elegant and modern and offer a wonderful experience in cooking. </li>
            <li>Parallel line kitchens are space-efficiently designed. You get plenty of storage space without clutter.</li>
            <li>Modular kitchens can be very practical if you make good use of the space available. </li>
          </ul>
        </div>
      </section>

      {/* ─────────── KEEP IN MIND ─────────── */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-8 bg-grey opacity-0 animate-fadeIn"
      >
        <div className="max-w-7xl mx-auto px-4 leading-relaxed text-left">
          <h2 className="text-w-4xl sm:text-2xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">WHAT YOU SHOULD KEEP IN MIND WHILE CHOOSING </span>
            <span className="text-[#e9212e] font-medium">THE PARALLEL KITCHEN DESGINS?</span>
          </h2>
          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />
          <p className="mb-6">
            Although the Parallel modular kitchen design is more expensive than regular kitchens, it's worth the extra
            cost for the style and convenience they provide to your Kitchen. Modular kitchens can take between two and
            six weeks to install, meaning that the Kitchen is ready for use in just a few weeks. The design of a kitchen
            is not a permanent task. However, maintaining the Kitchen can be solved by using high-quality materials in
            Parallel modular kitchens. Essentials for designing a Parallel kitchen
          </p>
          <h2 className="text-w-4xl sm:text-l font-bold tracking-tight mb-4">
            <span className="text-gray-800">
              <strong>Essentials for designing an Parallel Kitchen </strong>
            </span>
          </h2>
          <ul className="list-disc list-inside space-y-1 mt-6 mb-6">
            <li>
              <strong>Budget: </strong>A Parallel line kitchen allows you to choose from a variety of furniture
              materials.
            </li>
            <li>
              <strong>Parallel Kitchen Layout: </strong>You can make your Kitchen layout as personal as possible or get
              expert advice.
            </li>
            <li>
              <strong>Material: </strong>Modular kitchens can be made from many materials, including wood, marble, and
              granite. Choose materials that suit your needs and budget.
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