import { useState } from 'react';

type FaqItem = { q: JSX.Element; a: JSX.Element | string };

const faqs: FaqItem[] = [
  {
    q: <strong>Q1. What are the different finish options that can be achieved for modular kitchens?</strong>,
    a: (
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Laminate Finish:</strong> These are very durable and can be done in numerous colours and prints.</li>
        <li><strong>Acrylic Finish:</strong> It is glossy and reflective.</li>
        <li><strong>PU&nbsp;(Polyurethane) Finish:</strong> This yields a silky, glossy finish.</li>
        <li><strong>Membrane Finish:</strong> PVC membranes are pressed on MDF, providing a smooth finish.</li>
        <li><strong>Veneer Finish:</strong> Thin slices of natural wood give it an expensive look.</li>
      </ul>
    ),
  },
  {
    q: <strong>Q2. How can modular kitchens incorporate built-in appliances?</strong>,
    a:
      'A well-chosen dedicated space and features allow a modular kitchen to integrate built-in equipment such as ovens, microwaves, dishwashers and refrigerators so everything looks seamless and clutter-free.',
  },
  {
    q: <strong>Q3. What is the average lifetime of a modular kitchen?</strong>,
    a:
      'A modular kitchen, if well maintained, can be used for 10-15 years. The time span would depend on the quality of material and the care taken. ',
  },
  {
    q: <strong>Q4. Are Modular Kitchens Easy to Shift?</strong>,
    a:
      'Yes, flexibility is one of the benefits of a modular kitchen. The modules are best suited for people who move around a lot as they can be taken out and assembled elsewhere. ',
  },
  {
    q: <strong>Q5. How Modular Kitchens Enhance Comfort?</strong>,
    a:
      'The "work triangle" concept directs the designing of stove, sink and the refrigerator in a modular kitchen and hence this improves performance. In that design, the efficiency increases and unnecessary movement is also avoided. ',
  },
  {
    q: <strong>Q6. What are the prospects of using corner space in modular kitchens?</strong>,
    a:
      'L-shaped drawers, rotating units or magic corners can be installed in corner areas so that no place is wasted. ',
  },
  {
    q: <strong>Q7. How are safety features incorporated into modular kitchen spaces?</strong>,
    a:
      'A safe kitchen reduces accident-proneness because of inclusions such as non-slip materials, rounded countertop edges and soft-close drawers. ',
  },
  {
    q: <strong>Q8. What's the Role of Lighting in Modular Kitchen Design?</strong>,
    a:
      'Good lighting makes an environment and functionality better. Soft lighting generates moods, while task lighting brings brightness to work places. Under-cabinet lights commonly brighten countertops. ',
  },
  {
    q: <strong>Q9. Modular Kitchens Can Be Prepared Suitable for People with Disability?</strong>,
    a:
      'Modular kitchens can always be designed to ensure it is welcoming and user-friendly by customizing the design according to specific requirements. Some of these include pull-out shelves, accessible storage options, and adjustable heights of countertops. ',
  },
  {
    q: <strong>Q10. How Should Modular Kitchen Hardware Be Maintained?</strong>,
    a: (
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Cleaning:</strong>  Clean the knobs and handles to ensure that dirt does not get accumulated. </li>
        <li><strong>Lubrication:</strong> Oil moving components to ensure smooth functioning and to prevent jamming over time. </li>
        <li><strong>Tightening:</strong> To keep everything stable, check and tighten the screws and fittings. </li>
        <li><strong>Avoid Overloading:</strong> Limit the amount of shelves and drawers to avoid putting unnecessary stress on the hardware. </li>
      </ul>
    ),
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0); // first item open

  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-extrabold text-center mb-10">FAQ&#39;S</h2>

      <div className="space-y-3">
        {faqs.map((item, idx) => {
          const isOpen = open === idx;
          return (
            <div key={idx} className="rounded-md overflow-hidden">
              {/* toggle button */}
              <button
                onClick={() => setOpen(isOpen ? null : idx)}
                className={`w-full flex justify-between items-center text-left px-4 py-3 font-medium
                 ${isOpen ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
              >
                <span>{item.q}</span>
                <span className="text-xl font-bold">{isOpen ? '−' : '+'}</span>
              </button>

              {/* answer */}
              {isOpen && (
                <div className="bg-white px-6 py-4 border-l border-r border-b border-gray-200">
                  {typeof item.a === 'string' ? <p>{item.a}</p> : item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}