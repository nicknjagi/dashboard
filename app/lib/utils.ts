

import { TLoginSchema, TSignUpSchema } from "@/types";
import axios from "axios";
import PocketBase from 'pocketbase'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// const BASE_URL = 'https://mymindcapsule.pockethost.io';

export const pb = new PocketBase(BASE_URL);

export async function registerUser(user: TSignUpSchema) {
  try {
    const record = await pb.collection('users').create(user);
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

export async function sendEmail(email:string) {
  try {
    const response = await axios.post(`/api/validate-token`, {
      email,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending invite:', error);
    throw new Error('Error sending invite')
  }
}


