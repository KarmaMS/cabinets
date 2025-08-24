import React, { useEffect, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';

const ModularCloset = () => {
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

  const swapExtension = (path: string) =>
    path.toLowerCase().endsWith('.png') ? path.replace(/\.png$/i, '.jpg') : path.replace(/\.jpe?g$/i, '.png');

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: 'url("/walk-in-closet.jpg")' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fadeIn">WALK-IN CLOSET</h1>
            <p className="text-xl md:text-2xl opacity-0 animate-fadeIn animation-delay-200">
              Cabinets Walk-In Closets tailored to your space, your budget, your routine.
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
            <h2 className="text-w-2xl sm:text-4xl font-extrabold tracking-tight mb-4">
              <span className="text-gray-800">WALK-IN CLOSET </span> <br />
              <span className="text-[#e9212e] font-medium">WARDROBE DESIGN</span>
            </h2>

            <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

            <div className="space-y-8 leading-relaxed text-lg text-justify">
              <p>
                A Walk-In closet can be described as a large wardrobe or closet used primarily for clothing, footwear,
                and changing rooms. As the name implies, Walk-In closets are large enough to be able to walk into view
                the items. This is often a tiny room that has a wall-mounted shelf, cabinet, and drawers. These can be
                with or without doors, such as sliding doors. Walk-In closets don't often have doors in front shelves.
                This gives you a better view of your clothes and makes them easier to dust. More mirrors are usually
                included if the closet is large enough to allow for dressing and undressing in. A bench or chair is an
                excellent addition to the room. Sometimes a dressing table can be found in the Walk-In closet. This
                dual-use can help relieve congestion around other rooms, such as bathrooms. Check out the latest
                designs
              </p>
            </div>
          </div>

          {/* RIGHT column ─ image */}
          <figure
            className="ml-auto relative group overflow-hidden rounded-lg shadow-md cursor-zoom-in"
            role="button"
            tabIndex={0}
            aria-label="View walk-in closet image"
            onClick={() => openLightbox('/Walk-In/main.jpg', 'Walk-In Closet – Main')}
            onKeyDown={(e) =>
              (e.key === 'Enter' || e.key === ' ') &&
              openLightbox('/Walk-In/main.jpg', 'Walk-In Closet – Main')
            }
          >
            <img
              src="/Walk-In/main.jpg"
              alt="Modern walk-in closet with glass fronts and warm lighting"
              className="block w-full h-full object-cover"   // ← block kills baseline gap
              loading="lazy"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement & { dataset?: { err?: string } };
                if (el.dataset?.err !== '1') {
                  if (!el.dataset) el.dataset = {};
                  el.dataset.err = '1';
                  el.src = swapExtension(el.src);
                }
              }}
            />
            {/* hover veil */}
            <div className="pointer-events-none absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />
            {/* center icon */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <Maximize2 className="w-6 h-6 text-white drop-shadow" />
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
                title: 'Walnut Glow Walk-In',
                description:
                  'Floor-to-ceiling walnut shelving with pull-out drawers and warm LED strips; a bright end window keeps the dressing aisle light and airy.',
                image: '/Walk-In/1.jpg',
              },
              {
                title: 'Backlit Oak Showcase',
                description:
                  'Open oak hanging bays and glass shelves with integrated lighting, paired with a cozy lounge seat for a boutique-style try-on zone.',
                image: '/Walk-In/2.jpg',
              },
              {
                title: 'Luxury Curved Walk-In',
                description:
                  'Sweeping curved cabinetry in rich wood wraps the room; perimeter lighting and a central ottoman create a dramatic, high-end dressing suite.',
                image: '/Walk-In/3.jpg',
              },
              {
                title: 'Charcoal Walk-In with Island',
                description:
                  'Matte charcoal wardrobes with glass fronts and a center dresser island under soft cove lighting for organized, premium storage.',
                image: '/Walk-In/4.jpg',
              },
              {
                title: 'Bronze Glass Gallery',
                description:
                  'Floor-to-ceiling bronze glass doors reveal a central dresser and illuminated rails, giving a sleek, boutique showroom feel.',
                image: '/Walk-In/5.jpg',
              },
              {
                title: 'Garden View Glass Closet',
                description:
                  'Smoked-glass fronts and warm wood interiors with integrated lighting; sliding panels open to greenery for a calm, luxury dressing experience.',
                image: '/Walk-In/6.jpg',
              },
            ].map((style, idx) => (
              <figure
                key={idx}
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
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      if (el.dataset.err !== '1') {
                        el.dataset.err = '1';
                        el.src = swapExtension(style.image);
                      }
                    }}
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
            <span className="text-gray-800">ADVANTAGES OF A </span>
            <span className="text-[#e9212e] font-medium">WALK-IN CLOSET</span>
          </h2>

        <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

          <p>
            A walk-in closet has the advantage of storing most of your clothes in one place, which can help free up
            space in other rooms. However, a walk-in closet would require additional space. Walk-in closets are
            typically considered a luxurious feature that is only found in wealthy homes.
          </p>

          <ul className="list-disc list-inside space-y-1">
            <li> A walk-in closet doubles up as a dressing area for most people.</li>
            <li> Some people use ironing boards there, so you can iron, fold/hang and store your clothes - all in one place.</li>
            <li> Walk-in closets offer ample storage. Accessorize with shoes, jewellery, make-up, and clothes.</li>
            <li>
              A walk-in closet can help you get rid of clutter in your bedroom as well as the master bathroom. The
              cabinet can be used from start to finish so that the bedroom is free of clutter.
            </li>
            <li> A walk-in closet can help reduce the amount of work involved in cleaning up a bathroom.</li>
            <li> An adequate walk-in closet includes an island in its middle that can be used to organize or iron.</li>
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
            <span className="text-gray-800">THINGS TO BE CONSIDERED </span>
            <span className="text-[#e9212e] font-medium">WHILE CHOOSING WALK-IN CLOSET</span>
          </h2>

        <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

          <ul className="list-disc list-inside space-y-1 mt-6 mb-6">
            <li>
              <strong> The Size of Your Walk-in Closet </strong>
            </li>
            The space is an important consideration when planning a walk-in closet. You will need to consider how much
            space you can allocate for the cabinet if you have many clothes and want a large walk-in closet. A built-in
            wardrobe could be used in one corner of your bedroom if the walk-in closet takes up too much space in the
            main bedroom. Consider placing the closet in the bathroom if your bedroom is near the bathroom. This will
            allow for more activities to flow.
            <li>
              <strong> Things to be Stored </strong>
            </li>
            You should make a list of the items you plan to store in your walk-in closet. The list will help you plan
            the layout of your furniture. You will need a separate compartment to store your shoes if you plan on
            keeping them in the room. You could also attach drawers to the wardrobe to store socks, gloves, and other
            accessories.
            <li>
              <strong> The Layout of the Furniture </strong>
            </li>
            Other furniture, such as shelves and wardrobes, can be added depending on the size of your walk-in closet.
            You can add an ottoman, a dressing desk, or an island counter with a transparent drawer for accessories
            storage. You must arrange all the furniture, including the primary one, in a way that makes it easy to
            access them and allows you to dress up in the space. This is why an interior designer's role is so
            important. They will help you design a walk-in closet that works.
            <li>
              <strong> The Designs of the Furniture </strong>
            </li>
            Next, you need to decide on the design of your furniture. The cabinet design is the essential part of a
            walk-in closet. This can be done by your interior designer, who will need to decide whether the cabinet will
            open or close. You can also influence the cabinet's door appearance by choosing the material and what type
            of door it will be.
          </ul>
        </div>
      </section>

      {/* Decided */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-8 bg-grey opacity-0 animate-fadeIn"
      >
        <div className="max-w-7xl mx-auto px-4 leading-relaxed text-left">
          <h2 className="text-w-4xl sm:text-2xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">IF YOU HAVE DECIDED TO GET A WALK-IN CLOSET, </span>
            <span className="text-[#e9212e] font-medium">MAKE SURE YOU HAVE THE FOLLOWING:</span>
          </h2>

        <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

          <ul className="list-disc list-inside space-y-1 mt-6 mb-6">
            <li> The space is not being used for any other household project. The walk-in closet has ample lighting. </li>
            <li>
              The room has ventilation, so it doesn't feel cramped. It is hard to resist the temptation to use the
              walk-in closet floor for a laundry basket.
            </li>
            <li> Everything is well organized. Because there are enough things, it is easy to lose or get muddled in a walk-in closet. </li>
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