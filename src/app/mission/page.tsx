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
                We pledge to uphold these values in everything we do, from the smallest interaction to the grandest
                adventure. We commit to:
              </p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span>
                    Always prioritize the well‑being of our travelers, local communities, and natural environments
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span>Maintain transparency in our operations and honest communication with all stakeholders</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span>
                    Continuously improve our practices to minimize environmental impact and maximize positive social
                    outcomes
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span>
                    Foster authentic connections that respect cultural differences and celebrate human diversity
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <span>
                    Lead by example in sustainable tourism and inspire others to follow responsible travel practices
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships & Impact – Overview */}
      <section id="partnerships" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-orange-600 mb-2">
              Partnerships &amp; Impact
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Building Impact Through Partnerships Rooted in Ubuntu
            </h2>
            <p className="text-gray-700 mb-4">
              At Maka‑Laskas Adventures, every journey is more than travel — it’s a shared commitment to people, planet,
              and purpose. Through partnerships with communities, conservationists, innovators, and global
              organizations, we are redefining how travel impacts the world.
            </p>
            <p className="text-gray-700">
              Partnership lies at the heart of our identity. We unite local communities, conservation networks,
              institutions, and global allies under one shared vision: to create tourism models that protect nature,
              celebrate culture, and empower people — guided by Ubuntu, “I am because we are.”
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-700">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <p className="font-semibold text-gray-900 mb-2">Community Partnerships</p>
              <p>
                Supporting local enterprises, cooperatives, and young entrepreneurs through fair, long‑term, and
                empowering collaborations.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <p className="font-semibold text-gray-900 mb-2">Conservation Partners</p>
              <p>
                Working hand‑in‑hand with rangers, sanctuaries, and researchers to preserve ecosystems and wildlife
                habitats.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <p className="font-semibold text-gray-900 mb-2">Institutional Collaborations</p>
              <p>
                Engaging ministries, tourism boards, and global agencies to align travel with sustainable development
                goals.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <p className="font-semibold text-gray-900 mb-2">Corporate &amp; NGO Alliances</p>
              <p>
                Building purposeful alliances that connect travel with education, environment, and social empowerment.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#ubuntu-commitments"
              className="inline-flex items-center px-5 py-2 rounded-full bg-orange-600 text-white text-sm font-semibold hover:bg-orange-500 transition"
            >
              Our Commitments
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
            <a
              href="#alliance"
              className="inline-flex items-center px-5 py-2 rounded-full border border-gray-900 text-gray-900 text-sm font-semibold hover:bg-gray-900 hover:text-white transition"
            >
              Partner With Us
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Ubuntu Commitments – Living Impact */}
      <section id="ubuntu-commitments" className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Ubuntu Commitments to the World
            </h2>
            <p className="italic text-gray-700 mb-4">
              “We travel not to consume, but to co‑create — with humility, intention, and care for all life.”
            </p>
            <p className="text-gray-700">
              Our Living Impact pledge is our compass. It ensures every partnership and journey restores, uplifts, and
              transforms — for people, the planet, wildlife, and future generations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-700">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="w-14 h-14 mb-4 rounded-full bg-orange-500 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-orange-500 mb-2">To People &amp; Communities</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Promote empathy, kindness, and cultural dignity in every traveler‑host interaction.</li>
                <li>Ensure the physical, emotional, and psychological safety of clients, staff, and partners.</li>
                <li>
                  Empower youth, women, and indigenous voices through leadership pipelines and inclusive opportunities.
                </li>
                <li>
                  Deliver transformative journeys that foster human connection, mutual respect, and cross‑cultural
                  understanding.
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="w-14 h-14 mb-4 rounded-full bg-green-600 flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-green-600 mb-2">To the Planet</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Operate with a regenerative mindset — actively restoring ecosystems, not just reducing impact.</li>
                <li>Reduce single‑use plastics, favour low‑emission transport, and offset trip footprints.</li>
                <li>
                  Integrate sustainable design into accommodations, itineraries, and procurement with circular thinking.
                </li>
                <li>Advocate for climate action and uphold global green tourism standards.</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="w-14 h-14 mb-4 rounded-full bg-emerald-600 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-emerald-600 mb-2">To Wildlife &amp; Nature</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Uphold a strict zero‑exploitation policy in all wildlife and nature experiences.</li>
                <li>
                  Promote conservation through respectful observation, nature‑positive itineraries, and education.
                </li>
                <li>
                  Support indigenous and community‑led conservation zones, rewilding work, and ethical corridors.
                </li>
                <li>Ensure animal welfare and biodiversity are central to partnerships and supply chains.</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="w-14 h-14 mb-4 rounded-full bg-indigo-600 flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-indigo-600 mb-2">To Future Generations</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Inspire youth through Ubuntu journeys, school travel, and leadership programs.</li>
                <li>Embed intergenerational responsibility into every decision we make.</li>
                <li>Invest in education, skills transfer, and tourism‑related livelihoods.</li>
                <li>
                  Foster a culture of legacy‑building, where travel contributes to long‑term equity and sustainability.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section id="impact-stories" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Impact Stories That Inspire Change
            </h2>
            <p className="text-gray-700 mb-4">
              Our story is told through the people and places we journey with. From reforestation efforts to community
              education and wildlife protection, every Maka‑Laskas adventure leaves a living legacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-700 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <p className="font-semibold text-gray-900 mb-2">Women of the Wild</p>
              <p>Empowering rural women through eco‑tourism, guiding, and storytelling cooperatives.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <p className="font-semibold text-gray-900 mb-2">Roots Reforestation Project</p>
              <p>Travelers plant indigenous trees and help restore degraded lands around key corridors.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <p className="font-semibold text-gray-900 mb-2">Ubuntu Classrooms</p>
              <p>Educational journeys and exchanges that bring knowledge, culture, and hope to schools.</p>
            </div>
          </div>

          <Link
            href="/media"
            className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-900 text-gray-900 text-sm font-semibold hover:bg-gray-900 hover:text-white transition"
          >
            Discover Our Impact Projects
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* Annual Impact Reports */}
      <section id="reports" className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Annual Impact Reports</h2>
            <p className="text-gray-700">
              We are committed to transparent, measurable impact. Our annual reports share stories, data, and lessons
              from our partnerships across people, planet, wildlife, and youth.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              href="#"
              className="inline-flex items-center px-5 py-2 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-800 transition"
            >
              Download Latest Report (PDF)
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="#"
              className="inline-flex items-center px-5 py-2 rounded-full border border-gray-900 text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition"
            >
              View All Reports
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Global Alliance */}
      <section id="alliance" className="section-padding bg-gray-900 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Maka‑Laskas Global Alliance</h2>
            <p className="text-white/90 mb-4">
              We are building a worldwide network of partners and changemakers committed to Ubuntu‑inspired travel. The
              Maka‑Laskas Global Alliance connects organizations, destinations, and leaders who believe in reimagining
              tourism for shared good.
            </p>
            <p className="text-white/80">
              By joining the alliance, you become part of a movement that advances sustainable development, community
              empowerment, and responsible global tourism.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition"
            >
              Become a Partner
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="#"
              className="inline-flex items-center px-6 py-3 rounded-lg border border-white text-white text-sm font-semibold hover:bg-white hover:text-gray-900 transition"
            >
              Download Alliance Proposal
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
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
