'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Upload,
  Search,
  Grid3X3,
  User,
  ChevronDown,
  Menu,
  X,
  Bell,
  Info
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/contexts/AuthContext'; 
import Image from 'next/image';


interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: Array<{
    label: string;
    href: string;
    description?: string;
    icon?: React.ReactNode;
  }>;
}

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const navItems: NavItem[] = [
    {
      label: 'Why brainMap?',
      href: '/why-brainMap',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Decentralized Storage', href: '/features/decentralized', description: 'IPFS-powered security', icon: <Upload className="w-4 h-4" /> },
        { label: 'Academic Focus', href: '/features/academic', description: 'Built for researchers', icon: <Search className="w-4 h-4" /> },
        { label: 'No Subscriptions', href: '/features/free', description: 'Always free to use', icon: <Grid3X3 className="w-4 h-4" /> },
      ]
    },
    { label: 'Community', href: '/community', hasDropdown: false },
    ...(pathname !== '/login' && pathname !== '/register'
      ? [
        { label: 'Become a Mentor', href: '/becomementor' },
        { label: 'Hire a Mentor', href: '/hirementor' }
      ]
      : []),
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white backdrop-blur-xl border-b border-value2/20 shadow-lg'
          : 'bg-white backdrop-blur-sm border-b border-value3/30'
      }`}>
        <nav className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className='flex'>
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-3 group">
                  <div className="w-55 h-16 flex items-center justify-center">
                    <Image
                      width={100}
                      height={100}
                      src="/image/BrainMap.png"
                      alt="BrainMap Logo"
                      className="w-40 h-16 object-contain"
                      style={{ background: 'transparent' }}
                    />
                  </div>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                {navItems.map((item) => (
                  <div key={item.label} className="relative group">
                    {item.hasDropdown ? (
                      <button
                        onClick={() => handleDropdownToggle(item.label)}
                        className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                          ${item.label === 'Become a Mentor' ? 'font-bold' : ''}
                          ${activeDropdown === item.label
                            ? 'text-primary bg-value3/50'
                            : 'text-gray-700 hover:text-primary hover:bg-value3/30'}`}
                      >
                        {item.label}
                        <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`} />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                          ${item.label === 'Become a Mentor' ? 'font-bold' : ''}
                          text-gray-700 hover:text-primary hover:bg-value3/30`}
                      >
                        {item.label}
                      </Link>
                    )}

                    {/* Dropdown */}
                    {item.hasDropdown && activeDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-value2/20 z-50 overflow-hidden">
                        <div className="p-2">
                          {item.dropdownItems?.map((dropdownItem, index) => (
                            <Link
                              key={index}
                              href={dropdownItem.href}
                              className="flex items-start p-4 rounded-xl hover:bg-value3/30 transition-all duration-200 group"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center group-hover:from-primary/20 group-hover:to-secondary/20">
                                {dropdownItem.icon}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-semibold text-gray-900 group-hover:text-primary">{dropdownItem.label}</div>
                                {dropdownItem.description && (
                                  <div className="text-xs text-gray-500 mt-1">{dropdownItem.description}</div>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2">
                {pathname !== '/login' && pathname !== '/register' && (
                  <button className="p-2.5 text-gray-600 hover:text-primary hover:bg-value3/30 rounded-xl transition-all duration-200 group">
                    <Search className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  </button>
                )}

                {pathname !== '/login' && pathname !== '/register' ? (
                  <button className="p-2.5 text-gray-600 hover:text-primary hover:bg-value3/30 rounded-xl transition-all duration-200 group">
                    <Bell className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  </button>
                ) : (
                  <button className="p-2.5 text-gray-600 hover:text-primary hover:bg-value3/30 rounded-xl transition-all duration-200 group">
                    <Info className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  </button>
                )}
              </div>

              {/* Auth Section */}
              {user ? (
                <div className="flex items-center gap-3">
                  <Avatar className='w-10 h-10 bg-primary text-white font-semibold'>
                    <AvatarImage src="/default-avatar.png" alt="User Avatar" />
                    <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {/* <span className="text-sm font-medium">{user.email}</span> */}
                  <button
                    onClick={signOut}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                pathname !== '/login' && pathname !== '/register' && (
                  <Link
                    href="/login"
                    className="hidden sm:flex items-center bg-gradient-to-r bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:bg-secondary hover:text-black"
                  >
                    Sign In
                    <User className="ml-2 h-4 w-4" />
                  </Link>
                )
              )}

              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 text-gray-600 hover:text-primary hover:bg-value3/30 rounded-lg transition-all duration-200"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-value2/20">
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => handleDropdownToggle(item.label)}
                        className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-700 hover:text-primary hover:bg-value3/30 rounded-xl transition-all duration-200"
                      >
                        <span className="font-medium">{item.label}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`} />
                      </button>

                      {activeDropdown === item.label && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.dropdownItems?.map((dropdownItem, index) => (
                            <Link
                              key={index}
                              href={dropdownItem.href}
                              className="flex items-center p-3 text-sm text-gray-600 hover:text-primary hover:bg-value3/20 rounded-lg transition-all duration-200"
                              onClick={() => {
                                setActiveDropdown(null);
                                setIsMobileMenuOpen(false);
                              }}
                            >
                              <div className="w-8 h-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center mr-3">
                                {dropdownItem.icon}
                              </div>
                              <div>
                                <div className="font-medium">{dropdownItem.label}</div>
                                {dropdownItem.description && (
                                  <div className="text-xs text-gray-500">{dropdownItem.description}</div>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:text-primary hover:bg-value3/30 rounded-xl transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-4 border-t border-value2/20">
                {user ? (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      signOut();
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center justify-center bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                    <User className="ml-2 h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="h-5"></div>
    </>
  );
};

export default Navbar;
