import React from 'react'
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import useWeather from './useWeather';

function Home({ cityName, setCityName }) {

    const { data, setData } = useWeather()

    const submitHandler = (e) => {
        e.preventDefault();
        
    }
    
    const clickHandler = ()=> {
        setCityName(''); 
        console.log(cityName)
    }
    console.log(data)
    return (
    <Box m={1}>
        <form onSubmit={submitHandler}>
            <TextField  label="Enter the City" value={cityName} requied="true"
                onChange={e => setCityName(e.target.value)} InputProps={{endAdornment: (
                <InputAdornment position="end">
                    <IconButton type="submit"edge="end" color="primary" onClick={clickHandler}>
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>
                ),
            }}
            />
        </form>   
    </Box>
    )
}

export default Home