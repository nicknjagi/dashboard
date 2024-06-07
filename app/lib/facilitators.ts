import axios from "axios"
import { BASE_URL, pb } from "./utils"

export async function fetchFacilitators() {
  try {
    const response = await axios.get(`${BASE_URL}/api/collections/users/records?filter=(AccountType='FACILITATOR')`, {
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

