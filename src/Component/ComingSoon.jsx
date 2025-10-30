// src/components/ComingSoon.jsx
import { useNavigate } from "react-router-dom";
import logo from "../assets/file.svg";
import { useState,useEffect } from "react";
function ComingSoon() {
  const navigate = useNavigate();

  // Optional: simple countdown (set your launch date)
  const launchDate = new Date("2025-12-01T00:00:00"); // change to your date
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full text-center space-y-12">
        {/* Logo + NEVEROLD */}
        <div className="flex flex-col items-center space-y-6 animate-fadeIn">
          <img
            src={logo}
            alt="NEVEROLD Logo"
            className="h-20 w-20 md:h-24 md:w-24 object-contain"
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

        {/* Coming Soon Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 animate-fadeIn animation-delay-200">
          Coming Soon
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-fadeIn animation-delay-400">
          We’re working hard to bring you an amazing student marketplace. Get ready to buy, sell, and reuse like never before!
        </p>

        {/* Countdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-md mx-auto animate-fadeIn animation-delay-600">
          {["days", "hours", "mins", "secs"].map((unit) => (
            <div
              key={unit}
              className="bg-white rounded-xl shadow-md p-4 md:p-5 text-center transform hover:scale-105 transition-transform duration-200"
            >
              <div className="text-3xl md:text-4xl font-bold text-red-600">
                {timeLeft[unit]}
              </div>
              <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">
                {unit === "mins" ? "Minutes" : unit === "secs" ? "Seconds" : unit}
              </div>
            </div>
          ))}
        </div>

        {/* Back to Home */}
        <button
          onClick={() => navigate("/")}
          className="mt-10 inline-flex items-center gap-2 px-8 py-3 bg-red-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:bg-red-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
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
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
      `}</style>
    </section>
  );
}

export default ComingSoon;