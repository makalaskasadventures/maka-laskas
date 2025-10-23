'use client';

import { Globe, Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Mission', href: '/mission' },
      { name: 'Team', href: '/team' },
      { name: 'Careers', href: '/careers' },
    ],
    adventures: [
      { name: 'Signature Journeys', href: '/adventures/signature' },
      { name: 'Ubuntu Trails', href: '/adventures/ubuntu-trails' },
      { name: 'Purposeful Safaris', href: '/adventures/safaris' },
      { name: 'Village Immersions', href: '/adventures/immersions' },
    ],
    destinations: [
      { name: 'Uganda', href: '/destinations/uganda' },
      { name: 'Tanzania', href: '/destinations/tanzania' },
      { name: 'Rwanda', href: '/destinations/rwanda' },
      { name: 'Kenya', href: '/destinations/kenya' },
      { name: 'Burundi', href: '/destinations/burundi' },
      { name: 'DRC', href: '/destinations/drc' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Travel Insurance', href: '/insurance' },
      { name: 'Emergency Contact', href: '/emergency' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Maka-Laskas</h3>
                  <p className="text-sm text-gray-400">Adventures</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                "I Am Because You Are, Together We Explore." We create transformative 
                travel experiences across East Africa, connecting people with nature, 
                culture, and community through our Ubuntu-inspired adventures.
              </p>
              
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-orange-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Adventures Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Adventures</h4>
              <ul className="space-y-2">
                {footerLinks.adventures.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-orange-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Destinations Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Destinations</h4>
              <ul className="space-y-2">
                {footerLinks.destinations.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-orange-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-semibold mb-2">
                Get Travel Inspiration Straight to Your Inbox
              </h4>
              <p className="text-gray-400">
                Subscribe to our newsletter for exclusive promotions and travel stories.
              </p>
            </div>
            <div className="flex w-full lg:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-64 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-white placeholder-gray-400"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm">
              <p>&copy; 2024 Maka-Laskas Adventures Company Ltd. All rights reserved.</p>
              <p className="mt-1">
                Registered in Uganda | VAT Number: [To be added]
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-orange-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-orange-400 transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-orange-400 transition-colors">
                Sitemap
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Language:</span>
                <select className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white text-sm">
                  <option value="en">EN</option>
                  <option value="fr">FR</option>
                  <option value="sw">SW</option>
                  <option value="ar">AR</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
