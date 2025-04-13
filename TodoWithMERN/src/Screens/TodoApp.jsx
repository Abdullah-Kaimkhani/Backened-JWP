import { Box, Button, TextField, Typography, Container } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { UserTable } from '../Components/Table';
import axios from 'axios';

const TodoApp = () => {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([]);

  // Fetch all todos on component mount
  useEffect(() => {
    fetchAllTodos();
  }, []);

  const fetchAllTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/getalltodo');
      const todos = response.data.allTodo.map(item => ({
        id: item._id,
        task: item.todo
      }));
      setTasks(todos);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = async () => {
    if (inputValue.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:3000/api/addtodo', { 
          todo: inputValue 
        });
        // Refresh the todo list after adding
        fetchAllTodos();
        setInputValue('');
      } catch (err) {
        console.error('Error adding todo:', err);
      }
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/deletetodo/${id}`);
      // Refresh the todo list after deleting
      fetchAllTodos();
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const handleEditTask = async (id, newValue) => {
    try {
      await axios.put('http://localhost:3000/api/updatetodo', { 
        id: id, 
        todo: newValue 
      });
      // Refresh the todo list after updating
      fetchAllTodos();
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  const handleDeleteAll = async () => {
    try {
      // Delete all tasks one by one (you might want to create a bulk delete API)
      await Promise.all(tasks.map(task => 
        axios.delete(`http://localhost:3000/api/deletetodo/${task.id}`)
      ));
      setTasks([]);
    } catch (err) {
      console.error('Error deleting all todos:', err);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', mt: 5, color: '#1976d2' }}>
        Todo List
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 3 }}>
        <TextField
          label="Enter Task"
          variant="outlined"
          value={inputValue}
          onChange={handleInputChange}
          sx={{ width: '70%' }}
        />
        <Button onClick={handleAddTask} variant="contained" color="primary">Add</Button>
        <Button onClick={handleDeleteAll} variant="contained" color="error">Delete All</Button>
      </Box>
      <UserTable 
        data={tasks.map(task => task.task)} 
        ids={tasks.map(task => task.id)}
        onDelete={handleDeleteTask} 
        onEdit={handleEditTask} 
      />
    </Container>
  );
};

export default TodoApp;