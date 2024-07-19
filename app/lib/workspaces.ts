
import { Workspace, User, TWorkspaceSchema } from "@/types";
import { BASE_URL, pb } from "./utils";
import axios from "axios";
import toast from "react-hot-toast";

export async function getWorkspace(id: string) {
  try {
    const url = `${BASE_URL}/api/collections/workspaces/records/${id}?expand=users`
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

export async function getWorkspaceNames() {
  try {
    const url = `${BASE_URL}/api/collections/workspaces/records?sort=-created&fields=id,name`
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${pb.authStore.token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching workspace names:', error);
    throw new Error('Error fetching workspace names')
  }
}

export async function getWorkspacesWithAccountId(accountId: string) {
  try {
    const url = `${BASE_URL}/api/collections/workspaces/records?filter=(users~"${accountId}")&fields=id`
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${pb.authStore.token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching workspace names:', error);
    throw new Error('Error fetching workspace names')
  }
}

export async function workspacesCount() {
  try {
    const url = `${BASE_URL}/api/collections/workspaces/records?fields=totalItems`
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${pb.authStore.token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching workspace count:', error);
    throw new Error('Error fetching workspace count')
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

export async function updateWorkspace(data: Workspace): Promise<any> {
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

export async function addToWorkspace(accountId: string, workspaceIds: string[]): Promise<any> {
  try {
    const results = await Promise.all(workspaceIds.map(async (workspaceId) => {
      const getUrl = `${BASE_URL}/api/collections/workspaces/records/${workspaceId}?fields=users`;
      const getResponse = await axios.get(getUrl, {
        headers: {
          Authorization: `Bearer ${pb.authStore.token}`
        }
      });
      const { users } = getResponse.data;

      // Check if the accountId already exists in the users array
      if (users.includes(accountId)) {
        console.log(`Account ID ${accountId} already exists in workspace ${workspaceId}`);
        return getResponse.data; // No update needed
      }

      // Append the new accountId to the users array
      const updatedUsers = [...users, accountId];
  
      // Update the workspace with the new users array
      const patchUrl = `${BASE_URL}/api/collections/workspaces/records/${workspaceId}`;
      const patchResponse = await axios.patch(patchUrl, { users: updatedUsers }, {
        headers: {
          Authorization: `Bearer ${pb.authStore.token}`
        }
      });

      return patchResponse.data;
    }));
    
    return results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      console.error('Error updating account:', errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error('Error updating account:', error);
      throw new Error('Error updating account');
    }
  }
}

export async function removeFromWorkspace(accountId: string, workspaceId: string): Promise<any> {
  try {
    // Fetch the current workspace data
    const getUrl = `${BASE_URL}/api/collections/workspaces/records/${workspaceId}?fields=users`;
    const getResponse = await axios.get(getUrl, {
      headers: {
        Authorization: `Bearer ${pb.authStore.token}`
      }
    });
    const { users } = getResponse.data;

    // Remove the accountId from the users array
    const updatedUsers = users.filter((userId: string) => userId !== accountId);

    // Update the workspace with the updated users array
    const patchUrl = `${BASE_URL}/api/collections/workspaces/records/${workspaceId}`;
    const patchResponse = await axios.patch(patchUrl, { users: updatedUsers }, {
      headers: {
        Authorization: `Bearer ${pb.authStore.token}`
      }
    });

    return patchResponse.data;
  } catch (error) {
    console.error('Error removing user from workspace:', error);
    throw new Error('Error removing user from workspace');
  }
}

export async function deleteWorkspace(id: string) {
  try {
    const url = `${BASE_URL}/api/collections/workspaces/records/${id}`
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${pb.authStore.token}`
      }
    })
    return { success: true }
  } catch (error) {
    console.error('Error deleting workspace:', error);
    throw new Error('Error deleting workspace')
  }
}

