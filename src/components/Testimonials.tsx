'use client';

import { motion as m } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
  adventure: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York, USA',
    rating: 5,
    text: 'The gorilla trekking experience in Uganda was absolutely life-changing. The guides were knowledgeable, the accommodations were perfect, and the connection with these magnificent creatures was indescribable. Maka-Laskas made every moment special.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    adventure: 'Gorilla Trekking Experience'
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'Toronto, Canada',
    rating: 5,
    text: 'Our Serengeti safari exceeded all expectations. Witnessing the migration was incredible, but what made it special was how Maka-Laskas connected us with local communities. This wasn\'t just a safari - it was a cultural immersion.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    adventure: 'Serengeti Migration Safari'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    location: 'Madrid, Spain',
    rating: 5,
    text: 'The Ubuntu philosophy really shines through in every aspect of the journey. From the warm welcome to the meaningful interactions with local people, this was travel that touched the soul. Highly recommend!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    adventure: 'Volcanoes Cultural Trek'
  },
  {
    id: 4,
    name: 'David Thompson',
    location: 'Melbourne, Australia',
    rating: 5,
    text: 'As a wildlife photographer, I\'ve been on many safaris, but the Maasai Mara experience with Maka-Laskas was exceptional. The guides\' knowledge of animal behavior and the ethical approach to tourism made all the difference.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    adventure: 'Maasai Mara Adventure'
  }
];

const Testimonials = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our <span className="text-gradient">Travelers Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real people who have experienced the transformative power 
            of our Ubuntu-inspired adventures across East Africa.
          </p>
        </m.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <m.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-orange-200">
                  <Quote className="w-8 h-8" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 mb-6 text-lg leading-relaxed">
                  "{testimonial.text}"
                </blockquote>

                {/* Adventure Type */}
                <div className="mb-6">
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    {testimonial.adventure}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </div>

        {/* Stats */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-orange-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 mb-2">5000+</div>
            <div className="text-gray-600">Happy Travelers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
            <div className="text-gray-600">Would Recommend</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 mb-2">16+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
        </m.div>

        {/* Call to Action */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold mb-4">
            Ready to Create Your Own Story?
          </h3>
          <button className="btn-primary text-lg px-8 py-4">
            Start Your Adventure
          </button>
        </m.div>
      </div>
    </section>
  );
};

export default Testimonials;
