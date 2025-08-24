import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

const layouts = [
  {
    title: 'U SHAPE',
    highlight: 'MODULAR KITCHEN DESIGN',
    image: '/u-shape-mod.png',
    to: '/kitchen/u-shaped-kitchen',
    desc: `A U-shaped kitchen design features three walls lined with cabinets and appliances. It's an efficient design that saves floor space.`,
    span: 1,
  },
  {
    title: 'L SHAPE',
    highlight: 'MODULAR KITCHEN DESIGN',
    image: '/l-shape-mod.png',
    to: '/kitchen/l-shaped-kitchen',
    desc: `The L-shaped kitchen is one of the most efficient layouts for modern kitchens. L-shaped Kitchens are a great way to organize your space and make it easy.`,
    span: 2,
  },
  {
    title: 'G SHAPE',
    highlight: 'MODULAR KITCHEN DESIGN',
    image: '/g-shape-mod.png',
    to: '/kitchen/g-shaped-kitchen',
    desc: `As the name suggests, G shaped kitchens have four sides resembling the letter 'G.' It's very similar to U-shaped kitchens, except there is usually a fourth dimension that adds extra countertop or dining space.`,
    span: 1,
  },
  {
    title: 'ISLAND',
    highlight: 'MODULAR KITCHEN DESIGN',
    image: '/island-mod.png',
    to: '/kitchen/island-kitchen',
    desc: `A kitchen island is a unit that can be freestanding and used to enhance the functionality and appearance of your cooking space. Traditional units are rectangular, with one section being used as a breakfast counter.`,
    span: 1,
  },
  {
    title: 'PARALLEL',
    highlight: 'MODULAR KITCHEN DESIGN',
    image: '/para-mod.png',
    to: '/kitchen/parallel-kitchen',
    desc: `Parallel kitchens are a classic design that consists of two walls and a passageway. It is packed with wall cabinets and base cabinets on each side. This layout is easy to design, as there isn't enough space for corner cabinets.`,
    span: 1,
  },
];

const KitchenLayouts = () => {
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });

  const openAt = (index: number) => setLightbox({ open: true, index });
  const close = () => setLightbox((s) => ({ ...s, open: false }));
  const prev = () => setLightbox((s) => ({ open: true, index: (s.index + layouts.length - 1) % layouts.length }));
  const next = () => setLightbox((s) => ({ open: true, index: (s.index + 1) % layouts.length }));

  // lock scroll + keyboard nav when lightbox is open
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
    <section id="layouts" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Kitchen Layout Designs</h2>
          <p className="mt-4 text-xl text-gray-600">Choose the perfect layout for your dream kitchen</p>
        </div>

        {/* Grid: keep item #2 wider but fixed height */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {layouts.map((layout, idx) => (
            <article
              key={layout.title}
              className={`group bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1
                ${layout.span === 2 ? 'md:col-span-2 lg:col-span-2' : ''}`}
            >
              {/* Clickable image area opens lightbox */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => openAt(idx)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? openAt(idx) : undefined)}
                className="relative w-full h-64 sm:h-72 lg:h-72 xl:h-80 overflow-hidden cursor-zoom-in"
              >
                <img
                  src={layout.image}
                  alt={layout.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                {/* hover overlay + expand icon */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <Maximize2 className="w-10 h-10 text-[#e9212e]" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">
                  {layout.title} <span className="text-[#e9212e]">{layout.highlight}</span>
                </h3>
                <p className="text-gray-600 leading-relaxed">{layout.desc}</p>

                <div className="mt-6">
                  <Link
                    to={layout.to}
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
                src={layouts[lightbox.index].image}
                alt={`${layouts[lightbox.index].title} ${layouts[lightbox.index].highlight}`}
                className="w-full h-auto rounded-lg shadow-2xl"
              />

              <figcaption className="mt-3 text-center text-white">
                {layouts[lightbox.index].title} {layouts[lightbox.index].highlight}
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

export default KitchenLayouts;