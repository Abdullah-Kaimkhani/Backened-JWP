import { Box, Button, TextField, Typography, Container, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { UserTable } from './Table';

const TodoApp = () => {
  const [inputValue, setInputValue] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [tasks, setTasks] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, {
        text: inputValue.trim(),
        isPublic: privacy === 'public'
      }]);
      setInputValue('');
    }
  };

  console.log(tasks);

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEditTask = (index, newText) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, text: newText } : task
    );
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
          sx={{ width: '60%' }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Privacy</InputLabel>
          <Select
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
            label="Privacy"
          >
            <MenuItem value="public">Public</MenuItem>
            <MenuItem value="private">Private</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={handleAddTask} variant="contained" color="primary">Add</Button>
        <Button onClick={() => setTasks([])} variant="contained" color="error">Delete All</Button>
      </Box>
      <UserTable data={tasks} onDelete={handleDeleteTask} onEdit={handleEditTask} />
    </Container>
  );
};

export default TodoApp;