import { Add as AddIcon } from '@mui/icons-material';
import { Button } from '@mui/material';

function TwoSmallButtonGroup({ leftText, rightText, onLeftClick, onRightClick }) {
    return (
        <div style={{ display: 'flex' }}>
            <Button
                variant="contained"
                color="primary"
                style={{ marginRight: '19px', height: '48px'  }}
                startIcon={<AddIcon />}
                onClick={onLeftClick}
            >
                {leftText}
            </Button>
            <Button
                variant="outlined"
                color="primary"
                style={{ height: '48px' }}
                startIcon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.60826 13.8274H3.35767" stroke="#80B213" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10.9504 5.75023H16.201" stroke="#80B213" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.27183 5.70521C7.27183 4.6255 6.39002 3.75 5.30254 3.75C4.21505 3.75 3.33325 4.6255 3.33325 5.70521C3.33325 6.78492 4.21505 7.66042 5.30254 7.66042C6.39002 7.66042 7.27183 6.78492 7.27183 5.70521Z" stroke="#80B213" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6666 13.7946C16.6666 12.7149 15.7855 11.8394 14.698 11.8394C13.6098 11.8394 12.728 12.7149 12.728 13.7946C12.728 14.8743 13.6098 15.7498 14.698 15.7498C15.7855 15.7498 16.6666 14.8743 16.6666 13.7946Z" stroke="#80B213" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>}
                onClick={onRightClick}
            >
                {rightText}
            </Button>
        </div>
    );
}

export default TwoSmallButtonGroup;
