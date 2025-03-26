import { Box, Button, TextField, Typography, Container } from '@mui/material';
import React, { useState } from 'react';
import { UserTable } from '../Components/Table';

const TodoApp = () => {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, inputValue]);
      setInputValue('');
    }
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEditTask = (index, newValue) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = newValue;
    setTasks(updatedTasks);
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
        <Button onClick={() => setTasks([])} variant="contained" color="error">Delete All</Button>
      </Box>
      <UserTable data={tasks} onDelete={handleDeleteTask} onEdit={handleEditTask} />
    </Container>
  );
};

export default TodoApp;