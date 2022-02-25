import React, { useState, useEffect } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import {
  Form,
  FormControl,
  Button,
  Card,
} from "react-bootstrap";

const API_KEY = "a2069d8cf5639f9169e96c51a9f7760d";
function Home() {
  const [getCity, setGetCity] = useState("london");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchingData = () => {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${getCity}&appid=${API_KEY}&units=metric`
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
          let { name } = result;
          let { description, main, icon } = result.weather[0];
          let { temp, feels_like, humidity, temp_max, temp_min } = result.main;
          let { country } = result.sys;
          let { speed } = result.wind;
          
          setData({
            temp,
            name,
            description,
            feels_like,
            humidity,
            temp_max,
            temp_min,
            country,
            main,
            speed,
            icon,
          });
        })
        .catch((error) => console.log(error));
    };

    fetchingData();
  }, [getCity]);

  let icon_url = `http://openweathermap.org/img/wn/${data.icon}.png`;
  const handleSubmit = (e) => {
    e.preventDefault();
    setGetCity(input);
    setInput("");
  };

  return (
    <div className="home">
      <div className="form-container">
        <Form
          style={{ width: "18rem" }}
          className="d-flex"
          onSubmit={handleSubmit}
        >
          <FormControl
            type="search"
            placeholder="Search"
            className="me-0"
            aria-label="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button>
            <LocationOnIcon />
          </Button>
        </Form>

        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <div className="top-container">
              <Card.Title>
                {data.name} {data.country}
              </Card.Title>
              <img src={icon_url} />
            </div>
            <Card.Text>{data.main}</Card.Text>
            <Card.Text>{data.description}</Card.Text>
            <Card.Text>
              {data.temp} <span>C</span>
            </Card.Text>
            <Card.Text>
              Feels like: {data.feels_like} <span>C</span>
            </Card.Text>
            <Card.Text>
              Max temp: {data.temp_max} <span>C</span>
            </Card.Text>
            <Card.Text>
              Min temp: {data.temp_min} <span>C</span>
            </Card.Text>
            <Card.Text>
              Wind speed: {data.speed} <span>m/s</span>
            </Card.Text>
            <Card.Text>
              Humidity: {data.humidity} <span>%</span>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Home;
