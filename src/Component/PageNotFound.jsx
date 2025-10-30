
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="text-center space-y-8 max-w-2xl animate-fadeIn">
        {/* 404 Text with Gradient */}
        <h1 className="text-9xl sm:text-10xl md:text-[12rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-gray-900 tracking-tighter animate-pulse">
          404
        </h1>

        {/* NEVEROLD Branding */}
        <div className="flex justify-center items-center space-x-0">
          <div className="inline-flex items-center text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight transition-all duration-300 group">
            <span className="text-red-600 group-hover:drop-shadow-[0_2px_6px_rgba(239,68,68,0.4)] transition-all duration-300">
              NEVER
            </span>
            <span className="text-gray-900 group-hover:drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)] transition-all duration-300">
              OLD
            </span>
          </div>
        </div>

        {/* Message */}
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-medium">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-base sm:text-lg text-gray-500 max-w-md mx-auto">
          It might have been moved, deleted, or you may have mistyped the URL.
        </p>

        {/* Back to Home Button */}
        <button
          onClick={() => navigate('/')}
          className="mt-8 inline-flex items-center px-8 py-4 bg-red-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:bg-red-700 hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out transform"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-10 0a1 1 0 01-1-1v-3a1 1 0 011-1h3a1 1 0 011 1v3" />
          </svg>
          Back to Home
        </button>
      </div>

    
    </div>
  );
}

export default PageNotFound;
