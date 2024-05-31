import axios from "axios";
import { generateUniqueToken } from "./auth";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
// import Email from "@/components/emailTemplates/email";

// const BASE_URL = 'https://mymindcapsule.pockethost.io/api';
const BASE_URL = "http://127.0.0.1:8090/api";

async function registerUser(email: string, password: string) {
  try {
    const response = await axios.post(`${BASE_URL}/users`, {
      email,
      password,
      passwordConfirm: password,
    });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data.token;
  } catch (error) {
    console.error('Failed to login  user: ', error);
    throw error;
  }
}

async function createRecord(
  token: string,
  collectionName: string,
  data: object
) {
  const response = await axios.post(
    `${BASE_URL}/collections/${collectionName}/records`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}


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
    console.error('Error sending email:', error);
    throw error;
  }
}


