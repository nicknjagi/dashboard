import axios from "axios"
import { pb } from "./utils"

export async function fetchUsers(page: number = 1, perPage: number = 10) {
  try {
    const response = await axios.get(`/api/get-users?page=${page}&perPage=${perPage}`, {
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

export async function fetchTotalUsers() {
  try {
    const response = await axios.get('/api/get-users-total', {
      headers: {
        Authorization: `Bearer ${pb.authStore.token}`,
      },
    });

    return response.data.total_count;
  } catch (error) {
    console.error('Error fetching total users:', error);
    throw new Error('Error fetching total users');
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
    console.log('Error: ', error);
    throw new Error('Error fetching user data');
  }
}