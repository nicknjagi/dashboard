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
    if (axios.isAxiosError(error)) {
      console.error('Error response data:', error.response?.data.error);
      if(error.response?.status === 404){
        throw new Error('User not found')
      } else if(error.response?.status === 401){
        throw new Error('Unauthorized')
      }
      throw new Error(error.response?.data)
    } else {
      console.error('Error message:', error);
      throw new Error('Error fetching user data');
    }
  }
}