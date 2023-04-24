import { Chip } from "@mui/material";


function GreenChipGroup ({chipLabelsArray, setFilter, focusChip, setFocusChip, isSmallScreen}) {
    return (
        <div>
            {chipLabelsArray.map((label) => (
                <Chip
                    key={label}
                    label={label}
                    variant={focusChip === label ? "filled" : "outlined"}
                    sx={{ fontSize:  14, height:40, mr: 1, mt:1,
                        color: focusChip === label ? "#80B213" : "black",
                        fontWeight: "bold",
                    }}
                    style={{
                        backgroundColor: focusChip === label ? "rgb(228, 240, 205)" : "white",
                        paddingLeft: 20,
                        paddingRight: 20,
                        borderRadius: 20,
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
export default GreenChipGroup;