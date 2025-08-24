import React, { useEffect, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';

const ModularKitchen = () => {
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
          style={{ backgroundImage: 'url("/L-Shaped/lshapedmainbanner.jpg")' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fadeIn">
              L-SHAPED KITCHEN
            </h1>
            <p className="text-xl md:text-2xl opacity-0 animate-fadeIn animation-delay-200">
              Cabinets L-Shaped Kitchens tailored to your space, your budget, your routine.
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
              <span className="text-gray-800">L-SHAPED </span>
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

          {/* RIGHT column — image*/}
          <figure
            className="flex items-start md:items-center ml-auto relative group cursor-zoom-in"
            role="button"
            tabIndex={0}
            aria-label="View L-shaped kitchen image"
            onClick={() => openLightbox('/L-Shaped/l-shaped-kitchen0.jpg', 'L-Shaped Modular Kitchen')}
            onKeyDown={(e) =>
              (e.key === 'Enter' || e.key === ' ') &&
              openLightbox('/L-Shaped/l-shaped-kitchen0.jpg', 'L-Shaped Modular Kitchen')
            }
          >
            <img
              src="/L-Shaped/l-shaped-kitchen0.jpg"
              alt="L-Shaped Modular Kitchen"
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
                title: 'Sunny Yellow Corner',
                description:
                  'Cheerful sunshine-yellow base cabinets contrasted by crisp white uppers; a compact L-layout that maximises every inch of corner storage.',
                image: '/L-Shaped/1.jpg',
              },
              {
                title: 'Graphite Gourmet Nook',
                description:
                  'High-gloss charcoal cabinetry, stainless accents and a full-height pantry create a professional, monochrome cooking zone in an L-shape.',
                image: '/L-Shaped/2.jpg',
              },
              {
                title: 'Aqua Breeze Kitchen',
                description:
                  'Refreshing aqua-blue doors with white walls keep the space bright while the L-configuration delivers an efficient work-triangle.',
                image: '/L-Shaped/3.jpg',
              },
              {
                title: 'Scandi White & Oak',
                description:
                  'Matte-white fronts meet warm oak open shelving and under-shelf lighting; the peninsula leg of the L adds casual dining or prep space.',
                image: '/L-Shaped/4.jpg',
              },
              {
                title: 'Rustic Earthy Retreat',
                description:
                  'Textured wood-grain cabinets and sage accents wrap around twin windows, flooding the L-shaped counter with natural light.',
                image: '/L-Shaped/5.jpg',
              },
              {
                title: 'Blush-Pink Contemporary',
                description:
                  'Playful blush-pink base units paired with sleek white uppers; clean lines and integrated appliances give a modern spin to a small L-kitchen.',
                image: '/L-Shaped/6.jpg',
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
            <span className="text-[#e9212e] font-medium">L-SHAPED KITCHEN DESIGNS</span>
          </h2>
          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />
          <ul className="list-disc list-inside space-y-1">
            <li>The L Shape Kitchen designs have unique features that allow you to fully enjoy the process of cooking.</li>
            <li>
              These cabinets are available in L shape kitchen designs and feature sliding and pocket doors. They increase
              storage space and reduce visible clutter.
            </li>
          </ul>
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
            <span className="text-[#e9212e] font-medium">L-SHAPED KITCHEN</span>
          </h2>
          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />
          <ul className="list-disc list-inside space-y-1">
            <li>These kitchens are classy and sleek. It will give you a marvellous experience of cooking.</li>
            <li>
              An L shape kitchen designs allows for space management. This means that you have plenty of storage space
              without clutter and a little bit of space.
            </li>
            <li>Modular kitchens can be used in a practical way if they are well-used.</li>
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
            <span className="text-[#e9212e] font-medium">THE L-SHAPED KITCHEN DESIGNS?</span>
          </h2>
          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />
          <p className="mb-6">
            Ideal for homes that have a lot of space in the Kitchen, the L shape Kitchen designs works well. It is not a
            job that you can do every day.
          </p>
          <h3 className="text-4xl sm:text-xl font-bold tracking-tight mb-4">
            <span className="text-gray-800">
              <strong>Essentials for designing an L-Shaped Kitchen</strong>
            </span>
          </h3>
          <ul className="list-disc list-inside space-y-1 mt-6 mb-6">
            <li>
              <strong>Budget: </strong>This is the most important factor in L Shaped Kitchen designs. There are many
              options for furniture materials.
            </li>
            <li>
              <strong>L-Shaped Kitchen Layout: </strong>It is important to plan your L shape Kitchen designs. It is up
              to you to decide or ask for the expert help.
            </li>
            <li>
              <strong>Material: </strong>Modular kitchens are available in a wide range of materials including wood,
              granite, and marble. You can choose the material that best suits your budget and needs
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