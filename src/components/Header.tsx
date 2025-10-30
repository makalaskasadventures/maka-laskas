'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, Phone, LogOut, Settings, User, Globe2, ChevronDown, Facebook, Twitter, Youtube, Instagram } from 'lucide-react';

export default function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [openPrimary, setOpenPrimary] = useState<string | null>(null);

  const primary: Array<{
    name: string;
    href?: string;
    dropdown?: { name: string; href: string; isParent?: boolean }[];
  }> = [
    { name: 'Home', href: '/' },
    {
      name: 'About Us',
      href: '/about',
      dropdown: [
        { name: 'About Us', href: '/about', isParent: true },
        { name: "Our Journey & Origin", href: '/about' },
        { name: "Founder's Message", href: '/about' },
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
      dropdown: [
        { name: 'Media', href: '/media', isParent: true },
        { name: 'Newsroom & Blog', href: '/media/newsroom' },
        { name: 'Travel Stories', href: '/media/stories' },
        { name: 'Global Recognition & Awards', href: '/media/awards' },
        { name: "Founder's Keynotes", href: '/media/keynotes' },
        { name: 'Media Kit', href: '/media/kit' }
      ]
    },
    {
      name: 'Join the Movement',
      href: '/join',
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

  const secondary = [
    { name: 'Membership', href: '/join' },
    { name: 'Education', href: '/about' },
    { name: 'Map Zoo', href: '/adventures' },
    { name: 'Events', href: '/adventures' },
    { name: 'Donate', href: '/join' },
    { name: 'Foundation', href: '/about' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      {/* Top bar */}
      <div className="container-custom">
        <div className="flex h-20 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3">
            <Image src="/maka-laskas-logo.png" alt="Maka-Laskas logo" width={44} height={44} className="h-11 w-11 object-contain" />
            <div className="leading-tight">
              <span className="block text-xl font-extrabold text-gray-900">Maka-Laskas</span>
              <span className="block text-[11px] tracking-wide text-gray-500">Adventures</span>
            </div>
          </Link>

          {/* Desktop primary nav */}
          <nav className="hidden lg:flex items-center gap-2">
            {primary.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseLeave={() => setOpenPrimary(null)}
              >
                {!item.dropdown ? (
                  <Link
                    href={item.href || '#'}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <>
                    <Link
                      href={item.href || '#'}
                      onMouseEnter={() => setOpenPrimary(item.name)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 inline-flex items-center gap-1"
                    >
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </Link>
                    {openPrimary === item.name && (
                      <div
                        onMouseEnter={() => setOpenPrimary(item.name)}
                        onMouseLeave={() => setOpenPrimary(null)}
                        className="absolute left-0 top-full mt-2 w-80 rounded-md border border-gray-200 bg-white p-2 shadow-xl"
                      >
                        <div className="flex flex-col">
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className={sub.isParent ? 'px-3 py-2 text-sm font-semibold text-yellow-600 border-b border-gray-100' : 'px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded'}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-2">
              {session ? (
                <div className="relative group">
                <button className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900">
                  <span className="inline-flex items-center gap-2"><User className="h-4 w-4" />{session.user.name || session.user.email}</span>
                </button>
                <div className="invisible absolute right-0 mt-2 w-56 rounded-md border border-gray-200 bg-white p-2 opacity-0 shadow-md transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    {session.user.role === 'ADMIN' && (
                    <Link href="/admin" className="flex items-center gap-2 rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <Settings className="h-4 w-4" />Admin Dashboard
                    </Link>
                  )}
                  <button onClick={() => signOut({ callbackUrl: '/' })} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                    <LogOut className="h-4 w-4" />Sign Out
                    </button>
                  </div>
                </div>
              ) : (
              <div className="flex items-center gap-1">
                <Link href="/auth/signin" className="rounded px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Sign In</Link>
                <Link href="/auth/signup" className="rounded bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black">Sign Up</Link>
                </div>
              )}
            <Link href="/contact" className="inline-flex items-center gap-2 rounded bg-yellow-400 px-5 py-2 text-sm font-bold text-gray-900 hover:bg-yellow-500">
              Tickets
              </Link>
            </div>

          {/* Mobile trigger */}
            <button
            className="lg:hidden rounded p-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Bottom dark bar (desktop) */}
      <div className="hidden lg:block bg-gray-900 text-gray-200">
        <div className="container-custom">
          <div className="flex h-11 items-center justify-between">
            <div className="flex items-center gap-6">
              {secondary.map((s) => (
                <Link key={s.name} href={s.href} className="text-sm hover:text-white">
                  {s.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded bg-gray-800 px-3 py-1.5 text-xs text-gray-200 hover:bg-gray-700">
                English
                <ChevronDown className="h-3.5 w-3.5" />
            </button>
              <Link href="#" className="rounded bg-[#1877f2] p-2 text-white hover:opacity-90"><Facebook className="h-4 w-4" /></Link>
              <Link href="#" className="rounded bg-[#1da1f2] p-2 text-white hover:opacity-90"><Twitter className="h-4 w-4" /></Link>
              <Link href="#" className="rounded bg-[#ff0000] p-2 text-white hover:opacity-90"><Youtube className="h-4 w-4" /></Link>
              <Link href="#" className="rounded bg-[#e1306c] p-2 text-white hover:opacity-90"><Instagram className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
          </div>

      {/* Mobile menu panel */}
        {isOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white shadow">
          <div className="container-custom">
            <div className="py-3">
              <div className="flex flex-col divide-y divide-gray-100">
                <div className="py-2">
                  {primary.map((p) => (
                    <div key={p.name}>
                      {!p.dropdown ? (
                        <Link href={p.href || '#'} onClick={() => setIsOpen(false)} className="block px-1 py-3 text-sm font-medium text-gray-800">
                          {p.name}
                        </Link>
                      ) : (
                        <>
                          <button onClick={() => setOpenPrimary(openPrimary === p.name ? null : p.name)} className="flex w-full items-center justify-between px-1 py-3 text-left text-sm font-medium text-gray-800">
                            <span>{p.name}</span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${openPrimary === p.name ? 'rotate-180' : ''}`} />
                          </button>
                          {openPrimary === p.name && (
                            <div className="ml-3">
                              {p.dropdown.map((sub) => (
                                <Link key={sub.name} href={sub.href} onClick={() => setIsOpen(false)} className={sub.isParent ? 'block px-2 py-2 text-sm font-semibold text-yellow-600' : 'block px-2 py-2 text-sm text-gray-600'}>
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <div className="bg-gray-900/95 py-2">
                  <div className="grid grid-cols-2 gap-2">
                    {secondary.map((s) => (
                      <Link key={s.name} href={s.href} onClick={() => setIsOpen(false)} className="block rounded bg-gray-800 px-3 py-2 text-sm text-gray-200">
                        {s.name}
                        </Link>
                      ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between px-1">
                    <button className="inline-flex items-center gap-2 rounded bg-gray-800 px-3 py-2 text-xs text-gray-200">
                      English
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                    <div className="flex items-center gap-2">
                      <Link href="#" className="rounded bg-[#1877f2] p-2 text-white"><Facebook className="h-4 w-4" /></Link>
                      <Link href="#" className="rounded bg-[#1da1f2] p-2 text-white"><Twitter className="h-4 w-4" /></Link>
                      <Link href="#" className="rounded bg-[#ff0000] p-2 text-white"><Youtube className="h-4 w-4" /></Link>
                      <Link href="#" className="rounded bg-[#e1306c] p-2 text-white"><Instagram className="h-4 w-4" /></Link>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3">
                {session ? (
                  <>
                      <span className="px-1 text-sm text-gray-700">{session.user.name || session.user.email}</span>
                      <button onClick={() => { signOut({ callbackUrl: '/' }); setIsOpen(false); }} className="rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Sign Out
                    </button>
                  </>
                ) : (
                    <div className="flex gap-2">
                      <Link href="/auth/signin" onClick={() => setIsOpen(false)} className="rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">Sign In</Link>
                      <Link href="/auth/signup" onClick={() => setIsOpen(false)} className="rounded bg-gray-900 px-3 py-2 text-sm text-white hover:bg-black">Sign Up</Link>
                    </div>
                  )}
                  <Link href="/contact" onClick={() => setIsOpen(false)} className="rounded bg-yellow-400 px-4 py-2 text-sm font-bold text-gray-900">
                    Tickets
                    </Link>
                </div>
              </div>
              </div>
            </div>
          </div>
        )}
    </header>
  );
}
