import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import cars from '../../../data/cars.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(cars);
  } else if (req.method === 'POST') {
    const { id, brand, model, color, price, year, engineType, transmission, range, cover, coverData } = req.body;

    // Проверяем, что все необходимые данные присутствуют
    if (!id || !brand || !model || !color || !price || !year || !engineType || !cover || !coverData) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // Декодируем и сохраняем изображение
    const buffer = Buffer.from(coverData, 'base64');
    const coverPath = path.join(process.cwd(), 'public', 'covers', cover);

    try {
      fs.writeFileSync(coverPath, buffer);
    } catch (error) {
      res.status(500).json({ message: 'Error saving image', error });
      return;
    }

    // Добавляем новую машину в список
    const newCar = {
      id,
      brand,
      model,
      color,
      price,
      year,
      engineType,
      transmission,
      range,
      cover,
    };
    cars.push(newCar);

    // Обновляем JSON файл
    try {
      fs.writeFileSync(path.join(process.cwd(), 'data', 'cars.json'), JSON.stringify(cars, null, 2));
    } catch (error) {
      res.status(500).json({ message: 'Error saving car data', error });
      return;
    }

    res.status(201).json(newCar);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
