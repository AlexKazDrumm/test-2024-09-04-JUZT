import React from 'react';
import Button from '@/components/UI/Button';
import { useRouter } from 'next/router';

interface SelectActionModalProps {
  onClose: () => void;
  newCarId: number | null;
}

const SelectActionModal: React.FC<SelectActionModalProps> = ({ onClose, newCarId }) => {
  const router = useRouter();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Car Added Successfully</h2>
      <p>What would you like to do next?</p>
      <div className="mt-4 flex flex-col space-y-4">
        <Button
          onClick={() => {
            onClose();
            router.push('/');
          }}
          text="Go to Main"
          color="bg-blue-500"
        />
        <Button
          onClick={() => {
            onClose();
            router.push(`/car/${newCarId}`);
          }}
          text="Go to Car Page"
          color="bg-green-500"
        />
        <Button
          onClick={onClose}
          text="Stay Here"
          color="bg-gray-500"
        />
      </div>
    </div>
  );
};

export default SelectActionModal;
