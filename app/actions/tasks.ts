'use server';

import { FormTasksType } from '@/components/FormTasks';
import API from '@/lib/API';
import { revalidatePath } from 'next/cache';

export async function getTasks() {
  try {
    const { data } = await API.get('/tasks');
    return data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
}

export async function createTask(formData: FormTasksType) {
  try {
    const { title, description } = formData;
    const { data } = await API.post('/tasks', { title, description });
    revalidatePath('/');
    return { success: true, task: data };
  } catch (error) {
    console.error('Error creating task:', error);
    return { success: false };
  }
}

export async function getTaskById(id: number) {
  try {
    const { data } = await API.get(`/tasks/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching task:', error);
    return null;
  }
}


export async function editTask(formData: FormTasksType) {
  console.log(formData)
  try {
    const { id, title, description } = formData;
    const { data } = await API.put('/tasks/' + id, { title, description });
    return { success: true, task: data };
  } catch (error) {
    console.error('Error editing task:', error);
    return { success: false };
  }
}

export async function deleteTask(formData: FormData) {
  'use server'
  console.log(formData)
  try {
    const id = formData.get('id');
    console.log(id)
    const { data } = await API.delete('/tasks/' + id);
    revalidatePath('/')
    return { success: true, task: data };
  } catch (error) {
    console.error('Error editing task:', error);
    return { success: false };
  }
}
export async function completeTask(formData: FormData) {
  'use server'
  try {
    const  id  = formData.get('id');
    const { data } = await API.patch('/tasks/' + id, {completed: true});
    revalidatePath('/');
    return { success: true, task: data };
  } catch (error) {
    console.error('Error complete task:', error);
    return { success: false };
  }
}