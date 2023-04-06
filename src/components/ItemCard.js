import React from "react";
import Colors from '../styles/Colors';
import FontSizes from '../styles/FontSizes';

const FontFamily = {
}

const ItemCard = ({ items, leftCornerIconColor, title }) => {
  return (
    <div style={styles.bottomContainer}>
      <div style={styles.deliveryBar}>
        {/*<Feather name="package" size={24} color={Colors.statusOrange} />*/}
        <svg width={17} height={17} viewBox="0 0 17 17" fill="none">
          <path
            d="M12.0417 4.60421L11.6875 6.37504L3.1875 5.31254V3.18754L3.89583 2.83337H11.6875L12.0417 3.18754V4.60421Z"
            fill="white"
          />
          <path
            d="M2.83334 4.95837V8.50004V13.4584L3.89584 14.1667H12.75L13.4583 13.8125V6.37504L13.1042 5.66671H12.3958H4.25L2.83334 4.95837Z"
            fill={leftCornerIconColor}
          />
          <path
            d="M12.0417 5.66671V3.54171C12.0417 3.35385 11.967 3.17368 11.8342 3.04084C11.7014 2.908 11.5212 2.83337 11.3333 2.83337H4.25C3.87428 2.83337 3.51394 2.98263 3.24827 3.24831C2.98259 3.51398 2.83334 3.87432 2.83334 4.25004M2.83334 4.25004C2.83334 4.62576 2.98259 4.9861 3.24827 5.25178C3.51394 5.51745 3.87428 5.66671 4.25 5.66671H12.75C12.9379 5.66671 13.118 5.74134 13.2509 5.87417C13.3837 6.00701 13.4583 6.18718 13.4583 6.37504V13.4584C13.4583 13.6462 13.3837 13.8264 13.2509 13.9592C13.118 14.0921 12.9379 14.1667 12.75 14.1667H8.5H4.25C3.87428 14.1667 3.51394 14.0175 3.24827 13.7518C2.98259 13.4861 2.83334 13.1258 2.83334 12.75V4.25004Z"
            stroke={leftCornerIconColor}
            stroke-width={1.5}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.1667 8.5V11.3333H11.3333C10.9576 11.3333 10.5973 11.1841 10.3316 10.9184C10.0659 10.6527 9.91666 10.2924 9.91666 9.91667C9.91666 9.54094 10.0659 9.18061 10.3316 8.91493C10.5973 8.64926 10.9576 8.5 11.3333 8.5H14.1667Z"
            fill="white" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div style={styles.deliveryBarText}>{title}</div>
      </div>

      {/*Item list*/}
      {items &&
        items.map((item, index) =>
          <div style={{ marginLeft: 20, marginVertical: 10 }}>
            <div style={{ flexDirection: 'row' }}>
              {/* <image
                style={styles.tinyLogo}
                source={
                  item.picture ?
                    { uri: item.picture } :
                    require('../../assets/images/placeholder.png')
                }
              /> */}
              <div style={styles.itemContainer}>
                <div style={styles.itemTitle}>{item.name}</div>
                <div style={styles.itemNumber}>{item.trackingNumber}</div>
                <div style={styles.itemTitle}>{item.weight} kg</div>
              </div>
            </div>
          </div>
        )
      }

    </div>
  )
}

export default ItemCard;

const styles = {
  bottomContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginVertical: 10,
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
  itemNumber: {
    color: Colors.textGray,
    fontSize: FontSizes.smallTrackingNumber,
    marginBottom: 6,
    fontFamily: FontFamily.regular,
  },
  deliveryBar: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20
  },
  deliveryBarText: {
    marginLeft: 10,
    color: Colors.darkGrayBlack,
    fontSize: FontSizes.groupCardText,
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
