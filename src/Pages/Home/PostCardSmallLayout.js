import { IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom";

const PostCardSmallLayout = ({ index, avatarUrl, title, isDiscoverPhoneScreen, id }) => {

    const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      // alignItems: 'center',
      backgroundColor: (index === 1) || (index === 2) ? "#F6FBF7": "white",
      // padding: '16px',
      width: isDiscoverPhoneScreen? 170: 300,
      height: isDiscoverPhoneScreen? 170: 300,
    }}>
      <div style={{margin: isDiscoverPhoneScreen? 10: 50}}>
          <div style={{marginRight: '16px', marginBottom: 10}}>
            <img src={avatarUrl} alt="avatar" style={{width: isDiscoverPhoneScreen? '32px':'48px', height: isDiscoverPhoneScreen? '32px':'48px', borderRadius: '50%'}}/>
          </div>

        <div style={{ flexGrow: 1 }}>
          <div style={{ fontWeight: isDiscoverPhoneScreen? 'normal':'bold', fontSize: isDiscoverPhoneScreen? '14px':'20px', marginBottom: isDiscoverPhoneScreen? '3px':'8px' }}>{title}</div>
        </div>

        <div style={{flexDirection: 'row-reverse', display:'flex', marginRight: isDiscoverPhoneScreen? 0:-5}}>
            <IconButton onClick={() => navigate(`/community/discover/post/${id}`)}>
              <svg width={isDiscoverPhoneScreen? "22": "42"} height={isDiscoverPhoneScreen? "22": "42"} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="21" cy="21" r="21" fill={(index === 1) || (index === 2) ? "white": "#F6FBF7"}/>
                <path d="M21.5 16L25.5 20.5M25.5 20.5L22 25M25.5 20.5H17" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </IconButton>
        </div>
      </div>
    </div>
  );
};

export default PostCardSmallLayout;
