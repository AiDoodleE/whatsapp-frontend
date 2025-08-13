import { Box, Typography, Paper, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { getMessages, sendMessage as sendMessageApi } from '../services/api';

export default function ChatWindow({ conversation, onNewMessage, onBack }) {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await getMessages(conversation._id);
        setMessages(data);
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };
    loadMessages();
  }, [conversation._id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (text) => {
    const newMessage = {
      wa_id: conversation._id,
      name: conversation.name,
      text,
      status: 'sent',
      timestamp: new Date().toISOString()
    };
    
    // Optimistic update
    setMessages(prev => [...prev, newMessage]);
    
    try {
      const savedMessage = await sendMessageApi(newMessage);
      // Update the message with server data if needed
      setMessages(prev => 
        prev.map(msg => 
          msg.timestamp === newMessage.timestamp ? savedMessage : msg
        )
      );
      
      if (onNewMessage) {
        onNewMessage(savedMessage);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Update message status to show error
      setMessages(prev => 
        prev.map(msg => 
          msg.timestamp === newMessage.timestamp 
            ? { ...msg, status: 'error' } 
            : msg
        )
      );
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      flex: 1,
      height: '100%',
      backgroundColor: '#e5ddd5',
      width: '100%',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Paper sx={{ 
        p: 2, 
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        position: 'sticky',
        top: 0,
        zIndex: 1
      }}>
        <IconButton 
          onClick={onBack} 
          sx={{ 
            display: { xs: 'flex', sm: 'none' },
            mr: 1
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography 
            variant="h6" 
            noWrap
            sx={{
              fontWeight: 500,
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}
          >
            {conversation.name}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            noWrap
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}
          >
            {conversation._id}
          </Typography>
        </Box>
      </Paper>
      
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: { xs: 1, sm: 2 },
          backgroundColor: '#e5ddd5',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29-22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23d1ccc7\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          '&::-webkit-scrollbar': {
            width: '4px'
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
            borderRadius: '4px'
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '4px',
            '&:hover': {
              background: 'rgba(0,0,0,0.3)'
            }
          },
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <Box sx={{ 
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          pb: 1
        }}>
          {messages.map((msg, i) => (
            <Box key={i} sx={{ mb: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
              <MessageBubble 
                message={msg} 
                isOwnMessage={msg.wa_id === conversation._id} 
              />
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>
      </Box>
      
      <MessageInput onSendMessage={handleSendMessage} />
    </Box>
  );
}
