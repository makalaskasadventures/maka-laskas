'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Leaf,
  TreePine,
  Heart,
  Droplets,
  Sprout,
  ShieldCheck,
  ArrowRight,
  Check,
  Users,
  Mountain,
  Globe,
} from 'lucide-react';

const impactAreas = [
  {
    title: 'Wildlife & Habitats',
    description: 'Support rangers, anti-poaching efforts, and habitat restoration so wildlife can thrive.',
    icon: Mountain,
    color: 'bg-emerald-700',
    textColor: 'text-emerald-700',
  },
  {
    title: 'Communities',
    description: 'Empower local families through education, clean water, and sustainable livelihoods.',
    icon: Users,
    color: 'bg-teal-600',
    textColor: 'text-teal-600',
  },
  {
    title: 'Reforestation',
    description: 'Fund tree planting and land restoration in partnership with communities.',
    icon: TreePine,
    color: 'bg-green-700',
    textColor: 'text-green-700',
  },
  {
    title: 'Conservation & Education',
    description: 'Environmental education, youth programs, and Ubuntu stewardship initiatives.',
    icon: Sprout,
    color: 'bg-lime-700',
    textColor: 'text-lime-700',
  },
];

const presetAmounts = [25, 50, 100, 250, 500, 1000];

export default function DonatePage() {
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [designation, setDesignation] = useState('general');
  const [submitted, setSubmitted] = useState(false);

  const displayAmount = amount ?? (customAmount ? Number(customAmount) : null);
  const isValid = displayAmount != null && displayAmount > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero – nature green */}
      <section className="relative min-h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/img/img5.jpg"
            alt="Nature and community"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-emerald-900/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-emerald-900/30" />
        </div>
        <div className="relative z-10 container-custom min-h-[50vh] flex flex-col justify-center py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-1.5 text-sm font-medium text-emerald-100 mb-6">
              <Leaf className="w-4 h-4" />
              Give back. Grow impact.
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              Protect What We Love
            </h1>
            <p className="text-lg md:text-xl text-emerald-50/95 max-w-xl">
              Your donation supports wildlife, communities, and the wild places that make every Maka‑Laskas journey
              possible. Together we restore, empower, and leave a legacy.
            </p>
          </div>
        </div>
        {/* Decorative leaf accent */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-50 to-transparent" />
      </section>

      {/* Impact areas – cards with icons */}
      <section className="section-padding relative z-10">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3">
              Where Your Gift Goes
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Every contribution is used where it matters most in the hands of communities and on the ground for
              nature.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactAreas.map((area, i) => (
              <div
                key={area.title}
                className="group bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${area.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}
                >
                  <area.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={`font-semibold text-lg ${area.textColor} mb-2`}>{area.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation form – nature green card */}
      <section className="section-padding bg-white border-y border-stone-200">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2">
                    Choose your impact
                  </h2>
                  <p className="text-stone-600">
                    One-time gift. 100% of donations go to our impact funds (minus standard payment processing).
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-3">
                    Amount (USD)
                  </label>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {presetAmounts.map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => {
                          setAmount(a);
                          setCustomAmount('');
                        }}
                        className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
                          amount === a
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-stone-100 text-stone-700 hover:bg-emerald-50 hover:text-emerald-700'
                        }`}
                      >
                        ${a}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-stone-500">Or</span>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      placeholder="Custom amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setAmount(null);
                      }}
                      className="flex-1 max-w-[180px] px-4 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                    <span className="text-stone-500">USD</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-3">
                    Designate your gift (optional)
                  </label>
                  <select
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
                  >
                    <option value="general">General Impact Fund</option>
                    <option value="wildlife">Wildlife & Habitats</option>
                    <option value="communities">Communities</option>
                    <option value="reforestation">Reforestation</option>
                    <option value="education">Conservation & Education</option>
                  </select>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={!isValid}
                    className="inline-flex items-center px-8 py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-900/20"
                  >
                    Donate {displayAmount != null ? `$${displayAmount}` : ''}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                  <p className="text-sm text-stone-500 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Secure payment. We never store card details.
                  </p>
                </div>
              </form>
            ) : (
              <div className="text-center py-12 px-6 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-stone-900 mb-2">Thank you</h2>
                <p className="text-stone-600 mb-6 max-w-md mx-auto">
                  Your generosity helps protect wildlife, empower communities, and restore nature. We&apos;ll send a
                  confirmation and impact update to your email.
                </p>
                <Link
                  href="/join"
                  className="inline-flex items-center text-emerald-700 font-semibold hover:text-emerald-800"
                >
                  Join the Movement
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust – transparency */}
      <section className="section-padding bg-stone-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                <Droplets className="w-7 h-7 text-teal-700" />
              </div>
              <h3 className="font-semibold text-stone-900 mb-2">Transparent Use</h3>
              <p className="text-stone-600 text-sm">
                Funds go directly to our impact partners and projects; we publish annual impact reports.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                <Heart className="w-7 h-7 text-emerald-700" />
              </div>
              <h3 className="font-semibold text-stone-900 mb-2">Ubuntu Led</h3>
              <p className="text-stone-600 text-sm">
                Every project is co-designed with communities and aligned with our Code of Ethics.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Globe className="w-7 h-7 text-green-700" />
              </div>
              <h3 className="font-semibold text-stone-900 mb-2">Global Reach</h3>
              <p className="text-stone-600 text-sm">
                Your gift supports work across East and Southern Africa, wildlife, forests, and people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA – support a project */}
      <section className="section-padding bg-gradient-to-br from-emerald-800 via-green-800 to-teal-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prefer to support a specific project?
          </h2>
          <p className="text-emerald-100/90 max-w-2xl mx-auto mb-8">
            Explore our Roots Reforestation, Women of the Wild, and Ubuntu Classrooms initiatives — or partner with us
            for a custom impact.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/mission#impact-stories"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-white text-emerald-800 font-semibold hover:bg-emerald-50 transition"
            >
              View Impact Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 rounded-xl border-2 border-white text-white font-semibold hover:bg-white hover:text-emerald-800 transition"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
