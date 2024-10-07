// src/components/Chat.js
import React, { useEffect, useState, useRef } from 'react';
import { auth, database } from '../firebase';
import { signOut } from 'firebase/auth';
import { ref, push, onChildAdded } from 'firebase/database';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const messagesRef = ref(database, 'messages');
    onChildAdded(messagesRef, (snapshot) => {
      const message = snapshot.val();
      setMessages((prev) => [...prev, message]);
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const messagesRef = ref(database, 'messages');
    push(messagesRef, {
      text: input,
      timestamp: Date.now(),
      uid: auth.currentUser.uid,
      displayName: auth.currentUser.displayName,
      photoURL: auth.currentUser.photoURL
    });
    setInput('');
  };

  const handleLogout = () => {
    signOut(auth).catch((error) => {
      console.error("Ошибка выхода:", error);
    });
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Чат-приложение
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <Paper style={{ padding: '20px', height: '70vh', overflowY: 'auto' }}>
          <List>
            {messages.map((msg, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={msg.displayName} src={msg.photoURL} />
                </ListItemAvatar>
                <ListItemText
                  primary={msg.displayName || 'Аноним'}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body1"
                        color="textPrimary"
                      >
                        {msg.text}
                      </Typography>
                      <Typography variant="caption" color="textSecondary" display="block">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
        </Paper>
        <form onSubmit={sendMessage} style={{ display: 'flex', marginTop: '10px' }}>
          <TextField
            variant="outlined"
            label="Введите сообщение"
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginLeft: '10px' }}
          >
            Отправить
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Chat;
