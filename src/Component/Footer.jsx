import { Link } from "react-router-dom";
import { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  const footerLinks = [
    {
      title: "Shop",
      links: [
        { name: "Home", path: "/" },
        { name: "Products", path: "/" },
        { name: "Categories", path: "/" },
        { name: "Cart", path: "/cart" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", path: "/contact" },
        { name: "FAQs", path: "/faqs" },
        { name: "Returns", path: "/returns" },
        { name: "Shipping", path: "/shipping" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Twitter",
      path: "https://twitter.com",
      icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
    },
    {
      name: "Facebook",
      path: "https://facebook.com",
      icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
    },
    {
      name: "Instagram",
      path: "https://instagram.com",
      icon: "M16.5 3h-9A4.5 4.5 0 003 7.5v9A4.5 4.5 0 007.5 21h9a4.5 4.5 0 004.5-4.5v-9A4.5 4.5 0 0016.5 3zm-4.5 15a6 6 0 110-12 6 6 0 010 12zm6-10.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
    },
    {
      name: "LinkedIn",
      path: "https://linkedin.com",
      icon: "M16 8a6 6 0 00-6 6v7h-4v-7a10 10 0 010-20h4v7a6 6 0 006 6z",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-red-500 mb-4">NEVEROLD</h3>
            <p className="text-gray-300 mb-4">Find what seniors have</p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-red-500 transition-all duration-300 transform hover:scale-110"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-red-500 hover:underline transition-all duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
         
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300">&copy; {new Date().getFullYear()} NEVEROLD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
