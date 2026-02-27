import { ArrowRight, Heart, Users, Globe, ShieldCheck, Handshake } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section – Ubuntu in Motion */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/img/about-us-background.jpg"
            alt="Ubuntu in motion"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 container-custom py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl">
            <p className="uppercase tracking-[0.25em] text-[11px] text-orange-300 mb-3">
              About Maka‑Laskas
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Ubuntu in Motion. Travel That Transforms.
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6">
              Step into journeys that connect hearts, cultures, and wild places. From storytelling circles with local
              elders to founder‑led wildlife safaris, every adventure leaves a mark — on your soul and the world.
            </p>
            <p className="text-sm md:text-base text-white/80 mb-8">
              This is Maka‑Laskas — where travel becomes an impact.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/adventures"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100 transition"
              >
                Book Your Journey
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="#who-we-are"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-white/80 text-white font-semibold hover:bg-white hover:text-gray-900 transition"
              >
                Read Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky in-page navigation */}
      <section className="bg-gray-900/90 text-gray-100 sticky top-0 z-20 border-b border-white/10 backdrop-blur">
        <div className="container-custom">
          <nav className="flex flex-wrap gap-4 py-3 text-xs md:text-sm">
            {[
              { href: '#who-we-are', label: 'Who We Are' },
              { href: '#journey-origin', label: 'Our Journey & Origin' },
              { href: '#tagline-logo', label: 'Tagline & Logo Story' },
              { href: '#purpose-vision', label: 'Purpose, Vision & Mission' },
              { href: '#values', label: 'Our Value Pillars' },
              { href: '#ubuntu-tourism', label: 'Our Ubuntu Tourism Model' },
              { href: '#people', label: 'People of Maka‑Laskas' },
              { href: '#governance', label: 'Governance & Ethics' }
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-1 rounded-full border border-white/10 hover:border-orange-400 hover:text-orange-300 transition"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Who We Are */}
      <section id="who-we-are" className="section-padding bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Who We Are</h2>
            <p className="text-sm uppercase tracking-[0.25em] text-orange-600 mb-4">
              Home of Ubuntu Tourism
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Maka‑Laskas Adventures is the Home of Ubuntu Tourism. Born in Africa and built for the world, we craft
              journeys where humanity leads travel — connecting people, cultures, and wild places through small‑group
              adventures, founder‑led safaris, immersive storytelling, and transformative experiences.
            </p>
            <p className="text-gray-800 font-semibold mb-4">
              Ubuntu is not a slogan. It is how we travel.
            </p>
            <p className="text-gray-700 mb-4">
              Maka‑Laskas Adventures is a purpose‑driven travel and tourism company rooted in the African philosophy of
              Ubuntu — “I am because you are.” We design journeys that heal, inspire, and create meaningful connections
              with nature, wildlife, and communities across East and Southern Africa.
            </p>
            <p className="text-gray-700 mb-4">
              Our offerings include a variety of ways to travel — from Roots budget cultural experiences to Extended
              mid‑range adventures and Legacy luxury safaris — and styles of travel such as small‑group journeys,
              private escapes, founder‑led signature tours, and educational or impact‑focused experiences.
            </p>
            <p className="text-gray-700 mb-4">
              Every adventure goes beyond sightseeing: intimate storytelling circles with local elders, hands‑on
              conservation, community immersion, and wildlife tracking. Each journey is a bridge between cultures, a
              celebration of heritage, and a step toward personal and collective transformation.
            </p>
            <p className="text-gray-800 font-semibold">
              At Maka‑Laskas, travel is not just about the places you visit — it’s about the connections you make, the
              lives you touch, and the change you leave behind. This is Ubuntu in motion. This is Maka‑Laskas.
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-lg relative h-56">
              <img
                src="/img/img4.jpg"
                alt="Travelers and communities"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs uppercase tracking-[0.2em] text-orange-300 mb-1">
                  Ubuntu in Motion
                </p>
                <p className="text-sm text-white/90">
                  Journeys that reconnect humanity with nature, culture, and each other.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50">
              <p className="text-sm font-semibold text-gray-900 mb-2">Our Purpose</p>
              <p className="text-sm text-gray-700">
                “To reconnect humanity with nature, culture, and each other through transformative travel experiences
                rooted in Ubuntu — uplifting communities, protecting ecosystems, and inspiring empathy across the
                world.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey & Origin */}
      <section id="journey-origin" className="section-padding bg-gray-50">
        <div className="container-custom max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey & Origin</h2>
          <p className="text-gray-700 italic mb-4">
            “Where kindness guides the journey, and good fortune flows from connection.”
          </p>
          <div className="space-y-4 text-gray-700">
            <p>
              Maka‑Laskas Adventures was born from a powerful belief: that kindness shapes the world—and that good
              fortune grows wherever people, nature, and purpose unite.
            </p>
            <p>
              Founded by a young African visionary who grew up between Congo and Uganda, Maka‑Laskas is rooted in the
              philosophy of Ubuntu: “I am because we are.” For our founder, travel has always been more than
              movement—it is a journey of connection, understanding, and transformation. Every traveler, community, and
              ecosystem is part of a shared story, and every journey is an opportunity to create a positive, lasting
              impact.
            </p>
            <p>
              The name Maka‑Laskas means kindness and good fortune—a reflection of our mission to craft journeys that
              honor people, protect ecosystems, and share Africa’s wisdom with the world.
            </p>
            <p>
              In an era where global tourism often takes more than it gives, Maka‑Laskas rises as a proudly Ugandan,
              Ubuntu‑rooted movement to reimagine travel as a force for healing, empowerment, and shared prosperity. We
              create transformational experiences—regenerative safaris, cultural immersions, and purpose‑driven
              adventures—co‑designed with communities and designed to leave a lasting legacy of hope and renewal.
            </p>
            <p>
              We believe travel is not about escape—it is about return: a return to connection, a return to meaning, a
              return to each other. With Maka‑Laskas, every journey becomes a gift. A gift of connection. A blessing of
              purpose. A story written with kindness.
            </p>
            <p className="font-semibold">
              “I am because you are. Together, we explore.” This is more than a tagline — it is our promise. That every
              journey honors our shared humanity, uplifts communities, and transforms lives.
            </p>
          </div>
        </div>
      </section>

      {/* Tagline & Logo Story */}
      <section id="tagline-logo" className="section-padding bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Story Behind the Tagline</h2>
            <p className="text-sm uppercase tracking-[0.25em] text-orange-600 mb-3">
              “I am because you are. Together, we explore.”
            </p>
            <p className="text-gray-700 mb-3">
              Our tagline is rooted in the African philosophy of Ubuntu, which teaches that we are defined by our
              connections with others. At Maka‑Laskas, this means every journey is not just about travel—it’s about
              building relationships, honoring communities, and protecting ecosystems.
            </p>
            <p className="text-gray-700 mb-3">
              “I am because you are” reminds us that travelers, hosts, and the land are part of one shared story.
              “Together, we explore” invites everyone to join in a journey of transformation, connection, and legacy.
            </p>
            <p className="text-gray-800 font-semibold">
              This tagline encapsulates our promise: every experience with Maka‑Laskas strengthens bonds, uplifts
              communities, and leaves a lasting positive impact.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Story Behind the Logo</h2>
            <p className="text-gray-700 mb-3">
              The Maka‑Laskas logo embodies our mission and philosophy. Its circular form symbolizes unity, continuity,
              and the interconnectedness of all life—reflecting our Ubuntu values.
            </p>
            <p className="text-gray-700 mb-3">
              The colors were chosen to represent Africa’s landscapes and our values: earthy tones for the land, green
              for life and sustainability, and gold for the good fortune that comes from kindness and connection.
            </p>
            <p className="text-gray-700 mb-3">
              Every element of the logo tells a story: of transformation, shared humanity, and journeys that honor both
              people and nature. It is a visual expression of the Maka‑Laskas promise: that travel can be a force for
              connection, empowerment, and lasting legacy.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Use the single, polished version on the homepage hero for immediate impact, and this full brand story on
              deeper “About Us / Our Story” content—just like this page.
            </p>
          </div>
        </div>
      </section>

      {/* Purpose, Vision, Mission & Values */}
      <section id="purpose-vision" className="section-padding bg-gray-50">
        <div className="container-custom max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Our Purpose, Vision & Mission</h2>
          <div className="space-y-6 text-gray-700">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Purpose</h3>
              <p>
                “To build a global tourism movement that puts people, the planet, and transformation at its heart —
                creating ripple effects of compassion, cultural understanding, and shared humility worldwide.”
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Mission</h3>
              <p>
                “To reimagine tourism as a force for empathy, kindness, and gratitude by fostering meaningful
                connections between travelers, communities, and the natural world, guided by Ubuntu: ‘I am because we
                are.’”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Pillars */}
      <section id="values" className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Value Pillars</h2>
          <p className="text-gray-600 max-w-3xl mb-10">
            These pillars keep us aligned with Ubuntu in every decision—from designing itineraries to partnering with
            communities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-sm text-gray-700">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-500 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-red-500 mb-2 text-center">
                Empathy – “Walking in Every Story”
              </p>
              <p className="text-center">
                We seek to understand and honor the experiences of travelers, communities, and the natural world.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-yellow-500 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-yellow-500 mb-2 text-center">
                Kindness – “Actions that Uplift”
              </p>
              <p className="text-center">
                Every interaction is guided by generosity, compassion, and care.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-600 flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-green-600 mb-2 text-center">
                Gratitude – “Honoring Every Connection”
              </p>
              <p className="text-center">
                We appreciate and celebrate people, cultures, and the environment in all we do.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-600 flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-blue-600 mb-2 text-center">
                Interconnectedness – “One World, Many Threads”
              </p>
              <p className="text-center">
                Recognizing the deep bonds between humans, communities, and ecosystems, we act with holistic awareness.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-600 flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-emerald-600 mb-2 text-center">
                Regenerative – “Creating Lasting Harmony”
              </p>
              <p className="text-center">
                We commit to tourism practices that restore, enrich, and strengthen communities, ecosystems, and the
                planet for generations to come.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-orange-500 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-orange-500 mb-2 text-center">
                Inclusivity – “Every Voice, Every Journey”
              </p>
              <p className="text-center">
                We create spaces where all cultures, perspectives, and identities are respected and celebrated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Ubuntu Tourism Model */}
      <section id="ubuntu-tourism" className="section-padding bg-gray-50">
        <div className="container-custom max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Ubuntu Tourism Model</h2>
          <p className="text-gray-700 italic mb-4">
            “Pioneering the world’s first Ubuntu Tourism Model — where travel becomes a force for human connection,
            community empowerment, and regeneration.”
          </p>
          <p className="text-gray-700 mb-4">
            The Ubuntu Tourism Model, pioneered by Maka‑Laskas Adventures, reimagines tourism as a force for
            connection, healing, and shared prosperity. Rooted in the African philosophy of Ubuntu — “I am because we
            are” — it guides every journey to create meaningful experiences for travelers, communities, wildlife, and
            the planet.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Why It Matters</h3>
          <p className="text-gray-700 mb-4">
            Traditional tourism often prioritizes profit over people and the environment. The Ubuntu Tourism Model
            offers a new approach — one that is ethical, inclusive, and regenerative. It positions tourism as a
            positive force: uplifting communities, protecting nature, and inspiring travelers to return transformed.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Core Principles</h3>
          <ul className="list-disc ml-5 space-y-2 text-gray-700 text-sm">
            <li>Interconnectedness – travelers, communities, and ecosystems are all part of a shared global family.</li>
            <li>Co‑Creation – journeys are designed to respect and honor local communities and traditions.</li>
            <li>Cultural Integrity – travel celebrates ancestral wisdom and authentic storytelling.</li>
            <li>Regeneration – every experience seeks to give back more than it takes.</li>
            <li>Justice &amp; Equity – fairness and respect guide every interaction.</li>
            <li>Transformative Learning – travel is a vehicle for reflection, growth, and global citizenship.</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Ubuntu Tourism Layers</h3>
          <ol className="list-decimal ml-5 space-y-2 text-gray-700 text-sm">
            <li>Inner Ubuntu – personal reflection, empathy, and transformation for the traveler.</li>
            <li>Relational Ubuntu – meaningful connections between travelers, hosts, and communities.</li>
            <li>Environmental Ubuntu – respect and care for nature, wildlife, and ecosystems.</li>
            <li>Global Ubuntu – promoting justice, collaboration, and shared responsibility across borders.</li>
          </ol>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            Why It Matters for Uganda &amp; Africa
          </h3>
          <p className="text-gray-700 mb-6">
            Uganda, the Pearl of Africa, is home to rich cultures, resilient communities, and vital ecosystems. Through
            the Ubuntu Tourism Model, Maka‑Laskas Adventures positions Uganda as a global leader in regenerative and
            inclusive tourism, showing the world how travel can uplift people, protect nature, and honor Africa’s
            heritage.
          </p>
          <p className="text-gray-800 font-semibold mb-4">
            The Ubuntu Tourism Model is Maka‑Laskas’ promise: every journey is a step toward connection, purpose, and a
            better world.
          </p>
          <Link
            href="/mission"
            className="inline-flex items-center px-5 py-2 rounded-full border border-gray-800 text-gray-900 text-sm font-semibold hover:bg-gray-900 hover:text-white transition"
          >
            Learn more about our impact
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* People of Maka‑Laskas */}
      <section id="people" className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">People of Maka‑Laskas</h2>
            <p className="text-gray-700 mb-6">
              Maka‑Laskas is powered by a diverse team of guides, storytellers, operations leaders, and community
              partners who live the Ubuntu philosophy every day. From the field to the boardroom, people are at the
              centre of everything we do.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="rounded-2xl overflow-hidden shadow-lg relative h-64">
              <img
                src="/img/img6.jpg"
                alt="The Maka‑Laskas team"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs uppercase tracking-[0.25em] text-orange-300 mb-1">
                  People of Maka‑Laskas
                </p>
                <p className="text-sm text-white/90">
                  A team rooted in East Africa, united by kindness, purpose, and storytelling.
                </p>
              </div>
            </div>
            <div className="space-y-4 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Our team</span> brings together experience from guiding, community
                development, conservation, and education. Many grew up in the very communities you visit, carrying
                lived stories of resilience, creativity, and hope.
              </p>
              <p>
                <span className="font-semibold">Our management structure</span> reflects our values: collaborative,
                accountable, and community‑anchored. Leadership sits alongside youth voices, local partners, and
                advisors in shaping our strategy and safeguarding Ubuntu Tourism principles.
              </p>
              <p>
                At every level, the People of Maka‑Laskas are committed to making sure each journey is safe, ethical,
                and deeply human.
              </p>
            </div>
          </div>

          <div className="mt-12 max-w-5xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">People Behind Maka‑Laskas</h3>
            <p className="text-sm text-gray-700 mb-6">
              Different roles. One shared belief: tourism should connect, protect, and uplift — together.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2">Chief Executive Officer (CEO)</h4>
                <p className="mb-3">
                  The Chief Executive Officer carries the long‑term vision of Maka‑Laskas Adventures Company Ltd. This
                  role exists to protect the soul of the company while guiding its growth across borders, markets, and
                  generations, weighing every strategic decision against responsibility to communities, ecosystems,
                  partners, and travelers.
                </p>
                <p className="font-semibold text-gray-900 mb-1">Belief in Tourism</p>
                <p>
                  The CEO believes tourism should reconnect people to their shared humanity — fostering understanding
                  across cultures, respecting the dignity of host communities, and leaving destinations stronger than
                  they were before.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2">Managing Director</h4>
                <p className="mb-3">
                  The Managing Director turns vision into lived reality, ensuring that strategy, people, and operations
                  work in harmony so that every Maka‑Laskas journey reflects professionalism, care, and consistency.
                </p>
                <p className="font-semibold text-gray-900 mb-1">Belief in Tourism</p>
                <p>
                  This role believes tourism should be intentional and well‑designed — journeys that respect time,
                  culture, and context so travelers feel secure, communities feel respected, and experiences gain depth
                  and meaning.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2">Director of Strategy &amp; Partnerships</h4>
                <p className="mb-3">
                  The Director of Strategy &amp; Partnerships shapes how Maka‑Laskas engages with the world, building
                  ethical relationships with tourism boards, global partners, NGOs, and industry stakeholders so that
                  growth always aligns with values.
                </p>
                <p className="font-semibold text-gray-900 mb-1">Belief in Tourism</p>
                <p>
                  This role believes tourism should grow through collaboration, not compromise – partnerships that
                  protect local interests, uphold ethical standards, and contribute to sustainable development.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2">Secretary, Governance &amp; Compliance</h4>
                <p className="mb-3">
                  The Secretary, Governance &amp; Compliance ensures that Maka‑Laskas operates with transparency,
                  accountability, and global best practice, protecting governance frameworks, ethical compliance, and
                  institutional credibility.
                </p>
                <p className="font-semibold text-gray-900 mb-1">Belief in Tourism</p>
                <p>
                  This role believes tourism should be built on trust — clear governance, ethical conduct, and
                  accountability as the backbone of sustainable travel.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2">Head of Finance &amp; Strategic Accounts</h4>
                <p className="mb-3">
                  The Head of Finance &amp; Strategic Accounts oversees financial stewardship with a long‑term
                  perspective, ensuring resources are managed responsibly, transparently, and in alignment with the
                  company’s impact commitments.
                </p>
                <p className="font-semibold text-gray-900 mb-1">Belief in Tourism</p>
                <p>
                  This role believes tourism should create shared value – where financial sustainability supports
                  communities, conservation, and future generations, not short‑term extraction.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2">Director of Impact &amp; Regenerative Tourism</h4>
                <p className="mb-3">
                  The Director of Impact &amp; Regenerative Tourism ensures every Maka‑Laskas journey contributes
                  positively to people and places, measuring and guiding the company’s environmental and social
                  footprint in close collaboration with communities and conservation partners.
                </p>
                <p className="font-semibold text-gray-900 mb-1">Belief in Tourism</p>
                <p>
                  This role believes tourism should regenerate what it touches, helping travel heal ecosystems, empower
                  communities, and preserve culture.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2">Head of Client Experience &amp; Storytelling</h4>
                <p className="mb-3">
                  This role holds the traveler’s journey from first inquiry to long after return, ensuring guests feel
                  understood, supported, and emotionally connected, treating storytelling as meaning‑making rather than
                  mere marketing.
                </p>
                <p className="font-semibold text-gray-900 mb-1">Belief in Tourism</p>
                <p>
                  This role believes tourism should stay with you – that a meaningful journey changes how people see the
                  world and themselves.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2">Journey Experience Manager &amp; Marketing Lead</h4>
                <p className="mb-3">
                  The Journey Experience Manager designs and oversees the flow of each journey on the ground, balancing
                  logistics with emotional rhythm so that safety, comfort, and space for reflection are always present.
                </p>
                <p className="font-semibold text-gray-900 mb-1">Belief in Tourism</p>
                <p>
                  This role believes tourism should feel human and unhurried – when journeys are paced with care,
                  travelers don’t just visit; they connect.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2">Senior Driver Guide</h4>
                <p className="mb-3">
                  The Senior Driver Guide is a guardian of safety, knowledge, and calm presence — representing trust,
                  local wisdom, and responsibility on the road.
                </p>
                <p className="font-semibold text-gray-900 mb-1">Belief in Tourism</p>
                <p>
                  This role believes tourism should respect the land and the people who guide you through it.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2">Professional Guides</h4>
                <p className="mb-3">
                  Our professional guides bring deep cultural and environmental knowledge, presence, and listening —
                  sharing stories with honesty and dignity while creating space for learning and shared understanding.
                </p>
                <p className="font-semibold text-gray-900 mb-1">Belief in Tourism</p>
                <p>
                  They believe tourism should tell real stories truthfully and respectfully, connecting people rather
                  than simply moving them from place to place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governance & Ethics */}
      <section id="governance" className="section-padding bg-gray-50">
        <div className="container-custom max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-purple-700" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Governance &amp; Ethics</h2>
              <p className="text-sm text-gray-600">
                How we ensure integrity, accountability, and Ubuntu‑aligned decision‑making.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-gray-700 mb-6">
            <p>
              Governance at Maka‑Laskas is anchored in Ubuntu: shared responsibility, transparency, and care for the
              collective. Our Code of Ethics &amp; Conduct, governance policies, and operational standards ensure that
              every decision honours people, planet, and purpose.
            </p>
            <p>
              We uphold clear commitments to integrity, anti‑corruption, inclusivity, traveler safety, data protection,
              and community accountability. These frameworks guide our teams, partners, and experiences across East and
              Southern Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-purple-700" />
                <p className="font-semibold text-gray-900 text-sm">Code of Ethics &amp; Conduct</p>
              </div>
              <p className="text-gray-700">
                Standards that promote integrity, respect, accountability, and safety in every journey.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Handshake className="w-4 h-4 text-orange-700" />
                <p className="font-semibold text-gray-900 text-sm">Justice, Equity &amp; Inclusion</p>
              </div>
              <p className="text-gray-700">
                Policies that centre fair partnerships, inclusive experiences, and protection of rights.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-green-700" />
                <p className="font-semibold text-gray-900 text-sm">Responsible Tourism Governance</p>
              </div>
              <p className="text-gray-700">
                Frameworks that align our operations with regenerative, people‑centred, Ubuntu‑driven tourism.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/mission"
              className="inline-flex items-center px-5 py-2 rounded-full border border-gray-900 text-gray-900 text-sm font-semibold hover:bg-gray-900 hover:text-white transition"
            >
              Explore our impact &amp; governance
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-2 rounded-full border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition"
            >
              Request our Governance &amp; Ethics documents
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
