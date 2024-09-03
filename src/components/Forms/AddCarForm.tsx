import React, { useState } from 'react';
import Input from '../UI/Input';
import Select from '../UI/Select';
import Button from '../UI/Button';
import { useCar } from '../../context/CarContext';
import { addCarToApi, createCarObject } from '../../features/carApi';

const AddCarForm = () => {
  const { addCar } = useCar();
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [year, setYear] = useState<number | string>('');
  const [engineType, setEngineType] = useState('Gasoline');
  const [transmission, setTransmission] = useState('');
  const [range, setRange] = useState<number | string>('');
  const [cover, setCover] = useState<File | null>(null);
  const [coverFileName, setCoverFileName] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCover(e.target.files[0]);
      setCoverFileName(e.target.files[0].name);
    }
  };

  const handleAddCar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cover) {
      alert('Please upload a cover image.');
      return;
    }

    try {
      const newCar = await createCarObject(
        { brand, model, color, price, year, engineType, transmission, range },
        cover
      );
      await addCarToApi(newCar);
      addCar(newCar);
      localStorage.setItem('newCarAdded', JSON.stringify({ id: newCar.id }));
    } catch (error) {
      console.error('Failed to add car:', error);
    }
  };

  return (
    <form onSubmit={handleAddCar}>
      <Input
        type="text"
        placeholder="Brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <Input
        type="text"
        placeholder="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <Input
        type="text"
        placeholder="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <Input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        min={0}
        step={0.01}
      />
      <Input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        min={1886}
        step={1}
      />
      <Select
        value={engineType}
        onChange={(e) => setEngineType(e.target.value)}
        options={[
          { value: 'Gasoline', label: 'Gasoline' },
          { value: 'Diesel', label: 'Diesel' },
          { value: 'Electric', label: 'Electric' },
        ]}
        className="w-full p-2 mb-2 border rounded"
      />
      {engineType !== 'Electric' && (
        <Select
          value={transmission}
          onChange={(e) => setTransmission(e.target.value)}
          options={[
            { value: 'Automatic', label: 'Automatic' },
            { value: 'Manual', label: 'Manual' },
            { value: 'Robotic', label: 'Robotic' },
          ]}
          className="w-full p-2 mb-2 border rounded"
        />
      )}
      {engineType === 'Electric' && (
        <Input
          type="number"
          placeholder="Range (km)"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          min={0}
        />
      )}
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full p-2 mb-2" 
        value={coverFileName}
        placeholder={''}
      />
      <Button
        type="submit"
        text="Add Car"
        color="bg-green-500"
        className="w-full text-white p-2 mt-4 rounded"
      />
    </form>
  );
};

export default AddCarForm;
