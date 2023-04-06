import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const hintText = [
  "Order placed",
  "Packaged",
  "In Shipping",
  "Time to pick up the package!"
];

const getParcelsByShipGroupId = async ({ token, shipGroupId }) => {
  return null;
};

const getParcelTracking = async ({ trackingNumber, courier }) => {
  return null;
}

const convertDateToString = (date) => {
  return "Date";
}

const calculateDeliveryTime = (ship, deliveryStatus) => {
  return null;
};

const ShippingDetailScreen = ({ ship }) => {
  const [shipEndDate, setShipEndDate] = useState("Loading...");
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [parcels, setParcels] = useState([]);



  // Calculate the startDate and endDate
  const startDate = convertDateToString(ship.shipEndDate);
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "detailBackgroundGray",
        alignItems: "center"
      }}
    >
      <Box
        sx={{
          backgroundColor: "buttonDarkGreen",
          height: 170,
          width: "100%",
          alignItems: "center"
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: "pageTitle",
            mt: 6,
            fontFamily: "Regular"
          }}
        >
          Shipment Details
        </Typography>
      </Box>

      {/* Top container */}
      <Box
        component={Paper}
        sx={{
          width: "90%",
          backgroundColor: "white",
          position: "relative",
          top: -50,
          borderRadius: 1,
          p: 2
        }}
      >
        <Box
          sx={{
            width: "90%",
            p: 2,
            borderRadius: 1,
            border: "2px dashed",
            borderColor: "lineGray"
          }}
        >
          <Typography sx={{ color: "textGray", textAlign: "center" }}>
            Tracking Number
          </Typography>
          <Typography
            sx={{ color: "blackText", textAlign: "center", fontWeight: "bold" }}
          >
            {ship.trackingNumber || "No Tracking Number Yet"}
          </Typography>
        </Box>

        <Box sx={{ my: 2 }}>
          <Box sx={{ height: 50, bgcolor: "detailBackgroundGray", borderRadius: 1 }} />
          <Divider />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <SvgIcon
              viewBox="0 0 13 16"
              fill="none"
              sx={{ color: "F9C662" }}
            >
              <path
                d="M12.25 6.625C12.25 11 6.625 14.75 6.625 14.75C6.625 14.75 1 11 1 6.625C1 5.13316 1.59263 3.70242 2.64752 2.64752C3.70242 1.59263 5.13316 1 6.625 1C8.11684 1 9.54758 1.59263 10.6025 2.64752C11.6574 3.70242 12.25 5.13316 12.25 6.625Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.625 8.5C7.66053 8.5 8.5 7.66053 8.5 6.625C8.5 5.58947 7.66053 4.75 6.625 4.75C5.58947 4.75 4.75 5.58947 4.75 6.625C4.75 7.66053 5.58947 8.5 6.625 8.5Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </SvgIcon>
            <Typography
              sx={{
                color: "textGray",
                fontWeight: "bold",
                fontSize: "0.8rem",
                ml: 1
              }}
            >
              Shipping address
            </Typography>
          </Box>
          <Typography sx={{ color: "blackText", fontWeight: "bold", ml: 4 }}>
            {ship.pickupLocation.name}
          </Typography>
          <Typography sx={{ color: "textGray", ml: 4 }}>
            {ship.phoneNumber}
          </Typography>
          <Typography sx={{ color: "textGray", ml: 4 }}>
            {ship.pickupLocation.address}
          </Typography>
          <Divider />
          {/* Animation Status */}
          <Typography
            sx={{
              my: 4,
              color: "blackText",
              textAlign: "center",
              fontSize: "bodyText"
            }}
          >
            {hintText[ship.phaseNumber]}
          </Typography>
          <Box sx={{ alignItems: "center" }}>
            <ShippingStatusBar
              phaseNumber={ship.phaseNumber}
              animationWidth={"calc(100% - 32*2)"}
            />
          </Box>
        </Box>
      </Box>
      {/* Bottom Container */}
      {ship.phaseNumber >= 2 && (
        <DeliveryStatusCard deliveryStatus={deliveryStatus} />
      )}

      {/* Detail items list */}
      <Box sx={{ my: 4, width: "90%" }}>
        <ItemCard
          leftCornerIconColor={"#F9C662"}
          items={parcels}
          title={"Items Included"}
        />
      </Box>

      <Box sx={{ height: 180 }} />
    </Box>
  );
};


export default ShippingDetailScreen;
