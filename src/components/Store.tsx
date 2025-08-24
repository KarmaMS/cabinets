import React, { useEffect, useRef } from "react";
import {
  MapPin,
  Phone,
  Smartphone,
  Link2,
  Building2,
} from "lucide-react";

type Location = {
  label: string;          // e.g. `CORPORATE OFFICE: (Lahore)`
  address: string[];
  mobile?: string[];
  phone?: string[];
  mapSrc: string;         // Google Maps embed URL
  directionHref?: string; // "Our Location" link to Google Maps
};

const LOCATIONS: Location[] = [
  {
    label: "CORPORATE OFFICE: (LAHORE)",
    address: [
      "3-W CCA 2 Phase VIII,",
      "DHA, Lahore, 54800",
    ],
    mobile: ["+92 322 4440070"],

    // EMBED url:
    mapSrc:
      "https://www.google.com/maps?q=31.487214,74.4404591&hl=en&z=16&output=embed",

    // original place URL for the external link:
    directionHref:
      "https://www.google.com/maps/place/cabinets/@31.4868863,74.4385037,15.61z/data=!4m6!3m5!1s0x391908d4986f4893:0xd2e76c5d2d15600e!8m2!3d31.487214!4d74.4404591!16s%2Fg%2F11l6rrmdt7?hl=en-pk&entry=ttu&g_ep=EgoyMDI1MDgxMi4wIKXMDSoASAFQAw%3D%3D",
  },
];

const StoreLocator: React.FC = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }

      sectionsRef.current.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom >= 0;
        if (isVisible) section.classList.add("animate-fadeIn");
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pt-20">
      {/* ───────── Hero with Parallax ───────── */}
      <div className="relative h-[60vh] md:h-[75vh] overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/locater.jpg")' }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-[#e9212e] tracking-wide font-semibold mb-3">
              GET IN TOUCH
            </p>
            <h1 className="text-5xl md:text-6xl font-extrabold">Store Locator</h1>
          </div>
        </div>
      </div>

      {/* ───────── Locations ───────── */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-14 bg-white opacity-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {LOCATIONS.map((loc, i) => (
            <div
              key={i}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
            >
              {/* Left: Address card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Building2 className="w-6 h-6 text-[#e9212e]" />
                  <h2 className="text-3xl md:text-2xl font-extrabold">
                    {loc.label}
                  </h2>
                </div>

                <ul className="space-y-4 text-gray-700">
                  {/* Address */}
                  <li className="flex gap-3">
                    <MapPin className="w-5 h-5 text-black mt-1" />
                    <div>
                      <span className="font-semibold">Address :</span>{" "}
                      {loc.address.map((line, idx) => (
                        <span key={idx}>
                          {line}
                          {idx < loc.address.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>
                  </li>

                  {/* Mobiles */}
                  {loc.mobile && loc.mobile.length > 0 && (
                    <li className="flex gap-3">
                      <Smartphone className="w-5 h-5 text-black mt-0.5" />
                      <div>
                        <span className="font-semibold">Mob :</span>{" "}
                        {loc.mobile.join(", ")}
                      </div>
                    </li>
                  )}

                  {/* Directions link */}
                  {loc.directionHref && (
                    <li className="flex gap-3">
                      <Link2 className="w-5 h-5 text-[#e9212e] mt-0.5" />
                      <a
                        href={loc.directionHref}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#e9212e] font-semibold hover:underline"
                      >
                        Corporate Office : <span className="underline">Our Location</span>
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              {/* Right: Map card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-3">
                <div className="relative w-full h-[320px] md:h-[420px] rounded-xl overflow-hidden">
                    <iframe
                    src="https://www.google.com/maps?q=Cabinets%2C%2003-W%20CCA%20II%20Phase%208%2C%20DHA%20Lahore&z=17&hl=en&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={loc.label}
                    />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StoreLocator;