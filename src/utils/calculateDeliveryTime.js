import { addDaysToUTCDate, convertDateToString } from "utils/convertDateToString";

export const calculateDeliveryTime = (ship, deliveryStatus) => {
    // If the shipment is delivered, use the delivery date in deliveryStatus.
    if (ship.phaseNumber === 3 && deliveryStatus !== undefined) {
        return convertDateToString(deliveryStatus[0].Date);
    }
    // Calculate the startDate and endDate
    if (ship.shipRoute === "Air Standard") {
        return addDaysToUTCDate(ship.shipEndDate, 7);
    }
    else if (ship.shipRoute === "Air Sensitive") {
        return addDaysToUTCDate(ship.shipEndDate, 14);
    }
    else if (ship.shipRoute === "Sea Standard") {
        return addDaysToUTCDate(ship.shipEndDate, 30);
    }
    else if (ship.shipRoute === "Sea Sensitive") {
        return addDaysToUTCDate(ship.shipEndDate, 45);
    }
}