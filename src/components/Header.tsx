'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, ChevronDown, Globe, Users, Heart, Star, Target, Lightbulb, MessageCircle, FileText, HelpCircle, Phone, User, LogOut, Settings } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { data: session, status } = useSession();

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  const navigationItems = [
    {
      name: 'About Us',
      href: '/about',
      icon: Users,
      dropdown: [
        { name: 'About Us', href: '/about', isParent: true },
        { name: 'Our Journey & Origin', href: '/about' },
        { name: 'Founder\'s Message', href: '/about' },
        { name: 'Ubuntu Philosophy', href: '/about' },
        { name: 'Interconnectedness & Healing Travel', href: '/about' },
        { name: 'Logo & Symbolism', href: '/about' },
        { name: 'PlanetGuard™', href: '/about#planetguard' },
        { name: 'PeopleFirst™', href: '/about#peoplefirst' },
        { name: 'CommUnityRise™', href: '/about#communityrise' },
        { name: 'UbuntuImpact™', href: '/about#ubuntuimpact' },
        { name: 'Code of Ethics & Conduct', href: '/about#ethics' },
        { name: 'Anti-Corruption & Transparency', href: '/about#anti-corruption' },
        { name: 'Inclusivity & Safety', href: '/about#inclusivity-safety' },
        { name: 'Client Health & Wellbeing', href: '/about#client-health' },
        { name: 'Data Protection & Privacy', href: '/about#data-privacy' }
      ]
    },
    {
      name: 'Our Adventures',
      href: '/adventures',
      icon: Globe,
      dropdown: [
        { name: 'Our Adventures', href: '/adventures', isParent: true },
        { name: 'Signature Journeys', href: '/adventures/signature' },
        { name: 'Ubuntu Trails', href: '/adventures/ubuntu-trails' },
        { name: 'Purposeful Safaris', href: '/adventures/safaris' },
        { name: 'Village Immersions', href: '/adventures/immersions' },
        { name: 'Founder-Led Healing Tours', href: '/adventures/healing' },
        { name: 'Nature & Wildlife', href: '/adventures/nature' },
        { name: 'Community & Culture', href: '/adventures/community' },
        { name: 'Climate & Conservation', href: '/adventures/climate' },
        { name: 'Healing & Spiritual Travel', href: '/adventures/spiritual' },
        { name: 'Youth Travel Packages', href: '/adventures/youth' },
        { name: 'Custom Group/Private Packages', href: '/adventures/custom' },
        { name: 'Itineraries & Pricing', href: '/adventures/pricing' },
        { name: 'Testimonials & Reviews', href: '/adventures/testimonials' },
        { name: 'Photo & Video Gallery', href: '/adventures/gallery' },
        { name: 'Interactive Map of Destinations', href: '/adventures/map' },
        { name: 'Booking & Payment Portal', href: '/adventures/booking' }
      ]
    },
    {
      name: 'Media',
      href: '/media',
      icon: FileText,
      dropdown: [
        { name: 'Media', href: '/media', isParent: true },
        { name: 'Newsroom & Blog', href: '/media/newsroom' },
        { name: 'Travel Stories', href: '/media/stories' },
        { name: 'Global Recognition & Awards', href: '/media/awards' },
        { name: 'Founder\'s Keynotes', href: '/media/keynotes' },
        { name: 'Media Kit', href: '/media/kit' }
      ]
    },
    {
      name: 'Join the Movement',
      href: '/join',
      icon: Lightbulb,
      dropdown: [
        { name: 'Join the Movement', href: '/join', isParent: true },
        { name: 'Partnerships & Impact', href: '/join#partnerships' },
        { name: 'Career Opportunities', href: '/join#careers' },
        { name: 'Volunteer & Fellowship Program', href: '/join/volunteer' },
        { name: 'Internship Opportunities', href: '/join/internships' },
        { name: 'Movement Ambassadors', href: '/join/ambassadors' }
      ]
    }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Globe className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Maka-Laskas</h1>
              <p className="text-sm text-gray-600 -mt-1">Adventures</p>
            </div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center justify-center flex-1 space-x-1">
            {/* Home Button */}
            <Link 
              href="/" 
              className="px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium"
            >
              Home
            </Link>

            {navigationItems.map((item) => (
              <div key={item.name} className="relative group">
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className="px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium flex items-center space-x-1"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                </button>

                {/* Dropdown Menu */}
                {openDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    <div className="grid grid-cols-1 gap-1">
                      {item.name === 'Partnerships & Impact' && (
                        <>
                          {item.dropdown.slice(0, 1).map((subItem: any) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={closeDropdown}
                              className={subItem.isParent ? "px-4 py-3 text-orange-600 font-semibold hover:bg-orange-50 transition-all duration-200 flex items-center space-x-3 border-b border-gray-200" : "px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 flex items-center space-x-3 group/item"}
                            >
                              <div className={subItem.isParent ? "w-2 h-2 bg-orange-600 rounded-full" : "w-2 h-2 bg-orange-500 rounded-full group-hover/item:scale-125 transition-transform"}></div>
                              <span className="text-sm">{subItem.name}</span>
                            </Link>
                          ))}
                          <div className="px-4 py-2 border-b border-gray-100">
                            <h4 className="text-xs font-semibold text-orange-600 uppercase tracking-wide">Partnerships</h4>
                          </div>
                          {item.dropdown.slice(1, 7).map((subItem: any) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={closeDropdown}
                              className="px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 flex items-center space-x-3 group/item"
                            >
                              <div className="w-2 h-2 bg-orange-500 rounded-full group-hover/item:scale-125 transition-transform"></div>
                              <span className="text-sm">{subItem.name}</span>
                            </Link>
                          ))}
                          <div className="px-4 py-2 border-b border-gray-100 mt-2">
                            <h4 className="text-xs font-semibold text-orange-600 uppercase tracking-wide">Impact</h4>
                          </div>
                          {item.dropdown.slice(7).map((subItem: any) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={closeDropdown}
                              className="px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 flex items-center space-x-3 group/item"
                            >
                              <div className="w-2 h-2 bg-orange-500 rounded-full group-hover/item:scale-125 transition-transform"></div>
                              <span className="text-sm">{subItem.name}</span>
                            </Link>
                          ))}
                        </>
                      )}
                      {item.name !== 'Partnerships & Impact' && item.dropdown.map((subItem: any) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={closeDropdown}
                          className={subItem.isParent ? "px-4 py-3 text-orange-600 font-semibold hover:bg-orange-50 transition-all duration-200 flex items-center space-x-3 border-b border-gray-200" : "px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 flex items-center space-x-3 group/item"}
                        >
                          <div className={subItem.isParent ? "w-2 h-2 bg-orange-600 rounded-full" : "w-2 h-2 bg-orange-500 rounded-full group-hover/item:scale-125 transition-transform"}></div>
                          <span className="text-sm">{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
              
              {session ? (
                <div className="relative group">
                  <button className="px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{session.user.name || session.user.email}</span>
                    {session.user.role === 'ADMIN' && (
                      <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full ml-1">
                        Admin
                      </span>
                    )}
                  </button>
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{session.user.name || 'User'}</p>
                      <p className="text-xs text-gray-500">{session.user.email}</p>
                      {session.user.role === 'ADMIN' && (
                        <span className="inline-block mt-1 bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                          Administrator
                        </span>
                      )}
                    </div>
                    {session.user.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-orange-50 transition-colors flex items-center space-x-2"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-orange-50 transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/auth/signin" className="px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium">
                    Sign In
                  </Link>
                  <Link href="/auth/signup" className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-200 font-medium">
                    Sign Up
                  </Link>
                </div>
              )}

              <Link href="/contact" className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-200 font-medium flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Contact</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white absolute top-full left-0 right-0 shadow-lg max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="py-4 px-4 space-y-2">
              {/* Home Button */}
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium"
              >
                Home
              </Link>

              {navigationItems.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="w-full text-left px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                  </button>

                  {openDropdown === item.name && (
                    <div className="ml-6 mt-2 space-y-1 pb-2">
                      {item.dropdown.map((subItem: any) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => {
                            setIsOpen(false);
                            closeDropdown();
                          }}
                          className={subItem.isParent ? "block px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 mb-2 border-b border-gray-200 pb-3" : "block px-4 py-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200"}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Action Buttons */}
              <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
                {session ? (
                  <>
                    <div className="px-4 py-3 bg-gray-50 rounded-lg mb-3">
                      <p className="text-sm font-medium text-gray-900">{session.user.name || 'User'}</p>
                      <p className="text-xs text-gray-500">{session.user.email}</p>
                      {session.user.role === 'ADMIN' && (
                        <span className="inline-block mt-1 bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                          Administrator
                        </span>
                      )}
                    </div>
                    {session.user.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium flex items-center space-x-3"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: '/' })
                        setIsOpen(false)
                      }}
                      className="w-full text-left px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium flex items-center space-x-3"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/signin"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium text-center"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-200 font-medium text-center"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
                
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Contact</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
