import { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetch('/api/todos')
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  const addTodo = async () => {
    try {
      const response = await fetch('https://rebase-challenge-fwnu.onrender.com/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo }) 
      });
      // console.log(response,"sun");
      
      const data = await response.json();
      // console.log(data);
      if (response.status == 201) {
        let value = data?.newTodo;
        setTodos((prev)=>[...prev,value]);
        setNewTodo('');
      }
  
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <div style={{ padding: '40px', background: '#0a0a0a', color: 'white', minHeight: '100vh' }}>
      <h1>Rebase Todo Challenge</h1>
      <div style={{ marginBottom: '20px' }}>
        <input 
          value={newTodo} 
          onChange={(e) => setNewTodo(e.target.value)} 
          placeholder="New Task"
          style={{ padding: '10px', background: '#1a1a1a', border: '1px solid #333', color: 'white' }}
        />
        <button onClick={addTodo} style={{ padding: '10px 20px', background: '#ec4899', color: 'white', border: 'none', marginLeft: '10px' }}>
          Add Task
        </button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
