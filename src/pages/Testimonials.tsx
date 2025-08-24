import React, { useEffect, useRef } from 'react';

const Testimonials = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  // Short, appropriate labels for each video
  const videos = [
    { id: '9V64QMPzs30', label: 'Modern modular kitchen showcase' },
    { id: '9iin-mBOk1c', label: 'Premium finishes & storage tour' },
    { id: 'uVt2Byc18ZI', label: 'Installation highlights & workflow' },
    { id: 'TFkyd5L01HA', label: 'Manufacturing Walkthrough' },
  ];

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
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section with Parallax */}
      <div className="relative h-screen overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/test.jpg")' }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fadeIn">
              Testimonials
            </h1>
            <p className="text-xl md:text-2xl opacity-0 animate-fadeIn animation-delay-200">
              Videos showcasing Cabinets work
            </p>
          </div>
        </div>
      </div>

      {/* Videos */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-20 bg-white opacity-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-4xl font-extrabold tracking-tight mb-4">
            <span className="text-gray-800">WATCH OUR </span>
            <span className="text-[#e9212e] font-medium">SHOWCASE</span>
          </h2>

          <hr className="border-t-2 border-dotted border-gray-300 mb-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map(({ id, label }) => (
              <article
                key={id}
                className="group bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* 16:9 responsive */}
                <div className="relative w-full pt-[56.25%] bg-black">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${id}`}
                    title={label}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
