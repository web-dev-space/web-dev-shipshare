import React from 'react';
import { Box, Typography, IconButton, TextField, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import shipGroups from '../../sampleData/shipGroups';
import FontFamily from '../../styles/FontFamily';
import Colors from '../../styles/Colors';
import FontSizes from '../../styles/FontSizes';

const hintText = [
  'Order placed',
  'Packaged',
  'In Shipping',
  'Time to pick up the package!',
]

const ShipmentDetails = ({ ship }) => {
  if (ship === undefined) {
    ship = shipGroups[0];
  }


  const shipEndDate = '2021-08-01';
  const startDate = '2021-07-01';

  return (
    <div>
      <Typography variant="h6">
        Shipment Details
      </Typography>
      <div style={styles.container}>

        {/*Top container -- tracking number part*/}
        <div style={styles.topContainer}>
          <div style={styles.trackingNumberContainer}>
            <div style={styles.trackingNumberText}>Tracking Number</div>
            <div style={styles.trackingNumber}>{ship.trackingNumber || "No Tracking Number Yet"}</div>
          </div>

          {/* <div style={styles.flexRow}>
            <div style={styles.ball} />
            <div style={styles.breakLine} />
            <div style={styles.ball} />
          </div> */}
          {/* <Divider flexItem sx={{ mt: 2, width: '80%' }} alignItems='center'/> */}
          {/* <Divider variant="inset" ></Divider> */}

          <div style={{ height: 28 }} />
          <div style={styles.breakLine} />

          {/*Middle part -- contact part*/}
          <div style={styles.addressContainer}>
            <div style={styles.addressTitlePart}>
              <svg width="13" height="16" viewBox="0 0 13 16" fill="none">
                <path
                  d="M12.25 6.625C12.25 11 6.625 14.75 6.625 14.75C6.625 14.75 1 11 1 6.625C1 5.13316 1.59263 3.70242 2.64752 2.64752C3.70242 1.59263 5.13316 1 6.625 1C8.11684 1 9.54758 1.59263 10.6025 2.64752C11.6574 3.70242 12.25 5.13316 12.25 6.625Z"
                  stroke="#F9C662"
                // stroke-linecap="round"
                // stroke-linejoin="round"
                />
                <path
                  d="M6.625 8.5C7.66053 8.5 8.5 7.66053 8.5 6.625C8.5 5.58947 7.66053 4.75 6.625 4.75C5.58947 4.75 4.75 5.58947 4.75 6.625C4.75 7.66053 5.58947 8.5 6.625 8.5Z"
                  stroke="#F9C662"
                // stroke-linecap="round"
                // stroke-linejoin="round"
                />
              </svg>
            </div>
            <div>
              <div style={styles.addressTitle}>Shipping address</div>
              <div style={styles.nameText}>{ship.pickupLocation.name}</div>
              <div style={styles.contactText}>{ship.phoneNumber}</div>
              <div style={styles.contactText}>{ship.pickupLocation.address}</div>
              <div style={{ height: 50 }} />
            </div>
          </div>

          <div style={styles.breakLine} />

          {/*Status part -- shipping status*/}
          <Box style={styles.flexRow} display='flex'>
            <div style={styles.status1}>
              <div style={styles.statusText}>{startDate}</div>
              <div style={styles.statusLocation}>Guangzhou</div>
            </div>
            <svg width="31" height="31" viewBox="0 0 31 31" fill="none">
              <circle cx="15.5" cy="15.5" r="15.5" fill="#F7F7F7" />
              <path
                d="M14.938 19.7072L16.062 20.8311L21.3932 15.4999L16.062 10.1687L14.938 11.2926L18.3504 14.705H10.7308V16.2948H18.3504L14.938 19.7072Z"
                fill="#80B213"
              />
            </svg>
            <Box style={styles.status2} display='flex' flexDirection='column'>
              <div style={styles.statusText}>{shipEndDate}</div>
              <div style={styles.statusLocation}>{ship?.pickupLocation?.shortAddress?.split(",")[0]}</div>
            </Box>
          </Box>
          <div style={{ height: 30 }} />

          {/*animation status*/}
          <div style={styles.shippingText}>{hintText[ship.phaseNumber]}</div>
          <div style={styles.animationStatusContainer}>
            {/* <ShippingStatusBar phaseNumber={ship.phaseNumber} animationWidth={width - 32 * 2 - 10}/> */}
          </div>
        </div>


        {/*Bottom Container*/}
        {ship.phaseNumber >= 2 &&
          // <DeliveryStatusCard deliveryStatus={deliveryStatus}/>
          <></>
        }

        {/*Detail items list*/}
        <div style={{ marginTop: ship.phaseNumber >= 2 ? 30 : -10, width: '90%' }}>
          {/* <ItemCard leftCornerIconColor={"#F9C662"}
            items={parcels}
            title={"Items Included"}/> */}
        </div>

        <div style={{ height: 180 }} />
      </div>


    </div>
  );
};

export default ShipmentDetails;

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.detailBackgroundGray,
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
    border: '1px solid #E2E8F0',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  trackingNumberContainer: {
    width: '90%',
    marginTop: 20,
    borderRadius: 10,
    borderStyle: 'dashed',
    height: 100,
    borderWidth: 2,
    borderColor: Colors.lineGray,
    textAlign: 'center',
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
    disply: 'flex',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
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
    position: 'relative',
  },
  addressTitlePart: {
    flexDirection: 'row',
    position: 'absolute',
  },
  addressTitle: {
    color: Colors.textGray,
    marginLeft: 10,
    fontSize: FontSizes.bodyText,
    fontWeight: 'bold',
    fontFamily: FontFamily.bold,
    marginLeft: 22,
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
