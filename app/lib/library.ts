
import { LibraryItem, TFileLibrarySchema, TLibrarySchema } from "@/types";
import { BASE_URL, pb } from "./utils";
import axios from "axios";

export async function getLibraryItems(type: string, page: number = 1, perPage: number = 10) {
  try {
    let url;
    if(type === 'FILE'){
      url = `${BASE_URL}/api/collections/library/records?sort=-created&filter=(type="${type}")&page=${page}&perPage=6&fields=description,content,Name,id`
    }
    else{
      url = `${BASE_URL}/api/collections/library/records?sort=-created&filter=(type="${type}")&page=${page}&perPage=${perPage}`
    }
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${pb.authStore.token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching libraries:', error);
    throw new Error('Error fetching libraries')
  }
}

export async function createLibraryItem(data: TLibrarySchema | TFileLibrarySchema) {
  try {
    const url = `${BASE_URL}/api/collections/library/records`
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${pb.authStore.token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error creating library:', error);
    throw new Error('Error creating library')
  }
}

export async function updateLibraryItem(data: LibraryItem) {
  try {
    const url = `${BASE_URL}/api/collections/library/records/${data.id}`
    const response = await axios.patch(url, data, {
      headers: {
        Authorization: `Bearer ${pb.authStore.token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error updating library:', error);
    throw new Error('Error updating library')
  }
}

export async function deleteLibraryItem(id: string) {
  try {
    const url = `${BASE_URL}/api/collections/library/records/${id}`
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${pb.authStore.token}`
      }
    })
    return { success: true }
  } catch (error) {
    console.error('Error deleting library:', error);
    throw new Error('Error deleting library')
  }
}
