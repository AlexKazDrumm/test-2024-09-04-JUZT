import React, { useEffect, useState } from 'react';
import ModalWrapper from '@/components/UI/ModalWrapper';
import AddCarForm from '@/components/Forms/AddCarForm';
import SelectActionModal from '@/components/Modals/SelectActionModal';
import Button from '@/components/UI/Button';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';

const AddCarPage = () => {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCarId, setNewCarId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }
  }, [user, router]);

  useEffect(() => {
    const newCarData = localStorage.getItem('newCarAdded');
    if (newCarData) {
      const { id } = JSON.parse(newCarData);
      setNewCarId(id);
      setIsModalOpen(true);
      localStorage.removeItem('newCarAdded');
    }
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!user) {
    return (
      <div className="p-6 max-w-lg mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="mb-4">You do not have permission to access this page.</p>
        <p className="text-gray-500">You will be redirected to the homepage in a few seconds.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Add New Car</h2>
        <Button
          onClick={() => router.push('/')}
          text="Back to Home"
          color="bg-blue-500"
        />
      </div>
      <AddCarForm />
      {isModalOpen && (
        <ModalWrapper onClose={closeModal}>
          <SelectActionModal onClose={closeModal} newCarId={newCarId} />
        </ModalWrapper>
      )}
    </div>
  );
};

export default AddCarPage;
