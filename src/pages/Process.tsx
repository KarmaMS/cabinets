import React, { useEffect, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';

const BathroomVanity = () => {
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lightbox helpers
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

  // jpg ⇄ png fallback
  const swapExt = (p: string) =>
    p.toLowerCase().endsWith('.png') ? p.replace(/\.png$/i, '.jpg') : p.replace(/\.jpe?g$/i, '.png');

  return (
    <div className="pt-20">
      {/* Hero Section with Parallax */}
      <div className="relative h-screen overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/process.jpg")' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fadeIn">
              SERVICES AND PROCESS
            </h1>
            <p className="text-xl md:text-2xl opacity-0 animate-fadeIn animation-delay-200">
              Services and the process behind it by Cabinets
            </p>
          </div>
        </div>
      </div>

      {/* Panel Styles */}
      <div
        ref={(el) => el && sectionsRef.current.push(el)}
        className="py-20 bg-white opacity-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-4xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">KNOW THE </span>
            <span className="text-[#e9212e] font-medium">PROCESS</span>
          </h2>

          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

          <p className="mt-4 text-xl text-gray-500 text-center">
            Our designers and architects continuously keep track of the progress with a high degree of the utmost precision.
            They look at the architectural and customer's needs to turn the wardrobe and kitchen into a distinctive and feasible style.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                number: '1',
                title: 'MADE TO MEASURE',
                image: '/Process/1.jpg',
                description:
                  "Cabinets deals in precision to provide solutions that fit the various dimensions of spaces. Solutions are made to adapt to the kitchen areas' length, height, and width to provide excellent value. We remove existing gaps and corners to ensure that kitchen designs are arranged precisely to the required dimensions and shapes. In the end, every square inch of kitchen space is used to the fullest extent of understanding and is a potential source of value!",
              },
              {
                number: '2',
                title: 'PLANNING ',
                image: '/Process/2.jpg',
                description:
                  'A lot of thought is involved in creating an exceptional selection of kitchen designs to meet the varied demands of modern customers. Our designers thought about all aspects of design, from colors to shapes, layouts to dimensions. The planning phase is an ongoing process that involves both parties where customers inputs are taken into consideration and analyzed, then incorporated before being put into the form of precise kitchen concepts. It all begins with a blank piece of paper on which the designers begin writing down specific needs of the homeowners or clients. ',
              },
              {
                number: '3',
                title: 'DESIGNING',
                image: '/Process/3.jpg',
                description:
                  "The distinction begins at the design phase, when the style preferences of the client, as well as color and space goals, are outlined. Our goal is to make our design perfect according to the house's structures. This is where the creativeness of the designers is a factor. Designing is dedicated to providing a sense of quality, innovation, and practicality with kitchen solutions! Our kitchen designs are a true expression of the evolving demands and needs of the times to easily satisfy various requirements. ",
              },
              {
                number: '4',
                title: 'CUSTOM MADE',
                image: '/Process/4.jpg',
                description:
                  'A built-to-order kitchen is a requirement of modern times, as Cabinets fully understands it. In the first place, appointments are conducted to determine the preferences, tastes, aspirations, and above all, the precise requirements that the kitchen will need. After that, a group of designers work on the requirements and attempt to design a kitchen in line with the requirements. While paying attention to the dimension requirements, designers remain true to their style and spacing goals to enhance the value of the kitchens!',
              },
              {
                number: '5',
                title: 'INSTALLATION',
                image: '/Process/5.jpg',
                description:
                  'The installation of kitchen appliances is among the essential phases to follow after the client has decided on the layout, finish colors, shapes, etc. To install the kitchen, our professional team goes to the site to oversee all aspects of the installation process for installation. The most outstanding attention is paid to the arrangement of space at this phase, and a lot of effort is made to place the kitchen furniture you have chosen into the correct location! The task to be completed would begin and conclude under the options in hand. ',
              },
              {
                number: '6',
                title: '10 YEARS WARRANTY',
                image: '/Process/6.jpg',
                description:
                  'Cabinets believes in delivering customer satisfaction, not only top-class products and solutions. ',
              },
            ].map((feature) => (
              <div
                key={feature.number}
                className="group bg-gray-200/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6">
                  <h3
                    className="text-4xl font-bold mb-4
                               bg-gradient-to-r from-red-600 via-red-700 to-black
                               bg-clip-text text-transparent"
                  >
                    {feature.number}
                  </h3>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>

                  {/* image with hover pop + lightbox */}
                  <figure
                    className="relative aspect-w-16 aspect-h-12 mb-6 overflow-hidden rounded-md cursor-zoom-in"
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${feature.title}`}
                    onClick={() => openLightbox(feature.image, feature.title)}
                    onKeyDown={(e) =>
                      (e.key === 'Enter' || e.key === ' ') && openLightbox(feature.image, feature.title)
                    }
                  >
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement & { dataset: { err?: string } };
                        if (el.dataset.err !== '1') {
                          el.dataset.err = '1';
                          el.src = swapExt(feature.image);
                        }
                      }}
                    />
                    {/* hover veil + center icon */}
                    <div className="pointer-events-none absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <Maximize2 className="w-6 h-6 text-white" />
                    </div>
                  </figure>

                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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

export default BathroomVanity;