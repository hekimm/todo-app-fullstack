import React from 'react';

// Fonksiyonel - state yok, basit display component
const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? '#aaa' : 'inherit',
          cursor: 'pointer'
        }}
        onClick={() => toggleTodo(todo._id)}
      >
        {todo.text}
      </span>
      <button
        className="btn btn-sm btn-outline-danger"
        onClick={() => deleteTodo(todo._id)}
      >
        Sil
      </button>
    </li>
  );
};

export default TodoItem;
