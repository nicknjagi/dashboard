
import { Account, User } from "@/types";
import { BASE_URL, pb } from "./utils";
import axios from "axios";
import toast from "react-hot-toast";

export async function getAccount(id: string) {
  try {
    const url = `${BASE_URL}/api/collections/accounts/records/${id}`
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${pb.authStore.token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching account:', error);
    throw new Error('Error fetching account')
  }
}

export async function updateAccount(data: Account) {
  const user = pb.authStore.model as User

  if (user.AccountType !== 'ADMIN') {
    toast.error('Not authorized')
    return
  }

  try {
    const url = `${BASE_URL}/api/collections/accounts/records/${data.id}`
    const response = await axios.patch(url, data, {
      headers: {
        Authorization: `Bearer ${pb.authStore.token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error updating account:', error);
    throw new Error('Error updating account')
  }
}