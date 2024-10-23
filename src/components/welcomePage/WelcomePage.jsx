import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../../api/auth";
import "./WelcomePage.css";

const WelcomePage = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  const handleSignIn = async () => {
    try {
      await AuthService.signInWithGoogle();
      setIsSignedIn(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  if (isSignedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container-body">
      <div className="container-w">
        <div className="logo-welcome" />
        <div className="button-welcome-container">
          <div className="icon-gg"></div>
          <button onClick={handleSignIn}>Continue with Google</button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
