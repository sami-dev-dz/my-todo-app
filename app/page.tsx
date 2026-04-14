"use client";

import Form from "@/components/Form";
import { useEffect, useState, useMemo } from "react";
import TodoItem from "@/components/todo";
import { Todo } from "@/types/todo";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const localTodos = localStorage.getItem("todos");
    setTodos(localTodos ? JSON.parse(localTodos) : []);
    setIsLoaded(true);
  }, []);

  function updateTodos() {
    const localTodos = localStorage.getItem("todos");
    setTodos(localTodos ? JSON.parse(localTodos) : []);
  }

  const todoItems = useMemo(() => todos.filter((t) => t.state === "todo"), [todos]);
  const inProgressItems = useMemo(() => todos.filter((t) => t.state === "in progress"), [todos]);
  const doneItems = useMemo(() => todos.filter((t) => t.state === "done"), [todos]);

  if (!isLoaded) return null; 
  return (
    <main className="min-h-screen bg-neutral-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-6xl flex flex-col gap-y-12">
        <header className="flex flex-col items-center gap-y-2 text-center">
          <h1 className="text-4xl font-bold text-neutral-900 tracking-tight">Modern Todo App</h1>
          <p className="text-neutral-500">Keep track of your tasks with style.</p>
        </header>

        <div className="flex justify-center">
          <Form updateTodos={updateTodos} />
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-2 pb-2 border-b border-neutral-200">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <h2 className="text-lg font-semibold text-neutral-800">Todo ({todoItems.length})</h2>
            </div>
            <div className="flex flex-col gap-y-3">
              {todoItems.map((todo) => (
                <TodoItem key={todo.id} todo={todo} updateTodos={updateTodos} />
              ))}
              {todoItems.length === 0 && <p className="text-neutral-400 text-sm italic">No tasks yet.</p>}
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-2 pb-2 border-b border-neutral-200">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              <h2 className="text-lg font-semibold text-neutral-800">In Progress ({inProgressItems.length})</h2>
            </div>
            <div className="flex flex-col gap-y-3">
              {inProgressItems.map((todo) => (
                <TodoItem key={todo.id} todo={todo} updateTodos={updateTodos} />
              ))}
              {inProgressItems.length === 0 && <p className="text-neutral-400 text-sm italic">No tasks in progress.</p>}
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-2 pb-2 border-b border-neutral-200">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <h2 className="text-lg font-semibold text-neutral-800">Done ({doneItems.length})</h2>
            </div>
            <div className="flex flex-col gap-y-3">
              {doneItems.map((todo) => (
                <TodoItem key={todo.id} todo={todo} updateTodos={updateTodos} />
              ))}
              {doneItems.length === 0 && <p className="text-neutral-400 text-sm italic">Nothing completed yet.</p>}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
