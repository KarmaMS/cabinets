import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Ruler, Wrench, Shield } from 'lucide-react';

const About: React.FC = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  const WHATSAPP_URL =
    'https://wa.me/923224440070?text=Hi%20Cabinets%2C%20I%27d%20like%20a%20free%20quote.';

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
      sectionsRef.current.forEach((section) => {
        if (!section) return;
        const r = section.getBoundingClientRect();
        const visible = r.top < window.innerHeight * 0.75 && r.bottom >= 0;
        if (visible) section.classList.add('animate-fadeIn');
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="about" className="pt-20">
      {/* Hero with Parallax */}
      <div className="relative h-[70vh] md:h-screen overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            // swap this for your own hero if you like
            backgroundImage:
              'url("https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fadeIn">
              About Us
            </h1>
            <p className="text-lg md:text-2xl opacity-0 animate-fadeIn animation-delay-200">
              At <span className="font-semibold">Cabinets</span>, style meets functionality in perfect harmony.
            </p>
          </div>
        </div>
      </div>

      {/* Who We Are — uses your provided copy */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-16 bg-white opacity-0"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Who We Are
          </h2>
          <div className="space-y-5 text-gray-800 leading-relaxed text-lg">
            <p>
              We design more than simply modular kitchen design—we make works of art that improve the interior of your
              home. We believe at <strong>Cabinets</strong>, the kitchen should serve as a place where families come
              together to share delicious foods and make beautiful memories. Go check out our website and browse some
              innovative design concepts that professionally balance comfort, accessibility and luxury.
            </p>
            <p>
              We are a specialized company in the field of modular kitchen design that transforms simple spaces into
              fashionable and useful kitchen areas that fit your needs. We specialize in creating a latest kitchen
              design that adjusts storage, provides an effective workflow, and improves overall attractiveness, with a
              focus on user comfort and creative layouts. From modern to traditional styles, we provide flexible plans
              that effectively balance style and durability. We make sure every kitchen shows remarkable accuracy and
              high quality by using high-grade materials and modern technology. The attention we give to clients for the
              best experience inspires us to provide solutions that increase space use while also matching your unique
              tastes. Together, we can design a modular kitchen that elevates the heart of your home by combining
              quality, comfort, and beauty.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-10 bg-gray-50 opacity-0"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { k: '10+', v: 'Years Experience' },
              { k: '100+', v: 'Projects Completed' },
              { k: '100%', v: 'Client Satisfaction' },
              { k: '15+', v: 'Major Layout Styles' },
            ].map((s) => (
              <div key={s.v} className="p-6 bg-white rounded-lg shadow">
                <div className="text-3xl font-extrabold text-gray-900">{s.k}</div>
                <div className="mt-1 text-sm text-gray-600">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-16 bg-white opacity-0"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            What We Do
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                Icon: Ruler,
                title: 'Tailored to You',
                text:
                  'Made-to-measure planning that maximises space, storage and flow—perfectly fitted to your room.',
              },
              {
                Icon: Wrench,
                title: 'End-to-End Delivery',
                text:
                  'From concept to installation, our teams handle design, materials, finishes and precise fitting.',
              },
              {
                Icon: Shield,
                title: 'Built to Last',
                text:
                  'High-grade materials, reliable hardware and careful craftsmanship for everyday durability.',
              },
            ].map(({ Icon, title, text }) => (
              <div key={title} className="p-6 bg-gray-50 rounded-lg shadow">
                <Icon className="w-8 h-8 text-[#e9212e]" />
                <h3 className="mt-4 font-semibold text-lg">{title}</h3>
                <p className="mt-2 text-gray-700">{text}</p>
              </div>
            ))}
          </div>

          {/* Service list */}
          <ul className="mt-8 space-y-3 text-gray-800">
            {[
              'Layouts across Inline, Parallel, L-Shaped, U-Shaped, G-Shaped and Island kitchens',
              'Material options including laminates, acrylics, engineered stone, and stainless features',
              'Smart storage: tall units, corner solutions, drawer organisers and pull-outs',
              'Transparent pricing and timelines, with on-site supervision during installation',
            ].map((item) => (
              <li key={item} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#e9212e] mt-0.5 mr-2" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Our Process (brief) */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-16 bg-gray-50 opacity-0"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">How We Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Consult', text: 'We explore your needs, tastes and budget.' },
              { step: '2', title: 'Design', text: 'Diverse layouts and finishes tailored to your space.' },
              { step: '3', title: 'Build', text: 'Precision manufacturing with quality checks.' },
              { step: '4', title: 'Install', text: 'On-site fitting, handover and after-sales support.' },
            ].map(({ step, title, text }) => (
              <div key={step} className="relative p-6 bg-white rounded-lg shadow">
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-lg bg-[#e9212e] text-white flex items-center justify-center font-bold">
                  {step}
                </div>
                <h3 className="ml-6 text-lg font-semibold">{title}</h3>
                <p className="mt-2 ml-6 text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showroom / Address */}
      <section
        ref={(el) => el && sectionsRef.current.push(el as HTMLDivElement)}
        className="py-12 bg-white opacity-0"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Visit Our Showroom</h2>
              <p className="text-gray-700">
                3 W, CCA 2, Phase VIII, DHA, Lahore •{' '}
                <a href="tel:+923224440070" className="text-[#e9212e] underline">
                  +92 322 4440070
                </a>{' '}
                •{' '}
                <a href="mailto:sales@cabinets.com.pk" className="text-[#e9212e] underline">
                  sales@cabinets.com.pk
                </a>
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow flex items-center justify-center">
              <Package className="w-10 h-10 text-[#e9212e]" />
              <p className="ml-3 text-gray-700">Walk-ins welcome. Book a consult for priority service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bar */}
      <section className="py-12 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <h3 className="text-2xl font-bold">Ready to see our work or get a quick quote?</h3>
          <div className="flex items-center gap-3">
            <Link
              to="/testimonials"
              className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              View Testimonials
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition"
            >
              Get Free Quote
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;