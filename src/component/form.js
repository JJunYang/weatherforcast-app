import React, {  Component } from 'react'
import { Link } from 'react-router-dom'
import '../style/form.css'

class Form extends Component {
    state={
        city:"",
        country:""
    }
    handleGetCity=(e)=>{
        this.setState({
            city:e.target.value
        });
        // console.log(this.state.city);
        
    }
    handleGetCountry=(e)=>{
        this.setState({
            country:e.target.value
        });
        // console.log(this.state.country);
    }
    // getData=()=>{
    //     const fetchItem=await fetch(
    //         `http://api.openweathermap.org/data/2.5/forecast?q=${match.params.city},${match.params.country}&appid=${API_key}`
    //     );
    //     const items=await fetchItem.json();
    // }


    render() {
        return (
            <div className="container">
                <form >
                    <div className="row justify-content-md-center" >
                        <div className="col-md-3  py-1 ">
                            <input type="text" className="form-control" name="city" 
                            autoComplete="off" placeholder="City" 
                            onChange={this.handleGetCity} />
                        </div>
                        <div className="col-md-3 py-1 ">
                            <input type="text" className="form-control" name="country" 
                            autoComplete="off" placeholder="Country" 
                            onChange={this.handleGetCountry} />
                        </div>
                        <div className="col-md-2 mt-md-0 py-1 text-md-center">
                            <Link to={`/weatherforecast/${this.state.city},${this.state.country}`}><button className="btn btn-warning" >Search</button></Link>
                        </div>
                    </div>
                    
                </form>
            </div>
        );
    }

}

// function error(mess) {
//     if (mess === "empty") {
//         return (
//             <div className="alert alert-danger mx-5" role="alert">
//                 Please Enter City and Country
//             </div>
//         );
//     }
//     else if (mess !== "0") {
//         return (
//             <div className="alert alert-danger mx-5" role="alert">
//                 {mess}
//             </div>
//         );
//     }
//     else return null;

// }

export default Form;