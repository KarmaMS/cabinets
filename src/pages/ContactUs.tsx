import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail, Phone, MapPin, Clock, Send, MessageCircle, Facebook, Instagram, Youtube, Linkedin,
} from 'lucide-react';

const MAP_PLACE_URL =
  'https://www.google.com/maps/place/cabinets/@31.4868863,74.4385037,15.61z/data=!4m6!3m5!1s0x391908d4986f4893:0xd2e76c5d2d15600e!8m2!3d31.487214!4d74.4404591!16s%2Fg%2F11l6rrmdt7?hl=en-pk&entry=ttu&g_ep=EgoyMDI1MDgxMi4wIKXMDSoASAFQAw%3D%3D';

const ContactUs: React.FC = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const WHATSAPP_URL_BASE = 'https://wa.me/923224440070';
  const EMAIL_TO = 'sales@cabinets.com.pk';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject || `New inquiry from ${form.name || 'Website Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`;
  };

  const handleSubmitWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi Cabinets, I'm ${form.name || 'a website visitor'}.\n` +
      (form.subject ? `Subject: ${form.subject}\n` : '') +
      (form.phone ? `Phone: ${form.phone}\n` : '') +
      (form.email ? `Email: ${form.email}\n` : '') +
      `\n${form.message || 'I would like to know more about your services.'}`
    );
    window.open(`${WHATSAPP_URL_BASE}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="contact-us" className="pt-20">
      {/* Hero with Parallax */}
      <div className="relative h-[60vh] md:h-[75vh] overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fadeIn">Contact Us</h1>
            <p className="text-lg md:text-2xl opacity-0 animate-fadeIn animation-delay-200">
              We’d love to help plan your next kitchen or wardrobe. Talk to <span className="font-semibold">Cabinets</span> today.
            </p>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <section
        ref={(el) => el && sectionsRef.current.push(el)}
        className="py-14 bg-white opacity-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                Icon: Phone,
                title: 'Call Us',
                value: '+92 322 4440070',
                href: 'tel:+923224440070',
              },
              {
                Icon: Mail,
                title: 'Email',
                value: 'sales@cabinets.com.pk',
                href: 'mailto:sales@cabinets.com.pk',
              },
              {
                Icon: MapPin,
                title: 'Showroom',
                value: '3 W, CCA 2, Phase VIII, DHA, Lahore',
                href: MAP_PLACE_URL, // open Maps place page
              },
              {
                Icon: Clock,
                title: 'Hours',
                value: 'Mon - Sat: 11am to 8pm',
                href: '#',
              },
            ].map(({ Icon, title, value, href }) => (
              <div key={title} className="p-6 rounded-lg bg-gray-50 shadow hover:shadow-md transition-shadow">
                <Icon className="w-7 h-7 text-[#e9212e]" />
                <div className="mt-3 text-sm text-gray-500">{title}</div>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block text-lg font-semibold text-gray-900 mt-1 hover:text-[#e9212e] transition-colors"
                >
                  {value}
                </a>
              </div>
            ))}
          </div>

          {/* Socials */}
          <div className="mt-8 flex items-center gap-4">
            {[
              { Icon: Facebook, href: 'https://www.facebook.com/cabinets.com.pk' },
              { Icon: Instagram, href: 'https://www.instagram.com/cabinetspk/' },
              { Icon: Youtube, href: 'https://www.youtube.com/@cabinetspk' },
              { Icon: Linkedin, href: 'https://linkedin.com' },
            ].map(({ Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-100 text-gray-800 flex items-center justify-center hover:bg-[#e9212e] hover:text-white transition-colors"
                aria-label="Social link"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form (map removed) */}
      <section
        ref={(el) => el && sectionsRef.current.push(el)}
        className="py-16 bg-gray-50 opacity-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Send Us a Message</h2>
            <p className="text-gray-600 mb-6">
              Fill out the form and we’ll get back to you within one business day.
            </p>

            <form onSubmit={handleSubmitEmail} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e9212e]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e9212e]"
                    placeholder="+92 ..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e9212e]"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Subject</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e9212e]"
                  placeholder="Tell us what you need"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e9212e]"
                  placeholder="Share a few details about your project…"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center bg-[#e9212e] text-white px-5 py-2.5 rounded-md hover:bg-[#d11d29] transition-colors"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </button>

                <button
                  type="button"
                  onClick={handleSubmitWhatsApp}
                  className="inline-flex items-center border border-gray-300 px-5 py-2.5 rounded-md hover:border-[#e9212e] hover:text-[#e9212e] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send via WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Bar */}
      <section className="py-12 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <h3 className="text-2xl font-bold">Prefer a quick chat? We’re one tap away.</h3>
          <div className="flex items-center gap-3">
            <a
              href={`${WHATSAPP_URL_BASE}?text=${encodeURIComponent(
                "Hi Cabinets, I'd like a free quote."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:opacity-90 transition inline-flex items-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat on WhatsApp
            </a>
            <Link
              to="/stores"
              className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition"
            >
              Visit Our Stores
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;