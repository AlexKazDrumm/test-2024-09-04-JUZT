import React, { useState } from 'react';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import { useUser } from '@/context/UserContext';
import { registerApi } from '@/features/authApi';

interface RegisterProps {
  onSuccess: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();

  const handleRegister = async () => {
    try {
      await registerApi(username, password);
      login(username);
      onSuccess();
    } catch (error: any) {
      console.error("Registration failed:", error.response ? error.response.data : error.message);
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-black">Register</h2>
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 mb-2 border rounded text-black"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-2 border rounded text-black"
      />
      <Button
        text="Register"
        color="bg-green-500"
        onClick={handleRegister}
        className="w-full p-2 mt-4 rounded"
      />
    </div>
  );
};

export default Register;
