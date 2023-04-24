import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Colors from 'styles/Colors';
import FontSizes from 'styles/FontSizes';

const FontFamily = {
}

const DeliveryStatusCard = ({ deliveryStatus }) => {
  const getLocationFromDetails = (details) => {
    const locationArray = details?.replaceAll(',', '').split(' ');
    return locationArray[0] + ' ' + locationArray[1];
  };

  return (
    <div style={styles.bottomContainer}>
      <div style={styles.deliveryBar}>
        <div style={{ position: 'absolute', left: -20, top: -1 }}>
          <LocalShippingIcon htmlColor="#F9C662" style={{ fontSize: 18 }} />
        </div>
        <div style={styles.deliveryBarText}>Delivery status</div>
      </div>


      {/*Delivery status*/}
      <div style={{ height: 8 }}></div>

      {deliveryStatus !== undefined && deliveryStatus !== null && deliveryStatus.length !== 0 ? deliveryStatus.map((item, index) =>
        <div style={{ display: 'flex', flexDirection: 'row' }} key={Math.random()}>

          <div style={{ marginLeft: 28, flexShrink: 1, paddingBottom: 12, width: '100%', position: 'relative' }}>
            <div style={index === 0 ? styles.deliveryTextCurrent : styles.deliveryText}>{item.StatusDescription}</div>
            <div style={styles.deliveryDateText}>{item.Date}</div>
            {index !== deliveryStatus.length - 1 && <div style={styles.breakDeliveryLine} />}

            {index === 0 && <div style={{ position: 'absolute', left: -28, top: 0, background: 'rgba(249, 198, 98, 0.1)', borderRadius: '50%', width: 18, height: 18 }}>
              <div style={{ position: 'absolute', top: 5, left: 5, background: index === 0 ? '#F9C662' : 'rgba(249, 198, 98, 0.2)', borderRadius: '50%', width: 8, height: 8 }} />
            </div>}

            {index !== 0 && <div style={{ position: 'absolute', left: -23, top: 4, background: '#EAEAEA', borderRadius: '50%', width: 8, height: 8 }}>
            </div>}

            {index !== deliveryStatus.length - 1 && <div
              style={{
                width: 2,
                height: '100%',
                left: -20,
                top: 13,
                background: '#EAEAEA',
                position: 'absolute',
              }}
            />}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'absolute' }}>

          </div>

        </div>

      )

        :
        <div style={{ ...styles.deliveryBarText, marginLeft: 28, marginTop: -8 }}>Loading ...</div>
      }

    </div >
  )
}

export default DeliveryStatusCard;

const styles = {
  bottomContainer: {
    width: '100%',
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
    marginBottom: 18,
    alignItems: 'center',
    position: 'relative',
    marginLeft: 17,
  },
  deliveryBarText: {
    marginLeft: 10,
    color: Colors.darkGrayBlack,
    fontSize: 14,
    fontFamily: FontFamily.regular,
  },
  deliveryTextCurrent: {
    color: Colors.buttonDarkGreen,
    fontSize: FontSizes.groupCardText,
    marginBottom: 5,
    paddingRight: 20,
    fontFamily: FontFamily.regular,
    overflowWrap: 'anywhere',
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
    overflowWrap: 'anywhere',
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
