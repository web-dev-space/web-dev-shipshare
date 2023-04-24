import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ParcelListCard from 'Pages/Buyer/1-Parcels/parcel-components/ParcelListCard';

export default function CheckoutStepOne({parcels, selectedParcels, setSelectedParcels}) {
  return (
    <Box
      sx={{
        // flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}

    >
      <Grid container
            spacing={5}
            sx={{
              justifyContent: 'center',
              alignItems: 'stretch',
            }}>
        <Grid item xs={12} sm={12} md={6}>
          <ParcelListCard index={true} parcels={parcels} setSelectedParcels={setSelectedParcels}/>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>

          <Card sx={{minWidth: 350}}>
            <CardContent>
              <Typography variant="h6" component="div" sx={{display: 'flex'}}>
                Total
              </Typography>
              <Typography variant="body2" component="div" sx={{display: 'flex', justifyContent: 'space-between', marginTop: 3}}>
                Number of Items
                <Typography variant="body2" sx={{textAlign: 'right'}}>{selectedParcels.length} Parcels</Typography>
              </Typography>
              <Typography variant="subtitle2" component="div"
                          sx={{display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginTop: 1}}>
                Weight
                <Typography variant="subtitle2" sx={{textAlign: 'right', fontWeight: 'bold'}}>
                  {(selectedParcels.reduce((acc, parcel) => acc + parcel.weight, 0)).toFixed(1)} kg
                </Typography>
              </Typography>
            </CardContent>
          </Card>

        </Grid>
      </Grid>
    </Box>
  );
}
