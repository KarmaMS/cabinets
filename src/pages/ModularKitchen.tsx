import React, { useEffect, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import FAQ from '../components/FAQ';

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
    window.addEventListener('scroll', handleScroll);
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
      {/* ─────────── Hero ─────────── */}
      <header className="relative h-[70vh] md:h-screen overflow-hidden">
        {/* background image */}
        <div
          ref={parallaxRef}
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: 'url("/modular-kitchen-hero.jpg")' }}
        />

        {/* dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/50" />

        {/* bottom-left heading */}
        <div className="relative z-10 h-full flex items-end">
          <div className="absolute bottom-8 left-12 md:left-20">
            <h1 className="font-bebas text-white text-2xl md:text-5xl leading-none">
              MODULAR&nbsp;KITCHEN
            </h1>
          </div>
        </div>
      </header>

      {/* ─────────── Intro copy (lines L5 - L7) ─────────── */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-20 bg-white opacity-0 animate-fadeIn"
      >
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* LEFT column ─ headline + body */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              <span className="text-gray-800">MODULAR </span>
              <span className="text-[#e9212e] font-medium">KITCHEN</span>
            </h2>

            <hr className="border-t border-dotted border-gray-300 mb-10" />

            <div className="space-y-8 leading-relaxed text-lg text-justify">
              <p>
                Nowadays kitchen furnishings that are built in parts or modules are
                commonly referred to as a modular kitchen. Pre-manufactured sections
                come in a range of materials, patterns, and finishes. Compared with
                regular kitchens, kitchens with modular design are simple to install,
                remove, and change according to the unique demands and limitations on
                space of the&nbsp;user.
              </p>

              <p>
                What makes a modular kitchen special is its potential to provide the
                best solutions for storing items. Pull-out drawers, corner units, and
                tall cabinets help maintain necessary goods, remove waste and make the
                finest use of every possible space. Modern cooking spaces are built
                with long-lasting materials like wood, steel and laminate, each easy
                to clean and maintain.
              </p>

              <p>
                For homeowners who value both functionality and design, modular
                kitchens are perfect because they can be personalised or updated as
                needs change. Whether you’re redesigning an existing kitchen or
                creating a brand-new one, a modular layout can boost your home’s value
                by marrying looks with everyday&nbsp;efficiency.
              </p>
            </div>
          </div>

          {/* RIGHT column — image */}
          <figure
            className="ml-auto relative group overflow-hidden rounded-lg shadow-md cursor-zoom-in"
            role="button"
            tabIndex={0}
            aria-label="View modular kitchen image"
            onClick={() =>
              openLightbox('/kitchen-intro.jpg', 'Modern modular kitchen in high-gloss red')
            }
            onKeyDown={(e) =>
              (e.key === 'Enter' || e.key === ' ') &&
              openLightbox('/kitchen-intro.jpg', 'Modern modular kitchen in high-gloss red')
            }
          >
            <img
              src="/kitchen-intro.jpg"
              alt="Modern modular kitchen in high-gloss red"
              className="block w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
              decoding="async"
            />
            {/* hover veil clipped by the rounded container */}
            <div className="pointer-events-none absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />
            {/* center icon */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <Maximize2 className="w-6 h-6 text-white drop-shadow" />
            </div>
          </figure>
        </div>
      </section>

      {/* ─────────── “What is a Modular Kitchen?” ─────────── */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-8 bg-white opacity-0 animate-fadeIn"
      >
        <div className="max-w-6xl mx-auto px-4">
          {/* two-tone heading */}
          <h2 className="text-4xl sm:text-2xl font-bold tracking-tight mb-6 text-left uppercase">
            <span className="text-gray-800">WHAT&nbsp;IS&nbsp;A&nbsp;</span>
            <span className="text-[#e9212e] font-medium">MODULAR&nbsp;KITCHEN?</span>
          </h2>

          <p className="max-w-4xl text-lg leading-relaxed mb-6">
            Nowadays kitchen furnishings that are built in parts or modules are commonly referred to
            as a modular kitchen. Pre-manufactured sections come in a range of materials, patterns,
            and finishes. Compared with regular kitchens, kitchens with modular design are simple to
            install, remove, and change according to the unique demands and limitations on space of
            the user.
          </p>
        </div>
      </section>

      {/* ─────────── DETAILS ─────────── */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-8 bg-grey opacity-0 animate-fadeIn"
      >
        {/* one shared container so every heading & list line up */}
        <div className="max-w-6xl mx-auto px-4 space-y-12 leading-relaxed text-left">
          {/* --- Key Features --- */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Key Features:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Customizable Design:</strong> Layouts that are customized to match different
                kitchen sizes.
              </li>
              <li>
                <strong>Efficient Space Utilization:</strong> Use smart shelves and cabinets for
                best storage.
              </li>
              <li>
                <strong>Ease of Installation:</strong> Quick assembly and disassembly.
              </li>
              <li>
                <strong>Aesthetic Appeal:</strong> Modern styles and finishes match a range of home
                design types.
              </li>
              <li>
                <strong>Durability:</strong> Designed with premium materials that have been designed
                to survive daily use. .
              </li>
            </ul>
          </div>

          {/* --- Components --- */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Components of a Modular Kitchen</h3>
            <p>
              A modular kitchen consists of various pre-designed units, each serving a specific
              purpose. Here are the main components:
            </p>

            <div className="space-y-4">
              <h4 className="font-bold">Cabinets:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>Base Cabinets:</strong> Give supporting worktops and basic storage.
                </li>
                <li>
                  <strong>Wall Cabinets:</strong> Mounted on walls to offer additional storage.
                </li>
                <li>
                  <strong>Tall Units:</strong> Perfect for pantry storage or housing appliances.
                </li>
              </ul>

              <h4 className="font-bold">Countertops:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Available in many quality materials like granite, quartz, marble, or laminate.
                </li>
                <li>Choose only durable, heat-resistant, and easy-to-maintain options.</li>
              </ul>

              <h4 className="font-bold">Drawers:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Made to provide simple access to kitchen supplies, dishes, and tools. </li>
              </ul>

              <h4 className="font-bold">Accessories:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Pull-out trays, rotating units, and drawer organizers improve functionality. </li>
              </ul>

              <h4 className="font-bold">Appliances:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Ovens, microwaves, and dishwashers are all simple to install into customized
                  kitchens.
                </li>
              </ul>
              <h4 className="font-bold">Sink Units:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Equipped with extra storage below and drainage boards. </li>
              </ul>

              <h4 className="font-bold">Backsplashes:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Add a finishing touch while shielding walls from spills. </li>
              </ul>
            </div>
          </div>

          {/* --- Advantages --- */}
          <div>
            <h3 className="text-2xl font-bold">Advantages of Modern Interiors</h3>
            <ol className="list-decimal list-inside space-y-1 mt-2">
              <li>
                <strong>Space Optimisation</strong>
              </li>
              The main objective of a modular kitchen is to take full advantage of how much space
              that is available. Even small kitchens can be effectively designed to provide both
              usefulness and storage.
              <li>
                <strong>Customisability</strong>
              </li>
              Whether you value modern design, extra space, or any specific structure, your kitchen
              design can be customized to meet your requirements.
              <li>
                <strong>Easy Maintenance</strong>
              </li>
              The modular design of these kitchens allows for the replacement or repair of different
              parts without affecting the overall layout.
              <li>
                <strong>Time-Saving Installation</strong>
              </li>
              When it comes to installation, readymade pieces are faster than standard kitchens.
              <li>
                <strong>Enhanced Functionality</strong>
              </li>
              Modular kitchen plans, smart gadgets, and well-organized storage make cleaning and
              cooking easier.
            </ol>
          </div>

          {/* --- Popular Layouts --- */}
          <div>
            <h3 className="text-2xl font-bold">Popular Trending Kitchen Layouts</h3>
            <ol className="list-decimal list-inside space-y-1 mt-2">
              <li>
                <strong>L-Shaped Kitchen </strong>
              </li>
              This arrangement makes effective use of two nearby walls and offers enough counter and
              storage space, making it perfect for small to medium-sized kitchens.
              <li>
                <strong>U-Shaped Kitchen </strong>
              </li>
              This arrangement, which increases counter space and storage with cabinets on three
              walls, works best in bigger areas.
              <li>
                <strong>Straight Kitchen</strong>
              </li>
              An open-plan home or small room would benefit greatly from a single-wall kitchen
              design.
              <li>
                <strong>Parallel Kitchen </strong>
              </li>
              This arrangement, which includes two parallel countertops, is perfect for optimizing
              workflow in small kitchens.
              <li>
                <strong>Island Kitchen </strong>
              </li>
              Combines multiple layouts with a central island to provide more storage and work area.
              It's great for hosting guests and open kitchens.
              <li>
                <strong>Peninsula Kitchen </strong>
              </li>
              Like an island kitchen, but larger because one side is attached to the main counter.
            </ol>
          </div>

          {/* --- Materials --- */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Materials Used in Modern Kitchens</h3>

            <h4 className="font-bold">Cabinet Substrates:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Plywood:</strong> Durable and resistant to moisture.
              </li>
              <li>
                <strong>MDF/Particle Board:</strong> Affordable but less durable than plywood.
              </li>
              <li>
                <strong>Marine Plywood</strong> Great for high-moisture areas.
              </li>
            </ul>

            <h4 className="font-bold pt-2">Countertops:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Granite:</strong> Durable, heat-resistant, and available in different colors.
              </li>
              <li>
                <strong>Quartz:</strong> Very easy to maintain and waterproof.
              </li>
              <li>
                <strong>Laminate:</strong> Cost-effective, however sensitive to heat damage and
                scratches.
              </li>
            </ul>

            <h4 className="font-bold pt-2">Finishes:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Acrylic:</strong> Glossy and modern.
              </li>
              <li>
                <strong>Laminate:</strong> Both glossy and matte textures are available.
              </li>
              <li>
                <strong>PU (Polyurethane)</strong> Durable and smooth finish.
              </li>
            </ul>
          </div>

          {/* --- Accessories & Tips --- */}
          <div>
            <h3 className="text-2xl font-bold">Modern Accessories</h3>
            <p className="mt-2">
              Think about adding these items to your modular kitchen to improve its functionality:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>
                <strong>Corner Solutions:</strong> Corner areas can be used thanks to rotating units
                and magic corners.
              </li>
              <li>
                <strong>Pull-Out Units:</strong> Excellent for keeping spices, jars, and bottles
                organized.
              </li>
              <li>
                <strong>Drawer Organizers:</strong> Maintain a clean and organized set of dishes and
                crockery.
              </li>
              <li>
                <strong>Chimneys and Ventilation Systems:</strong> Make sure there is no smoke or
                smells in the kitchen area.
              </li>
              <li>
                <strong>Waste Segregation Systems:</strong> Built-in bins for effective waste
                management.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold">Tips for Designing a Latest Kitchen</h3>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>
                <strong>Plan Your Layout:</strong> Select a design that works with the size and
                structure of your kitchen.
              </li>
              <li>
                <strong>Focus on Workflow:</strong> Follow the "work triangle" concept for comfort of
                use between the stove, sink, and refrigerator.
              </li>
              <li>
                <strong>Choose Quality Materials:</strong> Invest in durable and low-maintenance
                materials.
              </li>
              <li>
                <strong>Optimize Storage:</strong> To increase storage, use vertical space and smart
                accessories.
              </li>
              <li>
                <strong>Lighting Matters:</strong> Make sure there is enough natural and job lighting
              </li>
              <li>
                <strong>Consider Your Budget:</strong> Within your budget, find a balance between
                usefulness and beauty.
              </li>
            </ul>
          </div>

          {/* --- Maintenance --- */}
          <div>
            <h3 className="text-2xl font-bold">Maintaining Your Modern Kitchen</h3>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>
                <strong>Regular Cleaning:</strong> Every day, clean appliances and surfaces to avoid
                grease buildup and marks.
              </li>
              <li>
                <strong>Check for Repairs:</strong> Quickly fix any problems, such as loose doors or
                broken appliances.
              </li>
              <li>
                <strong>Appropriate Cleaners:</strong> Rough cleaners can harm finishes, so stay away
                from them.
              </li>
              <li>
                <strong>Organize Periodically:</strong> To keep drawers and cabinets organized,
                restructure them.
              </li>
            </ul>
          </div>

          {/* --- Costs --- */}
          <div>
            <h3 className="text-2xl font-bold">Costs of a Modular Kitchen</h3>
            <p className="mt-2">
              Size, materials, finishes, and accessories are some of the main factors which affect
              the price of a modular kitchen.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <strong>Factors which Affect the Cost:</strong>
              <li>
                <strong>Size of the Kitchen:</strong> The bigger kitchen will require more materials
                and accessories.
              </li>
              <li>
                <strong>Materials and Finishes:</strong> Good materials and finishes are costly.
              </li>
              <li>
                <strong>Appliances:</strong> Built-in or premium appliances may increase the cost.
              </li>
            </ul>
          </div>

          {/* --- Why Choose & CTA --- */}
          <div>
            <h3 className="text-2xl font-bold">
              WHY CHOOSE A&nbsp;<span className="text-[#e9212e]">MODULAR KITCHEN?</span>
            </h3>
            <p className="mt-2">
              Modern living can be most clearly seen by the modular kitchen. They provide a fusion of
              comfort, beauty, and usefulness perfect for modern lifestyles.
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>
                <strong>Space Management:</strong>Perfect for small-space city homes.
              </li>
              <li>
                <strong>Design Value:</strong>Improves your home's overall look.
              </li>
              <li>
                <strong>Value Addition:</strong>Simplifies cooking, cleaning, and maintenance.
              </li>
              <li>
                <strong>Convenience:</strong>Simplifies cooking, cleaning, and maintenance.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold">
              GET STARTED&nbsp;<span className="text-[#e9212e]">TODAY</span>
            </h3>
            <p className="mt-2">
              A modern way to improve your home's comfort, management, and how they look is with a
              modular kitchen. Functional cooking areas, as compared with traditional on-site
              kitchens, are already designed and manufactured in parts, which simplifies
              installation. They provide successful storage solutions which make sure everything has
              easy access, such as wall-mounted cabinets and racks for commonly used things. Make the
              best use of all the possibilities in your kitchen by adding additional space to the
              area behind cabinets. Convert your kitchen into a trendy and beneficial socializing
              area. Upgrade the look and feel of your kitchen with Cabinets by getting started now! .
            </p>
          </div>
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

      <FAQ />
    </div>
  );
};

export default ModularKitchen;