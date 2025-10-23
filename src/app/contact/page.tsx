'use client';

import { useState } from 'react';
import { motion as m } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, ArrowRight, ChevronDown, HelpCircle, Plane, Shield, Home, Heart } from 'lucide-react';

export default function ContactPage() {
  const [openCategory, setOpenCategory] = useState<string | null>('visa');

  const faqData = {
    visa: {
      title: 'Visa & Travel Requirements',
      icon: Plane,
      questions: [
        {
          question: 'Do I need a visa to visit East African countries?',
          answer: 'Visa requirements vary by country. Uganda, Tanzania, and Kenya offer visa-on-arrival for most nationalities. Rwanda and Burundi may require advance visas. DRC typically requires advance visa application. We recommend checking with your local embassy.'
        },
        {
          question: 'How long does it take to get a visa?',
          answer: 'Visa processing times vary: Uganda (immediate on arrival), Tanzania (immediate on arrival), Kenya (immediate on arrival), Rwanda (3-5 business days), Burundi (5-10 business days), DRC (10-15 business days).'
        },
        {
          question: 'What documents do I need for my visa?',
          answer: 'Typically you\'ll need: valid passport (6+ months validity), passport photos, travel itinerary, proof of accommodation, return flight ticket, and sufficient funds. Requirements vary by country.'
        }
      ]
    },
    safety: {
      title: 'Safety & Security',
      icon: Shield,
      questions: [
        {
          question: 'Is it safe to travel in East Africa?',
          answer: 'Yes, East Africa is generally safe for travelers. We operate in well-established tourist areas with experienced local guides. We monitor security situations and adjust itineraries if needed. Your safety is our top priority.'
        },
        {
          question: 'What safety measures do you have in place?',
          answer: 'We work with trusted local partners, provide 24/7 support, use registered vehicles and guides, maintain emergency protocols, and stay updated on local conditions. All our guides are trained in first aid and emergency response.'
        },
        {
          question: 'Are there any areas we should avoid?',
          answer: 'We avoid areas with known security concerns and stay updated on travel advisories. Our itineraries focus on safe, tourist-friendly areas. We\'ll inform you of any changes due to security considerations.'
        }
      ]
    },
    accommodation: {
      title: 'Accommodation Details',
      icon: Home,
      questions: [
        {
          question: 'What type of accommodation do you provide?',
          answer: 'We offer a range of accommodations from comfortable lodges and tented camps to community homestays. All accommodations are carefully selected for safety, cleanliness, and authentic local experience.'
        },
        {
          question: 'Are accommodations included in the tour price?',
          answer: 'Yes, all accommodations are included in your tour price. We handle all bookings and ensure quality standards. You\'ll stay in carefully selected places that enhance your cultural experience.'
        },
        {
          question: 'Can I request specific accommodation preferences?',
          answer: 'Yes, we can accommodate special requests when possible. Please let us know your preferences during booking. We\'ll do our best to meet your needs while maintaining the tour\'s authentic experience.'
        }
      ]
    },
    health: {
      title: 'Health & Vaccination Info',
      icon: Heart,
      questions: [
        {
          question: 'What vaccinations do I need?',
          answer: 'Common requirements include: Yellow Fever (required for most countries), Hepatitis A & B, Typhoid, and routine vaccinations. Malaria prophylaxis is recommended. Consult your doctor 6-8 weeks before travel.'
        },
        {
          question: 'What about malaria and other diseases?',
          answer: 'Malaria is present in East Africa. We recommend prophylaxis and mosquito protection. We provide guidance on health precautions and work with accommodations that have mosquito protection. Your health is our priority.'
        },
        {
          question: 'What medical facilities are available?',
          answer: 'Major cities have good medical facilities. We carry first aid kits and have emergency protocols. We recommend travel insurance with medical coverage. Our guides are trained in basic first aid.'
        }
      ]
    }
  };

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 container-custom h-full flex items-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Contact Us
            </h1>
            <p className="text-xl max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Get in touch with our team to start planning your transformative East Africa adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're here to help you plan the perfect adventure. Choose your preferred way to connect with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-gray-50 rounded-xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Email Us</h3>
              <p className="text-gray-600 mb-4">
                Send us a detailed message and we'll get back to you within 24 hours.
              </p>
              <a href="mailto:info@maka-laskas.com" className="text-orange-600 font-semibold hover:text-orange-700">
                info@maka-laskas.com
              </a>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Call Us</h3>
              <p className="text-gray-600 mb-4">
                Speak directly with our travel experts for immediate assistance.
              </p>
              <a href="tel:+256-123-456-789" className="text-orange-600 font-semibold hover:text-orange-700">
                +256 123 456 789
              </a>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">WhatsApp</h3>
              <p className="text-gray-600 mb-4">
                Quick questions? Chat with us on WhatsApp for instant responses.
              </p>
              <a href="https://wa.me/256123456789" className="text-orange-600 font-semibold hover:text-orange-700">
                Start Chat
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <p className="text-lg text-gray-600">
                Tell us about your dream adventure and we'll create a personalized experience just for you.
              </p>
            </div>

            <form className="bg-white p-8 rounded-xl shadow-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="adventure" className="block text-sm font-medium text-gray-700 mb-2">
                  Adventure Type
                </label>
                <select
                  id="adventure"
                  name="adventure"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select an adventure type</option>
                  <option value="gorilla-trekking">Gorilla Trekking</option>
                  <option value="wildlife-safari">Wildlife Safari</option>
                  <option value="cultural-immersion">Cultural Immersion</option>
                  <option value="volcano-trekking">Volcano Trekking</option>
                  <option value="beach-adventure">Beach Adventure</option>
                  <option value="custom-tour">Custom Tour</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Tell us about your dream adventure, preferred dates, group size, and any special requirements..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn-primary inline-flex items-center"
                >
                  Send Message
                  <Send className="w-4 h-4 ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about traveling with Maka-Laskas Adventures in East Africa.
              </p>
            </m.div>
          </div>

          <div className="max-w-4xl mx-auto">
            {Object.entries(faqData).map(([key, category]) => (
              <m.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <button
                  onClick={() => toggleCategory(key)}
                  className="w-full flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors"
                >
                  <div className="flex items-center">
                    <category.icon className="w-6 h-6 text-orange-600 mr-4" />
                    <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      openCategory === key ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {openCategory === key && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 space-y-4"
                  >
                    {category.questions.map((item, index) => (
                      <m.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white p-6 rounded-lg border border-gray-200"
                      >
                        <h4 className="font-semibold text-gray-900 mb-3">{item.question}</h4>
                        <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                      </m.div>
                    ))}
                  </m.div>
                )}
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Information */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Visit Our Headquarters
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-orange-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">
                      Plot 123, Kampala Road<br />
                      Kampala, Uganda<br />
                      East Africa
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-orange-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-orange-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Emergency Contact</h3>
                    <p className="text-gray-600">
                      24/7 Support: +256 123 456 789<br />
                      For travelers currently on tour
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in-right">
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Connect With Us
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                      <Mail className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">General Inquiries</div>
                      <div className="text-gray-600">info@maka-laskas.com</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                      <MessageCircle className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Media & Press</div>
                      <div className="text-gray-600">press@maka-laskas.com</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                      <Phone className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Partnerships</div>
                      <div className="text-gray-600">partnerships@maka-laskas.com</div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Follow Our Journey</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center hover:bg-orange-200 transition-colors">
                      <span className="text-orange-600 font-semibold">f</span>
                    </a>
                    <a href="#" className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center hover:bg-orange-200 transition-colors">
                      <span className="text-orange-600 font-semibold">in</span>
                    </a>
                    <a href="#" className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center hover:bg-orange-200 transition-colors">
                      <span className="text-orange-600 font-semibold">ig</span>
                    </a>
                    <a href="#" className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center hover:bg-orange-200 transition-colors">
                      <span className="text-orange-600 font-semibold">yt</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section-padding bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="container-custom text-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest adventure updates, travel tips, and exclusive offers.
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="bg-white text-orange-600 px-6 py-3 rounded-r-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
