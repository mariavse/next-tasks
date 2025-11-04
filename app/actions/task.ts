
'use server';

import API from '@/lib/API';
import { revalidatePath } from 'next/cache';

export async function getTasks() {
    try {
        const { data } = await API.get('/tasks');
        return data;
    } catch (error) {
        console.error('Error fetching tasks:', error)
    }
  
}

export async function createTask(formData: FormData) {
    try {
  const title = formData.get('title');
  const description = formData.get('description');
  const { data } = await API.post('/tasks', { title, description });
  revalidatePath('/');
  return { success: true, task: data };
  } catch (error) {
    console.error('Error creating task:', error);
  return{ success: false};
  }
}