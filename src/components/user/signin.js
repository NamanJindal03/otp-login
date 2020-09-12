import React, {useState} from 'react'
import '../../index.css';
import '../../signin.css'
import logo from '../../images/AK_logo.png'
import CountryCodes from './country_extension';
import { isValidPhoneNumber } from 'react-phone-number-input'
import { Redirect} from 'react-router-dom'


const Signin = () =>{
    const [values, setValues] = useState({
        error: "",
        loading: false,
        didRedirect: false,
        country_code : "+91",
        flagImg: "https://flagpedia.net/data/flags/h80/in.webp",
        telephoneNumber: ""
    })
    const { error, loading, didRedirect, flagImg, telephoneNumber, country_code} = values;

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
        
        <div className="alert-danger"  style={{display: error ? "" : "none"}}> {error}</div>    
            
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
           setValues({...values, error: false, loading: false, didRedirect: true})
         } else {
           alert('InValid number')
           setValues({...values, error: "Invalid Phone Number", loading: true})
         }
    }

    //performs redirect on succesfull login
    const performRedirect = () =>{
        if(didRedirect){
            return <Redirect to ={{
                pathname:"/otp", 
                state: {completeNumber: `${country_code}${telephoneNumber}`}
            }}/>
            
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
                    {errorMessage()}
                    <label id="phone-label">Enter Contact Number</label>
                    <div className="tel-box">
                        <div className="select-box" onChange={countryFlagHandler}>
                            <img src={flagImg} alt="" id="flag-img"/>
                            <CountryCodes handleChange= {handleChange}/>
                        </div>
                        <input type="number" id="telephone-number-input" onChange={handleChange("telephoneNumber")} value={telephoneNumber}/>
                        <div id="sms-disclamer">We will send you a one time SMS message. Charges may apply.</div>
                    </div>
                    <input type="button" clas="submit-btn" value="Sign In with OTP " onClick={onSubmit}/>
                </form>
                
            </div>
        )
    }
    return(
        <>
            
            {/* {loadingMessage()} */}
            {signInForm()}
            {performRedirect()}
                      
        </>   
    )
}
export default Signin;
