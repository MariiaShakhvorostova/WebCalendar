import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import WelcomePage from "./components/welcomePage/WelcomePage";
import AppContent from "./AppContent";
import useAppStore from "./useAppStore";
import { auth } from "../firebase";

function App() {
  return (
    <Router basename="/WebCalendar">
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/" element={<AppContent />} />
      </Routes>
    </Router>
  );
}

export default App;
