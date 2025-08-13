import { useState, useEffect } from 'react';
import { Box, CssBaseline, Typography } from '@mui/material';
import { getConversations } from './services/api';
import ConversationList from './components/ConversationList';
import ChatWindow from './components/ChatWindow';

function App() {
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadConversations = async () => {
      try {
        setLoading(true);
        const data = await getConversations();
        setConversations(data);
        setError(null);
      } catch (err) {
        console.error('Error loading conversations:', err);
        setError('Failed to load conversations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadConversations();
  }, []);

  const handleNewMessage = (newMessage) => {
    // Update the last message in the conversations list
    setConversations(prev => 
      prev.map(conv => 
        conv._id === newMessage.wa_id
          ? { ...conv, lastMessage: newMessage.text, lastTime: newMessage.timestamp }
          : conv
      )
    );
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <Typography>Loading conversations...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        p: 2,
        textAlign: 'center'
      }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      height: '100vh',
      flexDirection: { xs: 'column', sm: 'row' },
      overflow: 'hidden'
    }}>
      <CssBaseline />
      <Box sx={{
        width: { xs: '100%', sm: '350px' },
        height: { xs: selectedChat ? '0' : '100%', sm: '100%' },
        overflow: 'hidden',
        transition: 'height 0.3s ease',
        borderRight: { sm: '1px solid #e0e0e0' },
        flexShrink: 0
      }}>
        <ConversationList 
          conversations={conversations} 
          onSelectChat={setSelectedChat} 
          selectedId={selectedChat?._id} 
        />
      </Box>
      
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        width: { xs: selectedChat ? '100%' : '0', sm: 'auto' },
        transition: 'width 0.3s ease'
      }}>
        {selectedChat ? (
          <ChatWindow 
            conversation={selectedChat} 
            onNewMessage={handleNewMessage}
            onBack={() => setSelectedChat(null)}
          />
        ) : (
          <Box sx={{ 
            display: { xs: 'none', sm: 'flex' },
            flex: 1, 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: '#f8f9fa'
          }}>
            <Typography variant="h6" color="text.secondary">
              Select a conversation to start chatting
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default App;
