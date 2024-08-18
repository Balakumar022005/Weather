import React, { useEffect, useState } from "react";
import Current from "./component/current";
import ForeCast from "./component/forecast";
import "./App.css";
function App() {
  const [city, setcity] = useState("");
  const [suggestion, setsuggestion] = useState([]);
  const [clicked, setclicked] = useState(false);
  const [currentw, setcurrentW] = useState();
  const [Forecast, setForecast] = useState();
  const [location, setlocation] = useState('');


  const AutocompleteUrl =
    "https://api.weatherapi.com/v1/search.json?key=a201d117dca9414a9e3175420241608&q=";
  const Weather=((city)=>`https://api.weatherapi.com/v1/forecast.json?key=a201d117dca9414a9e3175420241608&q=${city}&days=7&aqi=no&alerts=no`
);

  const  handling = async(cur) => {
    setcity(cur);
    setclicked(true);
    const responseW=await fetch(Weather(city));
    const dataW=await responseW.json();
    setcurrentW(dataW.current);
    setForecast(dataW.forecast);
    setlocation(dataW.location.name );

  };

  useEffect(() => {
    const TO=setTimeout(()=>{
      const fetchresponse = async () => {
        const resp = await fetch(AutocompleteUrl + city);
        const data = await resp.json();
        const selectsuggestion = data.map(
          (curdata) => `${curdata.name},${curdata.region},${curdata.country}`
        );
  
        setsuggestion(selectsuggestion);
      };
      if (!clicked && city.length > 2) {
        fetchresponse();
      } else {
        setsuggestion([]);
        setclicked(false);
      }
    },800);
     return ()=>{clearTimeout(TO)};
  },[city]);

  return (
    <div className="App">
      <div className="header">Bala's Weather Report </div>
      <div className="Body">
        <input
          type="text"
          className="INPUT"
          placeholder="ENTER THE CITY NAME"
          value={city}
          onChange={(event) => setcity(event.target.value)}
        />
      {suggestion.length>0 &&<div className="boxing">
        {suggestion.map((s) => (
          <div className="suggetshow" onClick={() => handling(s)}>
            {s}
          </div>
        ))}
        </div>}
        {
          currentw &&<Current current={currentw} city={location}/>
        }
        {
          Forecast &&<ForeCast city={city} forecast={ Forecast}/>
        }
     
      </div>
    </div>
  );
}

export default App;
//https://66c0debcd0dc70a4b8d12a0a--zesty-caramel-c63f0e.netlify.app/