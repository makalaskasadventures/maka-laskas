'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Linkedin, Globe2, CreditCard } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#121518] text-gray-200">
      <div className="container-custom">
        <div className="py-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Brand, mission & CTA */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <Image
                src="/maka-laskas-logo.png"
                alt="Maka-Laskas"
                width={56}
                height={56}
                className="h-14 w-14 object-contain"
              />
              <div>
                <div className="text-xl font-bold text-white">Maka‑Laskas Adventures</div>
                <div className="text-xs tracking-wide text-orange-300 uppercase">
                  Home of Ubuntu Tourism
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Travel with purpose. Make an impact.
              <br />
              Join the Maka‑Laskas Global Citizenship Movement.
            </p>
            <Link
              href="/join"
              className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500 text-white text-sm font-semibold hover:bg-orange-400 transition"
            >
              Learn more / Join the Movement
            </Link>
          </div>

          {/* Quick Navigation – Explore */}
          <div className="lg:col-span-3">
            <h3 className="mb-3 text-sm font-semibold tracking-[0.25em] uppercase text-gray-400">
              Explore
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <div className="mb-2 font-semibold text-white">Home</div>
                <ul className="space-y-1">
                  <li><Link href="/" className="hover:text-white">Home</Link></li>
                  <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                  <li><Link href="/adventures" className="hover:text-white">Our Adventures</Link></li>
                  <li><Link href="#" className="hover:text-white">Founder‑Led Signature Tours</Link></li>
                  <li><Link href="#" className="hover:text-white">Destinations</Link></li>
                  <li><Link href="/mission" className="hover:text-white">Partnership &amp; Impact</Link></li>
                  <li><Link href="/join" className="hover:text-white">Join the Movement</Link></li>
                  <li><Link href="#" className="hover:text-white">Global Citizenship Certificate</Link></li>
                  <li><Link href="/media" className="hover:text-white">Media</Link></li>
                  <li><Link href="#" className="hover:text-white">Traveller Dashboard</Link></li>
                  <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Company & Connect */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-6 text-sm">
            <div>
              <div className="mb-2 font-semibold text-white">Company</div>
              <ul className="space-y-1">
                <li><Link href="#" className="hover:text-white">Company Profile</Link></li>
                <li><Link href="#" className="hover:text-white">Code of Ethics &amp; Conduct</Link></li>
                <li><Link href="#" className="hover:text-white">Governance &amp; Policies</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms &amp; Conditions</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <div className="mb-2 font-semibold text-white">Connect</div>
              <ul className="space-y-1">
                <li><Link href="/contact" className="hover:text-white">Partner With Us</Link></li>
                <li><Link href="#" className="hover:text-white">Become an Ambassador</Link></li>
                <li><Link href="/join" className="hover:text-white">Careers / Volunteer Opportunities</Link></li>
                <li><Link href="#" className="hover:text-white">FAQs</Link></li>
                <li><Link href="/contact" className="hover:text-white">Feedback &amp; Support</Link></li>
              </ul>
            </div>
          </div>

          {/* Follow Us & trust row */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <div className="mb-2 font-semibold text-white">Follow Us</div>
              <div className="flex items-center gap-3">
                <Link href="#" aria-label="Instagram" className="rounded-full p-2 bg-white/5 hover:bg-white/15">
                  <Instagram className="h-4 w-4" />
                </Link>
                <Link href="#" aria-label="YouTube" className="rounded-full p-2 bg-white/5 hover:bg-white/15">
                  <Youtube className="h-4 w-4" />
                </Link>
                <Link href="#" aria-label="Facebook" className="rounded-full p-2 bg-white/5 hover:bg-white/15">
                  <Facebook className="h-4 w-4" />
                </Link>
                <Link href="#" aria-label="LinkedIn" className="rounded-full p-2 bg-white/5 hover:bg-white/15">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="space-y-3 text-xs text-gray-400">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Globe2 className="h-4 w-4 text-gray-300" />
                  <span>Language</span>
                </div>
                <select
                  className="bg-black/30 border border-white/10 rounded-full px-3 py-1 text-xs outline-none"
                  defaultValue="EN"
                >
                  <option value="EN">EN</option>
                  <option value="FR">FR</option>
                  <option value="SW">SW</option>
                  <option value="PT">PT</option>
                </select>
              </div>

              <div>
                <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-gray-500">
                  Certifications (coming soon)
                </div>
                <div className="flex flex-wrap gap-2">
                  {['UTB', 'ATB', 'UN Tourism', 'ATTA'].map((label) => (
                    <span
                      key={label}
                      className="px-2 py-1 rounded-full border border-white/10 text-[11px] text-gray-300"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-1 text-[11px] uppercase tracking-[0.18em] text-gray-500">
                  Secure Payments
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-gray-300" />
                  <span className="text-[11px] text-gray-300">Visa · MasterCard · PayPal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-xs md:text-sm text-gray-400 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            &copy; 2025 Maka‑Laskas Adventures Company Ltd. Home of Ubuntu Tourism.
          </div>
          <div className="text-gray-400">
            Rooted in Ubuntu, Inspiring Global Connection. Designed for a Sustainable Future.
          </div>
          <div className="text-gray-500">
            Website by <span className="text-gray-300">Developer Company</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
