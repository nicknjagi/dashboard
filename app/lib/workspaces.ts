
import { Workspace, User, TWorkspaceSchema } from "@/types";
import { BASE_URL, pb } from "./utils";
import axios from "axios";
import toast from "react-hot-toast";

export async function getWorkspace(id: string) {
  try {
    const url = `${BASE_URL}/api/collections/workspaces/records/${id}`
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${pb.authStore.token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching workspace:', error);
    throw new Error('Error fetching workspace')
  }
}

export async function getWorkspaces() {
  try {
    const url = `${BASE_URL}/api/collections/workspaces/records?sort=-created`
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${pb.authStore.token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching workspaces:', error);
    throw new Error('Error fetching workspaces')
  }
}

export async function createWorkspace(data: TWorkspaceSchema): Promise<any> {
  const user = pb.authStore.model as User
  
  if (user.AccountType !== 'ADMIN') {
    toast.error('Not authorized')
    return
  }

  try {
    const url = `${BASE_URL}/api/collections/workspaces/records`
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${pb.authStore.token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error creating workspace:', error);
    throw new Error('Error creating workspace')
  }
}

export async function updateWorkspace(data: Workspace) {
  const user = pb.authStore.model as User

  if (user.AccountType !== 'ADMIN') {
    toast.error('Not authorized')
    return
  }

  try {
    const url = `${BASE_URL}/api/collections/workspaces/records/${data.id}`
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