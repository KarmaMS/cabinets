import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

const ModularCloset = () => {
  /* ───────── Parallax + in-view fade (reduced-motion safe) ───────── */
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const registerSection = (el: HTMLDivElement | null) => {
    if (!el) return;
    if (!sectionsRef.current.includes(el)) sectionsRef.current.push(el);
  };

  useEffect(() => {
    if (prefersReduced) return;
    const onScroll = () => {
      if (!parallaxRef.current) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        parallaxRef.current!.style.transform = `translateY(${window.scrollY * 0.5}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReduced]);

  useEffect(() => {
    if (prefersReduced) {
      sectionsRef.current.forEach((s) => s.classList.remove('opacity-0'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('animate-fadeIn');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    sectionsRef.current.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [prefersReduced]);

  /* ───────── Lightbox ───────── */
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
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

  const swapExtension = (p: string) =>
    p.toLowerCase().endsWith('.png') ? p.replace(/\.png$/i, '.jpg') : p.replace(/\.jpe?g$/i, '.png');

  return (
    <div className="pt-20">
      {/* Hero Section with Parallax */}
      <div className="relative h-screen overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: 'url("/openable-shutter.jpg")' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fadeIn">
              OPENABLE SHUTTER
            </h1>
            <p className="text-xl md:text-2xl opacity-0 animate-fadeIn animation-delay-200">
              Cabinets Openable Shutter Closets tailored to your space, your budget, your routine.
            </p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <section ref={registerSection} className="py-20 bg-white opacity-0">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* LEFT column */}
          <div className="max-w-xl">
            <h2 className="text-4xl sm:text-4xl font-extrabold tracking-tight mb-4">
              <span className="text-gray-800">OPENABLE SHUTTER </span>
              <br />
              <span className="text-[#e9212e] font-medium">WARDROBE DESIGN</span>
            </h2>

            <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

            <div className="space-y-8 leading-relaxed text-lg text-justify">
              <p>
                Our architects and designers study evolving lifestyles and materials, translating them into practical,
                beautiful storage. The result is a wardrobe that feels tailored to you.
              </p>
              <p>
                This timeless hinged-door format offers generous internal layouts and easy organisation. Choose from
                unlimited colours, finishes and door styles—each made with durable, high-quality hardware.
              </p>
            </div>
          </div>

          {/* RIGHT column — image */}
          <figure
            className="ml-auto relative group overflow-hidden rounded-lg shadow-md cursor-zoom-in"
            role="button"
            tabIndex={0}
            aria-label="View openable shutter hero image"
            onClick={() => openLightbox('/Openable/main.jpg', 'Openable Shutter – Main')}
            onKeyDown={(e) =>
              (e.key === 'Enter' || e.key === ' ') && openLightbox('/Openable/main.jpg', 'Openable Shutter – Main')
            }
          >
            <img
              src="/Openable/main.jpg"
              alt="Modern openable shutter wardrobe with warm wood and glass"
              className="block w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement & { dataset: { err?: string } };
                if (el.dataset.err !== '1') {
                  el.dataset.err = '1';
                  el.src = swapExtension('/Openable/main.jpg');
                }
              }}
            />
            {/* hover veil */}
            <div className="pointer-events-none absolute inset-0 bg-black/30 opacity-0 md:group-hover:opacity-100 transition" />

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

      {/* Gallery */}
      <section ref={registerSection} className="py-8 bg-white opacity-0">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Walnut Glow Walk-In',
                description:
                  'Floor-to-ceiling walnut shelving with pull-out drawers and warm LED strips; a bright end window keeps the dressing aisle light and airy.',
                image: '/Openable/1.jpg',
              },
              {
                title: 'Backlit Oak Showcase',
                description:
                  'Open oak hanging bays and glass shelves with integrated lighting, paired with a cozy lounge seat for a boutique-style try-on zone.',
                image: '/Openable/2.jpg',
              },
              {
                title: 'Luxury Curved Walk-In',
                description:
                  'Sweeping curved cabinetry in rich wood wraps the room; perimeter lighting and a central ottoman create a dramatic, high-end dressing suite.',
                image: '/Openable/3.jpg',
              },
              {
                title: 'Charcoal Walk-In with Island',
                description:
                  'Matte charcoal wardrobes with glass fronts and a centre dresser island under soft cove lighting for organised, premium storage.',
                image: '/Openable/4.jpg',
              },
              {
                title: 'Bronze Glass Gallery',
                description:
                  'Floor-to-ceiling bronze glass doors reveal a central dresser and illuminated rails, giving a sleek, boutique showroom feel.',
                image: '/Openable/5.jpg',
              },
              {
                title: 'Garden-View Glass Closet',
                description:
                  'Smoked-glass fronts and warm wood interiors with integrated lighting; panels open to greenery for a calm, luxurious dressing experience.',
                image: '/Openable/6.jpg',
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
                {/* image (3:2) */}
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
                        el.src = swapExtension(image);
                      }
                    }}
                  />
                </div>

                {/* hover tint */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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

      {/* Why choose openable shutter */}
      <section ref={registerSection} className="py-8 bg-gray-50 opacity-0">
        <div className="max-w-7xl mx-auto px-4 leading-relaxed text-left">
          <h2 className="text-4xl sm:text-2xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">WHY CHOOSE </span>
            <span className="text-[#e9212e] font-medium">OPENABLE SHUTTER WARDROBES</span>
          </h2>

          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

          <ul className="space-y-5">
            <li>
              <p className="font-semibold">More Hanging Space</p>
              <p className="text-gray-700">
                Use the inside of doors for hooks and rails—perfect for scarves, belts and sling bags.
              </p>
            </li>

            <li>
              <p className="font-semibold">Huge Colour &amp; Finish Options</p>
              <p className="text-gray-700">
                From mirrored and routed shutters to metal-framed glass, match any interior style. Pick classic knobs,
                slim stainless pulls or luxe leather handles.
              </p>
            </li>

            <li>
              <p className="font-semibold">Minimal Maintenance</p>
              <p className="text-gray-700">
                Hinged systems are robust and easy to service—occasional hinge oiling is all they usually need.
              </p>
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

export default ModularCloset;