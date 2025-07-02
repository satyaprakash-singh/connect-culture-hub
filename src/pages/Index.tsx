
import { useState, useEffect } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { MainApp } from "@/components/MainApp";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    return <MainApp currentUser={currentUser} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">SocialHub</h1>
          <p className="text-gray-600">Connect with friends and share your moments</p>
        </div>
        
        {showSignup ? (
          <SignupForm
            onSignup={handleLogin}
            onSwitchToLogin={() => setShowSignup(false)}
          />
        ) : (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToSignup={() => setShowSignup(true)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
