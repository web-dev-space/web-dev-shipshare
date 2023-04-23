import { useState } from "react";
import Header from "../../../@mui-library/layouts/dashboard/header"
import NavVertical from "../../../@mui-library/layouts/dashboard/nav/NavVertical"
import Main from "../../../@mui-library/layouts/dashboard/Main"
import {Container, Typography, Box, FilledInput} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InventoryIcon from '@mui/icons-material/Inventory';



const RouteTableItem = ({ index, type, time, price, factor, parcelWeight, parcelLength, parcelWidth, parcelHeight }) => {
	let actualFactor = 1;
	if(parcelHeight !== "" && parcelLength !== "" && parcelWidth !== "" && parcelWeight !== "") {
		actualFactor = parseFloat(parcelWeight) > Math.ceil(parseFloat(parcelHeight) * parseFloat(parcelLength) * parseFloat(parcelWidth) / 5000) ? parseFloat(parcelWeight) : Math.ceil(parseFloat(parcelHeight) * parseFloat(parcelHeight) * parseFloat(parcelWeight) / 5000);
	}
	else if(parcelWeight !== ""){
		actualFactor = parseFloat(parcelWeight);
	}
	else if(parcelHeight !== "" && parcelLength !== "" && parcelWidth !== ""){
		actualFactor = Math.ceil(parseFloat(parcelHeight) * parseFloat(parcelLength) * parseFloat(parcelWidth) / 5000);
	}
// console.log("factor is " +factor);
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #E2E8F0', borderRadius: '8px', p: 2 , marginBottom:2}}>
			{/* left photo */}
			{index === 0?
				<div style={{backgroundColor: "#22BB9C14", borderRadius:"20px", width: '50px', height: '50px', display: "flex", alignItems: "center", justifyItems:'center', alignContent:"center"}}>
					<svg width="26" height="19" viewBox="0 0 26 19" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginLeft: 13}}>
						<path d="M6.00002 18.8334C5.0278 18.8334 4.20141 18.4931 3.52085 17.8126C2.8403 17.132 2.50002 16.3056 2.50002 15.3334H0.166687V2.50008C0.166687 1.85841 0.395354 1.3093 0.852687 0.852748C1.30924 0.395415 1.85835 0.166748 2.50002 0.166748H18.8334V4.83342H22.3334L25.8334 9.50008V15.3334H23.5C23.5 16.3056 23.1597 17.132 22.4792 17.8126C21.7986 18.4931 20.9722 18.8334 20 18.8334C19.0278 18.8334 18.2014 18.4931 17.5209 17.8126C16.8403 17.132 16.5 16.3056 16.5 15.3334H9.50002C9.50002 16.3056 9.15974 17.132 8.47919 17.8126C7.79863 18.4931 6.97224 18.8334 6.00002 18.8334ZM6.00002 16.5001C6.33058 16.5001 6.60785 16.3881 6.83185 16.1641C7.05508 15.9409 7.16669 15.664 7.16669 15.3334C7.16669 15.0029 7.05508 14.726 6.83185 14.5027C6.60785 14.2787 6.33058 14.1667 6.00002 14.1667C5.66947 14.1667 5.39219 14.2787 5.16819 14.5027C4.94497 14.726 4.83335 15.0029 4.83335 15.3334C4.83335 15.664 4.94497 15.9409 5.16819 16.1641C5.39219 16.3881 5.66947 16.5001 6.00002 16.5001ZM20 16.5001C20.3306 16.5001 20.6075 16.3881 20.8307 16.1641C21.0547 15.9409 21.1667 15.664 21.1667 15.3334C21.1667 15.0029 21.0547 14.726 20.8307 14.5027C20.6075 14.2787 20.3306 14.1667 20 14.1667C19.6695 14.1667 19.3926 14.2787 19.1694 14.5027C18.9454 14.726 18.8334 15.0029 18.8334 15.3334C18.8334 15.664 18.9454 15.9409 19.1694 16.1641C19.3926 16.3881 19.6695 16.5001 20 16.5001ZM18.8334 10.6667H23.7917L21.1667 7.16675H18.8334V10.6667Z" fill="#80B213"/>
					</svg>
				</div>:''
			}
			{index === 1?
			<div style={{backgroundColor: "#22BB9C14", borderRadius:"20px", width: '50px', height: '50px', display: "flex", alignItems: "center", justifyItems:'center', alignContent:"center"}}>
				<svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginLeft: 13}}>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M24.7 14.8H25.35C25.7075 14.8 26 15.0925 26 15.45V16.75C26 17.1075 25.7075 17.4 25.35 17.4H23.4C23.4 19.5531 21.6531 21.3 19.5 21.3C17.3469 21.3 15.6 19.5531 15.6 17.4H10.4C10.4 19.5531 8.65313 21.3 6.5 21.3C4.34688 21.3 2.6 19.5531 2.6 17.4V12.2H8.775C8.95375 12.2 9.1 12.0537 9.1 11.875V11.225C9.1 11.0462 8.95375 10.9 8.775 10.9H0.325C0.14625 10.9 0 10.7537 0 10.575V9.925C0 9.74625 0.14625 9.6 0.325 9.6H10.075C10.2538 9.6 10.4 9.45375 10.4 9.275V8.625C10.4 8.44625 10.2538 8.3 10.075 8.3H1.625C1.44625 8.3 1.3 8.15375 1.3 7.975V7.325C1.3 7.14625 1.44625 7 1.625 7H11.375C11.5538 7 11.7 6.85375 11.7 6.675V6.025C11.7 5.84625 11.5538 5.7 11.375 5.7H0.325C0.14625 5.7 0 5.55375 0 5.375V4.725C0 4.54625 0.14625 4.4 0.325 4.4H2.6V2.45C2.6 1.37344 3.47344 0.5 4.55 0.5H14.95C16.0266 0.5 16.9 1.37344 16.9 2.45V4.4H18.6916C19.2075 4.4 19.7031 4.60719 20.0688 4.97281L24.1272 9.03125C24.4928 9.39687 24.7 9.8925 24.7 10.4084V14.8ZM4.54949 17.4C4.54949 18.4766 5.42293 19.35 6.49949 19.35C7.57606 19.35 8.44949 18.4766 8.44949 17.4C8.44949 16.3234 7.57606 15.45 6.49949 15.45C5.42293 15.45 4.54949 16.3234 4.54949 17.4ZM17.5495 17.4C17.5495 18.4766 18.4229 19.35 19.4995 19.35C20.5761 19.35 21.4495 18.4766 21.4495 17.4C21.4495 16.3234 20.5761 15.45 19.4995 15.45C18.4229 15.45 17.5495 16.3234 17.5495 17.4ZM16.8995 10.9H22.7495V10.4084L18.6911 6.35H16.8995V10.9Z" fill="#80B213"/>
				</svg>
			</div>:''
			}
			{index === 2?
				<div style={{backgroundColor: "#22BB9C14", borderRadius:"20px", width: '50px', height: '50px', display: "flex", alignItems: "center", justifyItems:'center', alignContent:"center"}}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginLeft: 13}}>
						<path d="M23.1391 22.0499L21.5891 20.8999C20.3391 19.9499 18.3391 19.9499 17.0391 20.8999L16.7891 21.0999C16.1891 21.5499 15.1891 21.5499 14.5891 21.0999L13.8891 20.5499C12.6391 19.5999 10.6391 19.5999 9.33914 20.5499L9.03914 20.7499C8.43914 21.1999 7.43914 21.1999 6.83914 20.7499C5.58914 19.7999 3.58914 19.7999 2.28914 20.7499L0.43914 22.2499C-0.0108595 22.5999 -0.0608595 23.1999 0.239141 23.5999C0.43914 23.8499 0.739141 23.9999 1.03914 23.9999C1.23914 23.9999 1.43914 23.9499 1.63914 23.7999L3.53914 22.3499C4.13914 21.8999 5.13914 21.8999 5.73914 22.3499C6.98914 23.2999 8.98914 23.2999 10.2891 22.3499L10.5891 22.1499C11.1891 21.6999 12.1891 21.6999 12.7891 22.1499L13.4891 22.6999C14.7391 23.6499 16.7391 23.6499 18.0391 22.6999L18.3391 22.4999C18.9391 22.0499 19.9391 22.0499 20.5391 22.4999L22.0891 23.6499C22.5391 23.9999 23.1391 23.8999 23.4391 23.4499C23.6891 22.9999 23.5891 22.3999 23.1391 22.0499Z" fill="#80B213"/>
						<path d="M12.1891 4.4L20.7391 7.1L19.9391 1.35C19.8891 0.85 19.4391 0.5 18.9891 0.5H4.58911C4.08911 0.5 3.68911 0.85 3.63911 1.35L2.83911 7.15L11.6391 4.45C11.7891 4.35 11.9891 4.35 12.1891 4.4Z" fill="#80B213"/>
						<path d="M1.03909 19.9C1.23909 19.9 1.43909 19.85 1.63909 19.7L3.48909 18.25C4.08909 17.8 5.08909 17.8 5.68909 18.25C6.93909 19.2 8.93909 19.2 10.2391 18.25L10.5391 18.05C11.1391 17.6 12.1391 17.6 12.7391 18.05L13.4391 18.6C14.6891 19.55 16.6891 19.55 17.9891 18.6L18.2891 18.4C18.8891 17.95 19.8891 17.95 20.4891 18.4L22.0391 19.55C22.4891 19.9 23.0891 19.8 23.3891 19.35C23.7391 18.9 23.6391 18.3 23.1891 18L21.6391 16.85C20.3891 15.9 18.3891 15.9 17.0891 16.85L16.7891 17C16.1891 17.45 15.1891 17.45 14.5891 17L13.8891 16.45C12.6391 15.5 10.6391 15.5 9.33909 16.45L9.03909 16.65C8.43909 17.1 7.43909 17.1 6.83909 16.65C5.58909 15.7 3.58909 15.7 2.28909 16.65L0.389092 18.1C-0.0609083 18.45 -0.110908 19.05 0.189092 19.45C0.439092 19.75 0.739092 19.9 1.03909 19.9Z" fill="#80B213"/>
						<path d="M4.58909 14.0001C5.83909 14.0001 6.98909 14.3501 7.93909 15.0501L8.13909 14.9001C8.98909 14.2501 10.0891 13.8501 11.1891 13.8001V7.9001V6.6001L0.939087 9.8001L3.08909 14.2001C3.58909 14.0501 4.08909 14.0001 4.58909 14.0001Z" fill="#80B213"/>
						<path d="M13.1891 7.9V14C13.8891 14.2 14.5391 14.5 15.0891 14.9L15.6891 15.35L15.8891 15.2C16.8391 14.5 18.0891 14.1 19.3391 14.1C19.7391 14.1 20.1391 14.15 20.4891 14.2L22.6391 9.75L13.1891 6.75V7.9Z" fill="#80B213"/>
					</svg>
				</div>:''
			}
			{index === 3?
				<div style={{backgroundColor: "#22BB9C14", borderRadius:"20px", width: '50px', height: '50px', display: "flex", alignItems: "center", justifyItems:'center', alignContent:"center"}}>
					<svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginLeft: 13}}>
						<path fill-rule="evenodd" clip-rule="evenodd" d="M1.08335 9.06266C0.73075 9.06266 0.402073 9.2411 0.209927 9.53673C0.0177846 9.83235 -0.0117394 10.2052 0.131469 10.5274L2.2148 15.2148C2.38199 15.5911 2.75503 15.8335 3.16669 15.8335H20.3542C20.8025 15.8335 21.2006 15.5466 21.3424 15.1212L22.9049 10.4337C23.0107 10.1161 22.9575 9.76693 22.7617 9.49527C22.566 9.2236 22.2515 9.06266 21.9167 9.06266H1.08335Z" fill="#80B213"/>
						<path fill-rule="evenodd" clip-rule="evenodd" d="M5.25002 11.146C4.67473 11.146 4.20835 10.6796 4.20835 10.1043V6.4585C4.20835 5.88318 4.67473 5.41683 5.25002 5.41683H19.8334C20.4087 5.41683 20.875 5.88318 20.875 6.4585V10.1043C20.875 10.6796 20.4087 11.146 19.8334 11.146H5.25002Z" fill="#80B213"/>
						<path fill-rule="evenodd" clip-rule="evenodd" d="M9.41669 6.4585C9.41669 7.03381 9.88304 7.50016 10.4584 7.50016H17.75C18.3253 7.50016 18.7917 7.03381 18.7917 6.4585V2.81266C18.7917 2.23737 18.3253 1.771 17.75 1.771H10.4584C9.88304 1.771 9.41669 2.23737 9.41669 2.81266V6.4585ZM11.5 5.41683V3.85433H16.7084V5.41683H11.5Z" fill="#80B213"/>
						<path fill-rule="evenodd" clip-rule="evenodd" d="M17.75 0.208496V2.81266H15.6667V0.208496H17.75ZM14.625 0.208496V2.81266H12.5417V0.208496H14.625Z" fill="#80B213"/>
					</svg>
				</div>:''
			}

			{/* middle part */}
			<Box sx={{marginLeft:3}}>
				<Typography variant="subtitle1" component="h2" sx={{ fontWeight: 'bold' }}>
					{type}
				</Typography>
				<Typography variant="subtitle2" component="p" sx={{ color: '#777' }}>
					{time}
				</Typography>
			</Box>

			{/* green text */}
			<Typography variant="subtitle1" component="p" sx={{ color: "#80B213", marginLeft: 'auto', fontWeight: 'bold' }}>
				${isNaN(price * actualFactor) ? price +"/kg" : price * actualFactor}
			</Typography>
		</Box>
	);
};
export default RouteTableItem;