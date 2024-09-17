import React from "react";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Feature from "./components/Feature";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />

      <HomePage />

      <Feature />
      <Footer />
    </div>
  );
}

export default App;
