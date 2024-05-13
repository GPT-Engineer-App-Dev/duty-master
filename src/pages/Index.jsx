import { useState } from 'react';
import { Container, VStack, Input, Button, List, ListItem, ListIcon, IconButton, Text } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
      setInput('');
    }
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container centerContent maxW="container.md" p={4}>
      <VStack spacing={4} w="100%">
        <Text fontSize="2xl" fontWeight="bold">Todo List</Text>
        <Input
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        />
        <Button onClick={handleAddTask} colorScheme="blue">Add Task</Button>
        <List spacing={3} w="100%">
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center">
              <Text as={task.isCompleted ? 's' : ''}>{task.text}</Text>
              <div>
                <IconButton
                  icon={<FaCheckCircle />}
                  onClick={() => handleToggleComplete(task.id)}
                  colorScheme={task.isCompleted ? "green" : "gray"}
                  aria-label="Complete Task"
                />
                <IconButton
                  icon={<FaTrash />}
                  onClick={() => handleRemoveTask(task.id)}
                  colorScheme="red"
                  aria-label="Remove Task"
                />
              </div>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;