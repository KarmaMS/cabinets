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
          style={{ backgroundImage: 'url("/G-Shaped/gshapedmainbanner.jpg")' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fadeIn">
              G-SHAPED KITCHEN
            </h1>
            <p className="text-xl md:text-2xl opacity-0 animate-fadeIn animation-delay-200">
              Cabinets G-Shaped Kitchens tailored to your space, your budget, your routine.
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
          {/* left column - headline + body */}
          <div className="max-w-xl">
            <h2 className="text-4xl sm:text-3xl font-extrabold tracking-tight mb-4">
              <span className="text-gray-800">G-SHAPED </span>
              <span className="text-[#e9212e] font-medium">MODULAR KITCHEN</span>
            </h2>

            <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

            <div className="space-y-8 leading-relaxed text-lg text-justify">
              <p>
                G-shaped kitchens are named after the four sides that look like the letter "G". There is usually a
                fourth dimension (the jut or peninsula), that adds additional countertop or dining space. These are
                often found in open-plan areas, but they can also be added to single-use spaces.
              </p>

              <p>
                G-shaped kitchens have their advantages, just like every other kitchen design. You might also find it
                useful to use a Modular kitchen design expert planner to help you design your space.
              </p>
            </div>
          </div>

          {/* right column — image */}
          <figure
            className="flex items-start md:items-center ml-auto relative group cursor-zoom-in"
            role="button"
            tabIndex={0}
            aria-label="View G-shaped kitchen image"
            onClick={() => openLightbox('/G-Shaped/main.jpg', 'G-Shaped Modular Kitchen')}
            onKeyDown={(e) =>
              (e.key === 'Enter' || e.key === ' ') && openLightbox('/G-Shaped/main.jpg', 'G-Shaped Modular Kitchen')
            }
          >
            <img
              src="/G-Shaped/main.jpg"
              alt="G-Shaped Modular Kitchen"
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
                title: 'Ivory G with Open Shelves',
                description:
                  'Soft ivory cabinetry with a light wood shelf run and pendant lighting; the G-shaped peninsula adds a handy breakfast perch and extra prep.',
                image: '/G-Shaped/1.jpg',
              },
              {
                title: 'Chocolate Wood G-Peninsula',
                description:
                  'Rich dark-wood fronts and a chunky white countertop create bold contrast; a deep G-peninsula anchors the cook zone and seating.',
                image: '/G-Shaped/2.jpg',
              },
              {
                title: 'Two-Tone Grey with Curved Bar',
                description:
                  'Dove and graphite grey cabinets wrap the room while a rounded breakfast peninsula completes the G for smooth circulation.',
                image: '/G-Shaped/3.jpg',
              },
              {
                title: 'Airy White G in Open Plan',
                description:
                  'Bright white perimeter with a grey seating peninsula forms a relaxed G-shape; timber floors and pendants keep it warm and welcoming.',
                image: '/G-Shaped/4.jpg',
              },
              {
                title: 'Warm Walnut G with Waterfall',
                description:
                  'Walnut cabinetry paired with a white waterfall counter; the attached peninsula turns a U into a functional G for serving and prep.',
                image: '/G-Shaped/5.jpg',
              },
              {
                title: 'Cozy Cream G with Snack Bar',
                description:
                  'Calm cream tones and a gently curved peninsula with stools deliver an inviting G-shaped layout under a bright skylight.',
                image: '/G-Shaped/6.jpg',
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
                <figcaption className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-semibold mb-2">{style.title}</h3>
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

      {/* ADVANTAGES */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-8 bg-gray-50 opacity-0 animate-fadeIn"
      >
        <div className="max-w-7xl mx-auto px-4 leading-relaxed text-left">
          <h2 className="text-4xl sm:text-2xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">ADVANTAGES OF </span>
            <span className="text-[#e9212e] font-medium">G-SHAPED KITCHEN DESIGNS</span>
          </h2>

          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />
          <p className="mb-5">
            You can get a clear idea of the advantage of a G-shaped kitchen when you are choosing your perfect kitchen
            layout.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              For those who want to maximize their floor plan, a G-shaped kitchen layout can be very beneficial. You can
              make the most of your space when entertaining and preparing meals with worktops on each side.
            </li>
            <li>
              You can also use the peninsula to make a great breakfast counter. When entertaining, you could invite your
              guests to the kitchen and have a glass of wine while they cook. You could also invite your children to
              help you with homework or prepare a dinner meal.
            </li>
            <li>
              You can also have extra storage with a G-shaped kitchen. There are many options for flexible use, whether
              you want to add accessories like a wine fridge or more cabinets.
            </li>
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
            <span className="text-gray-800">THINGS TO KEEP IN MIND WHILE CHOOSING YOUR </span>
            <span className="text-[#e9212e] font-medium">G-SHAPED KITCHEN DESIGN</span>
          </h2>

          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

          <p className="mb-6">
            It's essential to consider your style and aesthetic in addition to the G-shaped floor plan for your Kitchen.
            G-shaped kitchen designs are great for traditional and contemporary spaces.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'CONSIDERING',
                title2: ' YOUR LAYOUT',
                description:
                  "Once you've decided that a G-shaped space is suitable for you, it is time to start thinking about creating a kitchen that suits your needs and lifestyle. The work triangle promotes efficiency and flows within your space. It is best to place the essential appliances on the three main countertops, such as your cooker, fridge, and sink. Your peninsula section can be used for storage and dining. ",
              },
              {
                title: 'CHOOSING ',
                title2: 'KITCHEN UNITS',
                description:
                  'Simplicity is key when constructing your G-shaped kitchen layout. To avoid overwhelming your space, it is best not to place overhead cabinets in the peninsula section. To keep the space feeling less crowded, you can choose to have the top units in a different style or color. For a seamless look, you can choose top cabinets that match your wall color. ',
              },
              {
                title: 'PLANNING',
                title2: ' STORAGE',
                description:
                  "G-shaped kitchens offer greater storage space than other layouts. It is essential to plan your area well. Corner cabinets can be used to maximize the space in your Kitchen's corner sections. Tall cabinets are also an excellent option to store more oversized items, such as your vacuum cleaner or mops span. You can experiment with store design and find the right system for you. ",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-center mb-5">
                    <span className="text-gray-800">{feature.title}</span>
                    <span className="text-[#e9212e]">{feature.title2}</span>
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-8">
            {[
              {
                title: 'G SHAPED',
                title2: ' KITCHEN LIGHTING',
                description:
                  'Flexible G-shaped kitchen designs allow you to choose the lighting system that suits you best. You can opt for overhead spotlights to give your Kitchen a more minimalistic look. Kitchens are functional spaces that require lots of light. You may also want to install under cabinet lighting for easier cutting and reading. Accent lighting can also be added to open cabinets or shelving units to increase depth and interest. You have many options to be creative. Decorative pendant lights can bring personality to the peninsula. A G-shaped kitchen is an excellent choice if you intend to use the peninsula for entertaining or a breakfast bar. ',
              },
              {
                title: 'WHERE TO PUT',
                title2: ' APPLIANCES',
                description:
                  "Appliances are an integral part of every Kitchen. It's essential to consider their placement in the design phase. When placing your appliances, keep in mind the triangle of the Kitchen. It may be best not to place them on your peninsula. Place your most essential appliances on the main walls of your Kitchen. This will give you ample space for preparation and keep all your devices within reach.To make your Kitchen more efficient, you can place a washer and dryer in the peninsula section. This may not allow you to use the 'jut' as a breakfast bar.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-center mb-5">
                    <span className="text-gray-800">{feature.title}</span>
                    <span className="text-[#e9212e]">{feature.title2}</span>
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Choosing from Cabinets */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-8 bg-gray-50 opacity-0 animate-fadeIn"
      >
        <div className="max-w-7xl mx-auto px-4 leading-relaxed text-left">
          <h2 className="text-4xl sm:text-2xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">CHOOSING YOUR G SHAPED KITCHEN </span>
            <span className="text-[#e9212e] font-medium">FROM CABINETS</span>
          </h2>

          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

          <p className="mb-6">
            G-shaped kitchens can be used for storage, preparation, and entertaining, no matter how big or small your
            space. They can be used in any style, no matter what your preferences are. Our expert design team is ready
            to assist you in bringing your ideas to life.
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