import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1556911220-dabc1f02913a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="Kitchen craftsmanship"
              className="rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute -bottom-6 -right-6 bg-[#e9212e] p-8 rounded-lg shadow-lg hidden lg:block text-white">
              <p className="text-4xl font-bold">25+</p>
              <p className="text-white/90">Years of Excellence</p>
            </div>
          </div>

          <div className="mt-10 lg:mt-0">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Crafting Dreams Into Reality</h2>
            <p className="mt-4 text-lg text-gray-600">
              With over 25 years of experience, we've been transforming kitchens into beautiful, functional spaces that bring families together.
            </p>

            <div className="mt-8 space-y-4">
              {[
                'Premium Materials Only',
                'Expert Craftsmanship',
                'Lifetime Warranty',
                'Personalized Service'
              ].map((feature, index) => (
                <div key={index} className="flex items-center group">
                  <div className="flex-shrink-0 transform transition-transform duration-300 group-hover:scale-110">
                    <Check className="h-6 w-6 text-[#e9212e]" />
                  </div>
                  <span className="ml-3 text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <button
                onClick={() => navigate('/testimonials')}
                className="bg-[#e9212e] text-white px-8 py-3 rounded-full hover:bg-[#d11d29] transition-all duration-300 hover:-translate-y-1"
              >
                Learn More About Us
              </button>
            </div>
            </div>
          </div>
        </div>
    </section>
  );
}

export default About;