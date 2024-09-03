import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Car } from '../../src/context/CarContext';
import carsData from '../../data/cars.json';
import Loader from '../../src/components/Loader';
import { useEffect, useState } from 'react';

interface CarPageProps {
  car: Car | null;
}

const CarPage = ({ car }: CarPageProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!router.isFallback) {
      setIsLoading(false); // Отключаем лоадер, когда данные загружены
    }
  }, [router.isFallback]);

  if (isLoading) {
    return <Loader />;
  }

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">{car.brand} {car.model}</h1>
      <img src={`/covers/${car.cover}`} alt={car.model} className="mb-4 w-full h-auto" />
      <p><strong>Color:</strong> {car.color}</p>
      <p><strong>Price:</strong> ${car.price}</p>
      <p><strong>Year:</strong> {car.year}</p>
      <p><strong>Engine Type:</strong> {car.engineType}</p>
      {car.transmission && <p><strong>Transmission:</strong> {car.transmission}</p>}
      {car.range && <p><strong>Range:</strong> {car.range} km</p>}
      <button 
        onClick={() => router.push('/')} 
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Back to Home
      </button>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = carsData.map((car) => ({
    params: { id: car.id.toString() },
  }));

  return { 
    paths, 
    fallback: true 
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const car = carsData.find((car) => car.id.toString() === params?.id);

  return { 
    props: { car: car || null },
    revalidate: 10,
  };
};

export default CarPage;
