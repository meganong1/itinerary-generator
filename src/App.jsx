import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Hero from "./components/custom/Hero";
import CreateTrip from "./create-trip/index.jsx";
import ViewTrip from "./view-trip/[tripId]/index.jsx";
import MyTrips from "./my-trips/index.jsx";
import Header from "./components/custom/Header";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/view-trip/:tripId" element={<ViewTrip />} />
        <Route path="/my-trips" element={<MyTrips />} />
      </Routes>
    </div>
  );
}

export default App;
