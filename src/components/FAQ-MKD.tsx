import { useState } from 'react';

type FaqItem = { q: JSX.Element; a: JSX.Element | string };

const faqs: FaqItem[] = [
  {
    q: <strong>Q1. How an Old Kitchen Can Be Redesigned as a New Modular Kitchen?</strong>,
    a:
      'Simple adjustments like adding a stable sink, installing a chimney if your kitchen doesn’t already have one, picking a set of colors, installing wall‑mounted cabinets, adding drawers, and other similar upgrades can take your old kitchen to a higher level. This feels like a lot of work, so get in touch with us to get all the amazing designs in one place.',
  },
  {
    q: <strong>Q2. Modular Kitchen Design Price in Pakistan?</strong>,
    a:
      'Each kitchen has a different price because it depends on what the customer wants. The cost will definitely go down if the customer is interested in remodeling only a small part of their kitchen, but it will go up if their kitchen is large and they need it to be up to date. Prices for kitchens are also different from company to company, even though we provide the best quality at a more affordable price. Stop waiting any longer and make your order for your customized modular kitchen design.',
  },
  {
    q: <strong>Q3. Everything You Should Know Before Installing a Modular Kitchen Design?</strong>,
    a:
      'Installing a modular kitchen design can be demanding of labor to set up since it requires a lot of skill, understanding, and experience. You should know that anything can be put in place no matter whether it already exists in your house or not. This does indeed make things a bit more complex than we may think but not to worry as we would make everything for you, free to call and inquire if you have some of what you want, skilled qualified professionals can let you know what is the best option for your needs and home.',
  },
  {
    q: <strong>Q4. Is a Modern Kitchen Interior Durable or Not?</strong>,
    a:
      'It is definitely strong, but how long it lasts depends on the material you choose. If you choose strange materials, it will lose its durability very fast. Premium plywood and MDF make up the basic grade material, which is resistant to termites and bug problems and will not warp or bend when heated by boiling water. If the material in your kitchen has these qualities, it should last a very long period. Just maintain it clean on a regular basis. Since the material has a great impact on it, you must reach us because we only provide our customers with products of the highest quality and do not sell any lower‑quality products. Therefore, don’t be afraid of trying what is necessary and put durability into your mind.',
  },
  {
    q: <strong>Q5. How to Increase Kitchen Storage with Modular Kitchen Design?</strong>,
    a:
      'It is the right choice to create a kitchen interior with more space and an attractive modular kitchen design.',
  },
  {
    q: <strong>Q6. How to Brighten Up the Kitchen Interior Which Has No Sunlight Access?</strong>,
    a:
      'There is a simple and modern solution for this common kitchen challenge. Modern lamps and ceiling lights that match your kitchen’s theme and style can be added, as well as a few shining items that will offer extra brightness, liven up the space, and create a mood without being overpowering. Take your time to decide if you are interested in checking off all of these things from your wish list and get some more; we have the best lighting and other alternatives for your modular kitchen design.',
  },
  {
    q: <strong>Q7. It's Possible to Install a Modular Kitchen in a Small Space?</strong>,
    a:
      'Yes! Modular structures of kitchens are highly flexible and can be made to work with even the smallest areas, maintaining very smooth functioning and great storage space.',
  },
  {
    q: <strong>Q8. How Do I Maintain a Modular Kitchen?</strong>,
    a: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Clean surfaces regularly with a mild cleaner.</li>
        <li>Avoid harsh chemicals that can damage finishes.</li>
        <li>Inspect fittings and hinges periodically.</li>
        <li>Repair scratches or dents on cabinet surfaces.</li>
        <li>Keep countertops free of mess to maintain the look.</li>
      </ul>
    ),
  },
  {
    q: <strong>Q9. How Long Does It Take for Installation of a Modular Kitchen?</strong>,
    a:
      'It all depends on the size, features and the benefits of the layout; after installation, installation usually takes two to three weeks.',
  },
  {
    q: <strong>Q10. How can I Select the Most Suitable Modular Kitchen Design for my Home?</strong>,
    a: (
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Measure your space:</strong> Understand your kitchen layout.</li>
        <li><strong>Set a budget:</strong> Decide on a price range.</li>
        <li><strong>Prioritize functionality:</strong> Focus on storage and workflow.</li>
        <li><strong>Consult professionals:</strong> Seek expert guidance.</li>
        <li><strong>Select quality materials:</strong> Opt for durable and easy-to-maintain options.</li>
      </ul>
    ),
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0); // first item open

  return (
    <section
      className="max-w-6xl mx-auto px-4 pt-8 pb-14 text-left"
    >
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
                <span className="text-xl font-bold">{isOpen ? '-' : '+'}</span>
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