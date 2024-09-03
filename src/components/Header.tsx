import React, { useState } from 'react';
import Button from '@/components/UI/Button';
import ModalWrapper from '@/components/UI/ModalWrapper';
import AuthModal from '@/components/Modals/AuthModal';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Header: React.FC = () => {
  const { user, logout } = useUser();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="cursor-pointer" onClick={() => router.push('/')}>
        <Image
          src="/images/logo.png"
          alt="Car Info App"
          width={120}
          height={40}
        />
      </div>

      <div>
        {!user ? (
          <>
            <Button
              text="Login/Register"
              color="bg-blue-500"
              onClick={() => setIsAuthModalOpen(true)}
            />
          </>
        ) : (
          <>
            <span className="mr-4">Welcome, {user.username}!</span>
            <Button
              text="Logout"
              color="bg-red-500"
              onClick={handleLogout}
            />
          </>
        )}
      </div>

      {isAuthModalOpen && (
        <ModalWrapper onClose={() => setIsAuthModalOpen(false)}>
          <AuthModal onClose={() => setIsAuthModalOpen(false)} />
        </ModalWrapper>
      )}
    </header>
  );
};

export default Header;
