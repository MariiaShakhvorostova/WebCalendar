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
  const { user, setUser, fetchInitialData } = useAppStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        await fetchInitialData(user.uid);
      }
    });

    return () => unsubscribe();
  }, [setUser, fetchInitialData]);

  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route
          path="/"
          element={user ? <AppContent /> : <Navigate to="/welcome" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
