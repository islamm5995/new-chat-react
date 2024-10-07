// src/App.js
import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login';
import Chat from './components/Chat';


const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Для отображения состояния загрузки

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Очистка подписки при размонтировании
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return user ? <Chat /> : <Login />;
};

export default App;
