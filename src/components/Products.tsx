import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const products = [
  {
    title: 'MODULAR WARDROBE',
    highlight: 'WARDROBE',
    image: '/mod-k.png',
    to: '/products/modular-wardrobe',
    description:
      "Explore the range of walk-in closets, sliding doors, openable shutter wardrobes to beautify your home interior.",
  },
  {
    title: 'TV PANEL',
    highlight: 'PANEL',
    image: '/tv-p.png',
    to: '/products/tv-panel',
    description:
      'Explore the variety of elegant TV panel designs to give a unique look at your living area.',
  },
  {
    title: 'BATHROOM VANITY',
    highlight: 'VANITY',
    image: '/bath-v.png',
    to: '/products/bathroom-vanity',
    description:
      'Stylish and spacious bathroom vanity with contemporary designs to improve the functionality.',
  },
];

const Products = () => {
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({
    open: false,
    index: 0,
  });

  const openAt = (index: number) => setLightbox({ open: true, index });
  const close = () => setLightbox((s) => ({ ...s, open: false }));
  const prev = () =>
    setLightbox((s) => ({ open: true, index: (s.index + products.length - 1) % products.length }));
  const next = () =>
    setLightbox((s) => ({ open: true, index: (s.index + 1) % products.length }));

  // ESC / ← → keys + stop page scroll when open
  useEffect(() => {
    if (!lightbox.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = original;
    };
  }, [lightbox.open]);

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* header omitted for brevity ... */}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg overflow-hidden transition-all duration-500 hover:shadow-2xl opacity-0 animate-fadeIn"
              style={{ animationDelay: `${800 + index * 200}ms` }}
            >
              {/* Clickable preview area */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => openAt(index)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? openAt(index) : null)}
                className="relative aspect-w-16 aspect-h-12 overflow-hidden cursor-zoom-in"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                {/* dark hover layer + expand icon (like your screenshot) */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <Maximize2 className="w-10 h-10 text-[#e9212e]" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">
                  {product.title.split(product.highlight)[0]}
                  <span className="text-[#e9212e]">{product.highlight}</span>
                </h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                <div className="mt-6">
                  <Link
                    to={product.to}
                    className="inline-flex items-center text-[#e9212e] font-semibold transition-transform duration-300 group-hover:translate-x-2"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightbox.open && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={close}
          >
            <figure
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={close}
                className="absolute -top-3 -right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={products[lightbox.index].image}
                alt={products[lightbox.index].title}
                className="w-full h-auto rounded-lg shadow-2xl"
              />

              <figcaption className="mt-3 text-center text-white">
                {products[lightbox.index].title}
              </figcaption>

              {/* prev / next */}
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

export default Products;