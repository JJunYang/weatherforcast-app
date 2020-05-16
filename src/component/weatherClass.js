import { Component } from "react";
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

const API_key = 'b012c928763ae28ecd72aaeac0e37617';

export default class WeatherClass extends Component {
    constructor(props) {
        super(props);
        // console.log(props);

        this.state = {
            show: "default",
            data: [],
            city: "",
            list: [],
            categorizedList: [],
            message: "0"
        };
        this.getWeather(props);
        // this.weatherIcon = {
        //     Thunderstorm: "wi-thunderstorm",
        //     Drizzle: "wi-sleet",
        //     Rain: "wi-storm-showers",
        //     Snow: "wi-snow",
        //     Atmosphere: "wi-fog",
        //     Clear: "wi-day-sunny",
        //     Clouds: "wi-day-fog"
        // }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.getWeather(nextProps);
        }
        // console.log(nextProps);

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
        // console.log("sortedResult",sortedResult);

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
                // console.log(json);
                return false;

            })
            .catch(error => {
                console.log('error', error);
            })

        // const response=await api_call.json();

        // this.setState({
        //     city: `${response.city.name},${response.city.country}`,
        //     data:response,
        //     list:response.list,
        //     categorizedList:this.categorizeResult(response.list)
        // });
        // console.log(this.state.categorizedList);
    }
    showImg = (result) => {

        let icon = result.weather[0].weather[0].icon;
        let main = result.weather[0].weather[0].main;
        return (
            <img src={`http://openweathermap.org/img/w/${icon}.png`} alt={main} />
        );
    }
    minmaxTemp = (result) => {
        // console.log(result);
        let maxTemp = 0;
        let minTemp = result.weather[0].main.temp_min;
        for (let maxtemp of result.weather) {
            if (maxtemp.main.temp_max > maxTemp) {
                maxTemp = maxtemp.main.temp_max;
            }
        }
        let max = Math.floor(maxTemp - 273.15);
        for (let mintemp of result.weather) {
            if (mintemp.main.temp_min < minTemp) {
                minTemp = mintemp.main.temp_min;
            }
        }
        let min = Math.floor(minTemp - 273.15);
        return (
            <h4>
                <span className="px-4">{min}&deg;</span>
                <span className="px-4">{max}&deg;</span>
            </h4>
        );

    }

    getPath = (result) => {
        var data = {
            dailyforecast: result,
        };
        var path = {
            pathname: `/weatherforecast/${this.props.match.params.city},${this.props.match.params.country}/${result.name}`,
            query: data
        }
        return path;
    }

    render() {
        return (
            <div style={{ backgroundColor: 'transparent' }}>
                <div className="container">
                    {(this.state.show === "true") ?
                        <div>
                            <h2 className="text-center my-4">{this.state.city}</h2>
                            <div className="row">
                                {this.state.categorizedList.map((result, i) => {
                                    return (
                                        <div className="col-sm-4" key={i}>
                                            <div className="card text-center" style={{ backgroundColor: 'transparent' }}>
                                                <div className="card-body">
                                                    <h5 className="card-title">{result.name}</h5>
                                                    <p>{this.showImg(result)}</p>
                                                    <h5>{result.weather[0].weather[0].description}</h5>
                                                    {this.minmaxTemp(result)}
                                                    <Link to={this.getPath(result)}><button className="btn btn-primary btn-sm">view detail</button></Link>
                                                </div>
                                            </div>
                                        </div>
                                    );

                                })}

                            </div>
                        </div>

                        : (this.state.show === "false") ?
                            <div className="alert alert-warning alert-dismissible mt-4 " role="alert">
                                <strong>Can't Find Forecast Info!</strong> Please check the city and country above.
                        </div> : ""
                    }
                </div>

            </div>
        )
    }
}