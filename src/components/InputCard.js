import { TextField } from "@mui/material";


function InputCard () {
	return (
		<div>
			<TextField
				id="filled-multiline-static"
				label="Share your post here..."
				multiline
				rows={4}
				variant="filled"
				fullWidth="true"
			/>
		</div>
	)
}
export default InputCard;