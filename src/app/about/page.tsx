import { Heart, Users, Globe, Star, ArrowRight, Target, Lightbulb, Leaf, Handshake, HeartHandshake, ShieldCheck, Shield, FileText, UserCheck, Lock, Recycle, TreePine, Droplets, Stethoscope, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const sections = [
    {
      title: 'Our Journey & Origin',
      description: 'Discover how Maka-Laskas began and our evolution into East Africa\'s premier adventure company.',
      icon: Heart,
      href: '/about/journey'
    },
    {
      title: 'Founder\'s Message',
      description: 'Hear directly from our founder about the vision and values that drive our adventures.',
      icon: Users,
      href: '/about/founder'
    },
    {
      title: 'Ubuntu Philosophy',
      description: 'Learn about the African philosophy that guides every aspect of our travel experiences.',
      icon: Globe,
      href: '/about/ubuntu'
    },
    {
      title: 'Interconnectedness & Healing Travel',
      description: 'Explore how our journeys create healing connections between people, nature, and culture.',
      icon: Star,
      href: '/about/healing'
    },
    {
      title: 'Logo & Symbolism',
      description: 'Understand the meaning behind our logo and the symbols that represent our mission.',
      icon: Heart,
      href: '/about/logo'
    }
  ];

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

  const commitments = [
    {
      title: 'PlanetGuard™',
      description: 'Protecting ecosystems and championing regenerative travel across East Africa.',
      icon: Leaf,
      href: '#planetguard',
      color: 'bg-green-500'
    },
    {
      title: 'PeopleFirst™',
      description: 'Fair pay, dignity at work, and community-driven growth for all partners.',
      icon: Users,
      href: '#peoplefirst',
      color: 'bg-blue-500'
    },
    {
      title: 'CommUnityRise™',
      description: 'Inclusive development and shared prosperity through respectful partnerships.',
      icon: Handshake,
      href: '#communityrise',
      color: 'bg-orange-500'
    },
    {
      title: 'UbuntuImpact™',
      description: 'Measurable, transparent impact guided by Ubuntu values.',
      icon: HeartHandshake,
      href: '#ubuntuimpact',
      color: 'bg-red-500'
    },
    {
      title: 'Code of Ethics & Conduct',
      description: 'Standards that ensure integrity, respect, and professional excellence.',
      icon: ShieldCheck,
      href: '#ethics',
      color: 'bg-purple-500'
    },
    {
      title: 'Anti-Corruption & Transparency',
      description: 'Zero tolerance for corruption and full financial transparency.',
      icon: Shield,
      href: '#anti-corruption',
      color: 'bg-yellow-500'
    },
    {
      title: 'Inclusivity & Safety Policies',
      description: 'Welcoming, safe, and accessible experiences for every traveler.',
      icon: UserCheck,
      href: '#inclusivity-safety',
      color: 'bg-teal-500'
    },
    {
      title: 'Client Health & Wellbeing',
      description: 'Robust protocols for health, preparedness, and traveler support.',
      icon: FileText,
      href: '#client-health',
      color: 'bg-pink-500'
    },
    {
      title: 'Data Protection & Privacy',
      description: 'Protecting personal data with care, consent, and compliance.',
      icon: Lock,
      href: '#data-privacy',
      color: 'bg-gray-700'
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
              About Maka-Laskas
            </h1>
            <p className="text-xl max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Discover the story behind East Africa's most transformative adventure company and the Ubuntu philosophy that guides our every journey.
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
                &ldquo;I am because you are, together we explore&rdquo;
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

      {/* Introduction */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Story Begins with a Simple Belief
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              &ldquo;I am because you are, together we explore&rdquo; - this Ubuntu principle has been the foundation of Maka-Laskas Adventures since our inception in 2008. We believe that true adventure lies not just in the places we visit, but in the connections we forge and the transformations we experience together.
            </p>
            <p className="text-lg text-gray-600">
              From humble beginnings as a small group of passionate guides, we&apos;ve grown into East Africa&apos;s premier adventure company, serving thousands of travelers while maintaining our commitment to authentic, sustainable, and transformative experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-white">
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
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Our Values Pledge
            </h2>
            <div className="bg-white p-8 rounded-xl border-2 border-orange-200">
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

      {/* Commitments & Ethics Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Pillars</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These nine pillars define how Maka-Laskas operates, partners, and measures impact across East Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commitments.map((item, index) => (
              <a
                key={item.title}
                href={item.href}
                className="group bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 ${item.color} rounded-full flex items-center justify-center text-white flex-shrink-0`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <span className="inline-flex items-center text-orange-600 font-semibold group-hover:underline">
                      Explore
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PlanetGuard™ */}
      <section id="planetguard" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
                <Leaf className="w-4 h-4 mr-2" /> PlanetGuard™
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Regenerative by Design</h3>
              <p className="text-lg text-gray-600 mb-6">We build itineraries that restore more than they take. From carbon-light routing to habitat protection, PlanetGuard™ is our covenant with nature.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center mb-3">
                    <Recycle className="w-5 h-5" />
                  </div>
                  <div className="font-semibold text-gray-900">Zero Waste Mindset</div>
                  <div className="text-gray-600 text-sm">Refill systems, no single-use plastics, circular ops.</div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center mb-3">
                    <TreePine className="w-5 h-5" />
                  </div>
                  <div className="font-semibold text-gray-900">Habitat Protection</div>
                  <div className="text-gray-600 text-sm">Conservancy partnerships and ranger support.</div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center mb-3">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div className="font-semibold text-gray-900">Water Stewardship</div>
                  <div className="text-gray-600 text-sm">Respect scarce resources; fund community water access.</div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center mb-3">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div className="font-semibold text-gray-900">Carbon-Light Routes</div>
                  <div className="text-gray-600 text-sm">Optimized logistics to minimize emissions.</div>
                </div>
              </div>
            </div>
            <div className="animate-fade-in-right">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 p-8 text-white">
                <div className="text-4xl font-extrabold mb-2">+50%</div>
                <div className="text-white/90 mb-8">Local conservation spend YoY</div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold">90%</div>
                    <div className="text-sm">No single-use plastic trips</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm">Conservancy partners</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PeopleFirst™ */}
      <section id="peoplefirst" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 animate-fade-in-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
                <Users className="w-4 h-4 mr-2" /> PeopleFirst™
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Dignity at Work</h3>
              <p className="text-lg text-gray-600 mb-6">We invest in people — fair wages, safety, and growth pathways for guides, crews, and local partners.</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <li className="bg-gray-50 rounded-xl p-4">Equitable pay and benefits</li>
                <li className="bg-gray-50 rounded-xl p-4">Local hiring priority</li>
                <li className="bg-gray-50 rounded-xl p-4">Training & certifications</li>
                <li className="bg-gray-50 rounded-xl p-4">Mental health support</li>
              </ul>
            </div>
            <div className="order-1 lg:order-2 animate-fade-in-right">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-white">
                <div className="text-4xl font-extrabold mb-2">1,200+</div>
                <div className="text-white/90 mb-8">Training hours funded last year</div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold">65%</div>
                    <div className="text-sm">Staff from host communities</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-sm">Safety-certified guides</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CommUnityRise™ */}
      <section id="communityrise" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="animate-fade-in text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-4">
              <Handshake className="w-4 h-4 mr-2" /> CommUnityRise™
            </div>
            <h3 className="text-3xl font-bold text-gray-900">Shared Prosperity</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-3">We co-create with communities: local ownership, youth opportunities, and sustained revenue flows.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow border border-gray-100">
              <div className="text-2xl font-bold text-orange-600">40%</div>
              <div className="text-gray-600">Trip spend with local vendors</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow border border-gray-100">
              <div className="text-2xl font-bold text-orange-600">25+</div>
              <div className="text-gray-600">Community enterprises supported</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow border border-gray-100">
              <div className="text-2xl font-bold text-orange-600">300+</div>
              <div className="text-gray-600">Youth apprenticeship placements</div>
            </div>
          </div>
        </div>
      </section>

      {/* UbuntuImpact™ */}
      <section id="ubuntuimpact" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold mb-4">
                <HeartHandshake className="w-4 h-4 mr-2" /> UbuntuImpact™
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Impact You Can See</h3>
              <p className="text-lg text-gray-600 mb-6">Our Ubuntu values guide how we measure progress: transparent metrics, annual reporting, and continuous learning.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="font-semibold text-gray-900">Community Hours</div>
                  <div className="text-sm text-gray-600">Volunteer & training time with partners.</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="font-semibold text-gray-900">Local Spend %</div>
                  <div className="text-sm text-gray-600">Procurement with local suppliers.</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="font-semibold text-gray-900">Conservation Support</div>
                  <div className="text-sm text-gray-600">Funding to conservancies & rangers.</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="font-semibold text-gray-900">Youth Beneficiaries</div>
                  <div className="text-sm text-gray-600">Young people engaged annually.</div>
                </div>
              </div>
            </div>
            <div className="animate-fade-in-right">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-600 to-red-600 p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="w-6 h-6" />
                  <div className="text-lg font-semibold">Annual Impact Snapshot</div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-3xl font-bold">5,600</div>
                    <div className="text-sm">Community hours</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-3xl font-bold">48%</div>
                    <div className="text-sm">Local procurement</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-3xl font-bold">$120k</div>
                    <div className="text-sm">Conservation funding</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-3xl font-bold">800</div>
                    <div className="text-sm">Youth beneficiaries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code of Ethics & Conduct */}
      <section id="ethics" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="animate-fade-in text-center mb-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
              <ShieldCheck className="w-4 h-4 mr-2" /> Code of Ethics & Conduct
            </div>
            <h3 className="text-3xl font-bold text-gray-900">How We Show Up</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <div className="font-semibold text-gray-900 mb-1">Integrity</div>
              <div className="text-sm text-gray-600">Honesty and transparency in all operations.</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <div className="font-semibold text-gray-900 mb-1">Respect</div>
              <div className="text-sm text-gray-600">Honor local customs and sacred spaces.</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <div className="font-semibold text-gray-900 mb-1">Accountability</div>
              <div className="text-sm text-gray-600">Clear roles and responsive remediation.</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <div className="font-semibold text-gray-900 mb-1">Safety</div>
              <div className="text-sm text-gray-600">Travelers, staff, and communities first.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Anti-Corruption & Transparency */}
      <section id="anti-corruption" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-semibold mb-4">
                <Shield className="w-4 h-4 mr-2" /> Anti-Corruption & Transparency
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Open Books. Clear Lines.</h3>
              <p className="text-lg text-gray-600 mb-6">Zero tolerance for bribery, protected whistleblowing, and robust due diligence across our supply chain.</p>
              <ul className="space-y-3 text-gray-700">
                <li>• No facilitation payments</li>
                <li>• Transparent reporting</li>
                <li>• Non-retaliation policy</li>
                <li>• Vendor screening</li>
              </ul>
            </div>
            <div className="animate-fade-in-right">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 p-8 text-white">
                <div className="text-4xl font-extrabold mb-2">100%</div>
                <div className="text-white/90 mb-8">Declared partner incentives reviewed</div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-sm">Tolerance for bribery</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm">Report channels</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inclusivity & Safety */}
      <section id="inclusivity-safety" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="animate-fade-in text-center mb-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm font-semibold mb-4">
              <UserCheck className="w-4 h-4 mr-2" /> Inclusivity & Safety
            </div>
            <h3 className="text-3xl font-bold text-gray-900">Everyone Belongs</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">Inclusive trip design</div>
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">Clear emergency plans</div>
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">Harassment-free policy</div>
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">Reasonable accommodations</div>
          </div>
        </div>
      </section>

      {/* Client Health & Wellbeing */}
      <section id="client-health" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-sm font-semibold mb-4">
                <Stethoscope className="w-4 h-4 mr-2" /> Client Health & Wellbeing
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Prepared. Supported. Cared For.</h3>
              <p className="text-lg text-gray-600 mb-6">From pre-trip guidance to post-trip follow-up, we maintain comprehensive protocols for your wellbeing.</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <li className="bg-gray-50 rounded-xl p-4">Vaccines & advisories</li>
                <li className="bg-gray-50 rounded-xl p-4">On-trip hygiene & food safety</li>
                <li className="bg-gray-50 rounded-xl p-4">24/7 emergency assistance</li>
                <li className="bg-gray-50 rounded-xl p-4">Post-trip check-ins</li>
              </ul>
            </div>
            <div className="animate-fade-in-right">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-600 to-rose-600 p-8 text-white">
                <div className="text-4xl font-extrabold mb-2">98%</div>
                <div className="text-white/90 mb-8">Traveler satisfaction on safety & care</div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold">20+</div>
                    <div className="text-sm">Partner clinics</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-sm">Guides first-aid trained</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Protection & Privacy */}
      <section id="data-privacy" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="animate-fade-in text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 text-gray-800 text-sm font-semibold mb-4">
              <Lock className="w-4 h-4 mr-2" /> Data Protection & Privacy
            </div>
            <h3 className="text-3xl font-bold text-gray-900">Your Data. Your Choice.</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-3">Consent-first collection, strong encryption, and clear rights to access, correct, and delete.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">Consent & purpose limitation</div>
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">Encryption & least privilege</div>
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">Access & deletion rights</div>
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">Compliance & audits</div>
          </div>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Explore Our Story
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dive deeper into the different aspects of our company, our philosophy, and our journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <div
                key={section.title}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link href={section.href} className="block">
                  <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group-hover:border-orange-500 border-2 border-transparent">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors">
                      <section.icon className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {section.description}
                    </p>
                    <div className="flex items-center text-orange-600 font-semibold group-hover:translate-x-2 transition-transform">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              Our Impact in Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="text-4xl font-bold text-orange-600 mb-2">15+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
                <div className="text-gray-600">Happy Travelers</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="text-4xl font-bold text-orange-600 mb-2">6</div>
                <div className="text-gray-600">Countries</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="text-4xl font-bold text-orange-600 mb-2">50+</div>
                <div className="text-gray-600">Local Guides</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Explore Further
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how we put our mission and values into action across East Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Our Adventures', description: 'See how our values come to life in every journey', href: '/adventures', icon: Star },
              { title: 'Join the Movement', description: 'Careers, partnerships, and impact opportunities', href: '/join', icon: Lightbulb },
              { title: 'Media & Stories', description: 'Travel stories, awards, and media resources', href: '/media', icon: Globe },
              { title: 'Our Mission', description: 'Understanding our purpose and direction', href: '/mission', icon: Target },
              { title: 'Contact Us', description: 'Get in touch to discuss your adventure', href: '/contact', icon: Heart },
              { title: 'FAQ', description: 'Find answers to common questions', href: '/faq', icon: Users }
            ].map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group-hover:border-orange-500 border-2 border-transparent">
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
