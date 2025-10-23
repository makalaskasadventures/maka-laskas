import { Heart, Users, Globe, Star, Target, Lightbulb, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function MissionPage() {
  const values = [
    {
      title: 'Ubuntu',
      description: 'I am because you are. We believe in the interconnectedness of all beings and the power of community.',
      icon: Heart,
      color: 'bg-red-500'
    },
    {
      title: 'Authenticity',
      description: 'We provide genuine, unscripted experiences that connect travelers with real people and places.',
      icon: Star,
      color: 'bg-yellow-500'
    },
    {
      title: 'Sustainability',
      description: 'Every adventure is designed to protect the environment and support local communities.',
      icon: Globe,
      color: 'bg-green-500'
    },
    {
      title: 'Transformation',
      description: 'We believe travel has the power to change lives, perspectives, and the world.',
      icon: Lightbulb,
      color: 'bg-purple-500'
    },
    {
      title: 'Excellence',
      description: 'We maintain the highest standards in safety, service, and experience quality.',
      icon: Target,
      color: 'bg-blue-500'
    },
    {
      title: 'Connection',
      description: 'We foster meaningful relationships between travelers, communities, and nature.',
      icon: Users,
      color: 'bg-orange-500'
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 container-custom h-full flex items-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Mission, Vision & Values
            </h1>
            <p className="text-xl max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Discover the driving force behind our transformative adventures and the principles that guide every journey.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              To create transformative travel experiences that heal, connect, and inspire while fostering sustainable tourism practices that benefit local communities and protect the natural world across East Africa.
            </p>
            <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
              <p className="text-lg text-gray-800 italic">
                "I am because you are, together we explore"
              </p>
              <p className="text-sm text-gray-600 mt-2">- Ubuntu Philosophy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Narrative */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Our Vision
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                We envision a world where travel serves as a bridge between cultures, a catalyst for personal growth, and a force for positive change. Through our Ubuntu-inspired adventures, we strive to create a global community of conscious travelers who understand that their journeys can heal not only themselves but also the places and people they encounter.
              </p>
              <p>
                Our vision extends beyond traditional tourism to embrace a holistic approach that honors the interconnectedness of all life. We see East Africa not just as a destination, but as a living classroom where visitors learn about sustainability, community, and their own capacity for transformation.
              </p>
              <p>
                We dream of a future where every adventure contributes to the preservation of natural wonders, the empowerment of local communities, and the creation of lasting bonds between people from different corners of the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* North Star Statement */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our North Star
            </h2>
            <div className="bg-gradient-to-br from-orange-600 to-red-600 text-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">
                Transformative Travel for a Better World
              </h3>
              <p className="text-lg leading-relaxed">
                Every decision we make, every adventure we create, and every relationship we build is guided by our unwavering commitment to using travel as a tool for positive transformation. We believe that when people connect deeply with new cultures, environments, and perspectives, they return home changed - and that change ripples outward to create a more compassionate, sustainable, and interconnected world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Six Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These fundamental principles guide every aspect of our operations, from adventure design to community partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Pledge */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Our Values Pledge
            </h2>
            <div className="bg-gray-50 p-8 rounded-xl border-2 border-orange-200">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We pledge to uphold these values in everything we do, from the smallest interaction to the grandest adventure. We commit to:
              </p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span>Always prioritize the well-being of our travelers, local communities, and natural environments</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span>Maintain transparency in our operations and honest communication with all stakeholders</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span>Continuously improve our practices to minimize environmental impact and maximize positive social outcomes</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span>Foster authentic connections that respect cultural differences and celebrate human diversity</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span>Lead by example in sustainable tourism and inspire others to follow responsible travel practices</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Explore Further
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dive deeper into how we put our mission and values into action across East Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Our Adventures', description: 'See how our values come to life in every journey', href: '/adventures', icon: Star },
              { title: 'Commitments & Ethics', description: 'Learn about our ethical practices and commitments', href: '/about#ethics', icon: Heart },
              { title: 'Impact Stories', description: 'Discover the real impact of our adventures', href: '/join#partnerships', icon: Globe },
              { title: 'Partnerships', description: 'See how we collaborate with local communities', href: '/join#partnerships', icon: Users },
              { title: 'About Us', description: 'Learn more about our team and story', href: '/about', icon: Target },
              { title: 'Contact Us', description: 'Get in touch to discuss your adventure', href: '/contact', icon: ArrowRight }
            ].map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group-hover:border-orange-500 border-2 border-transparent">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors">
                    <item.icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {item.description}
                  </p>
                  <div className="flex items-center text-orange-600 font-semibold group-hover:translate-x-2 transition-transform">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
