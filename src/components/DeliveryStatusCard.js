import React from "react";
// import { FlatList, Image, ScrollView, StyleSheet, div, div } from "react-native";
// import { Circle, path, rect, svg } from "react-native-svg";
import Colors from '../styles/Colors';
import FontSizes from '../styles/FontSizes';

const FontFamily = {
}

const DeliveryStatusCard = ({ deliveryStatus }) => {
  const getLocationFromDetails = (details) => {
    const locationArray = details.replaceAll(',', '').split(' ');
    return locationArray[0] + ' ' + locationArray[1];
  };
  return (
    <div style={styles.bottomContainer}>
      <div style={styles.deliveryBar}>
        <svg width={17} height={12} viewBox="0 0 17 12" fill="none" style={{ alignSelf: 'center' }}>
          <path
            d="M0 2.625H7.44944L8.02247 3.75H0.573034L0 2.625ZM0.764045 4.875H8.21348L8.78652 6H1.33708L0.764045 4.875ZM13.1798 10.875C13.8139 10.875 14.3258 10.3725 14.3258 9.75C14.3258 9.1275 13.8139 8.625 13.1798 8.625C12.5456 8.625 12.0337 9.1275 12.0337 9.75C12.0337 10.3725 12.5456 10.875 13.1798 10.875ZM14.3258 4.125H12.4157V6H15.8234L14.3258 4.125ZM5.53933 10.875C6.17348 10.875 6.68539 10.3725 6.68539 9.75C6.68539 9.1275 6.17348 8.625 5.53933 8.625C4.90517 8.625 4.39326 9.1275 4.39326 9.75C4.39326 10.3725 4.90517 10.875 5.53933 10.875ZM14.7079 3L17 6V9.75H15.4719C15.4719 10.995 14.4481 12 13.1798 12C11.9115 12 10.8876 10.995 10.8876 9.75H7.83146C7.83146 10.995 6.8 12 5.53933 12C4.27101 12 3.24719 10.995 3.24719 9.75H1.7191V7.125H3.24719V8.25H3.82787C4.24809 7.7925 4.85933 7.5 5.53933 7.5C6.21933 7.5 6.83056 7.7925 7.25079 8.25H10.8876V1.5H1.7191C1.7191 0.6675 2.3991 0 3.24719 0H12.4157V3H14.7079Z"
            fill="#F9C662" />
        </svg>
        <div style={styles.deliveryBarText}>Delivery status</div>
      </div>

      {/*Delivery status*/}
      <div style={{ height: 8 }}></div>
      {deliveryStatus.map((item, index) =>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {/* <div>
            {index === deliveryStatus.length - 1 ?
              <svg width="2" height="0" viewBox="0 0 2 0" style={{ marginTop: 3 }} /> :
              <svg width="2" height="83" viewBox="0 0 2 83" style={{ marginTop: 3 }}>
                <rect y="0.344971" width="2" height="82.6303" fill="#EAEAEA" />
              </svg>}
            {index === 0 ?
              <svg width="8" height="8" viewBox="0 0 8 8" style={{ marginLeft: -5 }}>
                <rect y="0.0297852" width="8" height="7.34491" rx="3.67246" fill="#F9C662" />
              </svg> : <svg width="8" height="8" viewBox="0 0 8 8" style={{ marginLeft: -5 }}>
                <rect y="0.0297852" width="8" height="7.34491" rx="3.67246" fill="#DEDEDE" />
              </svg>}
            {index === 0 &&
              <svg width="18" height="17" viewBox="0 0 18 17" style={{ marginLeft: -13, marginTop: -4 }}>
                <rect opacity="0.1" width="18" height="16.5261" rx="8.26303" fill="#F9C662" />
              </svg>}
          </div> */}

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ position: 'relative', background: 'rgba(249, 198, 98, 0.1)', borderRadius: '50%', width: 18, height: 18 }}>
              <div style={{ position: 'absolute', top: 5, left: 5, background: '#F9C662', borderRadius: '50%', width: 8, height: 8 }} />
            </div>
            <div
              style={{
                width: 2,
                height: index === deliveryStatus.length - 1 ? 0 : '100%',
                marginTop: 3,
                background: '#EAEAEA',
              }}
            />
          </div>

          <div style={{ marginLeft: 10, flexShrink: 1, paddingBottom: 12, width: '100%'}}>
            <div numberOfLines={1} style={index === 0 ? styles.deliveryTextCurrent : styles.deliveryText}>{item.StatusDescription}</div>
            <div style={styles.deliveryDateText}>{item.Date}</div>
            {index !== deliveryStatus.length - 1 && <div style={styles.breakDeliveryLine} />}
          </div>
        </div>
      )}

    </div>
  )
}

export default DeliveryStatusCard;

const styles = {
  bottomContainer: {
    width: '90%',
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  breakDeliveryLine: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: Colors.lineGray,
    borderStyle: 'dashed',
    marginVertical: 20,
    marginTop: 12,
  },
  deliveryBar: {
    display: 'flex',
    flexDirection: 'row',
    // marginTop: 30,
    marginBottom: 18
  },
  deliveryBarText: {
    marginLeft: 10,
    color: Colors.darkGrayBlack,
    fontSize: FontSizes.bodyText,
    fontWeight: 'bold',
    fontFamily: FontFamily.bold,
  },
  deliveryTextCurrent: {
    color: Colors.buttonDarkGreen,
    fontSize: FontSizes.groupCardText,
    marginBottom: 5,
    paddingRight: 20,
    fontFamily: FontFamily.regular,
  },
  deliveryDateText: {
    color: Colors.gray,
    fontSize: FontSizes.groupCardText,
    fontFamily: FontFamily.regular,
  },
  deliveryText: {
    color: Colors.darkGrayBlack,
    fontSize: FontSizes.groupCardText,
    marginBottom: 5,
    paddingRight: 20,
    fontFamily: FontFamily.regular,
  },
  tinyLogo: {
    width: 72,
    height: 72,
  },
  itemContainer: {
    marginLeft: 20,
    marginTop: 5,
  },
  itemTitle: {
    color: Colors.blackText,
    fontSize: FontSizes.groupCardText,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: FontFamily.bold,
  },
  itemNumber: {
    color: Colors.textGray,
    fontSize: FontSizes.smallTrackingNumber,
    marginBottom: 8,
    fontFamily: FontFamily.regular,
  }
};
