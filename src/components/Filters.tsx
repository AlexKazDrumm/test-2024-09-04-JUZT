import React, { useState, ReactNode, useMemo } from 'react';
import { useCar, Car } from '../context/CarContext';
import CheckboxGroup from './CheckboxGroup';
import Pagination from './Pagination';
import Select from './UI/Select';
import Button from './UI/Button';
import { getColorCount, getBrandCount, filteredElements } from '../utils/filterUtils';

interface FiltersProps {
  children: (filteredCars: Car[]) => ReactNode;
}

const Filters: React.FC<FiltersProps> = ({ children }) => {
  const { cars } = useCar();
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const uniqueColors = useMemo(() => {
    return Array.from(new Set(cars.map(car => car.color))).sort();
  }, [cars]);

  const uniqueBrands = useMemo(() => {
    return Array.from(new Set(cars.map(car => car.brand))).sort();
  }, [cars]);

  const handleColorChange = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const filteredCars = useMemo(() => {
    return filteredElements({
      cars,
      selectedColors,
      selectedBrands,
      sortBy,
      sortOrder,
    });
  }, [cars, selectedColors, selectedBrands, sortBy, sortOrder]);

  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

  const resetFilters = () => {
    setSelectedColors([]);
    setSelectedBrands([]);
    setSortBy('price');
    setSortOrder('asc');
    setCurrentPage(1);
  };

  return (
    <div className="flex">
      <div className="w-1/4 p-4">
        <div className="mb-4">
          <CheckboxGroup
            title="Filter by Color"
            options={uniqueColors}
            selectedOptions={selectedColors}
            onChange={handleColorChange}
            getCount={(color: string) => getColorCount(filteredCars, color)}
          />
        </div>

        <div>
          <CheckboxGroup
            title="Filter by Brand"
            options={uniqueBrands}
            selectedOptions={selectedBrands}
            onChange={handleBrandChange}
            getCount={(brand: string) => getBrandCount(filteredCars, brand)}
          />
        </div>

        <Button
          onClick={resetFilters}
          text="Reset Filters"
          color="bg-red-500"
          className="mt-4 text-white p-2 rounded"
        />
      </div>

      <div className="w-3/4 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={[
                { value: 'price', label: 'Price' },
                { value: 'year', label: 'Year' }
              ]}
              className="p-2 border rounded"
            />
            <div className="ml-2 flex">
              <Button
                onClick={() => setSortOrder('asc')}
                text="↑"
                color={sortOrder === 'asc' ? 'text-blue-500' : 'text-gray-400'}
                className="bg-transparent border-none p-2"
              />
              <Button
                onClick={() => setSortOrder('desc')}
                text="↓"
                color={sortOrder === 'desc' ? 'text-blue-500' : 'text-gray-400'}
                className="bg-transparent border-none p-2"
              />
            </div>
          </div>
        </div>

        <div className="flex-grow">
          {paginatedCars.length > 0 ? (
            children(paginatedCars)
          ) : (
            <p>No cars found. Please adjust your filters.</p>
          )}
        </div>

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Filters;
