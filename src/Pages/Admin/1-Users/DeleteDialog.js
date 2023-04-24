import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';

export default function DeleteDialog({ open, onClose, onDelete }) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle  sx={{ pb: 2 }}>
                Delete
            </DialogTitle>
            <DialogContent  sx={{ typography: 'body2' }}>
                <p>Are you sure to delete this account?</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onDelete} color="error" variant="contained" autoFocus>
                    Delete
                </Button>
                <Button onClick={onClose} color="inherit" variant="outlined">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
