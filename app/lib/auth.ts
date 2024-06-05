import { TLoginSchema, TSignUpSchema } from '@/types';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { pb } from './utils';

export function generateUniqueToken(email:string) {
  const userId = uuidv4()
  const { JWT_SECRET } = process.env  
  const token = jwt.sign({ userId, email }, JWT_SECRET as string, { expiresIn: '30min' }); 
  return token;
}

export async function registerUser(user: FormData) {  
  try {
    const record = await pb.collection('users').create({...Object.fromEntries(user.entries()), AccountType:"FACILITATOR",emailVisibility: true,});
    return {success: true}
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

export async function loginUser(user: TLoginSchema) {  
  try {
    const response = await axios.post('/api/auth/login', {
      user,
    });    
    const authData = response.data.data;
     // Save auth data in pb.authStore
    pb.authStore.save(authData.token, authData.record);
    return response.data.data;
  } catch (error) {
    console.error('Error trying to login:', error);
    throw new Error('Error trying to login')
  }
}

export async function logout(){
  try {
    const response = await axios.get('/api/auth/logout');
    // Clear PocketBase auth store
    pb.authStore.clear();
    return {success:true}
  } catch (error) {
    console.error('Error logging out:', error);
    throw new Error('Error logging out')
  }
}
