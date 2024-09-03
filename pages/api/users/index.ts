import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import users from '../../../data/users.json';

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (req.query?.login !== undefined) {
      const user = users.find((u) => u.username === username);

      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: 'Login successful', user });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else if (req.query?.register !== undefined) {
      const existingUser = users.find((u) => u.username === username);

      if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = {
        id: users.length + 1,
        username,
        password: hashedPassword,
      };

      users.push(newUser);
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

      res.status(201).json({ message: 'Registration successful', user: newUser });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
