import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    Company: [
      { label: 'About', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Press', path: '/press' },
      { label: 'Blog', path: '/blog' },
    ],
    Product: [
      { label: 'Features', path: '/features' },
      { label: 'Pricing', path: '/pricing' },
      { label: 'How It Works', path: '/how-it-works' },
      { label: 'FAQ', path: '/faq' },
    ],
    Resources: [
      { label: 'Documentation', path: '/docs' },
      { label: 'Support', path: '/support' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Privacy Policy', path: '/privacy' },
    ],
  };

  const socialLinks = [
    { Icon: Twitter, href: 'https://twitter.com' },
    { Icon: Facebook, href: 'https://facebook.com' },
    { Icon: Instagram, href: 'https://instagram.com' },
    { Icon: Linkedin, href: 'https://linkedin.com' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold">AvatarAI</span>
            </Link>
            <p className="mt-4 text-gray-500 max-w-md">
              Create and license unique AI avatars for your projects. Join our marketplace of digital identities.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                {category}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map(({ label, path }) => (
                  <li key={path}>
                    <Link
                      to={path}
                      className="text-base text-gray-500 hover:text-gray-900"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} AvatarAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}