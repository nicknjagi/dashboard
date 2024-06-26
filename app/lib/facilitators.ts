import axios from "axios"
import { BASE_URL, pb } from "./utils"

export async function fetchFacilitators(page: number = 1, perPage: number = 10) {
  try {
    const response = await axios.get(`${BASE_URL}/api/collections/users/records?filter=(AccountType='FACILITATOR')&sort=-created&page=${page}&perPage=${perPage}`, {
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
export async function fetchAllFacilitators() {
  try {
    const response = await axios.get(`${BASE_URL}/api/collections/users/records?filter=(AccountType='FACILITATOR')&sort=-created`, {
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

