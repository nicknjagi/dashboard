import axios from "axios";
import { BASE_URL, pb } from "./utils";
import { Session, TSessionSchema, User, Workspace } from "@/types";
import { getWorkspace } from "./workspaces";


export async function getSessions(id:string){
  try {
    const url = `${BASE_URL}/api/collections/sessions/records?sort=-created&filter=(workspace='${id}')`
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching sessions:', error);
    throw new Error('Error fetching sessions')
  }
}

export async function createSession(data: TSessionSchema) {
  const user = pb.authStore.model as User
  const workspace = await getWorkspace(data.workspace) as Workspace

  if (user.id !== workspace.facilitator) {
    if(user.AccountType !== 'ADMIN'){
      throw new Error('Not authorized')
    }
  }

  try {
    const url = `${BASE_URL}/api/collections/sessions/records`
    const response = await axios.post(url, data, {
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
export async function updateSession(data: Session) {
  const user = pb.authStore.model as User
  const workspace = await getWorkspace(data.workspace) as Workspace

  if (user.id !== workspace.facilitator) {
    if(user.AccountType !== 'ADMIN'){
      throw new Error('Not authorized')
    }
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

export async function deleteSession(session: Session) {
  const user = pb.authStore.model as User
  const workspace = await getWorkspace(session.workspace) as Workspace

  if (user.id !== workspace.facilitator) {
    if(user.AccountType !== 'ADMIN'){
      throw new Error('Not authorized')
    }
  }

  try {
    const url = `${BASE_URL}/api/collections/sessions/records/${session.id}`
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