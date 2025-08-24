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

  /* jpg ⇄ png fallback */
  const swapExt = (p: string) =>
    p.toLowerCase().endsWith('.png') ? p.replace(/\.png$/i, '.jpg') : p.replace(/\.jpe?g$/i, '.png');

  return (
    <div className="pt-20">
      {/* Hero Section with Parallax */}
      <div className="relative h-screen overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/German/germanmainbanner.jpg")' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fadeIn">GERMAN KITCHEN</h1>
            <p className="text-xl md:text-2xl opacity-0 animate-fadeIn animation-delay-200">
              Cabinets German Kitchens tailored to your space, your budget, your routine.
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
          {/* LEFT column ─ headline + body */}
          <div className="max-w-xl">
            <h2 className="text-w-4xl sm:text-3xl font-extrabold tracking-tight mb-4">
              <span className="text-gray-800">GERMAN </span>
              <span className="text-[#e9212e] font-medium">MODULAR KITCHEN</span>
            </h2>

            <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

            <div className="space-y-8 leading-relaxed text-lg text-justify">
              <p>
                The amenities are all top-of-the-line advanced, genuine, and the leading technology is available, all
                wrapped up in the luxury and safety of traditional craftsmanship - it's a high-end German kitchen.
              </p>
              <p>
                It's easy to see why they're so popular with their long tradition of engineering, a long-standing
                history as well as functional design aesthetics, and the well-earned reputation for finishing within the
                timeframes promised. But is a kitchen built in Germany the best choice for you? Let's Find Out
              </p>
            </div>
          </div>

          <figure
            className="flex items-start md:items-center ml-auto relative group cursor-zoom-in"
            role="button"
            tabIndex={0}
            aria-label="View German kitchen image"
            onClick={() => openLightbox('/German/main.jpg', 'German Modular Kitchen')}
            onKeyDown={(e) =>
              (e.key === 'Enter' || e.key === ' ') && openLightbox('/German/main.jpg', 'German Modular Kitchen')
            }
          >
            <img
              src="/German/main.jpg"
              alt="German Modular Kitchen"
              className="w-full rounded-lg shadow-md"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement & { dataset: { err?: string } };
                if (el.dataset.err !== '1') {
                  el.dataset.err = '1';
                  el.src = swapExt('/German/main.jpg');
                }
              }}
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
                title: 'Oak Columns with Slate Island',
                description:
                  'Warm oak tall units with built-in ovens frame a matte-grey island with seating and open cubbies; deep blue backdrop and crisp task lighting complete the German look.',
                image: '/German/1.jpg',
              },
              {
                title: 'Graphite Showpiece Island',
                description:
                  'A monolithic dark island with display cubes at both ends stands before white wall panels and a central graphite tower, finished with sculptural pendant lights.',
                image: '/German/2.jpg',
              },
              {
                title: 'Soft Taupe Family Kitchen',
                description:
                  'Super-matte taupe cabinetry with a bench-height dining ledge and trio of lantern pendants; calm neutrals and seamless storage for everyday living.',
                image: '/German/3.jpg',
              },
              {
                title: 'Garden-View White Minimal',
                description:
                  'Handleless white runs and a black-topped island sit beside a picture window and textured brick wall; open shelving and warm lighting add comfort.',
                image: '/German/4.jpg',
              },
              {
                title: 'Charcoal with Oak Table Extension',
                description:
                  'Charcoal cabinet wraps form a peninsula with a chunky oak tabletop for casual dining; black pendants and oak tall panels bring rich contrast.',
                image: '/German/5.jpg',
              },
              {
                title: 'Brass and Slate Luxe',
                description:
                  'Slate-grey full-height wall with integrated appliances pairs with a brushed-brass island and ribbed feature backdrop for a refined, hotel-style finish.',
                image: '/German/6.jpg',
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
                <div className="aspect-w-16 aspect-h-12 relative">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
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
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <Maximize2 className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* caption — hidden until hover */}
                <figcaption className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                    <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {description}
                    </p>
                  </div>
                </figcaption>
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
        {/* one shared container so every heading & list line up */}
        <div className="max-w-7xl mx-auto px-4 leading-relaxed text-left">
          {/* --- Key Features --- */}
          <h2 className="text-w-4xl sm:text-2xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">ARE GERMAN KITCHENS</span>
            <span className="text-[#e9212e] font-medium"> WORTH IT?</span>
          </h2>
          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />
          <p>
            The quality of craftsmanship in a German kitchen design is nothing less than the top in performance,
            innovation, and style that can provide everything you want in a kitchen and much more. Kitchens manufactured
            from Germany have been gaining popularity over the years thanks to the latest technology, modern features,
            and durability and don't appear to be slowing down any time soon. They're the ideal choice for those who
            want an enduring and innovative space that offers a variety of functionality in terms of storage and
            functionality. German Kitchen designs are built on the principle of modular design. They're the best in
            terms of precision engineering and creating usable space; in addition to their unique designs, premium
            materials and amazing designs continue to add to their increasing popularity. They are always cutting-edge.
            German kitchens are like the finest wine. They do not follow trends, but they make it their own.
          </p>
        </div>
      </section>

      {/* ─────────── FEATURES ─────────── */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-8 bg-grey opacity-0 animate-fadeIn"
      >
        <div className="max-w-7xl mx-auto px-4 leading-relaxed text-left">
          <h2 className="text-w-4xl sm:text-2xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">WHAT MAKES GERMAN </span>
            <span className="text-[#e9212e] font-medium">KITCHENS SO POPULAR?</span>
          </h2>
          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />
          <p>
            German kitchen designs are characterized by various features and cabinets that offer you plenty of
            flexibility and choice in choosing the kitchen you want to have. There is no need to fret about the size or
            shape of your kitchen, as German cabinets for kitchens are built to maximize your space so that you can make
            the most of every inch of your kitchen. It doesn't matter if you'd like to hide your appliances or make an
            open-plan kitchen. Buying an appliance made in Germany can give you peace of mind over the long haul.
            German design of kitchens is all about creativity and fashion. The most stylish German kitchens are
            well-designed which can be integrated with architectural styles from all over the globe. This means that no
            matter what country you live in, there's a design that will fit your lifestyle and home. The interior design
            of a top German kitchen is as important as its exterior. It gives you the freedom to design the kitchen
            space you've always imagined with the high-end traditional German kitchen cabinetry and the multi magic
            kitchen's accessory system for the interior. Kitchens built in Germany are made to consider the space you
            live in and storage capacity - as, without any functionality, the kitchen is a different space.
          </p>
        </div>
      </section>

      {/* ─────────── FEATURES ─────────── */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-8 bg-grey opacity-0 animate-fadeIn"
      >
        <div className="max-w-7xl mx-auto px-4 leading-relaxed text-left">
          <h2 className="text-w-4xl sm:text-2xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">WHAT MAKES GERMAN </span>
            <span className="text-[#e9212e] font-medium">KITCHENS SO POPULAR?</span>
          </h2>
          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />
          <ul className="list-disc list-inside space-y-1">
            <li><strong> German Engineering</strong> </li>
            <p className="mt-4">
              German engineering has done everything from creating the first well-known modular kitchen that is ideal
              for smaller spaces to implementing energy-saving techniques like fitted cupboards. We are aware of how
              German engineering is a leader in other areas like cars. The same expertise and expertise are employed
              when designing the perfect kitchens. Omit efficiency and ergonomics German kitchens have proven their
              worth time and time. Simple skill to conceptualize a design, German engineering excels in this area.
            </p>
            <li><strong> Premium quality materials</strong> </li>
            <p>
              The materials employed in German kitchens are top-quality. The reason German kitchens have been so popular
              is that they last for a long time. The strength of kitchens comes from the use of high-quality materials.
              Kitchens that last a long time are reliable kitchens. Their German quality is not compromised. They have
              the best quality that other kitchens lack.
            </p>
            <li><strong> Functionality is Key</strong></li>
            <p>
              Beyond aesthetics, German kitchens are all about purpose. It's about how they can integrate into the
              minimalist lifestyle. Nowadays, the kitchen is not office space. It has become an important place for
              interactions and activities. It can be a place for family reunions or guests at a party. So, practical
              kitchens are essential, and the effective use of appliances is vital. German kitchens are renowned for
              functional design, making it their primary concern. This results in kitchens that are not attractive to
              the eyes but also efficient and small.
            </p>
            <li><strong> Design is in the Details</strong></li>
            <p>
              German kitchens are the ideal representation of contemporary kitchens. The use of clean lines, bright
              backgrounds, and effortless design gives them a modern kitchen appearance. Much attention is paid to small
              details to achieve this mix. The trend of removing handles is now a significant feature in German
              kitchens. This gives it an elegant look without any compromise on effectiveness. Ergonomics is always an
              essential feature of German kitchens.
            </p>
          </ul>
          <p className="mt-6">
            Making the most use of the space innovatively is a skill they've developed. We can provide you with the most
            effective solution for your kitchens as the most renowned German kitchen manufacturer in Delhi, Gurgaon,
            Noida, Chandigarh, and Jaipur. Contact us to inquire about pricing and other information.
          </p>
        </div>
      </section>

      {/* ─────────── KEEP IN MIND ─────────── */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-8 bg-grey opacity-0 animate-fadeIn"
      >
        <div className="max-w-7xl mx-auto px-4 leading-relaxed text-left">
          <h2 className="text-w-4xl sm:text-2xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">ESSENTIALS FOR DESIGNING </span>
            <span className="text-[#e9212e] font-medium">A GERMAN KITCHEN</span>
          </h2>
          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />
          <ul className="list-disc list-inside space-y-1 mt-6 mb-6">
            <li><strong>Budget: </strong> This is the most important feature of German Modular Kitchen. This allows you to select from a wide range of furniture materials.</li>
            <li><strong>German Kitchen Layout: </strong>You have the option to make your kitchen as personal or seek expert advice.</li>
            <li><strong>Material: </strong>Modular kitchens are available in a variety of materials including wood, granite, and marble. You can choose the material that suits your budget and needs best. </li>
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