// Components
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Input, InputAdornment } from "@mui/material";

// Types
import { filterProps } from "../types/types";

export default function Filter({ filter, setFilter }: filterProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: {
          xs: "center",
          md: "flex-end",
        },
        marginBlock: "20px",
      }}
    >
      <FormControl>
        <InputLabel htmlFor="filterData">Search By Name / Amount</InputLabel>
        <Input
          id="filterData"
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          endAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          sx={{
            display: "flex",
            gap: "20px",
          }}
        />
      </FormControl>
    </Box>
  );
}
