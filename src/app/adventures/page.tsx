'use client';

import { useState, useEffect } from 'react';
import { MapPin, Clock, Users, Star, ArrowRight, Mountain, Heart, Globe, Leaf, Users as GroupIcon, Filter, Search } from 'lucide-react';
import Link from 'next/link';

export default function AdventuresPage() {
  const [adventures, setAdventures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchAdventures();
  }, [selectedCategory]);

  const fetchAdventures = async () => {
    setLoading(true);
    try {
      let url = '/api/adventures';
      if (selectedCategory) {
        url += `?category=${selectedCategory}`;
      }
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setAdventures(data.adventures || []);
      }
    } catch (error) {
      console.error('Error fetching adventures:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAdventures = adventures.filter(adv =>
    adv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    adv.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredAdventures = adventures.filter(adv => adv.isFeatured);

  // Pagination
  const totalPages = Math.ceil(filteredAdventures.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAdventures = filteredAdventures.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchTerm]);

  const adventureCategories = [
    {
      title: 'Signature Journeys',
      description: 'Our most transformative and carefully crafted adventures that combine multiple experiences.',
      icon: Star,
      count: '12 trips'
    },
    {
      title: 'Ubuntu Trails',
      description: 'Community-focused journeys that connect travelers with local people and cultures.',
      icon: Heart,
      count: '8 trips'
    },
    {
      title: 'Purposeful Safaris',
      description: 'Wildlife experiences that contribute to conservation and community development.',
      icon: Leaf,
      count: '15 trips'
    },
    {
      title: 'Village Immersions',
      description: 'Deep cultural experiences living and learning with local communities.',
      icon: GroupIcon,
      count: '6 trips'
    },
    {
      title: 'Founder-Led Healing Tours',
      description: 'Special journeys led by our founder for deep personal transformation.',
      icon: Heart,
      count: '4 trips'
    }
  ];

  const travelThemes = [
    {
      title: 'Nature & Wildlife',
      description: 'Explore the incredible biodiversity of East Africa\'s national parks and reserves.',
      icon: Leaf,
      color: 'bg-green-500'
    },
    {
      title: 'Community & Culture',
      description: 'Immerse yourself in local traditions, music, dance, and daily life.',
      icon: Heart,
      color: 'bg-red-500'
    },
    {
      title: 'Climate & Conservation',
      description: 'Learn about environmental challenges and participate in conservation efforts.',
      icon: Globe,
      color: 'bg-blue-500'
    },
    {
      title: 'Healing & Spiritual Travel',
      description: 'Journeys designed for personal growth, healing, and spiritual connection.',
      icon: Heart,
      color: 'bg-purple-500'
    },
    {
      title: 'Youth Travel Packages',
      description: 'Specially designed adventures for young travelers and families.',
      icon: GroupIcon,
      color: 'bg-yellow-500'
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 text-white">
        <img src="/img/our-adventures-background.jpg" alt="Adventures background" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container-custom h-full flex items-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Our Adventures
            </h1>
            <p className="text-xl max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Discover transformative journeys that heal, connect, and inspire across the diverse landscapes and cultures of East Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search adventures..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Adventures */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              All Adventures
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience our transformative journeys across East Africa
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredAdventures.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No adventures found. Check back soon!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedAdventures.map((adventure, index) => (
                  <Link
                    key={adventure.id}
                    href={`/adventures/${adventure.slug}`}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative">
                      {adventure.image ? (
                        <img
                          src={adventure.image}
                          alt={adventure.title}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                          <Mountain className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {adventure.category.name}
                        </span>
                      </div>
                      {adventure.isFeatured && (
                        <div className="absolute top-4 right-4">
                          <div className="bg-yellow-500 text-white px-2 py-1 rounded-full flex items-center text-xs font-semibold">
                            <Star className="w-3 h-3 mr-1 fill-white" />
                            Featured
                          </div>
                        </div>
                      )}
                      {adventure.rating > 0 && (
                        <div className="absolute bottom-4 right-4">
                          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            <span className="text-sm font-semibold text-gray-900">{adventure.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {adventure.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {adventure.shortDescription || adventure.description}
                      </p>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{adventure.destination?.name || adventure.country.name}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{adventure.duration} day{adventure.duration !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="w-4 h-4 mr-2" />
                          <span>Max {adventure.groupSize} people</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            {adventure.isOnSale && adventure.originalPrice && (
                              <span className="text-lg font-medium text-gray-400 line-through">
                                ${parseFloat(adventure.originalPrice).toFixed(0)}
                              </span>
                            )}
                            <div className="text-2xl font-bold text-orange-600">
                              ${parseFloat(adventure.price).toFixed(0)}
                            </div>
                          </div>
                          {adventure.reviewCount > 0 && (
                            <div className="text-sm text-gray-500">{adventure.reviewCount} review{adventure.reviewCount !== 1 ? 's' : ''}</div>
                          )}
                        </div>
                        <div className="btn-primary">
                          View Details
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-medium ${
                        currentPage === page
                          ? 'bg-orange-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Adventure Categories */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Adventure Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our carefully curated selection of adventure types, each designed to create meaningful connections and transformative experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adventureCategories.map((category, index) => (
              <div
                key={category.title}
                className="bg-gray-50 p-8 rounded-xl hover:bg-orange-50 transition-colors group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-200 transition-colors">
                  <category.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {category.description}
                </p>
                <div className="text-orange-600 font-semibold">
                  {category.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Themes */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Travel Themes
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore different aspects of East Africa through our themed travel experiences, each offering unique perspectives and opportunities for growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {travelThemes.map((theme, index) => (
              <div
                key={theme.title}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group-hover:border-orange-500 border-2 border-transparent">
                  <div className={`w-16 h-16 ${theme.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <theme.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                    {theme.title}
                  </h3>
                  <p className="text-gray-600">
                    {theme.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="container-custom text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Adventure?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join us on transformative journeys that will change the way you see the world and yourself.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center">
                Browse All Adventures
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold py-4 px-8 rounded-lg transition-all duration-300 inline-flex items-center">
                Contact Our Team
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
