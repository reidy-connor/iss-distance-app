import { useEffect, useState } from "react";
import Output from './Output';
import axios from "axios";
import "./Body.css";

//40460ff5725c896d7bf6404ebdad1a21 openweather api key

const Body = () => {

    const [cityName, setCityName] = useState(null);
    const [cityLat, setCityLat] = useState(null);
    const [cityLong, setCityLong] = useState(null);
    const [issLat, setIssLat] = useState(null);
    const [issLong, setIssLong] = useState(null);
    const [distance, setDistance] = useState(null);
    const [tableData, setTableData] = useState([{
        cityName: null, 
        cityLat: null, 
        cityLong: null, 
        distance: null
    }]);

    useEffect(() => {
        axios.get('http://api.open-notify.org/iss-now.json')
        .then((response) => {
            setIssLat(response.data.iss_position.latitude);
            setIssLong(response.data.iss_position.longitude);
            console.log(response);
        })
    }, []);

    const fetchCity = (city) => {
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=40460ff5725c896d7bf6404ebdad1a21`)
        .then((response) => {
            setCityLat(response.data[0].lat);
            setCityLong(response.data[0].lon);
            console.log(response);
        });
    }

    const calculateDistance = () => {

        function toRad(x) {
            return x * Math.PI / 180;
          }
        
          var lon1 = cityLong;
          var lat1 = cityLat;
        
          var lon2 = issLong;
          var lat2 = issLat;
        
          var R = 6371; // km
        
          var x1 = lat2 - lat1;
          var dLat = toRad(x1);
          var x2 = lon2 - lon1;
          var dLon = toRad(x2)
          var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          var d = R * c;
        
          d /= 1.60934; //convert km to miles; remove to get distance in km

          setDistance(d);
          console.log(d);
          return d;
    }

    const addListObject = (cityName, cityLat, cityLong, distance) => {
        const obj = {
            cityName,
            cityLat,
            cityLong,
            distance
        };

        if(tableData.cityName === null){
            setTableData([obj]);
        } else {
            setTableData([...tableData, obj]);
        }    
    }

    return (
        <div className="body">
            <input
                className="city-input" 
                placeholder="Enter city name..."
                onChange={(event) => {
                    setCityName(event.target.value);
                }}
            />
            <button className="button" onClick={() => fetchCity(cityName)}> Submit </button>
            <button className="button" onClick={() => calculateDistance(cityLat, cityLong, issLat, issLong)}> Calculate </button>
            <button className="button" onClick={() => addListObject(cityName, cityLat, cityLong, distance)}> Save </button>

            <div className="container">
                <table>
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Distance (miles)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((data) => (
                            <tr>
                                <td> {data.cityName} </td>
                                <td> {data.cityLat} </td>
                                <td> {data.cityLong} </td>
                                <td> {data.distance} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <Output distance={distance} cityName={cityName}/>
        </div>
    );
}
 
export default Body;
