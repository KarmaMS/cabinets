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
          style={{ backgroundImage: 'url("/Italian/italianmainbanner.jpg")' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fadeIn">
              ITALIAN KITCHEN
            </h1>
            <p className="text-xl md:text-2xl opacity-0 animate-fadeIn animation-delay-200">
              Cabinets Italian Kitchens tailored to your space, your budget, your routine.
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
            <h2 className="text-w-4xl sm:text-3xl font-extrabold tracking-tight mb-4">
              <span className="text-gray-800">ITALIAN </span>
              <span className="text-[#e9212e] font-medium">MODULAR KITCHEN</span>
            </h2>

            <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

            <div className="space-y-8 leading-relaxed text-lg text-justify">
              <p>
                For many of us, the kitchen is the heart and soul of the home. However, others spend very little time
                there. Whatever your routine, whatever your habits, the kitchen is the heart of your home. cabinets can
                customize Italian kitchen designs to meet your family's needs. It will provide comfort and ease while
                you cook, clean, or even eat in your home.
              </p>

              <p>
                There's a style for everyone, no matter what your preference is. You have the option of choosing from
                either traditional or modern designs. cabinets will help you design your perfect kitchen. You will find
                the right material, layout, or finishing for you.
              </p>
            </div>
          </div>

          {/* RIGHT column — image */}
          <figure
            className="flex items-start md:items-center ml-auto relative group cursor-zoom-in"
            role="button"
            tabIndex={0}
            aria-label="View Italian kitchen image"
            onClick={() => openLightbox('/Italian/main.jpg', 'Italian Modular Kitchen')}
            onKeyDown={(e) =>
              (e.key === 'Enter' || e.key === ' ') && openLightbox('/Italian/main.jpg', 'Italian Modular Kitchen')
            }
          >
            <img
              src="/Italian/main.jpg"
              alt="Italian Modular Kitchen"
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
                title: 'Sage Green Minimal',
                description:
                  'Matte sage wall units with light beige bases and a slim glass tall unit. Clean lines and soft tones for a calm Italian look.',
                image: '/Italian/1.jpg',
              },
              {
                title: 'Pure White Linear',
                description:
                  'Handleless white cabinetry with bold black accents and integrated appliances. A long run and peninsula keep the space airy.',
                image: '/Italian/2.jpg',
              },
              {
                title: 'Walnut and White Family Kitchen',
                description:
                  'Warm walnut grain paired with super matte white fronts and a matching dining module. Refined Italian styling with practical storage.',
                image: '/Italian/3.jpg',
              },
              {
                title: 'Taupe and Oak Composition',
                description:
                  'Oak column units flank a continuous taupe drawer run with open shelving. A quiet, architectural palette with precision detailing.',
                image: '/Italian/4.jpg',
              },
              {
                title: 'Nordic Grey Dining Island',
                description:
                  'Soft grey bases with a timber table extension under sculptural lighting. Made for social cooking in open plan living.',
                image: '/Italian/5.jpg',
              },
              {
                title: 'Mocha and Copper Loft',
                description:
                  'Deep espresso cabinetry, open shelves and a statement copper hood with chunky timber drawers. Warm and distinctly Italian.',
                image: '/Italian/6.jpg',
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
            <span className="text-[#e9212e] font-medium">ITALIAN KITCHEN DESIGNS</span>
          </h2>

          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

          <ul className="list-disc list-inside space-y-1">
            <li>
              Many people associate Italian kitchen design with rustic and old-world. However, this is not the only type
              of Italian kitchen. Italian kitchen design is not an exception. It has been well-known for its modern
              designs in recent years.
            </li>
            <li>
              Modern Italian kitchens are sleek and modern, featuring integrated appliances and a streamlined design.
              Modern Italian kitchens are extremely functional. They are the complete opposite of traditional Italian
              kitchens in terms of design.
            </li>
            <li>
              Italian design can be anything from rustic and traditional to modern and sleek. You can incorporate
              elements of Italian design in your home, no matter what style you choose.
            </li>
          </ul>
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
            <span className="text-[#e9212e] font-medium">ITALIAN KITCHEN</span>
          </h2>

          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong> Organized -</strong> A well-designed Italian kitchen design will provide easy access to all
              utensils with suitable storage. A vital component of any kitchen is the storage space. Italian kitchens
              use plenty of drawers to pull it out and storage units under the counter to store everything. It will be
              easy to prepare for guests by setting up the Kitchen in a well-organized manner.
            </li>
            <li>
              <strong> Stylish -</strong> The modular Kitchen's unique look and feel is a highlight. It's sleek and
              modern, yet elegant and simple. You have complete control over the Kitchen's appearance and feel thanks to
              the variety of finishes available, including engineered stone, metal, and laminate. The kitchen will look
              larger and brighter because of this.
            </li>
            <li>
              <strong> Functional -</strong> Many kitchen design principles make it easier to move around and work in
              the Kitchen. One such principle is the working triangle or golden triangle. This theory states that the
              main work areas for the kitchen fridge, stovetop, and sink should all be at the three apex points. It is
              possible to make the Kitchen more user-friendly by using designs that are easy to use.
            </li>
            <li>
              <strong> Easy to maintain -</strong> The modular Italian Kitchen's components are easily removed, making
              it easy to clean. Modular Kitchens are also made from resistant material rather than traditional wood.
              Modular Kitchens also have a lower maintenance cost.
            </li>
            <li>
              <strong> Easy Installation -</strong> It is easy to install modular kitchens because many of them are
              manufactured in factories. If you plan well, you won't have to depend on the replacement kitchen for more
              than a week.
            </li>
          </ul>
        </div>
      </section>

      {/* KEEP IN MIND */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-8 bg-grey opacity-0 animate-fadeIn"
      >
        <div className="max-w-7xl mx-auto px-4 leading-relaxed text-left">
          <h2 className="text-w-4xl sm:text-2xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">ESSENTIALS FOR DESIGNING </span>
            <span className="text-[#e9212e] font-medium">AN ITALIAN KITCHEN</span>
          </h2>

        <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

          <ul className="list-disc list-inside space-y-1 mt-6 mb-6">
            <li>
              <strong>Budget: </strong> This is the most important feature of Italian Modular Kitchen. This allows you
              to select from a wide range of furniture materials.
            </li>
            <li>
              <strong>Italian Kitchen Layout: </strong>You have the option to make your kitchen as personal or seek
              expert advice.
            </li>
            <li>
              <strong>Material: </strong>Modular kitchens are available in a variety of materials including wood,
              granite, and marble. You can choose the material that suits your budget and needs best.
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