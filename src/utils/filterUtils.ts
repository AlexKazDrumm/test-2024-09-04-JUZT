import { Car } from '../context/CarContext';

interface FilterParams {
  cars: Car[];
  selectedColors: string[];
  selectedBrands: string[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export const getColorCount = (filteredCars: Car[], color: string) =>
  filteredCars.filter(car => car.color === color).length;

export const getBrandCount = (filteredCars: Car[], brand: string) =>
  filteredCars.filter(car => car.brand === brand).length;

export const filteredElements = ({
  cars,
  selectedColors,
  selectedBrands,
  sortBy,
  sortOrder,
}: FilterParams): Car[] => {
  return cars
    .filter(car =>
      (selectedColors.length === 0 || selectedColors.includes(car.color)) &&
      (selectedBrands.length === 0 || selectedBrands.includes(car.brand))
    )
    .sort((a, b) => {
      if (sortBy === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      }
      return sortOrder === 'asc' ? a.year - b.year : b.year - a.year;
    });
};