import React, { createContext, useContext, useState, ReactNode } from 'react';
import carsData from '../../data/cars.json';

export interface Car {
  id: number;
  brand: string;
  model: string;
  color: string;
  price: number;
  year: number;
  engineType: string;
  transmission: string | null;
  range: number | null;
  cover: string;
}

interface CarContextType {
  cars: Car[];
  addCar: (car: Car) => void;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider = ({ children }: { children: ReactNode }) => {
  const [cars, setCars] = useState<Car[]>(carsData);

  const addCar = (car: Car) => {
    setCars([...cars, car]);
  };

  return (
    <CarContext.Provider value={{ cars, addCar }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCar = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCar must be used within a CarProvider');
  }
  return context;
};
