import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Switch from '@mui/material/Switch';
import { useState, useRef } from 'react';
function Tasks({task, final, date,isActive, onActiveChange, handleCardValues}) {
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const firstDivRef = useRef();

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;



    const handleSwitchChange = () => {
        onActiveChange(!isActive);
        if (!isActive) {
            handleCardValues(firstDivRef.current.textContent);
        }
    };
    
    return (

            <Card sx= {{m:2}}>
                <CardContent >
                    <Typography variant="h4" component="div"  ref={firstDivRef}>
                        {task.split(' ').slice(0,3).join(' ')} 
                    </Typography>
                    <Typography variant="h5" component="div">
                        {date}
                    </Typography>
                    <CardActions sx={{ mb: 1.5, ml:15 }} >
                    <Switch {...label} checked={!isActive} color="secondary" onChange={handleSwitchChange}  />
                    </CardActions>
                </CardContent>
                <div>
                    <Button aria-describedby={id} variant="contained" onClick={handleClick} >
                        Detailed Info
                    </Button>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                        }}
                    >
                        <Typography sx={{ p: 2 }}>{task}</Typography>
                    </Popover>
                </div>
            </Card>
    )

    
}

export default Tasks
