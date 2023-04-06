import React from 'react';
import { Box, Typography, IconButton, TextField, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import shipGroups from '../../sampleData/shipGroups';
import FontFamily from '../../styles/FontFamily';
import Colors from '../../styles/Colors';
import FontSizes from '../../styles/FontSizes';

const ShipmentDetails = ({ ship }) => {
  if (ship === undefined) {
    ship = shipGroups[0];
  }

  return (
    <div>
      <Box display='flex' alignItems="center" justifyContent="space-between">
        <Typography variant="h6">
          Shipment Details
        </Typography>

        <IconButton edge="end" color="inherit" onClick={() => console.log('Close button clicked')}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        display='flex'
        flexDirection="column"
        alignItems="center"
        sx={{
          width: 300,
          px: 2,
          py: 1,
          border: '1px solid black',
          borderRadius: '5px',
        }}>

        <Box alignItems="center" justifyContent="space-between" sx={{
          width: 250,
          px: 2,
          py: 1,
          border: '1px solid black',
          borderRadius: '5px',
        }}>
          <Typography variant="caption" display="block" gutterBottom textAlign='center'>
            Tracking Number
          </Typography>
          <Typography variant="body1" gutterBottom fontWeight='600' textAlign='center'>
            5570 8000 0135 9688
          </Typography>
        </Box>


        <Box>
          <div variant="subtitle1"
            fontFamily={FontFamily.bold}
            fontSize={FontSizes.bodyText}>
            Shipping Address
          </div>
          <div style={styles.nameText}>{ship.pickupLocation.name}</div>
          <div style={styles.contactText}>{ship.phoneNumber}</div>
          <div style={styles.contactText}>{ship.pickupLocation.address}</div>
          {/* 放置收货地址相关的表单元素，比如街道、城市、邮政编码等 */}
        </Box>
      </Box>
    </div>
  );
};

export default ShipmentDetails;

const styles = {
  container: {
    flex: 1,
    // backgroundColor: Colors.detailBackgroundGray,
    alignItems: 'center',
  },
  greenHeadPart: {
    backgroundColor: Colors.buttonDarkGreen,
    height: 170,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: Colors.white,
    fontSize: FontSizes.pageTitle,
    marginTop: 60,
    fontFamily: FontFamily.regular,
  },
  topContainer: {
    width: '90%',
    backgroundColor: Colors.white,
    alignItems: 'center',
    top: -50,
    borderRadius: 10,
  },
  trackingNumberContainer: {
    width: '90%',
    marginTop: 20,
    borderRadius: 10,
    borderStyle: 'dashed',
    height: 100,
    borderWidth: 2,
    borderColor: Colors.lineGray,
  },
  trackingNumberText: {
    color: Colors.textGray,
    marginTop: 20,
    alignSelf: 'center',
    fontSize: FontSizes.trackingLabel,
    fontFamily: FontFamily.regular,
  },
  trackingNumber: {
    color: Colors.blackText,
    marginTop: 8,
    alignSelf: 'center',
    fontSize: FontSizes.pageTitle,
    fontWeight: 'bold',
    fontFamily: FontFamily.bold,
  },
  flexRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  animationStatusContainer: {
    height: 56,
    marginTop: 8,
    alignItems: 'center',
  },
  ball: {
    width: 50,
    borderRadius: 50,
    height: 50,
    backgroundColor: Colors.detailBackgroundGray,
  },
  breakLine: {
    width: '88%',
    borderWidth: 0.5,
    borderColor: Colors.lineGray,
    borderStyle: 'dashed',
  },
  addressContainer: {
    width: '90%',
    marginTop: 20,
  },
  addressTitlePart: {
    flexDirection: 'row',
  },
  addressTitle: {
    color: Colors.textGray,
    marginLeft: 10,
    fontSize: FontSizes.bodyText,
    fontWeight: 'bold',
    fontFamily: FontFamily.bold,
  },
  nameText: {
    color: Colors.blackText,
    marginTop: 8,
    fontSize: FontSizes.groupCardText,
    fontWeight: 'bold',
    marginLeft: 22,
    fontFamily: FontFamily.bold,
  },
  contactText: {
    color: Colors.textGray,
    fontSize: FontSizes.groupCardText,
    marginTop: 8,
    marginLeft: 22,
    fontFamily: FontFamily.regular,
  },
  status1: {
    alignItems: 'flex-start',
    width: '40%',
  },
  status2: {
    alignItems: 'flex-end',
    width: '40%',
  },
  statusText: {
    color: Colors.textGray,
    fontSize: FontSizes.groupCardText,
    fontFamily: FontFamily.regular,
  },
  statusLocation: {
    color: Colors.buttonDarkGreen,
    fontSize: FontSizes.dimensionText,
    fontWeight: 'bold',
    fontFamily: FontFamily.bold,
  },
  shippingText: {
    color: Colors.blackText,
    fontSize: FontSizes.bodyText,
    marginBottom: 11,
    alignSelf: 'center',
    fontFamily: FontFamily.regular,
  },
  breakDeliveryLine: {
    width: 290,
    borderWidth: 0.5,
    borderColor: Colors.lineGray,
    borderStyle: 'dashed',
    marginVertical: 20,
  },
  deliveryBar: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 30
  },
  deliveryBarText: {
    marginLeft: 10,
    color: Colors.darkGrayBlack,
    fontSize: FontSizes.bodyText,
  },
  deliveryTextCurrent: {
    color: Colors.buttonDarkGreen,
    fontSize: FontSizes.bodyText,
    marginBottom: 5,
  },
  deliveryDateText: {
    color: Colors.textGray,
    fontSize: FontSizes.bodyText,
  },
  deliveryText: {
    color: Colors.darkGrayBlack,
    fontSize: FontSizes.bodyText,
    marginBottom: 5,
  },
  tinyLogo: {
    width: 72,
    height: 72,
  },
  bottomContainer: {
    width: '90%',
    backgroundColor: Colors.white,
    borderRadius: 10,
  },

};
