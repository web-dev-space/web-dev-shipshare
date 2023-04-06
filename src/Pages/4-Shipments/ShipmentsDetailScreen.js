import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Colors from "../../styles/Colors.js";
import FontSizes from "../../styles/FontSizes.js";
// import ShippingStatusBar from "../../widgets/ShippingStatusBar.js";
// import DeliveryStatusCard from "../../Cards/DeliveryStatusCard";
// import ItemCard from "../../Cards/ItemCard";
// import { getParcelsByShipGroupId, getParcelTracking } from "../../../api/parcel";
// import { addDaysToUTCDate, convertDateToString } from "../../../api/convertDateToString";
// import { calculateDeliveryTime } from "../../../api/calculateDeliveryTime";
import FontFamily from "../../styles/FontFamily";
import shipGroups from "../../sampleData/shipGroups";
import styles from "./ShipmentsDetailScreen.css";

const hintText = [
  "Order placed",
  "Packaged",
  "In Shipping",
  "Time to pick up the package!",
];

export const ShippingDetailScreen = ({ ship }) => {
  if (ship === undefined) {
    ship = shipGroups[0];
  }

  const [shipEndDate, setShipEndDate] = useState("Loading...");
  // const ship = route.params.ship;
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [parcels, setParcels] = useState([]);
  // const token = useSelector((state) => state.auth.token);

  // // Fetch the delivery status
  // useEffect(() => {
  //   const fetchedDeliveryStatus = async () => {
  //     const deliveryStatus =
  //       ship.phaseNumber >= 2
  //         ? await getParcelTracking({
  //             trackingNumber: ship.trackingNumber.replaceAll(" ", ""),
  //             courier: "dhl",
  //           })
  //         : undefined;
  //     if (deliveryStatus) {
  //       setDeliveryStatus(deliveryStatus.origin_info.trackinfo);
  //       setShipEndDate(calculateDeliveryTime(ship, deliveryStatus.origin_info.trackinfo));
  //     } else {
  //       setShipEndDate(calculateDeliveryTime(ship));
  //     }
  //     const parcels = await getParcelsByShipGroupId({ token, shipGroupId: ship.id });
  //     setParcels(parcels);
  //   };
  //   fetchedDeliveryStatus().catch((e) => {
  //     console.error(e);
  //   });
  // }, [ship]);

  // // Calculate the startDate and endDate
  // const startDate = convertDateToString(ship.shipEndDate);
  const startDate = "2021-01-01";


  return (
    <div>
      <div style={styles.container}>
        <div style={styles.greenHeadPart}>
          <div style={styles.title}>Shipment Details</div>
        </div>

        {/*Top container -- tracking number part*/}
        <div style={styles.topContainer}>
          <div style={styles.trackingNumberContainer}>
            <div style={styles.trackingNumberText}>Tracking Number</div>
            <div style={styles.trackingNumber}>{ship.trackingNumber || "No Tracking Number Yet"}</div>
          </div>

          <div style={styles.flexRow}>
            <div style={styles.ball} />
            <div style={styles.breakLine} />
            <div style={styles.ball} />
          </div>

          {/*Middle part -- contact part*/}
          <div style={styles.addressContainer}>
            <div style={styles.addressTitlePart}>
              <svg width="13" height="16" view-box="0 0 13 16" fill="none">
                <path
                  d="M12.25 6.625C12.25 11 6.625 14.75 6.625 14.75C6.625 14.75 1 11 1 6.625C1 5.13316 1.59263 3.70242 2.64752 2.64752C3.70242 1.59263 5.13316 1 6.625 1C8.11684 1 9.54758 1.59263 10.6025 2.64752C11.6574 3.70242 12.25 5.13316 12.25 6.625Z"
                  stroke="#F9C662"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.625 8.5C7.66053 8.5 8.5 7.66053 8.5 6.625C8.5 5.58947 7.66053 4.75 6.625 4.75C5.58947 4.75 4.75 5.58947 4.75 6.625C4.75 7.66053 5.58947 8.5 6.625 8.5Z"
                  stroke="#F9C662"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div style={styles.addressTitle}>Shipping address</div>
            </div>
            <div style={styles.nameText}>{ship.pickupLocation.name}</div>
            <div style={styles.contactText}>{ship.phoneNumber}</div>
            <div style={styles.contactText}>{ship.pickupLocation.address}</div>
            <div style={{ height: 50 }} />
          </div>

          <div style={styles.breakLine} />

          {/*Status part -- shipping status*/}
          <div style={styles.flexRow}>
            <div style={styles.status1}>
              <div style={styles.statusText}>{startDate}</div>
              <div style={styles.statusLocation}>Guangzhou</div>
            </div>
            <svg width="31" height="31" view-box="0 0 31 31" fill="none">
              <circle cx="15.5" cy="15.5" r="15.5" fill="#F7F7F7" />
              <path
                d="M14.938 19.7072L16.062 20.8311L21.3932 15.4999L16.062 10.1687L14.938 11.2926L18.3504 14.705H10.7308V16.2948H18.3504L14.938 19.7072Z"
                fill="#80B213"
              />
            </svg>
            <div style={styles.status2}>
              <div style={styles.statusText}>{shipEndDate}</div>
              <div style={styles.statusLocation}>{ship?.pickupLocation?.shortAddress?.split(",")[0]}</div>
            </div>
          </div>
          <div style={{ height: 30 }} />

          {/*animation status*/}
          <div style={styles.shippingText}>{hintText[ship.phaseNumber]}</div>
          <div style={styles.animationStatusContainer}>
            {/* <ShippingStatusBar phaseNumber={ship.phaseNumber} animationWidth={width - 32 * 2 - 10} /> */}
          </div>
        </div>


        {/*Bottom Container*/}
        {ship.phaseNumber >= 2 &&
          // <DeliveryStatusCard deliveryStatus={deliveryStatus} />
          <></>
        }

        {/*Detail items list*/}
        <div style={{ marginTop: ship.phaseNumber >= 2 ? 30 : -10, width: '90%' }}>
          {/* <ItemCard leftCornerIconColor={"#F9C662"}
            items={parcels}
            title={"Items Included"} /> */}
        </div>

        <div style={{ height: 180 }} />
      </div>


    </div>
  );

};

export default ShippingDetailScreen;
