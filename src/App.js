import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Profile from './Profile';
import RepositoryList from './RepositoryList';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState({});
  const [repositories, setRepositories] = useState([]);
  const [profileNotFound, setProfileNotFound] = useState(false);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const fetchAllRepositories = async (url) => {
    const allRepositories = [];
  
    let page = 1;
    let hasNextPage = true;
  
    while (hasNextPage) {
      const response = await axios.get(`${url}?page=${page}&per_page=100`);
      
      if (response.status === 200) {
        const repositories = response.data;
  
        if (repositories.length === 0) {
          // No more repositories to fetch
          hasNextPage = false;
        } else {
          allRepositories.push(...repositories);
          page++;
        }
      } else {
        console.error(response.statusText);
        break;
      }
    }
  
    return allRepositories;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      
      if (response.status === 200) {
        setUserData(response.data);
        setProfileNotFound(false);
  
        // Fetch all repositories using pagination
        const reposUrl = response.data.repos_url;
        const allRepositories = await fetchAllRepositories(reposUrl);
        
        setRepositories(allRepositories);
      }
    } catch (error) {
      console.error(error);
      setUserData({});
      setRepositories([]);
      setProfileNotFound(true);
    }
  };


  return (
    <div className="container">
      <h1>Github Profile Viewer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a GitHub username"
          value={username}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      {profileNotFound && <p className="not-found">Profile not found</p>}
      {userData.login && !profileNotFound && <Profile userData={userData} />}
      {repositories.length > 0 && !profileNotFound && (
        <RepositoryList repositories={repositories} />
      )}
    </div>
  );
}

export default App;
