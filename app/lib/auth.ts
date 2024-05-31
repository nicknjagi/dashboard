import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export function generateUniqueToken(email:string) {
  const userId = uuidv4()
  const { JWT_SECRET } = process.env  
  const token = jwt.sign({ userId, email }, JWT_SECRET as string, { expiresIn: '1h' }); 
  return token;
}
