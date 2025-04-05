import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import useAuthStore from "./store/useAuthStore.js";

function App() {
  const { checkAuth, user } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    if (user) navigate("/");
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pb-16">
        {" "}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
