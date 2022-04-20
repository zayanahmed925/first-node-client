
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    // console.log(user);
    //post data to server
    fetch('http://localhost:5000/user', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        const newUsers = [...users, data];
        setUsers(newUsers);
        console.log('Success:', data);
      })
  }
  return (
    <div className="App">
      <h2>Users: {users.length}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="" placeholder='Name' />
        <input type="email" name="email" id="" placeholder='Email' />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {
          users.map(user => <li>{user.id},{user.name},{user.phone},{user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
