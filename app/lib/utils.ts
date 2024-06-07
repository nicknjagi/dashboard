import axios from "axios";
import PocketBase from 'pocketbase'

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// const BASE_URL = 'https://mymindcapsule.pockethost.io';

export const pb = new PocketBase(BASE_URL);

export async function sendEmail(email: string) {
  try {
    const response = await axios.post(`/api/validate-token`, {
      email,
    });
    return response.data;
  } catch (error) {
    console.log('Error sending invite:', error);
    throw new Error('Error sending invite')
  }
}

