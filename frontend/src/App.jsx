import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import List from "./pages/List";
import ArtisanDetail from "./pages/ArtisanDetail";
import Category from "./pages/Category";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artisans" element={<List />} />
          <Route path="/artisans/:id" element={<ArtisanDetail />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
