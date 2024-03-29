import React from 'react'
import Box from "@mui/material/Box";
import { palette } from '@mui/system';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { positions } from '@mui/system';

function Footer() {
    return (
        <Box
          id = 'footer'
          sx={{
            width: "100%",
            height: "auto",
            backgroundColor: "text.disabled",
            position: "fixed",
            bottom: 0,
            padding: "10px",
            textAlign: "center",
          }}
        >
          <Container maxWidth="lg" id = 'footerinner'>
            <Grid container direction="column" alignItems="center">
              <Grid item xs={12}>
                <Typography color="black" variant="h5">
                  Recipe App
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="textSecondary" variant="subtitle1">
                  {`${new Date().getFullYear()} © Copyright All rights are reserved`}
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
      );
}

export default Footer
