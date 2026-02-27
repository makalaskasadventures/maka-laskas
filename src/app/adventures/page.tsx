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

  // Ways to travel (Ubuntu-inspired styles)
  const waysToTravel = [
    {
      title: 'Ubuntu Signature Journeys',
      description: 'Curated journeys that weave together story, culture, and conservation under the Ubuntu philosophy.',
      icon: Star,
      count: 'Signature collection'
    },
    {
      title: 'Ubuntu Nature & Wildlife Safaris',
      description: 'Immersive safaris that respect wildlife and restore ecosystems across iconic landscapes.',
      icon: Leaf,
      count: 'Wildlife routes'
    },
    {
      title: 'Ubuntu Culture & Heritage Tours',
      description: 'Deep dives into living heritage, ancestral stories, and community arts across regions.',
      icon: Heart,
      count: 'Heritage paths'
    },
    {
      title: 'Private Ubuntu Escapes',
      description: 'Tailored journeys for couples, families, or friends seeking privacy, depth, and reflection.',
      icon: GroupIcon,
      count: 'Private escapes'
    },
    {
      title: 'Group Ubuntu Expeditions',
      description: 'Shared adventures for groups, collectives, and organizations traveling with shared purpose.',
      icon: Users,
      count: 'Group journeys'
    },
    {
      title: 'Ubuntu Volunteer & Youth Journeys',
      description: 'Service‑oriented, learning‑focused experiences for youth, students, and emerging leaders.',
      icon: Globe,
      count: 'Youth & student'
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
          <div className="animate-fade-in max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] text-orange-300 mb-3">
              Our Adventures
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Where Travel Becomes Transformation
            </h1>
            <p className="text-lg md:text-xl max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Journeys that connect people, communities, wildlife, and cultures across Africa — rooted in Ubuntu and
              crafted for impact, storytelling, and shared humanity.
            </p>
          </div>
        </div>
      </section>

      {/* Journeys That Connect, Inspire, and Transform */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Journeys That Connect, Inspire, and Transform
            </h2>
            <p className="text-gray-700 mb-4">
              At Maka‑Laskas Adventures, every journey is more than a trip — it’s a story waiting to unfold. Whether
              you’re exploring landscapes, connecting with communities, or joining a founder‑led signature experience,
              our adventures are rooted in purpose, impact, and the Ubuntu philosophy: “I am because we are.”
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <Link
                href="#all-adventures"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-500 transition"
              >
                Book Your Adventure
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="#founder-signature"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-900 text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition"
              >
                Join a Founder‑Led Journey
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          {/* Travel Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-700">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-600 flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600 mb-2">
                Essence Tier – Embark &amp; Discover
              </p>
              <p className="text-xs text-gray-500 mb-3">Ideal for first‑time explorers and young travelers.</p>
              <p className="mb-3">
                A thoughtfully curated journey that introduces you to local communities, wildlife, and cultural
                heritage, while keeping sustainability and ethical engagement at the forefront.
              </p>
              <p className="font-semibold text-gray-900 mb-2">What you do</p>
              <ul className="list-disc ml-5 space-y-1 mb-3">
                <li>Engage in light conservation projects or cultural exchanges.</li>
                <li>Learn about local traditions, music, and storytelling.</li>
                <li>Experience nature and wildlife through guided walks and safaris.</li>
              </ul>
              <p className="font-semibold text-gray-900 mb-1">What’s included</p>
              <p className="mb-3">
                Eco‑lodges or community stays, locally sourced meals, and professional guides with deep local
                knowledge.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-yellow-500 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-600 mb-2">
                Roots Tier – Engage &amp; Grow
              </p>
              <p className="text-xs text-gray-500 mb-3">Ideal for mid‑range travelers seeking deeper connection.</p>
              <p className="mb-3">
                A multi‑day immersive journey that balances adventure, cultural insight, and conservation impact for
                travelers who want to go beyond sightseeing.
              </p>
              <p className="font-semibold text-gray-900 mb-2">What you do</p>
              <ul className="list-disc ml-5 space-y-1 mb-3">
                <li>Participate in community‑led projects and storytelling circles.</li>
                <li>Join guided safaris and interactive educational experiences.</li>
                <li>Enjoy curated cultural workshops and performances.</li>
              </ul>
              <p className="font-semibold text-gray-900 mb-1">What’s included</p>
              <p className="mb-3">
                Boutique eco‑lodges, curated meals, expert guides and cultural facilitators, and personalized touches in
                your itinerary.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-purple-700 flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-700 mb-2">
                Legacy Tier – Luxury &amp; Impact
              </p>
              <p className="text-xs text-gray-500 mb-3">Ideal for high‑end travelers seeking transformative journeys.</p>
              <p className="mb-3">
                Fully curated luxury adventures that blend world‑class comfort, cultural immersion, and measurable
                impact — for those who want exclusivity and purpose combined.
              </p>
              <p className="font-semibold text-gray-900 mb-2">What you do</p>
              <ul className="list-disc ml-5 space-y-1 mb-3">
                <li>Join high‑impact conservation or community projects.</li>
                <li>Engage in intimate storytelling sessions with local leaders and the founder.</li>
                <li>Explore remote destinations through bespoke itineraries.</li>
              </ul>
              <p className="font-semibold text-gray-900 mb-1">What’s included</p>
              <p className="mb-3">
                Luxury eco‑lodges or private camps, chef‑prepared meals, private guides and concierge support, and
                premium activities.
              </p>
            </div>
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

      {/* All Adventures – Destinations & Packages */}
      <section id="all-adventures" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              All Adventures
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore destinations, communities, and stories across our Ubuntu‑inspired journeys.
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

      {/* Ways to Travel */}
      <section id="tiers" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ways to Travel with Maka‑Laskas
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose how you want to journey — from Ubuntu Signature Journeys to Youth, Volunteer, and Private Ubuntu
              escapes, each style is rooted in connection and impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {waysToTravel.map((category, index) => (
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

      {/* Founder-Led Signature Journeys – Every Journey Tells a Story */}
      <section id="founder-signature" className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-orange-600 mb-2">
              Founder‑Led Signature Journeys
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Every Journey Tells a Story
            </h2>
            <p className="text-gray-700 mb-4">
              Step into journeys personally guided or inspired by our founder, where every experience is curated with
              purpose, narrative, and the Ubuntu spirit. These are not just itineraries — they are living stories that
              connect travelers, communities, and landscapes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-700 mb-10">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">The Journey of Connection</h3>
              <p className="mb-3">
                Travel through communities where Ubuntu is lived daily — learning, sharing, and leaving tangible
                impact alongside local hosts and the founder.
              </p>
              <p className="text-xs text-gray-500 mb-3">Highlights: welcome circle, community engagement, storytelling evenings.</p>
              <Link href="#" className="text-orange-600 font-semibold inline-flex items-center">
                Book The Journey of Connection
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">The Path of Heritage</h3>
              <p className="mb-3">
                Follow stories passed down through generations — from artisans and performers to elders sharing music,
                ritual, and wisdom.
              </p>
              <p className="text-xs text-gray-500 mb-3">Highlights: heritage sites, performances, elder storytelling.</p>
              <Link href="#" className="text-orange-600 font-semibold inline-flex items-center">
                Book The Path of Heritage
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">The Adventure of Conservation</h3>
              <p className="mb-3">
                Join wildlife monitoring, tree planting, and habitat restoration while exploring some of Africa’s most
                remarkable ecosystems.
              </p>
              <p className="text-xs text-gray-500 mb-3">Highlights: conservation projects, guided safaris, reflection circles.</p>
              <Link href="#" className="text-orange-600 font-semibold inline-flex items-center">
                Book The Adventure of Conservation
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          <div className="max-w-3xl">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-4">
              <p className="italic text-gray-800 mb-2">
                “Every story told on this journey became part of my own life. It wasn’t just a trip — it was a
                transformation.”
              </p>
              <p className="text-xs text-gray-600">— Traveler reflection, Signature Journey 2025</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#all-adventures"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-orange-600 text-white text-sm font-semibold hover:bg-orange-500 transition"
              >
                Book a Founder‑Led Journey
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/media"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-900 text-gray-900 text-sm font-semibold hover:bg-gray-900 hover:text-white transition"
              >
                Explore More Stories
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable & Responsible Travel */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sustainable &amp; Responsible Travel
            </h2>
            <p className="text-gray-700 mb-4">
              All Maka‑Laskas adventures are designed with the planet, communities, and future generations in mind —
              we travel not to consume, but to co‑create with humility, intention, and care for all life.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm text-gray-700 mb-6">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 mb-3 rounded-full bg-orange-500 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <p className="font-semibold text-gray-900 mb-1">People</p>
              <p>Empowering communities, uplifting youth and women, and creating safe, transformative experiences.</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 mb-3 rounded-full bg-green-600 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <p className="font-semibold text-gray-900 mb-1">Planet</p>
              <p>Restoring ecosystems, reducing footprints, and championing sustainable practices.</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 mb-3 rounded-full bg-sky-600 flex items-center justify-center">
                <Mountain className="w-5 h-5 text-white" />
              </div>
              <p className="font-semibold text-gray-900 mb-1">Wildlife</p>
              <p>Protecting animals, supporting conservation initiatives, and prioritizing ethical tourism.</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 mb-3 rounded-full bg-indigo-600 flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <p className="font-semibold text-gray-900 mb-1">Future Generations</p>
              <p>Educating, inspiring, and ensuring each journey contributes to a legacy of equity and sustainability.</p>
            </div>
          </div>
          <Link
            href="/mission"
            className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-900 text-gray-900 text-sm font-semibold hover:bg-gray-900 hover:text-white transition"
          >
            Learn About Our Impact
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="container-custom text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-6">Why Travel With Maka‑Laskas?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Step into a new way of traveling — where adventure meets purpose, every journey supports people and
              wildlife, and you return transformed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#all-adventures"
                className="bg-white text-orange-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center"
              >
                Book Your Journey
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="#founder-signature"
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold py-4 px-8 rounded-lg transition-all duration-300 inline-flex items-center"
              >
                Join a Founder‑Led Tour
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
