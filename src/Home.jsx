/* import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { click } from "@testing-library/user-event/dist/click";
import WeatherCard from "./WeatherCard";
const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

function Home() {
  const [data, setData] = useState({});
  const [getKey, setGetKey] = useState(null);
  const [input, setInput] = useState("eger");
  const [cityName, setCityName] = useState("eger");
  const [weather, setWeather] = useState({
    Value: "1",
    Text: "snowy",
  });

  const inputHandle = (e) => {
    setInput(e.target.value);
  };

  const submitHandle = (e) => {
    e.preventDefault();
    setCityName(input);

    //let uriEncodedCity = encodeURIComponent(cityName);
    //let KeyCity = data.Key //188467

    const api = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${cityName}`;

    //getting Key of the City
    const getKeyFunction = () => {
      fetch(api)
        .then((res) => {
          if (res.ok) {
            console.log(res.status);
            return res.json();
          } else {
            if (res.status === 404) {
              return alert("wrong city");
            }
            alert("something went wrong");
            throw new Error("you have an error");
          }
        })
        .then((result) => {
          console.log(result);
          //let { Key } = result[0]
          //let { LocalizedName } = result[0]
          setGetKey(result[0].Key);
        })
        .catch((error) => console.log(error));
    };

    //getting weather
    const weatherApi = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${getKey}?apikey=${API_KEY}&metric=true`;

    const getWeatherFunction = () => {
      fetch(weatherApi)
        .then((res) => {
          if (res.ok) {
            console.log(res.status);
            return res.json();
          } else {
            if (res.status === 404) {
              return alert("error");
            }
            alert("something went wrong");
            throw new Error("you have an error");
          }
        })
        .then((result) => {
          console.log(result);
          let { Value } = result.DailyForecasts[0].Temperature.Maximum;
          let { Text } = result.Headline;
          setWeather({ Value, Text });
        })
        .catch((error) => console.log(error));
    };

    getKeyFunction();
    getWeatherFunction();
  };

  return (
    <>
      <Box m={1}>
        <form onSubmit={submitHandle}>
          <TextField
            label="Enter the City"
            value={input}
            requied="true"
            onChange={inputHandle}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" edge="end" color="primary">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Box>
      <WeatherCard
        temp={weather.Value}
        text={weather.Text}
        cityName={cityName}
      />
    </>
  );
}

export default Home;
 */

import React, { useState, useEffect } from "react";
const API_KEY = process.env.REACT_APP_API_KEY;

function Home() {
  const [getCity, setGetCity] = useState("london");
  const [data, setData] = useState([]);
  const [weather, setWeather] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchingData = () => {
      fetch(
        `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${getCity}`
      )
        .then((res) => {
          if (res.ok) {
            console.log(res.status);
            return res.json();
          } else {
            if (res.status === 404) {
              return alert("wrong city");
            }
            alert("something went wrong");
            throw new Error("you have an error");
          }
        })
        .then((result) => {
          console.log(result);
          let { Key } = result[0];
          let { LocalizedName } = result[0];
          setData({ Key, LocalizedName });
        })
        .catch((error) => console.log(error));
    };
    fetchingData();
  }, [getCity]);

  let getKey = data.Key;
 

  const handleSubmit = (e)=> {
      e.preventDefault();
      setGetCity(input)
      const fetchingWeather = () => {
        fetch(
          `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${getKey}?apikey=${API_KEY}&metric=true`
        )
          .then((res) => {
            if (res.ok) {
              console.log(res.status);
              return res.json();
            } else {
              if (res.status === 404) {
                return alert("error");
              }
              alert("something went wrong");
              throw new Error("you have an error");
            }
          })
          .then((result) => {
            console.log('weather', result);
            let { Value } = result.DailyForecasts[0].Temperature.Maximum;
            let { Text } = result.Headline;
            setWeather({ Value, Text });
          })
          .catch((error) => console.log(error));
      };
      fetchingWeather();


      
  }


 /*  useEffect(() => {
    
  }, []); */

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
      </form>
      <div>{data.LocalizedName}</div>
    </div>
  );
}

export default Home;
