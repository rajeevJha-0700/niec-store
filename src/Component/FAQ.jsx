// src/components/FAQ.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/file.svg";

function FAQ() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "What is this platform?",
      a: "This platform is a student-to-student marketplace where college students can buy and sell their used items such as books, gadgets, and other essentials directly to each other."
    },
    {
      q: "Do you charge any fees or commission?",
      a: "No. We do not charge any commission or service fee. The platform is completely free to use for all students."
    },
    {
      q: "How can I post my product for sale?",
      a: "Simply create a listing by adding the product’s name, price, description, image. Once submitted, your product will be visible to all users on the platform."
    },
    {
      q: "How can I contact a seller?",
      a: "Each product listing is linked to seller's info page where you will find mail id and phone number of the seller. You can directly contact the seller through that number to discuss price, product condition, and pickup details."
    },
    {
      q: "Do you manage or deliver the products?",
      a: "No. We only provide a platform to connect buyers and sellers. We do not handle delivery, storage, payment, or product verification."
    },
    {
      q: "Is my personal information safe?",
      a: "Yes. We do not share or sell user data to any third party. Your contact details are only shown to other users if you choose to display them while creating a listing."
    },
    {
      q: "What if someone posts inappropriate or illegal content?",
      a: "We strictly prohibit vulgar, illegal, or harmful content. If such a listing is reported or found, it will be removed immediately. Repeated violations may lead to account suspension."
    },
    {
      q: "What if there’s a problem with a transaction or the product?",
      a: "All transactions are handled directly between buyer and seller. We are not responsible for any dispute, fraud, or issue arising from the deal. Always verify the product before making payment."
    },
    {
      q: "Can I edit or delete my listing?",
      a: "Yes. You can edit or delete your listings anytime through your account dashboard."
    },
    {
      q: "Who can use this platform?",
      a: "This platform is made exclusively for college students above 18 years of age who want to buy or sell their pre-owned items within the campus community."
    },
    {
      q: "What kind of items are not allowed?",
      a: "We do not allow listings related to weapons, drugs, stolen goods, adult content, self-harm-related materials, or any item that violates college policies or the law."
    },
    {
      q: "How can I report a problem or suggest an improvement?",
      a: "You can contact us anytime at <span class='font-semibold text-red-600'>theneverold.shop@gmail.com</span> for support, feedback, or to report a listing."
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* Header with Logo + NEVEROLD */}
        <div className="text-center space-y-6 animate-fadeIn">
          <img
            src={logo}
            alt="NEVEROLD Logo"
            className="h-20 w-20 md:h-24 md:w-24 mx-auto object-contain"
          />
          <div className="inline-flex items-center text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight transition-all duration-300 group">
            <span className="text-red-600 group-hover:drop-shadow-[0_2px_6px_rgba(239,68,68,0.4)] transition-all duration-300">
              NEVER
            </span>
            <span className="text-gray-900 group-hover:drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)] transition-all duration-300">
              OLD
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Frequently Asked Questions (FAQ)
          </h1>
        </div>

        {/* Accordion */}
        <div className="space-y-4 animate-fadeIn animation-delay-200">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none group"
              >
                <span className="text-lg font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                  {index + 1}. {faq.q}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-4 pt-2">
                  <p
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: faq.a }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Home */}
        <div className="text-center pt-8 animate-fadeIn animation-delay-400">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:bg-red-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-10 0a1 1 0 01-1-1v-3a1 1 0 011-1h3a1 1 0 011 1v3" />
            </svg>
            Back to Home
          </button>
        </div>
      </div>

    </section>
  );
}

export default FAQ;