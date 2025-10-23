'use client';

import { motion as m } from 'framer-motion';
import { MapPin, Clock, Users, Star, ArrowRight } from 'lucide-react';

interface Adventure {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
  groupSize: string;
  price: string;
  rating: number;
  location: string;
  category: string;
}

const adventures: Adventure[] = [
  {
    id: 1,
    title: 'Gorilla Trekking Experience',
    description: 'Embark on a life-changing journey to encounter mountain gorillas in their natural habitat.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    duration: '3 Days',
    groupSize: 'Max 8',
    price: '$1,200',
    rating: 4.9,
    location: 'Bwindi, Uganda',
    category: 'Wildlife'
  },
  {
    id: 2,
    title: 'Serengeti Migration Safari',
    description: 'Witness the greatest wildlife spectacle on earth - the annual wildebeest migration.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    duration: '7 Days',
    groupSize: 'Max 12',
    price: '$2,800',
    rating: 4.8,
    location: 'Serengeti, Tanzania',
    category: 'Safari'
  },
  {
    id: 3,
    title: 'Volcanoes Cultural Trek',
    description: 'Explore the land of a thousand hills and connect with local communities.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    duration: '5 Days',
    groupSize: 'Max 10',
    price: '$1,500',
    rating: 4.7,
    location: 'Volcanoes NP, Rwanda',
    category: 'Culture'
  },
  {
    id: 4,
    title: 'Maasai Mara Adventure',
    description: 'Experience the iconic savannas and rich cultural heritage of the Maasai people.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    duration: '6 Days',
    groupSize: 'Max 10',
    price: '$2,200',
    rating: 4.9,
    location: 'Maasai Mara, Kenya',
    category: 'Safari'
  }
];

export default function FeaturedAdventures() {
  const adventures = [
    {
      id: 1,
      title: 'Gorilla Trekking Experience',
      description: 'Embark on a life-changing journey to encounter mountain gorillas in their natural habitat.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      location: 'Bwindi, Uganda',
      duration: '3 days',
      groupSize: '6 people',
      price: '$1,200',
      rating: 4.9,
      reviews: 127
    },
    {
      id: 2,
      title: 'Serengeti Migration Safari',
      description: 'Witness the greatest wildlife spectacle on Earth - the annual wildebeest migration.',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      location: 'Serengeti, Tanzania',
      duration: '7 days',
      groupSize: '8 people',
      price: '$2,800',
      rating: 4.8,
      reviews: 89
    },
    {
      id: 3,
      title: 'Volcanoes Cultural Trek',
      description: 'Explore the land of a thousand hills and immerse yourself in Rwandan culture.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      location: 'Volcanoes NP, Rwanda',
      duration: '5 days',
      groupSize: '6 people',
      price: '$1,500',
      rating: 4.7,
      reviews: 156
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Signature Adventures
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most transformative journeys that combine adventure, culture, and conservation across East Africa.
          </p>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adventures.map((adventure, index) => (
            <m.div
              key={adventure.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={adventure.image}
                  alt={adventure.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-semibold text-gray-900">{adventure.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {adventure.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {adventure.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{adventure.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{adventure.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{adventure.groupSize}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{adventure.price}</div>
                    <div className="text-sm text-gray-500">{adventure.reviews} reviews</div>
                  </div>
                  <button className="btn-primary">
                    View Details
                  </button>
                </div>
              </div>
            </m.div>
          ))}
        </div>
        
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="btn-secondary inline-flex items-center">
            View All Adventures
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </m.div>
      </div>
    </section>
  );
}
