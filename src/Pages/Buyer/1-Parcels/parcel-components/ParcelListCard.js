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
import {Stack} from "@mui/material";


export default function ParcelListCard({index, parcels, setSelectedParcels}) {
  const firstPage = index;

  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectedItemsToPass, setselectedItemsToPass] = useState([]);
  const handleSelectAllChange = (event) => {
    const checked = event.target.checked;
    setSelectAllChecked(checked);
    setselectedItemsToPass(checked ? parcels : [])
    setSelectedParcels(checked ? parcels : []);

  };

  useEffect(() => {
    if (parcels.length===1) {
      if (selectedItemsToPass.length === 1) {
        setSelectAllChecked(true);
      } else {
        setSelectAllChecked(false);
      }
    } else

    if (setSelectedParcels.length === parcels.length) {
      setSelectAllChecked(true);
    } else {
      setSelectAllChecked(false);
    }
  }, [setSelectedParcels]);

  const handleCheckboxChange = (event, parcel) => {
    const { checked } = event.target;
    setselectedItemsToPass((prev) =>
      checked ? [...prev, parcel] : prev.filter((item) => item !== parcel)
    );
    setSelectedParcels((prev) =>
      checked ? [...prev, parcel] : prev.filter((item) => item !== parcel)
    );

    console.log("selectedItemsToPass", selectedItemsToPass);
    console.log("parcels", parcels);
    if (!checked) {
      setSelectAllChecked(false);
    } else {
      if (selectedItemsToPass.length === parcels.length-1) {
        setSelectAllChecked(true);
      }
    }
  };

  return (
    <Card sx={{borderRadius: 3, minWidth: 350, height: '100%'}}>
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
                    selectedItemsToPass.find((item) => item._id === parcel._id)
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
              <Typography variant="body2">{parcel.name}</Typography>
              <Typography variant="caption"
                          sx={{color: 'text.secondary'}}
              >Tracking Number: {parcel.trackingNumber}</Typography>
              <Stack
                direction="row"
                spacing={1}
              >
              <Typography variant="caption">Weight: </Typography>
              <Typography variant="caption">{parcel.weight} kg</Typography>
              </Stack>
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
