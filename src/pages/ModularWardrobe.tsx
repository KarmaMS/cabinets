import React, { useEffect, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';

const ModularWardrobe = () => {
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
    <div className="pt-20 mb-12">
      {/* Hero Section with Parallax */}
      <div className="relative h-screen overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/mainwardrobebanner.jpg")' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fadeIn">
              Modular Wardrobes
            </h1>
            <p className="text-xl md:text-2xl opacity-0 animate-fadeIn animation-delay-200">
              Custom storage solutions for your lifestyle
            </p>
          </div>
        </div>
      </div>

      {/* Wardrobe Types */}
      <div
        ref={(el) => el && sectionsRef.current.push(el)}
        className="py-20 bg-white opacity-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-4xl font-extrabold tracking-tight">
              <span className="text-gray-800">WARDROBE </span>
              <span className="text-[#e9212e] font-medium">DESIGNS</span>
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              Cabinets is the Fastest Growing Brand In <strong>Top Modular Wardrobe Brands.</strong> Modular wardrobes are a great home accessory that is quickly making its way into urban spaces. They are well-known for their unique designs, functionality, and elegant patterns, as well as a host of other remarkable features. These wardrobes are easy to customize. They can match your budget, colour preferences, and size.
            </p>
          </div>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {[
              // Openable-shutter wardrobes
              {
                file: 'openable-shutter1.jpg',
                title: 'OPENABLE SHUTTER WARDROBE',
                desc: 'Classic hinged doors with integrated LED niches for a premium boutique feel.',
              },
              {
                file: 'openable-shutter2.jpg',
                title: 'OPENABLE SHUTTER WARDROBE',
                desc: 'Full-height glass shutters showcase décor items while keeping dust away.',
              },
              {
                file: 'openable-shutter3.jpg',
                title: 'OPENABLE SHUTTER WARDROBE',
                desc: 'Crisp white panels with a warm wood band lend a contemporary contrast.',
              },

              // Sliding-door wardrobes
              {
                file: 'sliding-door1.jpg',
                title: 'SLIDING DOOR WARDROBE',
                desc: 'Glossy mocha sliders save floor space—perfect for compact bedrooms.',
              },
              {
                file: 'sliding-door2.jpg',
                title: 'SLIDING DOOR WARDROBE',
                desc: 'Two-tone lacquer doors glide silently on soft-close tracks.',
              },
              {
                file: 'sliding-door3.jpg',
                title: 'SLIDING DOOR WARDROBE',
                desc: 'Combination of open shelving and concealed rails for grab-and-go dressing.',
              },

              // Walk-in closets
              {
                file: 'walkin-closet1.jpg',
                title: 'WALK-IN CLOSET',
                desc: 'Island drawers, accent lighting and glass fronts create a luxe dressing room.',
              },
              {
                file: 'walkin-closet2.jpg',
                title: 'WALK-IN CLOSET',
                desc: 'Floor-to-ceiling shelving maximises vertical storage for large wardrobes.',
              },
              {
                file: 'walkin-closet3.jpg',
                title: 'WALK-IN CLOSET',
                desc: 'Dark oak finish with brass rails for a sophisticated, boutique-style space.',
              },
            ].map(({ file, title, desc }) => {
              const src = `/Wardrobe/${file}`;
              return (
                <figure
                  key={file}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition cursor-zoom-in"
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${title}`}
                  onClick={() => openLightbox(src, title)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openLightbox(src, title)}
                >
                  <div className="relative w-full pb-[66.666%]">
                    <img
                      src={src}
                      alt={title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <Maximize2 className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* hover overlay text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
                      <p className="mt-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                        {desc}
                      </p>
                    </div>
                  </div>
                </figure>
              );
            })}
          </div>
        </div>
      </div>

      {/* Importance */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight mb-4">
          <span className="text-gray-800">HOW IMPORTANT IS </span>
          <span className="text-[#e9212e] font-medium">DESIGNING YOUR WARDROBE?</span>
        </h2>
        <hr className="border-t-2 border-dotted border-gray-300 mb-6" />
        <div className="space-y-6 text-lg leading-relaxed text-gray-700">
          <p>
            There are many modular wardrobe options on the market. It's not enough to store your clothes inside; a
            well-designed unit can also elevate the entire bedroom. Below are the key reasons a thoughtfully planned
            wardrobe is an essential part of your home.
          </p>

          <ul className="space-y-4 list-disc pl-6 text-lg text-gray-700">
            <li>
              <strong className="mr-2">To Add More Space</strong>
              A modern wardrobe can combine a TV cabinet, bookshelf, drawers and hanging space in one built-in, saving
              precious square footage.
            </li>
            <li>
              <strong className="mr-2">For Custom-made Furniture</strong>
              Bespoke internals let you arrange shelves, rails and accessories exactly the way you dress, not the other
              way around.
            </li>
            <li>
              <strong className="mr-2">Enjoy More Comfort</strong>
              Clutter-free storage means easier access to outfits and a room that's simpler to maintain.
            </li>
            <li>
              <strong className="mr-2">Style & Elegance</strong>
              Sleek finishes and clever lighting turn a basic cupboard into a statement piece that transforms the look
              of your bedroom.
            </li>
          </ul>
        </div>

        {/* 2. POPULAR MODULAR WARDROBE DESIGNS */}
        <div className="mt-12">
          <h2 className="text-2xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">POPULAR </span>
            <span className="text-[#e9212e] font-medium">WARDROBE DESIGNS</span>
          </h2>
          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

          <div className="space-y-6 text-lg leading-relaxed text-gray-700">
            <ul className="space-y-4 list-disc pl-6 text-lg text-gray-700">
              <li>
                <strong className="mr-2">Walk-in Closet Wardrobe</strong>
                A dedicated dressing room with open shelving, drawers and an island bench for jewellery or handbags -
                the ultimate luxury.
              </li>
              <li>
                <strong className="mr-2">Sliding Door Wardrobe</strong>
                Doors glide on tracks, saving swing space - perfect for compact bedrooms. Mirrors or glass inserts can
                visually enlarge the room.
              </li>
              <li>
                <strong className="mr-2">Openable Shutter Wardrobe</strong>
                Classic hinged shutters open a full 180°, giving complete access to every corner. Available in endless
                colours, laminates and textured finishes.
              </li>
              <li>
                <strong className="mr-2">Italian Modular Wardrobe</strong>
                Slim profiles, push-to-open panels and lacquered surfaces deliver minimalist European flair in smaller
                footprints.
              </li>
              <li>
                <strong className="mr-2">German Modular Wardrobe</strong>
                Precision hardware and multiple finish combinations suit open-plan bedrooms or studio apartments.
              </li>
              <li>
                <strong className="mr-2">Luxury Modular Wardrobe</strong>
                LED-lit shelves, velvet-lined drawers and soft-close everything - crafted for premium homes that demand
                nothing less.
              </li>
            </ul>
          </div>
        </div>

        {/* 3. HOW TO CHOOSE THE RIGHT … */}
        <div className="mt-12">
          <h2 className="text-2xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">HOW TO CHOOSE THE RIGHT </span>
            <span className="text-[#e9212e] font-medium">MODULAR WARDROBE DESIGN?</span>
          </h2>
          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

          <ul className="space-y-4 list-disc pl-6 text-lg text-gray-700">
            <li>
              <strong>You only need what you use —</strong> avoid oversizing; a smaller, well-organised unit is cheaper
              and easier to clean.
            </li>
            <li>
              <strong>Remember ergonomics —</strong> keep frequently worn items at eye level so nobody has to crouch or
              climb for daily essentials.
            </li>
            <li>
              <strong>Select durable finishes —</strong> laminates and PU paint stand up to humidity and daily wear
              better than raw wood.
            </li>
          </ul>
        </div>

        {/* 4. HOW TO DESIGN A WARDROBE */}
        <div className="mt-12">
          <h2 className="text-2xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">HOW TO DESIGN A </span>
            <span className="text-[#e9212e] font-medium">WARDROBE</span>
          </h2>
          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

          <div className="space-y-6 text-lg leading-relaxed text-gray-700">
            <p>
              A perfect wardrobe should have adjustable shelves, pull-out hanging rods and push-pull handles that make
              access effortless.
            </p>

            <ul className="space-y-4 list-disc pl-6 text-lg text-gray-700">
              <li>
                <strong className="mr-2">Why Cabinets?</strong>
                We manufacture in-house with high-class machinery, offering custom sizes, colours and expert
                consultations at every stage.
              </li>
              <li>
                <strong className="mr-2">Affordable Pricing</strong>
                A wide range of styles under one roof, plus free design advice, mean you get the best solution without
                overshooting your budget.
              </li>
              <li>
                <strong className="mr-2">Cabinets Modular Wardrobe Services</strong>
                From identifying your needs to final installation and after-sales support, our designers handle the
                entire journey for you.
              </li>
            </ul>

            <p className="mb-8">
              Upgrade your old cupboard in minutes and experience the joy of a tidy, personalised space created by
              Cabinets.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">FAQ's </span>
            <span className="text-[#e9212e] font-medium">ABOUT MODULAR WARDROBE DESIGN</span>
          </h2>
          <hr className="border-t-2 border-dotted border-gray-300 mb-6" />

          <div className="space-y-6 text-lg leading-relaxed text-gray-700">
            <p>
              <strong>Question: How to choose the best modular wardrobe?</strong> <br />
              <strong>Answer :</strong> The price of modular wardrobe in Pakistan is increasing day by day because it is
              getting in trend rapidly with that it is best to manage space in small houses. The starting price can be a
              little bit high but the best thing about it is you can customize it according to your needs so if anything
              is getting over your budget then just deduct it and get all the specifications according to your need.
              This way you will be able to complete your needs within your budget. We are providing many options in
              wardrobe at a very low price and the best quality so just grab your customized wardrobe set today.
            </p>

            <p>
              <strong>Question : Which modular wardrobe design will be best for my house?</strong> <br />
              <strong>Answer :</strong> The best modular design depends on your home theme, design, and your wants when
              all these things get combined then a solution comes with a modular wardrobe design that will suit you for
              sure. Normally observing all these things and then choosing a wardrobe from such a wide range of wardrobe
              designs become quite complex and this makes you choose the wrong because generally, people do not have
              enough knowledge to buy one from such a wide range. To overcome this problem we’ve got a number of experts
              who are going to tell you which wardrobe is going to fit best for you because they have a lot of
              experience in this field so wait no more contact us now.
            </p>

            <p>
              <strong>Question : What is special in Italian modular wardrobe ?</strong> <br />
              <strong>Answer :</strong> A modular wardrobe is all about making a modern wardrobe. Italian modular
              wardrobe is the most sleek among all designs. It allows you to get more space smartly and gives you a
              clean look which makes it more attractive because the cleaner it looks the more modern it looks and
              attracts more. With this, the color combination in it gives it a plus point to make its eyes relaxing and
              calming. Italian look gives a kind of professional and luxurious both at the same time. If you want
              Italian modular wardrobe then contact us and get that look in your home as it is new for everyone so this
              look will make it unique between your college, friends, and relatives.
            </p>

            <p>
              <strong>Question : Why should you go for luxury modular wardrobe designs?</strong> <br />
              <strong>Answer :</strong> Because luxury modular wardrobe is available in less range of variety to most
              brands that is why very few people go towards it as they think it is quite expensive but it's not the
              whole truth because in today’s day the luxurious wardrobe comes in almost the same price as others so why
              to buy an average looking modular wardrobe when you can buy a luxurious one almost on the same price. The
              luxury look gives your home a royal theme and gives it a standard so that it will not look ordinary
              anymore. The luxury look works on every theme and it just spices up every theme of a home so do not
              hesitate to get your luxurious modular wardrobe from us—other brands increase the price a lot when you go
              for this one but we do not do this instead we have a small variation in the price range which is quite
              acceptable to all.
            </p>
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

export default ModularWardrobe;