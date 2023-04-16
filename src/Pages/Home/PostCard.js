import { Avatar, Button, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

const PostCard = ({ index, title, subtitle, avatarSrc, buttonText, onButtonClick }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      padding: '16px',
      borderRadius: '0px',
    }}>
      <div style={{ marginRight: '16px' }}>
        <img  alt="avatar" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
      </div>

      <div style={{ flexGrow: 1 }}>
        <div style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '8px' }}>Card Title</div>
        <div style={{ fontSize: '16px', color: '#777777' }}>Card Subtitle</div>
      </div>

      <div>
        <IconButton>
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="21" cy="21" r="21" fill={index % 2 ===0 ? "white": "#F6FBF7"}/>
            <path d="M21.5 16L25.5 20.5M25.5 20.5L22 25M25.5 20.5H17" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </IconButton>
      </div>
    </div>
  );
};

export default PostCard;
