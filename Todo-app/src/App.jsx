import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('/tasks.json')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const handleAddTask = (task) => {
    const newTask = {
      id: tasks.length + 1,
      ...task,
      completed: false,
      updated_at: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = (id, updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, ...updatedTask, updated_at: new Date().toISOString() } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Todo List</h1>
      <SearchBar query={query} onSearch={setQuery} />
      <TaskForm onAdd={handleAddTask} />
      <TaskList
        tasks={filteredTasks}
        onUpdate={handleUpdateTask}
        onDelete={handleDeleteTask}
        onToggle={handleToggleTask}
      />
    </div>
  );
}

export default App;
