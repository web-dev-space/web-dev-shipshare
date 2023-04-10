import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {updateRole} from "./redux/auth-reducer";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";

function ChangeRole() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleBuyerButton() {
        dispatch(updateRole('buyer'));
        console.log('log in as buyer');
        navigate("../buyer/parcels");
    }
    function handleMerchantButton() {
        dispatch(updateRole('merchant'));
        console.log('log in as merchant');
        navigate("../merchant/parcels");
    }
    function handleAdminButton() {
        dispatch(updateRole('admin'));
        console.log('log in as admin');
        navigate("../admin/");
    }


    return (
        <Box sx={{
            display: { lg: 'flex' },
            flexDirection: { lg: 'row' },
            align: 'center',
            minHeight: "200",
        }}>
            <Button onClick={handleBuyerButton} variant="contained">
                Buyer Mode
            </Button>
            <Button onClick={handleMerchantButton} variant="outlined">
                Merchant Mode
            </Button>
            <Button onClick={handleAdminButton} >
                Admin Mode
            </Button>
        </Box>
    );
}

export default ChangeRole;