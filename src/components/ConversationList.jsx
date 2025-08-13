import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Box } from '@mui/material';
import { format } from 'date-fns';

export default function ConversationList({ conversations, onSelectChat, selectedId }) {
  return (
    <List 
      sx={{ 
        width: '100%', 
        maxWidth: 360, 
        bgcolor: 'background.paper', 
        borderRight: '1px solid #e0e0e0',
        padding: 0,
        '& .MuiListItem-root': {
          padding: '8px 16px',
          margin: 0,
          '&.Mui-selected': {
            backgroundColor: '#f5f5f5',
          },
          '&:hover': {
            backgroundColor: '#f9f9f9',
          },
        },
        '& .MuiListItemText-root': {
          margin: '0 8px',
          minWidth: 0, // Allows text to shrink
        },
        '& .MuiListItemText-primary': {
          fontSize: '0.9375rem',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        '& .MuiListItemText-secondary': {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: 'block',
          width: '100%',
        },
        '& .MuiTypography-caption': {
          whiteSpace: 'nowrap',
          fontSize: '0.75rem',
          color: '#666',
          marginLeft: '8px',
          flexShrink: 0,
        },
        '& .MuiAvatar-root': {
          width: 40,
          height: 40,
          fontSize: '1rem',
        },
      }}
    >
      {conversations.map((conversation) => (
        <ListItem 
          key={conversation._id} 
          button 
          selected={selectedId === conversation._id}
          onClick={() => onSelectChat(conversation)}
          disableGutters
        >
          <ListItemAvatar sx={{ minWidth: '56px' }}>
            <Avatar>{conversation.name.charAt(0)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography
                  component="span"
                  variant="subtitle2"
                  sx={{
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    pr: 1,
                  }}
                >
                  {conversation.name}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {format(new Date(conversation.lastTime), 'h:mm a')}
                </Typography>
              </Box>
            }
            secondary={
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
                sx={{
                  display: 'block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%',
                }}
              >
                {conversation.lastMessage}
              </Typography>
            }
            primaryTypographyProps={{ noWrap: true }}
            secondaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
      ))}
    </List>
  );
}
