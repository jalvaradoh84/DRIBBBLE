import React from 'react';

const categories = [
  'All',
  'Web Design',
  'Mobile App',
  'UI/UX',
  'Branding',
  'Animation',
  'Illustration',
  'Print',
  '3D/AR/VR'
];

const Categories = ({ selected, setSelected }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelected(category)}
          className={`px-4 py-2 rounded-full whitespace-nowrap ${
            selected === category
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;
