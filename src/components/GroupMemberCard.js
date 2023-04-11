import React from "react";
import Colors from '../styles/Colors';
import FontSizes from '../styles/FontSizes';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import {Avatar, Stack, Typography} from "@mui/material";

const FontFamily = {}

const GroupMemberCard = ({items, leftCornerIconColor, title}) => {
  return (
    <div style={styles.bottomContainer}>
      <div style={styles.deliveryBar}>
        {/*<Feather name="package" size={24} color={Colors.statusOrange} />*/}

        <PeopleIcon htmlColor="#F9C662" style={{fontSize: 18}}/>
        <div style={styles.deliveryBarText}>{title}</div>
      </div>

      {/*Item list*/}
      {items &&
        Object.keys(items).map((email, index) => {
            const parcels = items[email];
            const totalWeight = parcels.reduce((acc, parcel) => acc + (parcel.weight || 0), 0);

            return <div style={{marginLeft: 20, marginVertical: 10}}>
              <div style={{flexDirection: 'row', display: 'flex', marginBottom: 20}}>
                <Stack
                  direction='row'
                  spacing={2}
                >
                  <Avatar
                    style={styles.tinyLogo}
                    sx={{width: 30, height: 30}}
                    src={
                      require('../images/placeholder.png')
                    }
                  />

                  <Typography variant="caption">{email}</Typography>
                  <Typography variant="caption">{totalWeight} kg</Typography>
                </Stack>
              </div>
            </div>
          }
        )
      }

    </div>
  )
}

export default GroupMemberCard;

const styles = {
  bottomContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  itemContainer: {
    marginLeft: 10,
    marginTop: 5,
  },
  itemTitle: {
    color: Colors.blackText,
    fontSize: FontSizes.groupCardText,
    fontWeight: 'bold',
    marginBottom: 6,
    fontFamily: FontFamily.bold,
  },
  itemWeight: {
    color: Colors.blackText,
    fontSize: FontSizes.groupCardText,
    marginBottom: 6,
    fontFamily: FontFamily.bold,
  },
  itemNumber: {
    color: Colors.textGray,
    fontSize: FontSizes.smallTrackingNumber,
    marginBottom: 6,
    fontFamily: FontFamily.regular,
  },
  deliveryBar: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  deliveryBarText: {
    marginLeft: 10,
    color: Colors.darkGrayBlack,
    fontSize: 14,
    fontFamily: FontFamily.regular,
  },
  deliveryTextCurrent: {
    color: Colors.buttonDarkGreen,
    fontSize: FontSizes.bodyText,
    marginBottom: 5,
    fontFamily: FontFamily.regular,
  },
  deliveryDateText: {
    color: Colors.textGray,
    fontSize: FontSizes.bodyText,
    fontFamily: FontFamily.regular,
  },
  deliveryText: {
    color: Colors.darkGrayBlack,
    fontSize: FontSizes.bodyText,
    marginBottom: 5,
    fontFamily: FontFamily.regular,
  },
  // tinyLogo: {
  //   width: 72,
  //   height: 72,
  //   borderRadius: 10,
  // },
};
