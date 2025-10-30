'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const leftContacts = [
    { label: 'Location', value: 'Kampala, Uganda, luafu road' },
    { label: 'Phone', value: '+256 765 190 820 +256 765 190 820' },
    { label: 'Email', value: 'info@makalaskas.com' },
    { label: 'Opening hours', value: '9:00 AM – 5:00 PM' }
  ];

  const menu1 = ['Home', 'Pages', 'Animals', 'Schedule', 'Gallery', 'Contacts', 'Foundation'];
  const menu2 = ['Documents', 'Association of Zoo', 'Aquarium', 'Terrarium', 'Terra Park', 'Cooperation', 'Library'];

  const insta = ['/img/img2.jpg','/img/img5.jpg','/img/img6.jpg','/img/img4.jpg','/img/img7.jpg','/img/img3.jpg'];

  const Social = (
    <div className="mt-6 flex gap-4">
      <Link href="#" className="rounded-full p-2 text-white hover:opacity-90" style={{background:'#1877f2'}} aria-label="Facebook"><Facebook className="h-4 w-4"/></Link>
      <Link href="#" className="rounded-full p-2 text-white hover:opacity-90" style={{background:'#1da1f2'}} aria-label="Twitter"><Twitter className="h-4 w-4"/></Link>
      <Link href="#" className="rounded-full p-2 text-white hover:opacity-90" style={{background:'#ff0000'}} aria-label="YouTube"><Youtube className="h-4 w-4"/></Link>
      <Link href="#" className="rounded-full p-2 text-white hover:opacity-90" style={{background:'#e1306c'}} aria-label="Instagram"><Instagram className="h-4 w-4"/></Link>
    </div>
  );

  return (
    <footer className="bg-[#121518] text-gray-200">
      <div className="container-custom">
        <div className="py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: brand and contacts */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <Image src="/maka-laskas-logo.png" alt="Maka-Laskas" width={48} height={48} className="h-12 w-12 object-contain"/>
                <div>
                  <div className="text-xl font-bold text-white">Maka-Laskas</div>
                  <div className="text-xs tracking-wide text-gray-400">AWESOME ZOO</div>
                </div>
              </div>
              <div className="mt-6 space-y-2 text-sm">
                {leftContacts.map((c) => (
                  <div key={c.label}><span className="text-gray-400">{c.label}: </span>{c.value}</div>
                ))}
              </div>
              {Social}
            </div>

            {/* Middle: menu & links */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-8">
              <div>
                <div className="mb-3 text-lg font-semibold text-white">Menu & Links</div>
                <ul className="space-y-2 text-sm">
                  {menu1.map((m)=> (
                    <li key={m}><Link href="#" className="hover:text-white">{m}</Link></li>
                  ))}
                </ul>
              </div>
              <div className="pt-8 lg:pt-8">
                <ul className="space-y-2 text-sm">
                  {menu2.map((m)=> (
                    <li key={m}><Link href="#" className="hover:text-white text-yellow-400">{m}</Link></li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Instagram grid */}
            <div className="lg:col-span-3">
              <div className="mb-3 text-lg font-semibold text-white">Instagram</div>
              <div className="grid grid-cols-3 gap-3">
                {insta.map((src, i)=> (
                  <div key={i} className="relative aspect-square overflow-hidden rounded">
                    <Image src={src} alt="insta" fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-sm text-gray-400 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">Privacy Policy <span className="opacity-40">|</span> Terms and Condition</div>
          <div className="opacity-70">&copy; {new Date().getFullYear()} Maka-Laskas. All rights reserved.</div>
          <div className="opacity-70">&copy; {new Date().getFullYear()} Designed by UiDesign U(LTD).</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
