import React, {useEffect, useState} from 'react'

const API_URL = process.env.REACT_APP_API_URL;

function useWeather() {

    const [data, setData] = useState('')

    useEffect(()=> {
        fetch(API_URL)
        .then(res => res.json())
        .then(result => setData(result))
        //console.log(result)
    },[])
    console.log(data)
    return {data, setData}
    }

export default useWeather