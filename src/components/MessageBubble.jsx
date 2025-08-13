import { format } from 'date-fns';
import { Check, DoneAll } from '@mui/icons-material';

const MessageText = ({ text }) => {
  return (
    <div style={{
      fontSize: '14.2px',
      lineHeight: '19px',
      fontFamily: 'Segoe UI, system-ui, -apple-system, sans-serif',
      padding: '2px 0',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
      overflowWrap: 'break-word',
      maxWidth: '100%',
      width: '100%',
      overflow: 'hidden',
      boxSizing: 'border-box',
      display: 'block',
    }}>
      {text}
    </div>
  );
};

export default function MessageBubble({ message, isOwnMessage }) {
  return (
    <div style={{
      maxWidth: '65%',
      margin: '0.2em 0 0.5em',
      marginLeft: isOwnMessage ? 'auto' : '0.5em',
      marginRight: isOwnMessage ? '0.5em' : 'auto',
      position: 'relative',
      clear: 'both',
      width: 'fit-content',
      minWidth: '120px'
    }}>
      <div style={{
        backgroundColor: isOwnMessage ? '#DCF8C6' : 'white',
        borderRadius: '7.5px',
        padding: '6px 7px 8px 9px',
        boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)',
        position: 'relative',
        float: isOwnMessage ? 'right' : 'left',
        maxWidth: '100%',
        width: 'auto',
        display: 'inline-block',
        wordBreak: 'break-word',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        whiteSpace: 'normal',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}>
        <MessageText text={message.text} />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: '2px',
          height: '15px',
          float: 'right',
          position: 'relative',
          right: '-4px',
          bottom: '-1px',
          marginLeft: '4px'
        }}>
          <span style={{ 
            color: 'rgba(0,0,0,0.45)',
            fontSize: '11px',
            lineHeight: '15px',
            marginRight: '3px',
            whiteSpace: 'nowrap',
            userSelect: 'none'
          }}>
            {format(new Date(message.timestamp), 'h:mm a')}
          </span>
          {isOwnMessage && (
            <span style={{ marginLeft: '3px', lineHeight: 0 }}>
              {message.status === 'sent' ? (
                <Check style={{ fontSize: '16px', color: 'rgba(0,0,0,0.45)' }} />
              ) : (
                <DoneAll style={{ fontSize: '16px', color: '#53bdeb' }} />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
