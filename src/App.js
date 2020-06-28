import React, { useState, useEffect } from 'react';
import { decode } from 'jsonwebtoken';
import useLocalStorage from './Helpers/useLocalStorage';
import Routes from './Routes/Routes';
import Navigation from './Navigation';
import API from './API';
import './Static/css/App.css';
import UserContext from './Helpers/UserContext';
export const TOKEN_STORAGE_ID = 'jobly-token';

const App = () => {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(() => {
    async function getCurrentUser() {
      try {
        let { username } = decode(token);
        let currentUser = await API.getCurrentUser(username);
        setCurrentUser(currentUser);
      } catch (err) {
        setCurrentUser(null);
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  const handleLogOut = () => {
    setCurrentUser(null);
    setToken(null);
  };
  if (!infoLoaded) {
    return <p>Loading...</p>;
  }
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="App">
        <Navigation logout={handleLogOut} />
        <Routes setToken={setToken} />
      </div>
    </UserContext.Provider>
  );
};

export default App;
