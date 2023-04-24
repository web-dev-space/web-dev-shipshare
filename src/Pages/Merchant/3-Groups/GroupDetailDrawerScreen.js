import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Typography } from '@mui/material';
import GroupMemberCard from "components/GroupMemberCard";
import ItemCard from 'components/ItemCard.js';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Colors from 'styles/Colors';
import FontSizes from 'styles/FontSizes';
import { getParcelByShipGroupIdThunk } from "redux/parcels/parcels-thunks";

const FontFamily = {}

const GroupDetailDrawerScreen = ({ ship, handleClose, users, isMerchant = true }) => {
  const dispatch = useDispatch();

  const parcelData = useSelector((state) => state?.parcels?.parcelsInDetailPage);

  useEffect(() => {
    if (ship?._id !== undefined) {
      dispatch(getParcelByShipGroupIdThunk({ shipGroupId: ship?._id }));
    }
  }, [ship]);

  let classifiedParcels = [];

  if (isMerchant) {
    classifiedParcels = parcelData.reduce((accumulator, current) => {
      if (!accumulator[current.user]) {
        accumulator[current.user] = [];
      }

      accumulator[current.user].push(current);
      return accumulator;
    }, {});
  }


  return (
    <div>
      <Box position='relative'>
        <Typography variant="h6">
          Group Details
        </Typography>
        <IconButton
          aria-label="delete"
          onClick={() => {
            handleClose()
          }}
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
        {/*----------------------Team members-----------------------*/}


        <Box style={{
          border: '1px solid rgb(226, 232, 240)', borderRadius: 10, marginTop: 40,
        }}>
          <GroupMemberCard leftCornerIconColor={"#F9C662"}
            items={classifiedParcels}
            users={users}
            title={"Group Members"} />
        </Box>

        {/*-------------Detail items list------------------*/}
        <Box style={{
          border: '1px solid rgb(226, 232, 240)', borderRadius: 10, marginTop: 40,
        }}>
          <ItemCard leftCornerIconColor={"#F9C662"}
            items={classifiedParcels}
            title={"Items Included"}
            isMerchant={isMerchant} />
        </Box>
      </div>

    </div>
  );
};

export default GroupDetailDrawerScreen;

const styles = {
  container: {
    flex: 1, // backgroundColor: Colors.detailBackgroundGray,
    alignItems: 'center', width: '100%', marginTop: 40,
  }, greenHeadPart: {
    backgroundColor: Colors.buttonDarkGreen, height: 170, width: '100%', alignItems: 'center',
  }, title: {
    color: Colors.white, fontSize: FontSizes.pageTitle, marginTop: 60, fontFamily: FontFamily.regular,
  }, topContainer: {
    width: '100%',
    backgroundColor: Colors.white,
    alignItems: 'center',
    borderRadius: 10,
    border: '1px solid #E2E8F0',
    display: 'flex',
    flexDirection: 'column',
  }, trackingNumberContainer: {
    width: '90%',
    marginTop: 24,
    borderRadius: 10,
    borderStyle: 'dashed',
    height: 90,
    borderWidth: 2,
    borderColor: Colors.lineGray,
    textAlign: 'center',
    alignItems: 'center',
  }, trackingNumberText: {
    color: Colors.textGray,
    marginTop: 20,
    alignSelf: 'center',
    fontSize: FontSizes.trackingLabel,
    fontFamily: FontFamily.regular,
  }, trackingNumber: {
    color: Colors.blackText,
    marginTop: 4,
    alignSelf: 'center',
    fontSize: FontSizes.pageTitle,
    fontWeight: 'bold',
    fontFamily: FontFamily.bold,
  }, flexRow: {
    display: 'flex', marginTop: 20, flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center',
  }, animationStatusContainer: {
    // height: 56,
    marginTop: 8, alignItems: 'center', paddingBottom: 20,
  }, ball: {
    width: 50, borderRadius: 50, height: 50, backgroundColor: Colors.detailBackgroundGray,
  }, breakLine: {
    width: '88%', borderWidth: 0.5, borderColor: Colors.lineGray, borderStyle: 'dashed',
  }, addressContainer: {
    width: '90%', position: 'relative', paddingTop: 41.5, paddingBottom: 49.5,
  }, addressTitlePart: {
    flexDirection: 'row', position: 'absolute',
  }, addressTitle: {
    color: Colors.textGray,
    fontSize: FontSizes.bodyText,
    fontWeight: 'bold',
    fontFamily: FontFamily.bold,
    marginLeft: 22,
  }, nameText: {
    color: Colors.blackText,
    marginTop: 8,
    fontSize: FontSizes.groupCardText,
    fontWeight: 'bold',
    marginLeft: 22,
    fontFamily: FontFamily.bold,
  }, contactText: {
    color: Colors.textGray,
    fontSize: FontSizes.groupCardText,
    marginTop: 2,
    marginLeft: 22,
    fontFamily: FontFamily.regular,
  }, status1: {
    alignItems: 'flex-start', width: '40%',
  }, status2: {
    alignItems: 'flex-end', width: '40%',
  }, statusText: {
    color: Colors.textGray, fontSize: FontSizes.groupCardText, fontFamily: FontFamily.regular,
  }, statusLocation: {
    color: Colors.buttonDarkGreen, fontSize: FontSizes.dimensionText, fontWeight: 'bold', fontFamily: FontFamily.bold,
  }, shippingText: {
    color: Colors.blackText,
    fontSize: FontSizes.bodyText,
    marginBottom: 11,
    alignSelf: 'center',
    fontFamily: FontFamily.regular,
  }, breakDeliveryLine: {
    width: 290, borderWidth: 0.5, borderColor: Colors.lineGray, borderStyle: 'dashed', marginVertical: 20,
  }, deliveryBar: {
    flexDirection: 'row', marginTop: 30, marginLeft: 20, marginBottom: 30
  }, deliveryBarText: {
    marginLeft: 10, color: Colors.darkGrayBlack, fontSize: FontSizes.bodyText,
  }, deliveryTextCurrent: {
    color: Colors.buttonDarkGreen, fontSize: FontSizes.bodyText, marginBottom: 5,
  }, deliveryDateText: {
    color: Colors.textGray, fontSize: FontSizes.bodyText,
  }, deliveryText: {
    color: Colors.darkGrayBlack, fontSize: FontSizes.bodyText, marginBottom: 5,
  }, tinyLogo: {
    width: 72, height: 72,
  }, bottomContainer: {
    width: '90%', backgroundColor: Colors.white, borderRadius: 10,
  },

};
