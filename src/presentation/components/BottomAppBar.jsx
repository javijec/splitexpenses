import * as React from "react";
import { styled } from "@mui/material/styles";
import { AppBar, Box, Toolbar, IconButton, Fab } from "@mui/material";
import { Menu, Add, Search, More } from "@mui/icons-material";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

export default function BottomAppBar() {
  return (
    <React.Fragment>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer">
            <Menu />
          </IconButton>
          <StyledFab color="secondary" aria-label="add">
            <Add />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <Search />
          </IconButton>
          <IconButton color="inherit">
            <More />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
