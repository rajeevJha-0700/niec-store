// src/components/Contacts.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/file.svg";

function Contacts() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-6 animate-fadeIn">
          <img src={logo} alt="NEVEROLD" className="h-20 w-20 md:h-24 md:w-24 mx-auto" />
          <div className="inline-flex text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight">
            <span className="text-red-600">NEVER</span>
            <span className="text-gray-900">OLD</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Reach out anytime — we’re here to help!
          </p>
        </div>

        {/* Email Card */}
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto text-center animate-fadeIn animation-delay-200">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-700 mb-4">Send us an email at:</p>
          <a
            href="mailto:theneverold.shop@gmail.com"
            className="text-xl font-bold text-red-600 hover:underline"
          >
            theneverold.shop@gmail.com
          </a>
        </div>

        {/* Back to Home */}
        <div className="text-center pt-8 animate-fadeIn animation-delay-400">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 text-white font-bold rounded-xl shadow hover:bg-red-700 hover:scale-105 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-10 0a1 1 0 01-1-1v-3a1 1 0 011-1h3a1 1 0 011 1v3" />
            </svg>
            Back to Home
          </button>
        </div>
      </div>

     
    </section>
  );
}

export default Contacts;