import { Users, MapPin, Heart, Globe, Star, ArrowRight, Briefcase, GraduationCap, Award, Clock, Send, Handshake, Shield, Target, Lightbulb, TreePine, Mail, Phone, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function JoinPage() {
  const openPositions = [
    {
      title: 'Senior Adventure Guide',
      location: 'Uganda & Tanzania',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Lead transformative adventures across East Africa, sharing your passion for wildlife, culture, and sustainable tourism.',
      requirements: [
        'Certified tour guide with 3+ years experience',
        'Fluent in English and local languages',
        'First aid and emergency response training',
        'Passion for conservation and community development'
      ]
    },
    {
      title: 'Community Partnership Coordinator',
      location: 'Remote/Kampala',
      type: 'Full-time',
      experience: '2+ years',
      description: 'Build and maintain relationships with local communities, ensuring our adventures create positive impact.',
      requirements: [
        'Experience in community development or NGO work',
        'Strong communication and relationship-building skills',
        'Understanding of East African cultures',
        'Bachelor\'s degree in relevant field preferred'
      ]
    },
    {
      title: 'Marketing & Content Specialist',
      location: 'Remote/Kampala',
      type: 'Full-time',
      experience: '2+ years',
      description: 'Create compelling content and manage our digital presence to share our Ubuntu-inspired adventures with the world.',
      requirements: [
        'Experience in digital marketing and content creation',
        'Strong writing and visual storytelling skills',
        'Social media management experience',
        'Passion for sustainable tourism'
      ]
    },
    {
      title: 'Operations Manager',
      location: 'Kampala, Uganda',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Oversee day-to-day operations, ensuring smooth delivery of our adventures while maintaining our high standards.',
      requirements: [
        'Proven experience in tourism operations management',
        'Strong organizational and leadership skills',
        'Experience in East African tourism industry',
        'Bachelor\'s degree in business or related field'
      ]
    }
  ];

  const benefits = [
    {
      title: 'Competitive Compensation',
      description: 'Fair wages that reflect your skills and experience, with performance bonuses and growth opportunities.',
      icon: Award,
      color: 'bg-green-500'
    },
    {
      title: 'Professional Development',
      description: 'Ongoing training, certifications, and opportunities to grow your skills in sustainable tourism.',
      icon: GraduationCap,
      color: 'bg-blue-500'
    },
    {
      title: 'Meaningful Work',
      description: 'Be part of a mission-driven organization that creates positive impact in communities across East Africa.',
      icon: Heart,
      color: 'bg-red-500'
    },
    {
      title: 'Flexible Schedule',
      description: 'Work-life balance with flexible arrangements and time off to explore the incredible region we call home.',
      icon: Clock,
      color: 'bg-purple-500'
    }
  ];

  const values = [
    {
      title: 'Ubuntu Spirit',
      description: 'We believe in the interconnectedness of all beings and the power of community.',
      icon: Heart
    },
    {
      title: 'Authentic Experiences',
      description: 'We create genuine, unscripted experiences that connect travelers with real people and places.',
      icon: Star
    },
    {
      title: 'Sustainable Impact',
      description: 'Every adventure is designed to protect the environment and support local communities.',
      icon: Globe
    },
    {
      title: 'Continuous Growth',
      description: 'We invest in our team\'s development and create opportunities for personal and professional growth.',
      icon: Users
    }
  ];

  // Partnership data
  const partnershipTypes = [
    {
      title: 'NGO & Non-Profit Partnerships',
      description: 'Collaborate with us to create meaningful travel experiences that support your mission and create lasting impact.',
      icon: Heart,
      color: 'bg-red-500',
      benefits: [
        'Custom group travel programs',
        'Volunteer integration opportunities',
        'Shared impact measurement',
        'Co-branded experiences'
      ]
    },
    {
      title: 'Educational Institution Partnerships',
      description: 'Partner with schools and universities to create transformative educational travel experiences for students.',
      icon: Users,
      color: 'bg-blue-500',
      benefits: [
        'Curriculum-aligned programs',
        'Academic credit opportunities',
        'Faculty-led experiences',
        'Student exchange programs'
      ]
    },
    {
      title: 'Corporate & Business Partnerships',
      description: 'Create unique team-building and corporate retreat experiences that align with your company values.',
      icon: Handshake,
      color: 'bg-green-500',
      benefits: [
        'Team building adventures',
        'CSR program integration',
        'Executive retreats',
        'Employee wellness programs'
      ]
    },
    {
      title: 'Travel Industry Partnerships',
      description: 'Join our network of travel professionals and create mutually beneficial relationships.',
      icon: Globe,
      color: 'bg-orange-500',
      benefits: [
        'Agent commission programs',
        'Co-marketing opportunities',
        'Exclusive access to experiences',
        'Training and certification'
      ]
    }
  ];

  // Impact data
  const impactStats = [
    {
      number: '5,600+',
      label: 'Community Hours',
      description: 'Volunteer and training time with local partners',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      number: '48%',
      label: 'Local Procurement',
      description: 'Percentage of trip spending with local suppliers',
      icon: Globe,
      color: 'bg-green-500'
    },
    {
      number: '$120k',
      label: 'Conservation Funding',
      description: 'Annual funding to conservancies and rangers',
      icon: TreePine,
      color: 'bg-emerald-500'
    },
    {
      number: '800+',
      label: 'Youth Beneficiaries',
      description: 'Young people engaged annually through our programs',
      icon: Heart,
      color: 'bg-red-500'
    }
  ];

  const impactAreas = [
    {
      title: 'Community Development',
      description: 'Supporting local communities through fair employment, education, and infrastructure development.',
      icon: Users,
      color: 'bg-blue-500',
      metrics: [
        { label: 'Local Jobs Created', value: '150+' },
        { label: 'Community Projects', value: '25+' },
        { label: 'Education Scholarships', value: '50+' }
      ]
    },
    {
      title: 'Wildlife Conservation',
      description: 'Protecting East Africa\'s incredible biodiversity through direct funding and conservation partnerships.',
      icon: TreePine,
      color: 'bg-green-500',
      metrics: [
        { label: 'Conservancy Partners', value: '12' },
        { label: 'Rangers Supported', value: '45+' },
        { label: 'Species Protected', value: '50+' }
      ]
    },
    {
      title: 'Environmental Protection',
      description: 'Minimizing our environmental footprint and supporting regenerative practices across the region.',
      icon: Globe,
      color: 'bg-emerald-500',
      metrics: [
        { label: 'Carbon Offset', value: '100%' },
        { label: 'Plastic-Free Trips', value: '90%' },
        { label: 'Reforestation Projects', value: '8' }
      ]
    },
    {
      title: 'Cultural Preservation',
      description: 'Supporting traditional cultures and helping communities maintain their heritage and traditions.',
      icon: Heart,
      color: 'bg-red-500',
      metrics: [
        { label: 'Cultural Sites Supported', value: '15+' },
        { label: 'Traditional Artisans', value: '30+' },
        { label: 'Cultural Programs', value: '12' }
      ]
    }
  ];

  return (
    <main className="min-h-screen" role="main">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-orange-600 to-red-600 text-white" aria-labelledby="join-hero-heading">
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
        <div className="relative z-10 container-custom h-full flex items-center">
          <div className="animate-fade-in">
            <h1 id="join-hero-heading" className="text-5xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Join Our Team
            </h1>
            <p className="text-xl max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Be part of a mission-driven team creating transformative adventures across East Africa. Help us build bridges between cultures and create positive change.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Join Maka-Laskas?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're more than just a travel company - we're a community of passionate individuals working together to create meaningful experiences and positive impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="text-center p-8 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape the culture of our team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section id="partnerships" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Partnership Opportunities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We work with a diverse range of organizations to create meaningful partnerships that benefit all stakeholders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnershipTypes.map((type, index) => (
              <div
                key={type.title}
                className="bg-gray-50 p-8 rounded-xl hover:bg-orange-50 transition-colors animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 ${type.color} rounded-full flex items-center justify-center mb-6`}>
                  <type.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{type.title}</h3>
                <p className="text-gray-600 mb-6">{type.description}</p>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Partnership Benefits</h4>
                <ul className="space-y-2">
                  {type.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Impact by the Numbers
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our Ubuntu-inspired approach to travel creates measurable positive impact across communities, wildlife, and the environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-8 bg-white rounded-xl hover:bg-orange-50 transition-colors animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-orange-600 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Areas of Impact
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our commitment to positive change spans four key areas, each contributing to a more sustainable and connected world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {impactAreas.map((area, index) => (
              <div
                key={area.title}
                className="bg-gray-50 p-8 rounded-xl hover:bg-orange-50 transition-colors animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 ${area.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <area.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{area.title}</h3>
                    <p className="text-gray-600 mb-6">{area.description}</p>
                    <div className="grid grid-cols-3 gap-4">
                      {area.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="text-center">
                          <div className="text-2xl font-bold text-orange-600">{metric.value}</div>
                          <div className="text-sm text-gray-600">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="careers" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Open Positions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join our growing team and help us create transformative adventures across East Africa.
            </p>
          </div>

          <div className="space-y-8">
            {openPositions.map((position, index) => (
              <div
                key={position.title}
                className="bg-gray-50 p-8 rounded-xl hover:bg-orange-50 transition-colors animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{position.title}</h3>
                      <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {position.type}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-6 mb-4 text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{position.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-2" />
                        <span>{position.experience}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-6">{position.description}</p>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Requirements:</h4>
                      <ul className="space-y-2">
                        {position.requirements.map((requirement, reqIndex) => (
                          <li key={reqIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-600">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="lg:w-48 flex-shrink-0">
                    <button className="w-full btn-primary">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Application Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our hiring process is designed to ensure we find the right fit for both you and our team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Submit Application',
                description: 'Send us your resume and cover letter through our application form.'
              },
              {
                step: '2',
                title: 'Initial Review',
                description: 'Our team reviews your application and qualifications within 1 week.'
              },
              {
                step: '3',
                title: 'Interview Process',
                description: 'Video or in-person interviews to discuss your experience and fit.'
              },
              {
                step: '4',
                title: 'Final Decision',
                description: 'We make our decision and extend an offer to successful candidates.'
              }
            ].map((step, index) => (
              <div
                key={step.step}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General Application */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Don't See Your Perfect Role?
              </h2>
              <p className="text-lg text-gray-600">
                We're always looking for passionate individuals to join our team. Send us your information and we'll keep you in mind for future opportunities.
              </p>
            </div>

            <form className="bg-gray-50 p-8 rounded-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }} aria-labelledby="general-application-heading">
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
                    aria-describedby="firstName-error"
                    aria-invalid="false"
                  />
                  <div id="firstName-error" className="sr-only" role="alert"></div>
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
                    aria-describedby="lastName-error"
                    aria-invalid="false"
                  />
                  <div id="lastName-error" className="sr-only" role="alert"></div>
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
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                  Position of Interest
                </label>
                <select
                  id="position"
                  name="position"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select a position</option>
                  <option value="guide">Adventure Guide</option>
                  <option value="operations">Operations</option>
                  <option value="marketing">Marketing & Content</option>
                  <option value="community">Community Partnerships</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Relevant Experience
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  rows={4}
                  placeholder="Tell us about your relevant experience and why you're interested in joining our team..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                ></textarea>
              </div>

              <div className="mb-6">
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                  Resume/CV
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn-primary inline-flex items-center focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  aria-label="Submit job application form"
                >
                  Submit Application
                  <Send className="w-4 h-4 ml-2" aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="container-custom text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our team and help us create transformative adventures that connect people, protect nature, and build stronger communities across East Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-white text-orange-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-600"
                aria-label="View current job openings and positions"
              >
                View Open Positions
                <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </button>
              <button 
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold py-4 px-8 rounded-lg transition-all duration-300 inline-flex items-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-600"
                aria-label="Contact human resources team for job inquiries"
              >
                Contact HR Team
                <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
