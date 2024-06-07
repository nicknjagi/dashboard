
import { LibraryItem } from "@/types";
import { BASE_URL, pb } from "./utils";
import axios from "axios";

export async function getLibraries() {
  try {
    const url = `${BASE_URL}/api/collections/library/records?sort=-created`
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

export async function createLibrary(data: LibraryItem) {
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

export async function updateLibrary(data: LibraryItem) {
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

export async function deleteLibrary(id: string) {
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