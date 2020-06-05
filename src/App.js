import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Form from './component/form';
import WeatherClass from './component/weatherClass';
import WeatherItem from './component/weatherItem';
import 'dotenv'

function App() {
  console.log(process.env);
  
  return (
    <Router>
      <div>
        <Form />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/weatherforecast" exact component={Home} />
          <Route path="/weatherforecast/:city,:country" exact component={WeatherClass} />
          <Route path="/weatherforecast/:city,:country/:date" component={WeatherItem} />
        </Switch>


      </div>
    </Router>
  );
}
const Home = () => (
  <div className="container mt-3">
    <div className="alert alert-success mt-4" role="alert">
      Please enter the city and country to forecast five days weather
    </div>
  </div>
);

export default App;
