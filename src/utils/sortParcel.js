function descendingComparator(a, b, orderBy) {
    switch (orderBy) {
        case "date":
            return new Date(b.created).getTime() - new Date(a.created).getTime();
        case "weight":
            if (!a.isWeighted) {
                return 1;
            } else if (!b.isWeighted) {
                return -1;
            } else {
                return b.weight - a.weight;
            }
        case "name":
            return b.name.localeCompare(a.name);
        case "status":
            if (a.isShipped) {
                return 1;
            } else if (b.isShipped) {
                return -1;
            } else if (a.isWeighted) {
                return 1;
            } else if (b.isWeighted) {
                return -1;
            } else {
                return 0;
            }
        case "trackingNumber":
            return b.trackingNumber.localeCompare(a.trackingNumber);
        default:
            return b[orderBy] - a[orderBy];
    }
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function sortParcel(array, order, orderBy) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    const comparator = getComparator(order, orderBy);
    stabilizedThis.sort((a, b) => {
        const compareResult = comparator(a[0], b[0]);
        if (compareResult !== 0) {
            return compareResult;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}