import { Button } from '@mui/material';

function OutlinedOrangeButton({ text, onClick }) {
    return (
        <Button variant="outlined" color="warning" sx={{ width: '96px', height: '40px' }} onClick={onClick}>
            {text}
        </Button>
    );
}

function OriginalOrangeButton({ text, onClick }) {
    return (
        <Button variant="contained" color="warning" sx={{ width: '96px', height: '40px' }} onClick={onClick}>
            {text}
        </Button>
    );
}

function DisabledOrangeButton({ text }) {
    return (
        <Button variant="contained" color="warning" sx={{ width: '96px', height: '40px' }} disabled>
            {text}
        </Button>
    );
}

function OutlinedGreenButton({ text, onClick }) {
    return (
        <Button variant="outlined" color="primary" sx={{ width: '96px', height: '40px' }} onClick={onClick}>
            {text}
        </Button>
    );
}

function OriginalGreenButton({ text, onClick }) {
    return (
        <Button variant="contained" color="primary" sx={{ width: '96px', height: '40px' }} onClick={onClick}>
            {text}
        </Button>
    );
}

function DisabledGreenButton({ text }) {
    return (
        <Button variant="contained" color="primary" sx={{ width: '96px', height: '40px' }} disabled>
            {text}
        </Button>
    );
}

export { OutlinedOrangeButton, OriginalOrangeButton, DisabledOrangeButton };
export { OutlinedGreenButton, OriginalGreenButton, DisabledGreenButton };

