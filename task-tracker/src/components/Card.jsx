import * as React from 'react';

import dayjs from 'dayjs';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Tasks from './tasks';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';


const today = dayjs();
const yesterday = dayjs().subtract(1, 'day');
const todayStartOfTheDay = today.startOf('day');

export default function BasicCard() {

    const [task, setTask] = useState('');
    const [date, setDate] = useState('');
    const [final, setFinal] = useState({});
    const [situationSwitch, setSituationSwitch] = useState(true);

    const changedInput = (event) => {
        setTask(event.target.value);
        console.log("event.target.value", event.target.value)
    }

    const changedDate = (event) => {
       setDate(event.$d.toLocaleString().split(':')[0]+ ":" +event.$d.toLocaleString().split(':')[1]); ; 
       console.log(event.$d.toLocaleString())
    }


    const addItem = () => {
        return(
        setFinal({
          ...final,
            [task]: date
        })
    )}

    const closeCard = () => {
        return(
        setSituationSwitch(!situationSwitch)
        )

    }
    const openCard = () => {
        return(
        setSituationSwitch(!situationSwitch)
        )
    }
    
    const handleCardValues = (name) => {

        // Assuming you want to remove a property whose value is 'name'
        for (let key in final) {
            if (key === name) {
                delete final[key]; // Remove the property
                break; // Exit the loop after finding and deleting the property
            }
        }
    
        // Update the state with the modified object
        setFinal({ ...final });
    }

    const [activeTasks, setActiveTasks] = useState({});

    const toggleTaskActive = (taskName, isActive) => {
        setActiveTasks(prev => ({
            ...prev,
            [taskName]: isActive
        }));
    };


  return (
    situationSwitch ? (
    <Card sx={{ maxWidth: 475,  position:"relative", left:'10%' ,  backgroundColor: '#F4EBE2'}}>
      <CardContent>
        <Typography sx={{ fontSize: 22, fontWeight:"bolder" }} color="text.primary" gutterBottom>
          Task Tracker
        </Typography>
        <Button  sx = {{mb: 2.5}}variant="outlined" color="error" onClick = {closeCard}> 
        Close AddTask Bar
        </Button>
        <Typography variant="h5" component="div">
          Task
        </Typography>
        <TextField sx={{ backgroundColor : "white", width : '20rem' }} id="outlined-basic" label="Add Task" variant="outlined" onChange = {changedInput}/>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DateTimePicker',
        ]} 
      >
        <DemoItem label="Date & Time" >
          <DateTimePicker
            defaultValue={today}
            disablePast
            views={['year', 'month', 'day', 'hours', 'minutes']}
            onChange= {changedDate}
           
          />
        </DemoItem>

      </DemoContainer>
    </LocalizationProvider>
        
      </CardContent>
      <CardActions sx={{ mb: 1.5, ml:15 }} >
        <Button variant="contained" onClick={addItem}>Save Task</Button>
      </CardActions>
   

        {Object.keys(final).map((task, index) => {
            return (
            <Tasks key={index} task={task}
            isActive={!!activeTasks[task]}
            onActiveChange={(isActive) => toggleTaskActive(task, isActive)}
            final = {final} date={final[task]} handleCardValues = {handleCardValues} />
            )
        })}
      

      


      

      


    </Card>)
    :
    (<>
            <Button  sx = {{mb: 2.5}} variant="outlined" onClick = {openCard} > 
        Open AddTask Bar
        </Button>

    </>)

  );
}