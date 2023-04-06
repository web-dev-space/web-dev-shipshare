import { Button, ButtonGroup } from '@mui/material';
import { Add as AddIcon, FilterList as FilterIcon } from '@mui/icons-material';

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
                startIcon={<FilterIcon />}
                onClick={onRightClick}
            >
                {rightText}
            </Button>
        </div>
    );
}

export default TwoSmallButtonGroup;
