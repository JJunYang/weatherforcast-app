# WeatherForcast App
[weatherforcast app](https://weatherforcast-app.herokuapp.com/)

This App was created for weather forcasting.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features
5 day forecast is available at any location or city.

5 day forecast includes weather data every 3 hours.

# API
This project fetched weather data from [openweathermap.org](https://openweathermap.org).

## API call
`api.openweathermap.org/data/2.5/forecast?q={city name},{state},{country code}&appid={your api key}`

You can search weather forecast for 5 days with data every 3 hours by city name and country.

## Usage

### Step1

Clone repository from [https://github.com/jjyang1108/weatherforcast-app](https://github.com/jjyang1108/weatherforcast-app)

### Step2

```bash
npm install
```

### Step3
Create `.env` file in the root directory of project. Add api_key variable in the form of `REACT_APP_API_KEY={YOUR_APIKEY}`.

### Step4

run project with `npm start`.
