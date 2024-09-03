import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Car } from '../context/CarContext';
import Button from './UI/Button';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const router = useRouter();

  const handleViewCarClick = () => {
    router.push(`/car/${car.id}`);
  };

  return (
    <li className="mb-4 p-2 border rounded shadow-lg">
      <div className="relative w-full h-32 mb-2 rounded overflow-hidden">
        <Image
          src={`/covers/${car.cover}`}
          alt={`${car.brand} ${car.model}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h3 className="text-sm font-bold">{car.brand} {car.model}</h3>
      <p className="text-sm">Year: {car.year}</p>
      <p className="text-sm">Price: ${car.price}</p>
      <Button
        onClick={handleViewCarClick}
        text="View Car"
        color="bg-blue-500"
        className="text-white p-2 rounded w-full mt-2"
      />
    </li>
  );
};

export default CarCard;
