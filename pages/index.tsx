import React, { useState, useEffect } from 'react';
import { useUser } from '../src/context/UserContext';
import Filters from '../src/components/Filters';
import { useRouter } from 'next/router';
import Loader from '../src/components/Loader';
import Button from '../src/components/UI/Button';
import List from '../src/components/UI/List';
import CarCard from '../src/components/CarCard';

const HomePage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleAddCarClick = () => {
    router.push('/add-car');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome to Car Info App</h1>
          <p>Select a car to view details.</p>
        </div>
        {user && (
          <Button
            onClick={handleAddCarClick}
            text="Add New Car"
            color="bg-blue-500"
          />
        )}
      </div>

      <Filters>
        {(filteredCars) => {
          if (isLoading) {
            return <Loader />;
          }

          return (
            <List>
              {filteredCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </List>
          );
        }}
      </Filters>
    </div>
  );
};

export default HomePage;
