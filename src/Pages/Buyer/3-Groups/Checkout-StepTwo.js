import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ParcelListCard from '../1-Parcels/parcel-components/ParcelListCard';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {findShipGroupByIdThunk} from "../../../redux/shipGroups/shipGroups-thunks";


const parcels = [{
  name: 'Parcel 1',
  image: 'https://picsum.photos/200/300',
  logisticsNumber: 'LOG001',
  weight: '10 kg',
}, {name: 'Parcel 2', image: 'https://picsum.photos/200/300', logisticsNumber: 'LOG002', weight: '5 kg',},];

const shipment = {
  shipmentType: 'Air Standard',
  deliveryDate: 'Mar 10, 2023',
  deliveryAddress: 'Apt 505, 425 El Camino Real Santa Clara, CA 95056',
};

const totalExpense = {
  shipping: 50,
  tax: 5,
  total: 55,
};

export default function CheckoutStepTwo({parcels, selectedParcels, setSelectedParcels}) {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const groupId = searchParams.get('groupId');
  console.log("groupId", groupId)

  const dispatch = useDispatch();
  const currentGroup = useSelector((state) => {
    return state.shipGroup.currentGroup
  });

  useEffect(() => {
    dispatch(findShipGroupByIdThunk(groupId));
  }, []);

  function formatDate(dateString) {
    if (!dateString) {
      return null;
    }
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    return formattedDate;
  }


  const routePrices = {
    'Air Standard': 15,
    'Air Sensitive': 20,
    'Sea Standard': 5,
    'Sea Sensitive': 10,
  };
  const getPriceForRoute = (routeName) => {
    return routePrices[routeName];
  };

  const routeRate = currentGroup ? getPriceForRoute(currentGroup.shipRoute) : 0;
  const totalWeight = (selectedParcels.reduce((acc, parcel) => acc + parcel.weight, 0)).toFixed(1);

  return (
    <Box sx={{flexGrow: 1}}>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <ParcelListCard index={false} parcels={parcels} setSelectedParcels={setSelectedParcels}/>
        </Grid>

        <Grid item xs={6}>
          <Card sx={{minWidth: 275, borderRadius: 3, marginBottom: 8}}>
            <CardContent>
              <Typography sx={{fontSize: 24}} color="text.secondary" gutterBottom>
                Shipment Information
              </Typography>
              <Typography variant="body1" component="div">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': {mr: 1, my: 0.5},
                  }}
                >
                  <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22.6008 10.9209C23.2209 10.3524 23.2726 9.37061 22.6525 8.7505C22.3941 8.49212 22.0841 8.33709 21.7223 8.28542L16.8648 7.56196C16.3481 7.51029 15.9347 7.14856 15.6763 6.68348L13.5059 2.29106C13.1442 1.51593 12.214 1.1542 11.4389 1.51593C11.1288 1.67096 10.8188 1.92933 10.6638 2.29106L8.4934 6.68348C8.28669 7.14856 7.82161 7.45861 7.30486 7.56196L2.44736 8.28542C1.62055 8.38877 1.00045 9.1639 1.1038 9.99071C1.15547 10.3524 1.3105 10.6625 1.56888 10.9209L5.08281 14.3315C5.44454 14.6932 5.59957 15.2099 5.54789 15.7267L4.82443 20.5325C4.66941 21.3593 5.18616 22.1861 6.06465 22.3412C6.42638 22.3928 6.7881 22.3412 7.09816 22.1861L11.4389 19.9124C11.904 19.654 12.4207 19.654 12.8858 19.9124L17.2266 22.1861C17.95 22.5995 18.9318 22.3412 19.3452 21.566C19.5003 21.256 19.6036 20.8942 19.5003 20.5325L18.6735 15.7267C18.5701 15.2099 18.7768 14.6932 19.1385 14.3315L22.6008 10.9209Z"
                      stroke="#323142" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <Typography>
                    {currentGroup ? currentGroup.shipRoute : "Loading.."}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': {mr: 1, my: 0.5},
                  }}
                >
                  <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M11.937 3.37714V4.22163C11.9218 4.9706 10.7104 5.3975 10.3275 4.57921C10.2765 4.46682 10.2494 4.34505 10.248 4.22163V3.37714H7.71539C7.06532 3.34586 6.62997 2.49629 7.07716 1.97979C7.23101 1.80227 7.35528 1.7059 7.71539 1.68815C8.55904 1.68815 9.40354 1.68561 10.248 1.68054V0.844496C10.2458 0.754454 10.2601 0.664769 10.2903 0.579904C10.4019 0.240922 10.7358 0 11.1094 0C11.56 0.0177522 11.9269 0.355043 11.937 0.844496V1.67039C13.6252 1.66025 15.3142 1.65095 17.0032 1.6594V0.844496C17.0116 0.393084 17.3413 0.0194428 17.8307 0H17.8637C18.3151 0.0177522 18.682 0.355043 18.6913 0.844496V1.67462L19.5984 1.68899C20.8926 1.72957 22.0439 2.84288 22.0684 4.19036C22.1006 9.27677 22.1006 14.364 22.0684 19.4513C22.0448 20.7573 20.9145 21.9273 19.5671 21.9527C13.9177 21.9873 8.2674 21.9873 2.61799 21.9527C1.31701 21.9281 0.141982 20.8207 0.116622 19.4513C0.0844986 14.364 0.0844986 9.27677 0.116622 4.19036C0.140291 2.875 1.26713 1.69744 2.64673 1.68815H3.49376V0.844496C3.49109 0.754426 3.50543 0.664661 3.53603 0.579904C3.64761 0.240922 3.98152 0 4.35432 0C4.80573 0.0177522 5.17261 0.355043 5.18191 0.844496V4.22163C5.16753 4.96976 3.99082 5.38905 3.58759 4.60964C3.52686 4.48926 3.49475 4.35647 3.49376 4.22163V3.37376C3.20521 3.3715 2.91665 3.37263 2.62813 3.37714C2.19954 3.39066 1.81829 3.76599 1.80477 4.2005C1.71051 9.28 1.71051 14.3608 1.80477 19.4403C1.81829 19.8697 2.19362 20.2501 2.62813 20.2637C8.27058 20.3685 13.9145 20.3685 19.5569 20.2637C19.9855 20.2501 20.3668 19.8748 20.3803 19.4403C20.4741 14.3615 20.4741 9.27931 20.3803 4.2005C20.3675 3.98224 20.2735 3.77668 20.1167 3.6243C19.9599 3.47191 19.7518 3.38373 19.5333 3.37714H18.6913V4.22163C18.6769 4.963 17.4968 5.38144 17.097 4.60964C17.0367 4.48911 17.0046 4.35642 17.0032 4.22163V3.37714H11.937ZM4.33741 16.8865C4.45061 16.8829 4.56338 16.9022 4.66902 16.943C4.77466 16.9839 4.87101 17.0455 4.95236 17.1243C5.0337 17.2031 5.09838 17.2975 5.14255 17.4018C5.18672 17.5061 5.20948 17.6182 5.20948 17.7315C5.20948 17.8447 5.18672 17.9568 5.14255 18.0611C5.09838 18.1654 5.0337 18.2598 4.95236 18.3386C4.87101 18.4174 4.77466 18.479 4.66902 18.5199C4.56338 18.5607 4.45061 18.58 4.33741 18.5764C4.11795 18.5694 3.9098 18.4774 3.75701 18.3197C3.60423 18.162 3.5188 17.951 3.5188 17.7315C3.5188 17.5119 3.60423 17.3009 3.75701 17.1432C3.9098 16.9855 4.11795 16.8935 4.33741 16.8865ZM7.71539 16.8865C7.82948 16.8815 7.94339 16.8997 8.05025 16.94C8.15712 16.9802 8.25473 17.0417 8.33718 17.1207C8.41963 17.1997 8.48522 17.2946 8.52999 17.3996C8.57476 17.5047 8.59779 17.6177 8.59767 17.7319C8.59756 17.8461 8.57431 17.9591 8.52933 18.0641C8.48435 18.169 8.41857 18.2638 8.33595 18.3426C8.25334 18.4214 8.15562 18.4827 8.04867 18.5228C7.94172 18.5628 7.82778 18.5807 7.7137 18.5755C7.49627 18.5656 7.29106 18.4721 7.14079 18.3147C6.99052 18.1572 6.90677 17.9479 6.90699 17.7302C6.90721 17.5126 6.99137 17.3034 7.14196 17.1462C7.29254 16.9891 7.49794 16.896 7.71539 16.8865ZM11.0925 16.8865C11.31 16.8963 11.5153 16.9895 11.6657 17.1468C11.8161 17.3041 11.9001 17.5134 11.9001 17.731C11.9001 17.9487 11.8161 18.1579 11.6657 18.3153C11.5153 18.4726 11.31 18.5658 11.0925 18.5755C10.8751 18.5658 10.6698 18.4726 10.5194 18.3153C10.3689 18.1579 10.285 17.9487 10.285 17.731C10.285 17.5134 10.3689 17.3041 10.5194 17.1468C10.6698 16.9895 10.8751 16.8963 11.0925 16.8865ZM4.33741 13.5094C4.4505 13.5058 4.56316 13.525 4.66869 13.5658C4.77423 13.6066 4.87049 13.6682 4.95175 13.7469C5.03302 13.8257 5.09763 13.9199 5.14176 14.0241C5.18588 14.1283 5.20862 14.2403 5.20862 14.3535C5.20862 14.4666 5.18588 14.5786 5.14176 14.6828C5.09763 14.787 5.03302 14.8813 4.95175 14.96C4.87049 15.0387 4.77423 15.1003 4.66869 15.1411C4.56316 15.1819 4.4505 15.2011 4.33741 15.1975C4.11817 15.1906 3.91023 15.0986 3.7576 14.9411C3.60497 14.7836 3.51963 14.5728 3.51963 14.3535C3.51963 14.1341 3.60497 13.9234 3.7576 13.7658C3.91023 13.6083 4.11817 13.5163 4.33741 13.5094ZM7.71539 13.5094C7.93925 13.5094 8.15395 13.5983 8.31224 13.7566C8.47054 13.9149 8.55946 14.1296 8.55946 14.3535C8.55946 14.5773 8.47054 14.792 8.31224 14.9503C8.15395 15.1086 7.93925 15.1975 7.71539 15.1975C7.49153 15.1975 7.27684 15.1086 7.11854 14.9503C6.96025 14.792 6.87132 14.5773 6.87132 14.3535C6.87132 14.1296 6.96025 13.9149 7.11854 13.7566C7.27684 13.5983 7.49153 13.5094 7.71539 13.5094ZM11.0925 13.5094C11.2057 13.5058 11.3185 13.525 11.4241 13.5659C11.5298 13.6067 11.6261 13.6684 11.7075 13.7472C11.7888 13.826 11.8535 13.9204 11.8977 14.0247C11.9418 14.1289 11.9646 14.2411 11.9646 14.3543C11.9646 14.4676 11.9418 14.5797 11.8977 14.684C11.8535 14.7883 11.7888 14.8826 11.7075 14.9614C11.6261 15.0402 11.5298 15.1019 11.4241 15.1428C11.3185 15.1836 11.2057 15.2028 11.0925 15.1992C10.8731 15.1923 10.6649 15.1002 10.5121 14.9425C10.3594 14.7848 10.2739 14.5739 10.2739 14.3543C10.2739 14.1347 10.3594 13.9238 10.5121 13.7661C10.6649 13.6084 10.8731 13.5163 11.0925 13.5094ZM14.4697 13.5094C14.5829 13.5058 14.6956 13.525 14.8013 13.5659C14.9069 13.6067 15.0033 13.6684 15.0846 13.7472C15.166 13.826 15.2306 13.9204 15.2748 14.0247C15.319 14.1289 15.3417 14.2411 15.3417 14.3543C15.3417 14.4676 15.319 14.5797 15.2748 14.684C15.2306 14.7883 15.166 14.8826 15.0846 14.9614C15.0033 15.0402 14.9069 15.1019 14.8013 15.1428C14.6956 15.1836 14.5829 15.2028 14.4697 15.1992C14.2502 15.1923 14.0421 15.1002 13.8893 14.9425C13.7365 14.7848 13.6511 14.5739 13.6511 14.3543C13.6511 14.1347 13.7365 13.9238 13.8893 13.7661C14.0421 13.6084 14.2502 13.5163 14.4697 13.5094ZM17.8468 13.5094C17.9599 13.5058 18.0726 13.525 18.1781 13.5658C18.2836 13.6066 18.3799 13.6682 18.4611 13.7469C18.5424 13.8257 18.607 13.9199 18.6511 14.0241C18.6953 14.1283 18.718 14.2403 18.718 14.3535C18.718 14.4666 18.6953 14.5786 18.6511 14.6828C18.607 14.787 18.5424 14.8813 18.4611 14.96C18.3799 15.0387 18.2836 15.1003 18.1781 15.1411C18.0726 15.1819 17.9599 15.2011 17.8468 15.1975C17.6276 15.1906 17.4196 15.0986 17.267 14.9411C17.1144 14.7836 17.029 14.5728 17.029 14.3535C17.029 14.1341 17.1144 13.9234 17.267 13.7658C17.4196 13.6083 17.6276 13.5163 17.8468 13.5094ZM7.71539 10.1323C7.82618 10.1323 7.93589 10.1541 8.03824 10.1965C8.1406 10.2389 8.2336 10.301 8.31194 10.3794C8.39028 10.4577 8.45243 10.5507 8.49482 10.6531C8.53722 10.7554 8.55904 10.8651 8.55904 10.9759C8.55904 11.0867 8.53722 11.1964 8.49482 11.2988C8.45243 11.4011 8.39028 11.4941 8.31194 11.5725C8.2336 11.6508 8.1406 11.7129 8.03824 11.7553C7.93589 11.7977 7.82618 11.8196 7.71539 11.8196C7.49164 11.8196 7.27706 11.7307 7.11884 11.5725C6.96063 11.4142 6.87174 11.1997 6.87174 10.9759C6.87174 10.7522 6.96063 10.5376 7.11884 10.3794C7.27706 10.2211 7.49164 10.1323 7.71539 10.1323ZM11.0925 10.1323C11.2066 10.1272 11.3205 10.1452 11.4274 10.1854C11.5344 10.2255 11.632 10.2869 11.7146 10.3658C11.7971 10.4447 11.8628 10.5395 11.9077 10.6445C11.9525 10.7495 11.9757 10.8626 11.9757 10.9768C11.9757 11.0909 11.9525 11.204 11.9077 11.309C11.8628 11.414 11.7971 11.5088 11.7146 11.5877C11.632 11.6666 11.5344 11.728 11.4274 11.7682C11.3205 11.8083 11.2066 11.8264 11.0925 11.8212C10.8751 11.8115 10.6698 11.7183 10.5194 11.561C10.3689 11.4037 10.285 11.1944 10.285 10.9768C10.285 10.7591 10.3689 10.5498 10.5194 10.3925C10.6698 10.2352 10.8751 10.142 11.0925 10.1323ZM14.4697 10.1323C14.5837 10.1272 14.6977 10.1452 14.8046 10.1854C14.9115 10.2255 15.0092 10.2869 15.0917 10.3658C15.1742 10.4447 15.2399 10.5395 15.2848 10.6445C15.3297 10.7495 15.3528 10.8626 15.3528 10.9768C15.3528 11.0909 15.3297 11.204 15.2848 11.309C15.2399 11.414 15.1742 11.5088 15.0917 11.5877C15.0092 11.6666 14.9115 11.728 14.8046 11.7682C14.6977 11.8083 14.5837 11.8264 14.4697 11.8212C14.2522 11.8115 14.0469 11.7183 13.8965 11.561C13.7461 11.4037 13.6621 11.1944 13.6621 10.9768C13.6621 10.7591 13.7461 10.5498 13.8965 10.3925C14.0469 10.2352 14.2522 10.142 14.4697 10.1323ZM17.8468 10.1323C18.0707 10.1321 18.2854 10.221 18.4438 10.3792C18.6022 10.5374 18.6912 10.752 18.6913 10.9759C18.6914 11.1998 18.6026 11.4145 18.4444 11.5729C18.2862 11.7313 18.0715 11.8203 17.8476 11.8204C17.7368 11.8205 17.627 11.7987 17.5246 11.7563C17.4222 11.7139 17.3291 11.6518 17.2507 11.5735C17.1723 11.4951 17.11 11.4021 17.0676 11.2997C17.0251 11.1973 17.0032 11.0876 17.0032 10.9768C17.0031 10.8659 17.0249 10.7561 17.0672 10.6537C17.1096 10.5513 17.1717 10.4582 17.2501 10.3798C17.3284 10.3014 17.4214 10.2391 17.5238 10.1967C17.6262 10.1542 17.736 10.1323 17.8468 10.1323Z"
                          fill="#323142"/>
                  </svg>
                  <Typography>
                    {currentGroup ? formatDate(currentGroup.shipEndDate): "Loading.."}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': {mr: 1, my: 0.5},
                  }}
                >
                  <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.4866 19.0404V16.2292C8.48659 15.5142 9.06951 14.9332 9.79175 14.9284H12.4373C13.163 14.9284 13.7513 15.5108 13.7513 16.2292V16.2292V19.0491C13.7511 19.6562 14.2406 20.1524 14.8536 20.1666H16.6173C18.3755 20.1666 19.8008 18.7555 19.8008 17.0149V17.0149V9.01793C19.7914 8.33318 19.4667 7.69016 18.919 7.27187L12.8871 2.46144C11.8303 1.62385 10.3282 1.62385 9.27145 2.46144L3.26601 7.2806C2.71623 7.69719 2.39093 8.34128 2.38416 9.02666V17.0149C2.38416 18.7555 3.80946 20.1666 5.56766 20.1666H7.33137C7.95965 20.1666 8.46897 19.6624 8.46897 19.0404V19.0404"
                      stroke="#323142" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <Typography>{currentGroup ? (currentGroup.pickupLocation.address): "Loading.."}</Typography>
                </Box>
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{minWidth: 275}}>
            <CardContent>
              <Typography variant="h6" component="div" sx={{display: 'flex', justifyContent: 'space-between'}}>
                Route Rate
                <Typography sx={{textAlign: 'right'}}>
                  {routeRate !== 0 ? "$ " + routeRate + " /lbs" : "Loading.."}
                </Typography>
              </Typography>
              <Typography variant="h6" component="div" sx={{display: 'flex', justifyContent: 'space-between'}}>
                Weight
                <Typography sx={{textAlign: 'right'}}>
                  {totalWeight} lbs
                </Typography>
              </Typography>
              <Typography variant="h5" component="div" sx={{
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: 'bold',
                marginTop: '20px'
              }}>
                Total
                <Typography sx={{textAlign: 'right'}}>
                  $ {routeRate * totalWeight}
                </Typography>
              </Typography>
            </CardContent>
          </Card>

          {/*<Button variant="contained" style={{borderRadius:15, marginTop: 30, marginBottom:30, marginRight:20, maxWidth:400}} fullWidth="true" >*/}
          {/*	Place Order*/}
          {/*</Button>*/}
          {/*<Grid  sx={{ display: 'flex', justifyContent: 'center' }}>*/}
          {/*	<Button variant="contained" style={{ borderRadius: 25, marginTop: 30, marginBottom: 30, maxWidth: 400, height:50}} fullWidth="true">*/}
          {/*		Place Order*/}
          {/*	</Button>*/}
          {/*</Grid>*/}
        </Grid>
      </Grid>
    </Box>
  );
}
