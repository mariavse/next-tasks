import Link from 'next/link';
import {completeTask, createTask, deleteTask, getTasks } from './actions/tasks';
import FormTasks, { FormTasksType } from '@/components/FormTasks';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; title?: string; description?: string; completed?: boolean  }>;
}) {
  const { id, title, description } = await searchParams;
  const tasks = await getTasks();

  async function handleSubmit(data: FormTasksType) {
    'use server';
    await createTask(data);
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">📝 Lista de Tarefas</h1>

      <FormTasks
        defaultValues={{
          id: id ? parseInt(id) : undefined,
          title: title || '',
          description: description || '',
        }}
        onSubmit={handleSubmit}
      />

      <ul className="mt-4">
        {tasks.map((t: { id: number; title: string; description: string; completed?: boolean }) => (
          
            <li className="border-b py-1" key={id}>
              <h3 className={`font-bold ${t.completed ? 'text-green-600' : ''}`}>{t.title}</h3>
              <p className={`${t.completed ? 'text-green-600' : ''}`}>{t.description}</p>
              {!t.completed && (<>
              <Link
            href={`/edit/?id=${t.id}&title=${t.title}&description=${t.description}`}
            key={t.id}>
              <button className='text-white bg-blue-400 px-2 py-1 mb-2 rounded'>Editar</button>
               </Link>
               <form action={deleteTask}>
                <input type="hidden" name='id' value={t.id}/>
                <button className='text-white bg-red-700 px-2 py-1 mb-2 rounded'>Excluir</button>
               </form>

               <form action={completeTask}>
                <input type="hidden" name="id" value={t.id.toString()} />
                <button type='submit' className='text-white bg-green-800 px-2 py-1 mb-2 rounded '>Completar</button>
               </form>
</>)}
               
            </li>
         
        ))}
      </ul>
    </main>
  );
}
