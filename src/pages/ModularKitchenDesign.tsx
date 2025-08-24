import React, { useEffect, useRef, useState } from 'react';
import FAQ from '../components/FAQ-MKD';
import { Maximize2, X } from 'lucide-react';

const ModularKitchenDesign = () => {
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
    handleScroll();
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
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="font-bebas text-5xl md:text-7xl font-extrabold mb-6 opacity-0 animate-fadeIn">
              Modular Kitchen Design
            </h1>
            <p className="text-xl text-opacity-50 md:text-2xl opacity-0 animate-fadeIn animation-delay-200">
              Where style meets functionality in perfect harmony
            </p>
          </div>
        </div>
      </div>

      {/* Design Features */}
      <div
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-20 bg-white opacity-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="font-bebas text-4xl md:text-4xl font-thin tracking-wide
                        text-[#e9212e] uppercase mb-6"
            >
              Modular&nbsp;Kitchen&nbsp;Design
            </h2>

            <p className="mx-auto max-w-5xl text-lg md:text-m leading-relaxed text-gray-900">
              A <span className="font-semibold">Modular Kitchen Design</span> is a popular choice for those looking
              for practical and stylish kitchen interiors. The layouts of these kitchens, which include L-shaped,
              U-shaped, straight-line, and island designs, can be reshaped depending on the demands of every
              individual. Cabinets and drawers are just a few of the many storage choices they provide to keep things
              organized. Modern kitchens are made of materials like laminates, acrylic, stainless steel, and natural
              stone, which are durable and easy to maintain. They are an excellent choice when creating a kitchen that
              is both beautiful and practical in any house.
            </p>
          </div>

          <div
            className="grid gap-8
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3"
          >
            {[
              // Row 1
              {
                file: 'u-shaped-kitchen1.jpg',
                title: 'U SHAPE MODULAR KITCHEN DESIGN',
                desc: 'Wrap-around cabinetry on three sides delivers generous counter area and storage.',
                span: 1,
              },
              {
                file: 'g-shaped-kitchen1.jpg',
                title: 'G SHAPE MODULAR KITCHEN DESIGN',
                desc: 'A U-shape plus a compact peninsula for extra prep space and casual seating.',
                span: 1,
              },
              {
                file: 'l-shaped-kitchen2.jpg',
                title: 'L SHAPE MODULAR KITCHEN DESIGN',
                desc: 'Two adjacent walls maximise corner space while keeping the centre open.',
                span: 1,
              },

              // Row 2
              {
                file: 'l-shaped-kitchen1.jpg',
                title: 'L SHAPE MODULAR KITCHEN DESIGN',
                desc: 'Productive, space-saving structure with cabinets on two perpendicular walls.',
                span: 2,
              },
              {
                file: 'g-shaped-kitchen3.jpg',
                title: 'G SHAPE MODULAR KITCHEN DESIGN',
                desc: 'Functional layout with bar-style seating and great storage.',
                span: 1,
              },

              // Row 3
              {
                file: 'g-shaped-kitchen2.jpg',
                title: 'G SHAPE MODULAR KITCHEN DESIGN',
                desc: 'Gorgeous set-up that provides the greatest space and a lot of storage.',
                span: 1,
              },
              {
                file: 'island-shaped-kitchen1.jpg',
                title: 'ISLAND MODULAR KITCHEN DESIGN',
                desc: 'A central island adds prep surface and a social hub for casual dining.',
                span: 1,
              },
              {
                file: 'u-shaped-kitchen2.jpg',
                title: 'U SHAPE MODULAR KITCHEN DESIGN',
                desc: 'Ergonomic work triangle with excellent storage on three walls.',
                span: 1,
              },

              // Row 4
              {
                file: 'island-shaped-kitchen2.jpg',
                title: 'ISLAND MODULAR KITCHEN DESIGN',
                desc: 'Expansive island anchors the space and boosts workflow.',
                span: 2,
              },
              {
                file: 'parallel-kitchen1.jpg',
                title: 'PARALLEL MODULAR KITCHEN DESIGN',
                desc: 'Two facing counters create an efficient galley work zone.',
                span: 1,
              },

              // Row 5
              {
                file: 'parallel-kitchen2.jpg',
                title: 'PARALLEL MODULAR KITCHEN DESIGN',
                desc: 'Balanced storage both sides keeps movement streamlined.',
                span: 1,
              },
              {
                file: 'inline-kitchen1.jpg',
                title: 'INLINE MODULAR KITCHEN DESIGN',
                desc: 'Single-wall arrangement ideal for open-plan or compact spaces.',
                span: 2,
              },

              // Row 6
              {
                file: 'inline-kitchen2.jpg',
                title: 'INLINE MODULAR KITCHEN DESIGN',
                desc: 'Minimal footprint without sacrificing functionality.',
                span: 1,
              },
              {
                file: 'italian-kitchen1.jpg',
                title: 'ITALIAN MODULAR KITCHEN DESIGN',
                desc: 'Sleek finishes and minimalist detailing for a contemporary look.',
                span: 1,
              },
              {
                file: 'italian-kitchen2.jpg',
                title: 'ITALIAN MODULAR KITCHEN DESIGN',
                desc: 'Premium textures with refined, handle-less lines.',
                span: 1,
              },
              {
                file: 'italian-kitchen3.jpg',
                title: 'ITALIAN MODULAR KITCHEN DESIGN',
                desc: 'Statement lighting and luxe finishes complete the look.',
                span: 1,
              },

              // Row 7
              {
                file: 'german-kitchen1.jpg',
                title: 'GERMAN MODULAR KITCHEN DESIGN',
                desc: 'Precision-engineered hardware and smart storage solutions.',
                span: 2,
              },
              {
                file: 'german-kitchen2.jpg',
                title: 'GERMAN MODULAR KITCHEN DESIGN',
                desc: 'Handle-less lines and robust, durable materials.',
                span: 1,
              },

              // Row 8
              {
                file: 'u-shaped-kitchen3.jpg',
                title: 'U SHAPE MODULAR KITCHEN DESIGN',
                desc: 'Family-friendly layout with loads of cabinetry.',
                span: 1,
              },
              {
                file: 'parallel-kitchen3.jpg',
                title: 'PARALLEL MODULAR KITCHEN DESIGN',
                desc: 'Dual runs maximise storage in narrow rooms.',
                span: 1,
              },
            ].map(({ file, title, desc, span }) => {
              const src = `/ModularKitchenDesign/${file}`;
              return (
                <div
                  key={file}
                  className={`group relative overflow-hidden rounded-lg shadow-lg ${
                    span === 2 ? 'lg:col-span-2' : ''
                  } cursor-zoom-in`}
                  role="button"
                  tabIndex={0}
                  onClick={() => openLightbox(src, title)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openLightbox(src, title)}
                >
                  {/* aspect: 4/3 for 1-slot, 8/3 for 2-slot */}
                  <div className={`relative w-full ${span === 2 ? 'pb-[33.333%]' : 'pb-[66.666%]'}`}>
                    <img
                      src={src}
                      alt={title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-3 right-3 p-2 rounded-full bg-white/20">
                      <Maximize2 className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white
                                    transform translate-y-6 group-hover:translate-y-0
                                    transition-transform duration-300">
                      <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
                      <p className="mt-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                        {desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-20 bg-gray-50 opacity-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-2xl font-bold tracking-tight mb-6 text-left uppercase">
              <span className="text-gray-800">WHY CHOOSE CABINETS</span>
              <span className="text-[#e9212e] font-medium"> TO BUILD YOUR MODULAR KITCHEN INTERIOR</span>
            </h2>
            <hr className="border-t border-dotted border-gray-300 mb-8" />
            <p className="mt-4 text-xl text-left text-gray-600 mb-6">
              Whenever it is about manufacturing a perfect Modular Kitchen Design, Cabinets is a dependable and smart
              option. We combine looks, benefit, and lasting strength to create inspiring kitchen interiors that are
              beneficial for the requirements you have in mind. Our team of qualified professionals are experts in
              making your design concept a reality through personalized plans that increase space, can guarantee smooth
              worker productivity, and improve the whole appearance of your house.
            </p>
            <p className="mt-4 text-xl text-left text-gray-600">
              What differentiates us is how dedicated we are to working with high-quality materials and advanced
              technologies in order to make sure that your Modular Kitchen Design will remain beneficial and trendy for
              years. Our focus on clients strategy and attention to detail, and timely delivery have helped us position
              ourselves as the industry leader.
            </p>
          </div>

          {/* Bottom gallery with lightbox */}
          <div
            ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
            className="mt-16 grid gap-8
                      grid-cols-1
                      sm:grid-cols-2
                      lg:grid-cols-3
                      xl:grid-cols-4"
          >
            {(() => {
              const files = [
                'milk-white-modular-kitchen-design.jpg',
                'chalk-white-modular-kitchen-design.jpg',
                'translucent-modular-kitchen-design.jpg',
                'classic-white-modular-kitchen-design.jpg',
                'creamy-almond-modular-kitchen-design.jpg',
                'beige-modular-kitchen-design.jpg',
                'pale-modular-kitchen-design.jpg',
                'creamy-pale-modular-kitchen-design.jpg',
                'Off-White-and-Black-modular-kitchen-design.jpg',
                'Brownish-Shiny-Modular-Kitchen-Design.jpg',
                'warm-lighting-creamish-modular-kitchen-design.jpg',
                'white-ambient-sleek-modular-kitchen-design.jpg',
                'sleek-white-modular-kitchen-design.jpg',
                'luminous-white-modular-kitchen-design.jpg',
                'parallel-white-modular-kitchen-design.jpg',
                'clean-white-modular-kitchen-design.jpg',
                'glossy-cream-color-modular-kitchen-design.jpg',
                'creamy-wooden-modular-kitchen-design.jpg',
                'wooden-island-modular-kitchen-design.jpg',
                'wooden-finish-modular-kitchen-design.jpg',
                'glossy-black-and-white-modular-kitchen-design.jpg',
                'grey-theme-modern-modular-kitchen-design.jpg',
                'white-strip-light-modular-kitchen-design.jpg',
                'black-and-white-modular-kitchen-design.jpg',
                'aesthetic-white-modular-kitchen-design.jpg',
                'grey-and-white-modular-kitchen-design.png',
                'Ambient-Off-White-Modular-Kitchen-Design.jpg',
                'U-Shaped-Luminous-Modular-Kitchen-Design.jpg',
                'small-cream-white-modular-kitchen-design.jpg',
                'glossy-grey-modular-kitchen-design.jpg',
                'Contrasting-Brown-Modular-Kitchen-Design.jpg',
                'dark-shade-modular-kitchen-design.jpg',
                'Strip-Lighting-Wooden-Modular-Kitchen-Design.png',
                'wooden-and-dark-grey-modular-kitchen-design.jpg',
                'small-elegant-modular-kitchen-design.jpg',
                'Off-Shade-Small-Modular-Kitchen-Design.jpg',
                'sunlight-welcoming-white-modular-kitchen-design.jpg',
                'spacious-white-modular-kitchen-design.jpg',
                'almond-color-modular-kitchen-design.jpg',
                'creamy-island-shaped-modular-kitchen-design.jpg',
                'Off-White-Shade-Modular-Kitchen-Design.png',
                'Off-White-and-Black-Sleek-Modular-Kitchen-Design.jpg',
                'u-shaped-grey-and-white-modular-kitchen-design.jpg',
                'creamy-white-modular-kitchen-design.jpg',
              ];

              const toLabel = (f: string) => {
                const base = f.replace(/\.(?:jpe?g|png)$/i, '').replace(/-/g, ' ');
                const main = base.replace(/modular kitchen design$/i, '').trim();
                const pretty =
                  main
                    .replace(/\bu shaped\b/gi, 'U Shaped')
                    .replace(/\boff white\b/gi, 'Off-White')
                    .replace(/\bgrey\b/gi, 'Grey')
                    .replace(/\b and \b/gi, ' and ')
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
                    className="overflow-hidden rounded-md shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-zoom-in"
                    role="button"
                    tabIndex={0}
                    onClick={() => openLightbox(src, alt)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openLightbox(src, alt)}
                  >
                    <div className="relative w-full pb-[75%] group">
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

          <div className="text-center mb-16 mt-16">
            <h2 className="text-4xl sm:text-2xl font-bold tracking-tight mb-6 text-left uppercase">
              <span className="text-gray-800">Modular Kitchen Design:</span>
              <span className="text-[#e9212e] font-medium"> A Myth Buster</span>
            </h2>
            <hr className="border-t border-dotted border-gray-300 mb-8" />
            <p className="mt-4 text-xl text-left text-gray-600 mb-6">
              Modular Kitchen Design is gaining popularity due to their ability to optimize limited spaces. They
              provide a practical solution for homeowners looking to make the most of their small kitchens. By
              incorporating modular elements and clever design techniques, Cabinets Kitchen Interiors offer efficient
              storage solutions, smart layouts, and aesthetically pleasing features.
            </p>
            <p className="mt-4 text-xl text-left text-gray-600">
              To make the most of a small Kitchen area, it is crucial to maximize every inch of available space. Start
              by decluttering and organizing your kitchen belongings. Maintain exactly what is absolutely necessary and
              get rid of anything more. To take advantage of vertical space, build cabinets or shelves on the wall to
              hold commonly used goods. Consider utilizing the space above the cabinets for extra storage. There are a
              lot more factors to think about, so let the experts handle this as you sit back and watch cabinets create
              a place that benefits your home's modular kitchen design.
            </p>
          </div>

          <div className="text-center mt-16">
            <h2 className="text-4xl sm:text-2xl font-bold tracking-tight mb-6 text-left uppercase">
              <span className="text-gray-800">FAQ's</span>
              <span className="text-[#e9212e] font-medium"> About Modular Kitchen Design</span>
            </h2>
            <hr className="border-t border-dotted border-gray-300" />
          </div>

          <FAQ />
        </div>
      </div>

      {/* Lightbox Overlay */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <figure
            className="relative max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute -top-3 -right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full h-auto rounded-xl shadow-2xl"
            />
            <figcaption className="mt-3 text-center text-white text-sm">{lightbox.alt}</figcaption>
          </figure>
        </div>
      )}
    </div>
  );
};

export default ModularKitchenDesign;