import axios from "axios";
import { BASE_URL, pb } from "./utils";
import toast from "react-hot-toast";
import { Session, User, Workspace } from "@/types";
import { getWorkspace } from "./workspaces";


export async function getSessions(){
  try {
    const url = `${BASE_URL}/api/collections/sessions/records?sort=-created`
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching sessions:', error);
    throw new Error('Error fetching sessions')
  }
}

export async function createWorkspace(workspaceId:string, data: Session) {
  const user = pb.authStore.model as User
  const workspace = await getWorkspace(workspaceId) as Workspace

  if (user.AccountType !== 'ADMIN' || user.id !== workspace.facilitator) {
    toast.error('Not authorized')
    return
  }

  try {
    const url = `${BASE_URL}/api/collections/sessions/records`
    const response = await axios.patch(url, data, {
      headers: {
        Authorization: `Bearer ${pb.authStore.token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error creating session:', error);
    throw new Error('Error creating session')
  }
}
export async function updateWorkspace(workspaceId:string, data: Session) {
  const user = pb.authStore.model as User
  const workspace = await getWorkspace(workspaceId) as Workspace

  if (user.AccountType !== 'ADMIN' || user.id !== workspace.facilitator) {
    toast.error('Not authorized')
    return
  }

  try {
    const url = `${BASE_URL}/api/collections/sessions/records/${data.id}`
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

export async function deleteSession(workspaceId:string, id: string) {
  const user = pb.authStore.model as User
  const workspace = await getWorkspace(workspaceId) as Workspace

  if (user.AccountType !== 'ADMIN' || user.id !== workspace.facilitator) {
    toast.error('Not authorized')
    return
  }

  try {
    const url = `${BASE_URL}/api/collections/sessions/records/${id}`
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${pb.authStore.token}`
      }
    })
    return { success: true }
  } catch (error) {
    console.error('Error deleting session:', error);
    throw new Error('Error deleting session')
  }
}