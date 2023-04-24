import InventoryIcon from '@mui/icons-material/Inventory';
import { Typography } from "@mui/material";
import Colors from 'styles/Colors';
import FontSizes from 'styles/FontSizes';
import useDebugWhenChange from 'utils/useDebugWhenChange';

const FontFamily = {
}

const ParcelItem = ({ item, index }) => {
  return (
    <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', marginBottom: 20 }}>
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
        <div style={styles.itemWeight}>
          {item.weight !== undefined ? `${item.weight} kg` : ' '}
        </div>
      </div>
    </div>
  )
}

const ItemCard = ({ items, leftCornerIconColor, title, isMerchant }) => {
  useDebugWhenChange('items in ItemCard', items);

  return (
    <div style={styles.bottomContainer}>
      <div style={styles.deliveryBar}>
        {/*<Feather name="package" size={24} color={Colors.statusOrange} />*/}

        <InventoryIcon htmlColor="#F9C662" style={{ fontSize: 18 }} />
        <div style={styles.deliveryBarText}>{title}</div>
      </div>

      <div>
        {/*Item list*/}
        {items && !isMerchant &&
          items?.map((item, index) =>
            <ParcelItem item={item} index={index} />
          )
        }

        {items && isMerchant &&
          Object.keys(items)?.map((email, index) => {

            const parcels = items[email];
            const totalWeight = parcels?.reduce((acc, parcel) => acc + (parcel.weight || 0), 0);

            return <div>
              <div style={{ paddingBottom: 12 }}>
                <div style={styles.buyerId}>
                  BuyerID: {email}
                </div>
                {totalWeight !== undefined && totalWeight !== null && <div style={styles.buyerId}>
                  Total: {totalWeight?.toFixed(1)} kg
                </div>}
              </div>
              {parcels.map((parcel, index) =>
                <ParcelItem item={parcel} index={index} />
              )}
              {index !== Object.keys(items).length - 1 &&
                <div style={{ height: 1, backgroundColor: '#EDF2F7', marginHorizontal: 20, marginBottom: 12 }}>
                </div>
              }
            </div>

          })
        }
      </div>

      {items === undefined || items === null || Object.keys(items).length === 0 &&
        <div style={{ marginTop: 12, marginBottom: 10, }}>
          <Typography>No items.</Typography>
        </div>
      }

    </div>
  )
}

export default ItemCard;

const styles = {
  buyerId: {

    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    color: '#939393'

  },
  bottomContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingLeft: 24,
    paddingRight: 24,
  },
  itemContainer: {
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
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
    alignItems: 'center',
    marginBottom: 12,
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
