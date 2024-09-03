import React, { useState } from 'react';
import Login from '../Forms/LoginForm';
import Register from '../Forms/RegisterForm';

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <div>
      <div className="flex justify-center mb-4">
        <div
          className={`cursor-pointer px-4 py-2 rounded-l-lg ${
            isLoginMode ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => setIsLoginMode(true)}
        >
          Login
        </div>
        <div
          className={`cursor-pointer px-4 py-2 rounded-r-lg ${
            !isLoginMode ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => setIsLoginMode(false)}
        >
          Register
        </div>
      </div>
      {isLoginMode ? (
        <Login onSuccess={onClose} />
      ) : (
        <Register onSuccess={onClose} />
      )}
    </div>
  );
};

export default AuthModal;
