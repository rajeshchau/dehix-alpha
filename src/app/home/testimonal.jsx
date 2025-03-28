import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        'The freelancers on this platform are truly exceptional. They delivered high-quality work that exceeded my expectations.',
      author: 'John Doe',
      title: 'CEO, Dehix.',
    },
    {
      quote:
        "I've been using this freelancing platform for years, and it's been a game-changer for my business. Highly recommended!",
      author: 'Jane Smith',
      title: 'Founder, XYZ Company',
    },
  ];

  return (
    <div className="container text-center max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold mb-4">What Our Clients Say</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 p-5">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="rounded-lg bg-[#1a1a1a] p-6 text-left w-full"
          >
            <blockquote className="text-lg font-medium text-white">
              {testimonial.quote}
            </blockquote>
            <div className="mt-4">
              <p className="font-bold">{testimonial.author}</p>
              <p className="text-base text-white">{testimonial.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;