import {Chip} from "@mui/material";


function OrangeChipGroup ({chipLabelsArray, setFilter, focusChip, setFocusChip}) {
    return (
        <div>
            {chipLabelsArray.map((label) => (
                <Chip
                    key={label}
                    label={label}
                    color={focusChip === label ? "warning" : "default"}
                    variant={focusChip === label ? "filled" : "outlined"}
                    sx={{ fontSize: 14, height: 40, mr: 1, mt:1,
                        color: focusChip === label ? "white" : "grey",
                    }}
                    onClick={() => {
                        setFilter(label);
                        setFocusChip(label);
                    }}
                />
            ))}
        </div>
    )
}
export default OrangeChipGroup;