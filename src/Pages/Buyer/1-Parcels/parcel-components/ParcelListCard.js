import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from "@mui/material/Grid";
import * as React from "react";


export default function ParcelListCard({index, parcels, setSelectedParcels}) {
  const firstPage = index;

  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selected, setSelected] = useState([parcels]);
  const handleSelectAllChange = (event) => {
    const checked = event.target.checked;
    setSelectAllChecked(checked);
    setSelectedParcels(checked ? parcels : []);
    setSelected(checked ? parcels : [])
  };
  const handleCheckboxChange = (event, parcel) => {
    const { checked } = event.target;
    setSelectedParcels((prev) =>
      checked ? [...prev, parcel] : prev.filter((item) => item !== parcel)
    );
    setSelected((prev) =>
      checked ? [...prev, parcel] : prev.filter((item) => item !== parcel)
    );
  };



  return (
    <Card sx={{borderRadius: 3, minWidth: 275, minHeight: 550}}>
      {firstPage ? <CardHeader title="Parcels Arrived"/> : <CardHeader title="Parcels"/>}
      <CardContent>
        {/*----select all checkbox----*/}
        {firstPage ? (
          <FormControlLabel
            control={
              <Checkbox
                checked={selectAllChecked}
                onChange={handleSelectAllChange}
              />
            }
            style={{ marginLeft: 1 }}
            label="Select All"
          />
        ) : null}
        {parcels.map((parcel) => (
          <Box
            key={parcel.id}
            sx={{display: 'flex', alignItems: 'center', py: 2}}
          >
            {firstPage ? (
              <Checkbox
                checked={
                  selectAllChecked ||
                  Boolean(
                    selected.find((item) => item._id === parcel._id)
                  )
                }
                onChange={(event) => handleCheckboxChange(event, parcel)}
              />
            ) : null}
            <Box sx={{flexShrink: 0}}>
              <img
                src={parcel.picture || require("../../../../images/placeholder.png")} alt={parcel.name} width={80}
                height={80} style={{borderRadius: 15}}/>
            </Box>
            <Box sx={{flexGrow: 1, pl: 2}}>
              <Typography variant="subtitle1">{parcel.name}</Typography>
              <Typography variant="body2"
                          sx={{color: 'text.secondary'}}
              >Tracking Number: {parcel.trackingNumber}</Typography>
              <Typography variant="body2">Weight: {parcel.weight} lbs</Typography>
            </Box>
          </Box>
        ))}
      </CardContent>

      {/*{!firstPage &&*/}
      {/*	<Grid  sx={{ display: 'flex', justifyContent: 'center' }}>*/}
      {/*		<Button  variant="outlined" style={{borderRadius:25, marginLeft: 20, marginBottom:30, marginRight:20, maxWidth: 400, height:50}} fullWidth="true">*/}
      {/*			Edit Cart*/}
      {/*		</Button>*/}
      {/*	</Grid>*/}
      {/*}*/}
    </Card>
  );
}
