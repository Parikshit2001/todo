import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [x, setX] = useState('');
  const [arr, setArr] = useState(JSON.parse(localStorage.getItem('todos')));
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // If in edit mode, update the todo at the specified index
      const updatedArr = arr.map((item, i) => (i === editIndex ? x : item));
      setArr(updatedArr);
      setEditIndex(null);
    } else {
      // If not in edit mode, add a new todo
      setArr([...arr, x]);
    }

    setX('');
  };

  const handleDelete = (index) => {
    const updatedArr = arr.filter((_, i) => i !== index);
    setArr(updatedArr);
  };

  const handleEdit = (index) => {
    setX(arr[index]); // Set the input value to the selected todo for editing
    setEditIndex(index);
  };

  useEffect(() => {
    const storedArr = JSON.parse(localStorage.getItem('todos')) || [];
    setArr(storedArr);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(arr));
  }, [arr]);

  return (
    <div className='flex flex-col justify-start justify-start'>
      <div className='flex'>
        <form onSubmit={handleSubmit}>
          <label>ADD TODO </label>
          <input type="text" value={x} onChange={(e) => setX(e.target.value)} />
        </form>
      </div>
      <div className='flex flex-col-reverse'>
        {arr.map((element, i) => (
          <div key={i} className='flex justify-between text-lg border p-4'>
              <h1 className='text-lg'>{element}</h1>
              <div className='flex'>
                <button className='border-blue-500 mr-2' onClick={() => handleEdit(i)}>EDIT</button>
                <button className='border-blue-500' onClick={() => handleDelete(i)}>DELETE</button>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}

export default App;
