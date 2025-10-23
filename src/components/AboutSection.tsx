'use client';

import { motion as m } from 'framer-motion';
import { Users, Globe, Heart, Star } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <m.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Discover the Heart of East Africa
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              At Maka-Laskas Adventures, we believe in the power of transformative travel. Our journeys go beyond sightseeing – they're about healing, connecting, and discovering the interconnectedness of all life.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Through our Ubuntu-inspired approach, we create experiences that honor local communities, protect wildlife, and foster deep connections between travelers and the natural world.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">6</div>
                <div className="text-gray-600">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">500+</div>
                <div className="text-gray-600">Happy Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
                <div className="text-gray-600">Local Guides</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">15</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
            </div>
            
            <button className="btn-primary">
              Learn More About Us
            </button>
          </m.div>
          
          {/* Right Column - Image with Floating Card */}
          <m.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="East Africa Landscape"
                className="w-full h-96 object-cover rounded-2xl"
              />
              
              {/* Floating Philosophy Card */}
              <m.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl max-w-xs"
              >
                <div className="flex items-center mb-3">
                  <Heart className="w-5 h-5 text-red-500 mr-2" />
                  <h4 className="font-semibold text-gray-900">Our Philosophy</h4>
                </div>
                <p className="text-sm text-gray-600">
                  "I am because you are, together we explore" - This Ubuntu principle guides every adventure we create.
                </p>
              </m.div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
