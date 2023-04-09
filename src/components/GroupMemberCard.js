import React from "react";
import Colors from '../styles/Colors';
import FontSizes from '../styles/FontSizes';
import InventoryIcon from '@mui/icons-material/Inventory';

const FontFamily = {
}

const GroupMemberCard = ({ items, leftCornerIconColor, title }) => {
  return (
    <div style={styles.bottomContainer}>
      <div style={styles.deliveryBar}>
        {/*<Feather name="package" size={24} color={Colors.statusOrange} />*/}

        <InventoryIcon htmlColor="#F9C662" style={{fontSize:18}}/>
        <div style={styles.deliveryBarText}>{title}</div>
      </div>

      {/*Item list*/}
      {items &&
        items.map((item, index) =>
          <div style={{ marginLeft: 20, marginVertical: 10 }}>
            <div style={{ flexDirection: 'row', display: 'flex', marginBottom: 20 }}>
              <img
                style={styles.tinyLogo}
                src={
                  item.picture ?
                    item.picture :
                    require('../images/placeholder.png')
                }
              />
              <div style={styles.itemContainer}>
                <div style={styles.itemTitle}>{item.name}</div>
                <div style={styles.itemNumber}>{item.trackingNumber}</div>
                {item.weight && <div style={styles.itemWeight}>{item.weight} kg</div>}
              </div>
            </div>
          </div>
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
  tinyLogo: {
    width: 72,
    height: 72,
    borderRadius: 10,
  },
};
