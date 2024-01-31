import PublicIcon from '@mui/icons-material/Public';
import * as React from 'react';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import {extractParamsFromStringAsList } from '../../../util';
import { useId } from 'react';

export const ReturnPage = (s) => {
    const keyId = useId();
    console.log("sssssssssssssssssssssssssssssssssssssssssss",s)
    const searchData = extractParamsFromStringAsList(s);
    console.log("searchData",searchData[0])
    return (
        <Breadcrumbs separator="›" aria-label="breadcrumbs">
          <Link color="primary" href="/" style = {{ textDecoration: "none", fontWeight: "bold", fontSize: "16px" }}>
            <PublicIcon sx={{ mr: 0.5 }} />
            Recipes Home Menu
          </Link>
          
            <Link key = {keyId} color="success" href="/recipes" style = {{ textDecoration: "none", fontWeight: "bold", fontSize: "16px" }}>
            {searchData[0]!== undefined ? searchData.join('&') : 'Recipe Search'}
            </Link>
          
     
          <Typography sx = {{ textDecoration: "none", color: "inherit", fontWeight: "bold", fontSize: "16px" }}>Recipe Detail</Typography>
        </Breadcrumbs>
      );
}
