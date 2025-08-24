import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

const wardrobes = [
  {
    title: 'SLIDING DOOR',
    highlight: 'WARDROBE',
    image: '/S-D-W.png',
    to: '/wardrobe/sliding-doors',
    desc:
      "A sliding door wardrobe is an essential piece of bedroom furniture. These wardrobes will enhance your bedroom's decor and offer ample storage space to store your clothes, accessories, as well as beauty products.",
    span: 1,
  },
  {
    title: 'OPENABLE SHUTTER',
    highlight: 'WARDROBE',
    image: '/O-S-W.png',
    to: '/wardrobe/openable-shutter',
    desc:
      'Give your home the attention it deserves with a timeless openable shutter wardrobe. This shutter is well-known for its classic design and high-quality craftsmanship.',
    span: 1,
  },
  {
    title: 'WALK IN CLOSET',
    highlight: 'WARDROBE',
    image: '/W-C-W.png',
    to: '/wardrobe/walk-in-closet',
    desc:
      'You have many options for design and placement when it comes to walk-in wardrobes. Many homeowners today need a well-equipped closet.',
    span: 1,
  },
];

const WardrobeLayouts = () => {
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });

  const openAt = (index: number) => setLightbox({ open: true, index });
  const close = () => setLightbox((s) => ({ ...s, open: false }));
  const prev = () => setLightbox((s) => ({ open: true, index: (s.index + wardrobes.length - 1) % wardrobes.length }));
  const next = () => setLightbox((s) => ({ open: true, index: (s.index + 1) % wardrobes.length }));

  useEffect(() => {
    if (!lightbox.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    const orig = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = orig;
    };
  }, [lightbox.open]);

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-4xl font-extrabold tracking-tight">
            <span className="text-gray-800">TYPES OF </span>
            <span className="text-[#e9212e] font-medium">MODULAR WARDROBE</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Bedroom wardrobes are a great place to store clothes and accessories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wardrobes.map((item, idx) => (
            <article
              key={item.title}
              className={`group bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1
                          ${item.span === 2 ? 'md:col-span-2 lg:col-span-2' : ''}`}
            >
              {/* Clickable preview */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => openAt(idx)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? openAt(idx) : undefined)}
                className="relative w-full h-64 sm:h-72 lg:h-72 xl:h-80 overflow-hidden cursor-zoom-in"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <Maximize2 className="w-10 h-10 text-[#e9212e]" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">
                  {item.title} <span className="text-[#e9212e]">{item.highlight}</span>
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>

                <div className="mt-6">
                  <Link
                    to={item.to}
                    className="inline-flex items-center text-[#e9212e] font-semibold transition-transform duration-300 group-hover:translate-x-2"
                  >
                    Explore Design
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Lightbox */}
        {lightbox.open && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={close}
          >
            <figure className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={close}
                className="absolute -top-3 -right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={wardrobes[lightbox.index].image}
                alt={`${wardrobes[lightbox.index].title} ${wardrobes[lightbox.index].highlight}`}
                className="w-full h-auto rounded-lg shadow-2xl"
              />

              <figcaption className="mt-3 text-center text-white">
                {wardrobes[lightbox.index].title} {wardrobes[lightbox.index].highlight}
              </figcaption>

              <button
                onClick={prev}
                className="absolute top-1/2 -translate-y-1/2 left-0 p-3 text-white hover:bg-white/10 rounded-full"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={next}
                className="absolute top-1/2 -translate-y-1/2 right-0 p-3 text-white hover:bg-white/10 rounded-full"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </figure>
          </div>
        )}
      </div>
    </section>
  );
};

export default WardrobeLayouts;