import { fileToBase64 } from '../utils/fileToBase64';

export const addCarToApi = async (car: any) => {
  const response = await fetch('/api/cars', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
};

export const createCarObject = async (data: any, cover: File) => {
  const id = Date.now();
  const fileExtension = cover.name.split('.').pop();
  const coverData = await fileToBase64(cover);
  
  return {
    id,
    ...data,
    cover: `${id}.${fileExtension}`,
    coverData,
  };
};