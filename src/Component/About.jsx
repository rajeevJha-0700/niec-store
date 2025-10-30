// src/components/About.jsx
import { useNavigate } from "react-router-dom";
import logo from "../assets/file.svg";

function About() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      {/* Hero */}
      <div className="max-w-5xl mx-auto text-center space-y-12">
        {/* Logo + NEVEROLD */}
        <div className="flex flex-col items-center space-y-6">
          <img
            src={logo}
            alt="NEVEROLD Logo"
            className="h-20 w-20 md:h-24 md:w-24 object-contain animate-fadeIn"
          />
          <div className="inline-flex items-center text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight transition-all duration-300 group">
            <span className="text-red-600 group-hover:drop-shadow-[0_2px_6px_rgba(239,68,68,0.4)] transition-all duration-300">
              NEVER
            </span>
            <span className="text-gray-900 group-hover:drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)] transition-all duration-300">
              OLD
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 animate-fadeIn animation-delay-200">
          About Us
        </h1>

        {/* Body */}
        <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto animate-fadeIn animation-delay-400">
          We are a <strong>student-driven platform</strong> built to help college
          students easily buy and sell their pre-owned items within the campus.
          Our goal is to create a <strong>trusted space</strong> where students
          can find useful products at affordable prices while giving old items a
          new life. From books and gadgets to stationaries, we make it
          simple to list, discover, and connect with others — promoting reuse,
          sustainability, and community interaction in every transaction.
        </p>

        {/* Back to Home */}
        <button
          onClick={() => navigate("/")}
          className="mt-8 inline-flex items-center gap-2 px-8 py-3 bg-red-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:bg-red-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-10 0a1 1 0 01-1-1v-3a1 1 0 011-1h3a1 1 0 011 1v3"
            />
          </svg>
          Back to Home
        </button>
      </div>

      {/* Fade-in keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </section>
  );
}

export default About;