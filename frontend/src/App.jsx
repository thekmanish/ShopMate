import React from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <h1 className="flex-grow text-3xl">This is our ecom project</h1>
      </main>
      <Footer />
    </div>
  );
}

export default App;
