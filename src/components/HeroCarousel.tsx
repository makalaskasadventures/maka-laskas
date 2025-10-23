'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, MapPin } from 'lucide-react';

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const destinations = [
    {
      id: 1,
      name: 'Bwindi Impenetrable Forest',
      country: 'Uganda',
      region: 'SOUTHWEST UGANDA',
      description: 'Experience the magic of mountain gorilla encounters in their natural habitat, combined with deep cultural immersion in local communities.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Gorilla Trekking'
    },
    {
      id: 2,
      name: 'Serengeti National Park',
      country: 'Tanzania',
      region: 'NORTHERN TANZANIA',
      description: 'Witness the greatest wildlife spectacle on Earth while supporting local Maasai communities and conservation efforts.',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Wildlife Safari'
    },
    {
      id: 3,
      name: 'Volcanoes National Park',
      country: 'Rwanda',
      region: 'NORTHERN RWANDA',
      description: 'Explore Rwanda\'s volcanic landscapes and immerse yourself in traditional village life and cultural experiences.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Volcano Trekking'
    },
    {
      id: 4,
      name: 'Maasai Mara Reserve',
      country: 'Kenya',
      region: 'SOUTHWEST KENYA',
      description: 'Discover the incredible biodiversity of Kenya\'s most famous wildlife reserve and connect with Maasai culture.',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Safari Adventure'
    },
    {
      id: 5,
      name: 'Lake Tanganyika',
      country: 'Burundi',
      region: 'WESTERN BURUNDI',
      description: 'Experience the beauty of Africa\'s deepest lake and learn about local fishing traditions and community life.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Lake Experience'
    },
    {
      id: 6,
      name: 'Virunga National Park',
      country: 'DRC',
      region: 'EASTERN DRC',
      description: 'Explore the diverse ecosystems of Africa\'s oldest national park, from rainforests to active volcanoes.',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Rainforest Adventure'
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === destinations.length - 1 ? 0 : prevIndex + 1
    );
  }, [destinations.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? destinations.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentDestination = destinations[currentIndex];

  return (
    <section className="relative h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentDestination.image}
          alt={currentDestination.name}
          className="w-full h-full object-cover opacity-40 transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container-custom h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
          {/* Left Side - Hero Content */}
          <div className="text-white animate-fade-in-left">
            <div className="mb-6">
              <div className="w-16 h-1 bg-orange-500 mb-4"></div>
              <p className="text-lg text-orange-300 font-medium mb-2">
                {currentDestination.country}
              </p>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {currentDestination.name}
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                {currentDestination.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <button className="w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg">
                <MapPin className="w-5 h-5 text-white" />
              </button>
              <button className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-gray-900 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                DISCOVER LOCATION
              </button>
            </div>
          </div>

          {/* Right Side - Destination Cards Carousel */}
          <div className="relative animate-fade-in-right">
            {/* Main Active Card */}
            <div className="relative mb-8">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={currentDestination.image}
                  alt={currentDestination.name}
                  className="w-full h-80 object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg">
                    <Play className="w-8 h-8 text-gray-900 ml-1" />
                  </button>
                </div>

                {/* Card Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-sm text-orange-300 mb-1">
                    {currentDestination.category}
                  </p>
                  <h3 className="text-xl font-bold mb-1">
                    {currentDestination.name}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {currentDestination.region}
                  </p>
                </div>
              </div>
            </div>

            {/* Smaller Destination Cards */}
            <div className="relative">
              <div className="flex space-x-4 overflow-hidden">
                {destinations.map((destination, index) => (
                  <div
                    key={destination.id}
                    className={`flex-shrink-0 w-48 h-32 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 transform ${
                      index === currentIndex 
                        ? 'scale-110 ring-2 ring-orange-500' 
                        : 'scale-100 hover:scale-105'
                    }`}
                    onClick={() => goToSlide(index)}
                  >
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <p className="text-xs text-orange-300 mb-1">
                        {destination.country}
                      </p>
                      <p className="text-sm font-semibold truncate">
                        {destination.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className="flex justify-center mt-6 space-x-4">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="flex justify-center mt-4">
                <div className="flex space-x-2">
                  {destinations.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'bg-orange-500 scale-125' 
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Slide Counter */}
              <div className="absolute bottom-0 right-0 text-white text-sm font-medium">
                {(currentIndex + 1).toString().padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-play Toggle */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-8 right-8 z-20 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-300 backdrop-blur-sm"
      >
        {isAutoPlaying ? 'Pause' : 'Play'} Auto-play
      </button>
    </section>
  );
}
