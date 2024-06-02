

import { TLoginSchema, TSignUpSchema } from "@/types";
import axios from "axios";
import PocketBase from 'pocketbase'

export const pb = new PocketBase('http://127.0.0.1:8090');

// const BASE_URL = 'https://mymindcapsule.pockethost.io/api';
// const BASE_URL = "http://127.0.0.1:8090/api/collections";

export async function registerUser(user: TSignUpSchema) {
  try {
    const record = await pb.collection('users').create(user);
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

export async function loginUser(user: TLoginSchema) {
  const url = 'http://localhost:3000/api/auth/login'
  try {
    const response = await axios.post(`${url}`, {
      user,
    });    
    const authData = response.data.data;
    // localStorage.setItem('pb_authStore', JSON.stringify(response.data.data))
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

// async function createRecord(
//   token: string,
//   collectionName: string,
//   data: object
// ) {
//   const response = await axios.post(
//     `${BASE_URL}/collections/${collectionName}/records`,
//     data,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   return response.data;
// }


// (async () => {
//   const email = 'user@example.com';
//   const password = 'password123';
//   // Register a new user
//   await registerUser(email, password);
//   // Login and get a token
//   const token = await loginUser(email, password);
//   // Create a new record
//   const newRecord = await createRecord(token, 'myCollection', { field1: 'value1', field2: 'value2'
// });
// console.log('Created Record:', newRecord);
// })();


export async function sendEmail(email:string) {
  const url = 'http://localhost:3000/api/validate-token'
  try {
    const response = await axios.post(`${url}`, {
      email,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending invite:', error);
    throw new Error('Error sending invite')
  }
}


