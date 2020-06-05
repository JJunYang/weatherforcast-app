import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

const API_key = require("../config/keys").API_key;
export default class WeatherItem extends Component {
    constructor(props) {
        super(props);
        // console.log(props);
        this.state = {
            show: "false",
            data: [],
            city: "",
            list: [],
            categorizedList: [],
            message: "0"
        };
        this.getWeather(props);
    }
    categorizeResult = (list) => {
        const dates = list.map((item, i) => {
            return item.dt_txt.split(" ")[0];
        })
            .filter((item, i, currArr) => {
                return currArr.indexOf(item) === i;
            });
        // console.log("dates",dates);
        let sortedResult = [];
        for (let date of dates) {
            sortedResult.push({
                name: date,
                weather: [],
                show: "false"
            });
        }
        for (let item of list) {
            let itemDate = item.dt_txt.split(" ")[0];
            for (let result of sortedResult) {
                if (result.name === itemDate) {
                    result.weather.push(item);
                }
            }
        }
        // console.log("sortedResult", sortedResult);

        return sortedResult;
    }
    getWeather = async (props) => {
        await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${props.match.params.city},${props.match.params.country}&appid=${API_key}`)
            .then(response => response.json())
            .then(json => {
                // console.log('json', json);
                if (json.cod === "200") {
                    this.setState({
                        city: `${json.city.name},${json.city.country}`,
                        data: json,
                        list: json.list,
                        categorizedList: this.categorizeResult(json.list),
                        message: "0",
                        show: "true"
                    })
                }
                if (json.cod === "404") {
                    this.setState({
                        message: json.message,
                        show: "false"
                    });
                }
                // console.log('json',this.state.data);
                return false;

            })
            .catch(error => {
                console.log('error', error);
            })

    }
    // show=(date)=>{
    //     this.state.categorizedList.forEach(element => {
    //         if(element.name===date){
    //             return (
    //                 <div>
    //                     {element.weather.slice(0,4).map((item,i)=>{
    //                         <WeatherHour/>
    //                     })}
    //                 </div>
    //             );
    //         }
    //     });
    // }
    render() {
        return (
            <Fragment>
                <div className="container">
                    <h2 className="text-center my-4">Date: {this.props.match.params.date}<Link to={`/weatherforecast/${this.props.match.params.city},${this.props.match.params.country}`}><button className="btn btn-info ml-3 mb-2">Back</button></Link></h2>
                    {this.state.categorizedList.map((item, i) => {
                        return (
                            (item.name === this.props.match.params.date) ?
                                <div className="row" key={i}>
                                    {item.weather.map((daily, j) => {
                                        return (
                                            <div className="col-md-3" key={j}>
                                                <div className="card text-center" style={{ backgroundColor: 'transparent' }}>
                                                    <div className="card-body">
                                                        <span><strong>Time:{daily.dt_txt.split(' ')[1]}</strong></span>
                                                        <p><img src={`http://openweathermap.org/img/w/${daily.weather[0].icon}.png`} alt={daily.weather[0].main} /></p>
                                                        <h5>{daily.weather[0].description}</h5>
                                                        <p>
                                                            <span className="px-3">H: {Math.floor(daily.main.temp_max-273.15)}&deg;</span>
                                                            <span className="px-3">L: {Math.floor(daily.main.temp_min-273.15)}&deg;</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div> : ""
                        );
                    })}
                </div>



            </Fragment>
        );
    }
}