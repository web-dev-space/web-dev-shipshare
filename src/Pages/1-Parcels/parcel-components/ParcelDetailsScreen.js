import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Typography } from '@mui/material';
import DeliveryStatusCard from '../../../components/DeliveryStatusCard';
import deliveryStatus from '../../../sampleData/deliveryStatus';
import Colors from '../../../styles/Colors';
import FontSizes from '../../../styles/FontSizes';

const ParcelDetails = ({ parcel, handleClose }) => {

    return (
        <div>
            <Box position='relative'>
                <Typography variant="h6">
                    Parcel Details
                </Typography>

                <IconButton
                    aria-label="delete"
                    onClick={() => { handleClose() }}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        borderRadius: '50%',
                        height: 32,
                        width: 32,
                        border: '1px solid #EDF2F7',
                        padding: '8px',
                    }}>
                    <CloseIcon color='#708095' />
                </IconButton>

            </Box>
            <div style={styles.container}>

                {/*Top container -- tracking number part*/}
                <div style={styles.topContainer}>
                    <div style={styles.trackingNumberContainer}>
                        <div style={styles.trackingNumberText}>Tracking Number</div>
                        <div style={styles.trackingNumber}>{parcel.trackingNumber || "No Tracking Number Yet"}</div>
                    </div>

                    <div style={{ height: 28 }} />
                </div>


                {/*Bottom Container*/}
                <Box style={{
                    border: '1px solid rgb(226, 232, 240)',
                    borderRadius: 10,
                    marginTop: 40,
                    padding: 20,
                }}>
                    <DeliveryStatusCard deliveryStatus={deliveryStatus} />
                </Box>
            </div>


        </div>
    );
};

export default ParcelDetails;

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        marginTop: 40,
    },
    topContainer: {
        width: '100%',
        backgroundColor: Colors.white,
        alignItems: 'center',
        borderRadius: 10,
        border: '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column',
    },
    trackingNumberContainer: {
        width: '90%',
        marginTop: 24,
        borderRadius: 10,
        borderStyle: 'dashed',
        height: 90,
        borderWidth: 2,
        borderColor: Colors.lineGray,
        textAlign: 'center',
        alignItems: 'center',
    },
    trackingNumberText: {
        color: Colors.textGray,
        marginTop: 20,
        alignSelf: 'center',
        fontSize: FontSizes.trackingLabel,
    },
    trackingNumber: {
        color: Colors.blackText,
        marginTop: 4,
        alignSelf: 'center',
        fontSize: FontSizes.pageTitle,
        fontWeight: 'bold',
    },
};
