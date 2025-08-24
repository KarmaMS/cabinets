import React from 'react';
import { Palette, Ruler, Clock, Award } from 'lucide-react';

const features = [
  {
    icon: <Palette className="w-8 h-8" />,
    title: 'Custom Design',
    description: 'Personalized kitchen designs that match your style and needs'
  },
  {
    icon: <Ruler className="w-8 h-8" />,
    title: 'Perfect Fit',
    description: 'Precise measurements and expert installation for flawless results'
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: 'Timely Delivery',
    description: 'Efficient project management and on-time completion'
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Quality Assured',
    description: 'Premium materials and craftsmanship guaranteed'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Why Choose Us</h2>
          <p className="mt-4 text-xl text-gray-600">Crafting your dream kitchen with precision and style</p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#e9212e] to-[#ff3b47] rounded-lg opacity-0 group-hover:opacity-10 transition duration-300 blur"></div>
              <div className="relative flex flex-col items-center">
                <div className="p-3 bg-white rounded-lg text-[#e9212e] group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-500 text-center">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;