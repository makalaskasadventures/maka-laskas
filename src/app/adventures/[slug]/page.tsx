'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MapPin, Clock, Users, Star, Calendar, DollarSign, Check, Heart, Share2, ArrowRight, Mountain } from 'lucide-react';
import Link from 'next/link';

export default function AdventureDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [adventure, setAdventure] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchAdventure();
  }, [params.slug]);

  const fetchAdventure = async () => {
    try {
      const response = await fetch(`/api/adventures/${params.slug}`);
      if (response.ok) {
        const data = await response.json();
        setAdventure(data.adventure);
      } else if (response.status === 404) {
        router.push('/adventures');
      }
    } catch (error) {
      console.error('Error fetching adventure:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!adventure) {
    return null;
  }

  const allImages = [adventure.image, ...(adventure.gallery || [])].filter(Boolean);
  const difficultyColors: Record<string, string> = {
    EASY: 'bg-green-100 text-green-800',
    MODERATE: 'bg-blue-100 text-blue-800',
    CHALLENGING: 'bg-orange-100 text-orange-800',
    EXTREME: 'bg-red-100 text-red-800',
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Image Gallery */}
      <section className="relative">
        <div className="h-96 relative overflow-hidden">
          {allImages.length > 0 ? (
            <img
              src={allImages[selectedImage]}
              alt={adventure.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <Mountain className="w-24 h-24 text-gray-400" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container-custom">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {adventure.category.name}
                </span>
                {adventure.isFeatured && (
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-3 h-3 mr-1 fill-white" />
                    Featured
                  </span>
                )}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[adventure.difficulty]}`}>
                  {adventure.difficulty}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">{adventure.title}</h1>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {adventure.destination?.name || adventure.country.name}
                </div>
                {adventure.rating > 0 && (
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-yellow-500 text-yellow-500" />
                    {adventure.rating.toFixed(1)} ({adventure.reviewCount} reviews)
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Image Thumbnails */}
        {allImages.length > 1 && (
          <div className="container-custom py-4">
            <div className="flex gap-2 overflow-x-auto">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-orange-600' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <Clock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Duration</div>
                  <div className="font-semibold text-gray-900">{adventure.duration} days</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <Users className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Group Size</div>
                  <div className="font-semibold text-gray-900">Max {adventure.groupSize}</div>
                </div>
                {adventure.minAge && (
                  <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <Users className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Min Age</div>
                    <div className="font-semibold text-gray-900">{adventure.minAge}+</div>
                  </div>
                )}
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <Mountain className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Difficulty</div>
                  <div className="font-semibold text-gray-900">{adventure.difficulty}</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Adventure</h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {adventure.description}
                </div>
              </div>

              {/* Highlights */}
              {adventure.highlights && adventure.highlights.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {adventure.highlights.map((highlight: any, index: number) => (
                      <div key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{highlight.title}</div>
                          {highlight.description && (
                            <div className="text-sm text-gray-600">{highlight.description}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Itinerary */}
              {adventure.itinerary && adventure.itinerary.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Day-by-Day Itinerary</h2>
                  <div className="space-y-4">
                    {adventure.itinerary.map((day: any, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                            {day.day}
                          </div>
                          <h3 className="text-lg font-bold text-gray-900">{day.title}</h3>
                        </div>
                        {day.description && (
                          <p className="text-gray-700 mb-3">{day.description}</p>
                        )}
                        {day.activities && day.activities.length > 0 && (
                          <div className="mb-2">
                            <span className="text-sm font-semibold text-gray-900">Activities: </span>
                            <span className="text-sm text-gray-600">{day.activities.join(', ')}</span>
                          </div>
                        )}
                        {day.meals && day.meals.length > 0 && (
                          <div className="mb-2">
                            <span className="text-sm font-semibold text-gray-900">Meals: </span>
                            <span className="text-sm text-gray-600">{day.meals.join(', ')}</span>
                          </div>
                        )}
                        {day.accommodation && (
                          <div>
                            <span className="text-sm font-semibold text-gray-900">Accommodation: </span>
                            <span className="text-sm text-gray-600">{day.accommodation}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonials */}
              {adventure.testimonials && adventure.testimonials.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Traveler Reviews</h2>
                  <div className="space-y-4">
                    {adventure.testimonials.map((testimonial: any) => (
                      <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                            <span className="text-orange-600 font-semibold">
                              {testimonial.user.name?.charAt(0) || 'U'}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{testimonial.user.name}</div>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < testimonial.rating
                                      ? 'text-yellow-500 fill-yellow-500'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        {testimonial.title && (
                          <div className="font-semibold text-gray-900 mb-2">{testimonial.title}</div>
                        )}
                        <p className="text-gray-700">{testimonial.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    {adventure.isOnSale && adventure.originalPrice && (
                      <span className="text-2xl font-medium text-gray-400 line-through">
                        ${parseFloat(adventure.originalPrice).toFixed(0)}
                      </span>
                    )}
                    <div className="text-3xl font-bold text-orange-600">
                      ${parseFloat(adventure.price).toFixed(0)}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">per person</div>
                  {adventure.isOnSale && (
                    <div className="mt-2 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                      On Sale!
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold text-gray-900">{adventure.duration} days</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Max Group Size</span>
                    <span className="font-semibold text-gray-900">{adventure.groupSize} people</span>
                  </div>
                  {adventure.minAge && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Minimum Age</span>
                      <span className="font-semibold text-gray-900">{adventure.minAge}+</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Difficulty</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${difficultyColors[adventure.difficulty]}`}>
                      {adventure.difficulty}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href={`/adventures/${adventure.slug}/book`}
                    className="w-full btn-primary text-center flex items-center justify-center"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book This Adventure
                  </Link>
                  <button className="w-full border-2 border-gray-300 text-gray-700 hover:border-orange-600 hover:text-orange-600 font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center">
                    <Heart className="w-4 h-4 mr-2" />
                    Save for Later
                  </button>
                  <button className="w-full border-2 border-gray-300 text-gray-700 hover:border-orange-600 hover:text-orange-600 font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Adventure
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-600 mb-3">Need help planning?</div>
                  <Link
                    href="/contact"
                    className="text-orange-600 hover:text-orange-700 font-semibold text-sm flex items-center"
                  >
                    Contact Our Team
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Adventures */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              You Might Also Like
            </h2>
            <p className="text-gray-600">
              Explore other adventures in {adventure.country.name}
            </p>
          </div>
          <div className="text-center">
            <Link href="/adventures" className="btn-secondary inline-flex items-center">
              Browse All Adventures
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

