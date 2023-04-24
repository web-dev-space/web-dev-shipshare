import { Search as SearchIcon } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material";



export default function SearchBar({width, height,
                                  searchText,
                                  searchTerm, setSearchTerm,
                                  handleSearch, handleInputChange,
                                  handleKeyPress, borderStyle}) {
    return (
        <Paper sx={{ p: '2px 4px', display: 'flex',
            alignItems: 'center',
            width: width, height: height,
            border: borderStyle ? borderStyle : '2px solid #80B213',
            borderRadius: 2 }}
        >
            {/*icon*/}
            <IconButton sx={{ p: '10px' }} aria-label="search"
                        onClick={handleSearch}>
                <SearchIcon />
            </IconButton>
            {/*input text*/}
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={searchText}
                value={searchTerm}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
        </Paper>
    );
}