import Header from '@/components/Header';
import HeroCarousel from '@/components/HeroCarousel';
import { Star, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Home = () => {
  const featuredTrips = [
    {
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      overlayText: 'Gorilla Trekking',
      duration: '3 days',
      tripName: 'Bwindi Gorilla Experience',
      originalPrice: '$1,200',
      salePrice: '$1,080',
      location: 'Uganda'
    },
    {
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      overlayText: 'Serengeti Migration',
      duration: '7 days',
      tripName: 'Tanzania Wildlife Safari',
      originalPrice: '$2,800',
      salePrice: '$2,520',
      location: 'Tanzania'
    },
    {
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      overlayText: 'Volcanoes Trek',
      duration: '5 days',
      tripName: 'Rwanda Cultural Adventure',
      originalPrice: '$1,500',
      salePrice: '$1,350',
      location: 'Rwanda'
    },
    {
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      overlayText: 'Masai Mara Safari',
      duration: '6 days',
      tripName: 'Kenya Wildlife Discovery',
      originalPrice: '$2,200',
      salePrice: '$1,980',
      location: 'Kenya'
    },
    {
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      overlayText: 'Lake Tanganyika',
      duration: '4 days',
      tripName: 'Burundi Lake Adventure',
      originalPrice: '$900',
      salePrice: '$810',
      location: 'Burundi'
    }
  ];

  const saleTrips = [
    {
      mapImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      duration: '10 days',
      tripName: 'Essential Uganda',
      originalPrice: '$2,195',
      salePrice: '$1,647',
      location: 'Uganda'
    },
    {
      mapImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      duration: '7 days',
      tripName: 'Tanzania Express',
      originalPrice: '$1,800',
      salePrice: '$1,350',
      location: 'Tanzania'
    },
    {
      mapImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      duration: '8 days',
      tripName: 'Classic Rwanda',
      originalPrice: '$1,600',
      salePrice: '$1,200',
      location: 'Rwanda'
    },
    {
      mapImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      duration: '6 days',
      tripName: 'Kenya Adventure',
      originalPrice: '$1,400',
      salePrice: '$1,050',
      location: 'Kenya'
    },
    {
      mapImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      duration: '5 days',
      tripName: 'Burundi Discovery',
      originalPrice: '$800',
      salePrice: '$600',
      location: 'Burundi'
    }
  ];

  return (
    <main className="min-h-screen">
      <Header />
      <HeroCarousel />
      
      {/* Global Value Proposition */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 animate-fade-in">
            Real and remarkable small group trips across East Africa
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1000s of experiences, over 6 countries</h3>
              <p className="text-gray-600">From gorilla trekking to wildlife safaris, discover the best of East Africa</p>
            </div>
            
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Shared adventures with like-minded people</h3>
              <p className="text-gray-600">Connect with fellow travelers who share your passion for authentic experiences</p>
            </div>
            
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Creating positive change since 2008</h3>
              <p className="text-gray-600">Supporting local communities and conservation efforts across the region</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Trips Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div className="animate-fade-in-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Only Maka-Laskas experiences</h2>
              <div className="w-20 h-1 bg-orange-500 rounded"></div>
            </div>
            
            <div className="animate-fade-in-right">
              <Link href="/adventures" className="btn-primary inline-flex items-center">
                Explore all trips
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {featuredTrips.map((trip, index) => (
              <div
                key={trip.tripName}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48">
                  <img
                    src={trip.image}
                    alt={trip.tripName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-semibold text-sm">{trip.overlayText}</h3>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{trip.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{trip.location}</span>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 mb-3 line-clamp-2">{trip.tripName}</h4>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-500 line-through">From USD {trip.originalPrice}</span>
                      <div className="text-lg font-bold text-orange-600">USD {trip.salePrice}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sale Trips Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div className="animate-fade-in-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">East Africa Sale</h2>
              <div className="w-20 h-1 bg-orange-500 rounded"></div>
            </div>
            
            <div className="animate-fade-in-right">
              <Link href="/adventures" className="btn-primary inline-flex items-center">
                Explore trips on sale
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {saleTrips.map((trip, index) => (
              <div
                key={trip.tripName}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48">
                  <img
                    src={trip.mapImage}
                    alt={trip.tripName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      SALE
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{trip.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{trip.location}</span>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 mb-3 line-clamp-2">{trip.tripName}</h4>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-500 line-through">From USD {trip.originalPrice}</span>
                      <div className="text-lg font-bold text-orange-600">USD {trip.salePrice}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section-padding bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="container-custom text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your East Africa Adventure?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join us on transformative journeys that heal, connect, and inspire. Discover the magic of East Africa with our Ubuntu-inspired adventures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/adventures" className="bg-white text-orange-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center">
                Browse All Adventures
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold py-4 px-8 rounded-lg transition-all duration-300 inline-flex items-center">
                Contact Our Team
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
    </div>
      </section>
    </main>
  );
};

export default Home;
