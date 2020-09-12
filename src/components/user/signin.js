import React, {useState} from 'react'
import '../../index.css';
import logo from '../../images/AK_logo.png'
import CountryCodes from './country_extension';
import { isValidPhoneNumber } from 'react-phone-number-input'

const Signin = () =>{
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false,
        country_code : "+91",
        flagImg: "https://flagpedia.net/data/flags/h80/in.webp",
        telephoneNumber: ""
    })
    const {email, password, error, loading, didRedirect, flagImg, telephoneNumber, country_code} = values;

    //sets state on change of value in the fields
    const handleChange = name => event =>{
        console.log("here");
        console.log(name);
        console.log(event.target.value);
        setValues({...values, error:false, [name]:event.target.value})
    }
    const countryFlagHandler = () =>{
        const select = document.getElementById('country_list')
        setValues({...values, flagImg:`https://flagpedia.net/data/flags/h80/${select.selectedOptions[0].dataset.countrycode.toLowerCase()}.webp`})
    }

    //displays error on the screen if error state is set
    const errorMessage = () => (
        <div className="row">
            <div className="col-md-8 offset-sm-2 text-left">
                <div className="alert alert-danger" role="alert" style={{display: error ? "" : "none"}}> {error}</div>    
            </div>
        </div>
    )
    
    //executed when the login form is submitted
    const onSubmit = event => {
        console.log("something");
        event.preventDefault();
        //sets loading state to true, error to false
        setValues({...values, error: false, loading: true})
        const completeNumber = `${country_code}${telephoneNumber}`;
        console.log(completeNumber); 
        if(completeNumber.length <5) {
            alert('Too Short ')
         } else if(isValidPhoneNumber(completeNumber)) {
           alert('Valid number')
         } else {
           alert('InValid number')
         }
    }

    //performs redirect on succesfull login
    const performRedirect = () =>{
        if(didRedirect){
            //return <Redirect to ="https://www.google.com" />
            window.location.href = 'https://www.google.com'; 
            return null;
        }
    }
    const loadingMessage = () => {
        return(
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        )
    }
    //ui of signin form
    const signInForm = () =>{
        return(
            
            <div className="container">
                <img src={logo} alt="" id="logo"/>
                <span id="welcome-text"> Welcome Back </span>
                <span id="sign-in-text">Please sign in to your account </span>
                <form>
                    <label id="phone-label">Enter Contact Number</label>
                    <div className="tel-box">
                        <div className="select-box" onChange={countryFlagHandler}>
                            <img src={flagImg} alt="" id="flag-img"/>
                            <CountryCodes handleChange= {handleChange}/>
                        </div>
                        <input type="number" id="telephone-number-input" onChange={handleChange("telephoneNumber")} value={telephoneNumber}/>
                        <div id="sms-disclamer">We will send you a one time SMS message. Charges may apply.</div>
                    </div>
                    <input type="button" id="sign-in-btn" value="Sign In with OTP " onClick={onSubmit}/>
                </form>
                {/* <div className="card-header card-header-success">
                  <h2 className="card-title">Log In</h2>
                  <h5 className="card-title">Welcome Back, Doctor</h5>
                </div>
                <div className="card-body ">
                  <form> */}
                        {/* {errorMessage()} */}
                        
                      {/* <div className="col-md-8 offset-sm-2">
                        <div className="form-group has-success">
                          <label className="bmd-label-floating">Email Address</label>
                          <input type="email" className="form-control" onChange={handleChange("email")} value={email}/>
                        </div>
                      </div>
                      <div className="col-md-8 offset-sm-2">
                        <div className="form-group has-success">
                          <label className="bmd-label-floating">Password</label>
                          <input type="password" className="form-control" onChange={handleChange("password")} value={password}/>
                        </div>
                      </div>
                    <div className="text-center">
                        <button onClick={onSubmit} type="submit" className="btn btn-success ">Login</button>
                    </div>
                    
                  </form>
                </div> */}
            </div>
        )
    }
    return(
        <>
            
            {/* {loadingMessage()} */}
            {signInForm()}
            {/* {performRedirect()} */}
                      
        </>   
    )
}
export default Signin;
