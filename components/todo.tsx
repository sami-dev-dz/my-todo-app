"use client";

import { Todo as TodoType } from "@/types/todo";

type Props = {
  todo: TodoType;
  updateTodos: () => void;
};

function TodoItem({ todo, updateTodos }: Props) {
  function handleDeleteTodo() {
    const localTodos = localStorage.getItem("todos");
    let todos: TodoType[] = localTodos ? JSON.parse(localTodos) : [];
    todos = todos.filter((t) => t.id !== todo.id);
    localStorage.setItem("todos", JSON.stringify(todos));
    updateTodos();
  }

  function handleUpdateStatus(nextState: TodoType["state"]) {
    const localTodos = localStorage.getItem("todos");
    let todos: TodoType[] = localTodos ? JSON.parse(localTodos) : [];
    todos = todos.map((t) => (t.id === todo.id ? { ...t, state: nextState } : t));
    localStorage.setItem("todos", JSON.stringify(todos));
    updateTodos();
  }

  return (
    <div className="group flex flex-col gap-y-3 p-4 bg-white border border-neutral-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between gap-x-4">
        <h3 className="text-base font-medium text-neutral-900 leading-tight">
          {todo.title}
        </h3>
        <button
          onClick={handleDeleteTodo}
          className="text-neutral-400 hover:text-red-500 transition-colors p-1"
          title="Delete task"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
        </button>
      </div>

      <div className="flex items-center gap-x-2">
        {todo.state !== "todo" && (
          <button
            onClick={() => handleUpdateStatus(todo.state === "done" ? "in progress" : "todo")}
            className="text-xs font-semibold px-2 py-1 bg-neutral-100 text-neutral-600 hover:bg-neutral-200 rounded-md transition-colors"
          >
            ← Move Back
          </button>
        )}
        {todo.state !== "done" && (
          <button
            onClick={() => handleUpdateStatus(todo.state === "todo" ? "in progress" : "done")}
            className="text-xs font-semibold px-2 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
          >
            {todo.state === "todo" ? "Start" : "Complete"} →
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
