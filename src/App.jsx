import { login, logout } from "./Store/Slice/AuthSlice.js";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Auth } from "./Database/Auth.js";
import Footer from "./Component/Footer.jsx";
import Header from "./Component/Header.jsx";
import { Outlet,ScrollRestoration } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await Auth.getCurrentUser();
        if (userData?.data) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error in fetching currentUser, App.jsx...", error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
        </div>
      ) : (
        <>
          <ScrollRestoration />
          <Header />
          <main className="flex-grow container mx-auto px-4 py-16">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
