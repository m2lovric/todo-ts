import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  interface User {
    id?: number;
    name: string;
    age: number;
    job: string;
  }

  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [job, setJob] = useState('');
  const [data, setData] = React.useState<User[]>([]);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: User = { name, age, job };

    fetch('http://localhost:8000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  };

  useEffect(() => {
    fetch('http://localhost:8000/user')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
        <label>Age</label>
        <input type='number' value={age} onChange={(e) => setAge(parseInt(e.target.value))} />
        <label>Job</label>
        <input type='text' value={job} onChange={(e) => setJob(e.target.value)} />
        <button>Add user</button>
      </form>

      <main>
        {data &&
          data.map((el) => {
            return (
              <article key={el.id}>
                <h2>{el.name}</h2>
                <p>{el.age}</p>
                <p>{el.job}</p>
              </article>
            );
          })}
      </main>
    </div>
  );
}

export default App;
