
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

export async function getAccounts(page: number = 1, perPage: number = 10) {
  const user = pb.authStore.model as User

  if (user.AccountType !== 'ADMIN') {
    toast.error('Not authorized')
    return
  }
  try {
    const url = `${BASE_URL}/api/collections/accounts/records?sort=-created&page=${page}&perPage=${perPage}`
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

export async function activeUserCount() {
  try {
    const url = `${BASE_URL}/api/collections/accounts/records?filter=(active=true)&fields=totalItems`
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${pb.authStore.token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching active user count:', error);
    throw new Error('Error fetching active user count')
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