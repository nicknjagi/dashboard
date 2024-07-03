import axios from "axios"
import { BASE_URL, pb } from "./utils"

export async function fetchUsers(page: number = 1, perPage: number = 10) {
  try {
    const response = await axios.get(`${BASE_URL}/api/collections/users/records?sort=-created&page=${page}&perPage=${perPage}`, {
      headers: {
        Authorization: `Bearer ${pb.authStore.token}`
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error('Error fetching users')
  }
}

export async function getUserData(userId: string) {
  try {
    const response = await axios.get(`/api/get-user/${userId}?timestamp=${new Date().getTime()}`, {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${pb.authStore.token}`
      },
    })
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Error fetching user data');
  }
}