"use client";

import { useState, SubmitEvent } from "react";
import { Todo } from "@/types/todo";

type Props = {
  updateTodos: () => void;
};

function Form({ updateTodos }: Props) {
  const [todo, setToDo] = useState("");

  function handleToDoAdd(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!todo.trim()) return;

    const localTodos = localStorage.getItem("todos");
    const todos: Todo[] = localTodos ? JSON.parse(localTodos) : [];

    const newTodo: Todo = {
      id: Date.now(),
      title: todo.trim(),
      state: "todo",
    };

    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    setToDo("");

    updateTodos();
  }

  return (
    <form
      onSubmit={handleToDoAdd}
      className="w-full max-w-lg bg-white p-6 flex flex-col gap-y-4 border border-neutral-200 shadow-sm rounded-2xl"
    >
      <div className="flex flex-col gap-y-2">
        <label htmlFor="todo-input" className="text-sm font-medium text-neutral-700 ml-1">
          New Task
        </label>
        <input
          id="todo-input"
          type="text"
          value={todo}
          onChange={(e) => setToDo(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full h-12 px-4 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-neutral-900 placeholder:text-neutral-400"
        />
      </div>
      <button
        type="submit"
        disabled={!todo.trim()}
        className="w-full h-12 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl shadow-sm shadow-blue-500/20 transition-all active:scale-[0.98]"
      >
        Add Task
      </button>
    </form>
  );
}

export default Form;
