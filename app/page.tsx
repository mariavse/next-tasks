import Link from "next/link";
import { createTask, getTasks } from "./actions/task";



export default async function Home() {
  const tasks = await getTasks();

  async function handleSubmit(formData: FormData) {
    'use server';
    await createTask(formData);
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">📝 Lista de Tarefas</h1>

      <form action={handleSubmit} className="my-4">
        <input
          name="title"
          placeholder="Nova tarefa"
          required
          className="border p-2"
        />

        <textarea 
        name="description" 
        placeholder='Descrição da tarefa'
        required
        className='border p-2 mt-2'></textarea>
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white p-2 rounded"
        >
          Adicionar
        </button>
      </form>

      <ul className="mt-4">
        {tasks.map((t: {id: number; title: string; description:string}) => (
          <Link href={`/?id=${t.id}&title=${t.title}&description=${t.description}`}>
          <li key={t.id} className="border-b py-1">
            <h3 className='font-bold'>{t.title}</h3>
            <p>{t.description}</p>
          </li>
          </Link>
        ))}
      </ul>
    </main>
  );
}
