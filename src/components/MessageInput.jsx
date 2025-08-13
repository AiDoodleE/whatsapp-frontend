import { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, display: 'flex', gap: 1 }}>
      <TextField
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        variant="outlined"
        size="small"
        autoComplete="off"
      />
      <IconButton type="submit" color="primary" disabled={!message.trim()}>
        <SendIcon />
      </IconButton>
    </Box>
  );
}
