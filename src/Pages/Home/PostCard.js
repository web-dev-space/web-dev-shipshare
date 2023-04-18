import { Avatar, Button, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

const PostCard = ({ index, avatarUrl, title }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      // alignItems: 'center',
      backgroundColor: index % 2 ===0 ? "white": "#F6FBF7",
      // padding: '16px',
      width: 300,
      height: 300,
    }}>
      <div style={{margin: 50}}>
        {index !== 2 &&
          <div style={{marginRight: '16px', marginBottom: 10}}>
            <img src={avatarUrl} alt="avatar" style={{width: '48px', height: '48px', borderRadius: '50%'}}/>
          </div>
        }

        {index !== 2 &&
          <div style={{flexGrow: 1}}>
            <div style={{fontWeight: 'bold', fontSize: '20px', marginBottom: '8px'}}>{title}</div>
          </div>
        }

        <div style={{flexDirection: 'row-reverse', display:'flex', marginRight: -5}}>
          {index !== 2 &&
            <IconButton>
              <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="21" cy="21" r="21" fill={index % 2 !==0 ? "white": "#F6FBF7"}/>
                <path d="M21.5 16L25.5 20.5M25.5 20.5L22 25M25.5 20.5H17" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </IconButton>
          }
        </div>
      </div>
    </div>
  );
};

export default PostCard;
