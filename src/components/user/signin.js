import React, {useState} from 'react'
import '../../index.css';
import '../../signin.css'
import logo from '../../images/AK_logo.png'
import CountryCodes from './country_extension';
import { isValidPhoneNumber } from 'react-phone-number-input'
import { Redirect} from 'react-router-dom'
import {generateOTP} from './api'


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
        setValues({...values, error:false, [name]:event.target.value})
    }
    const countryFlagHandler = () =>{
        const select = document.getElementById('country_list')
        setValues(prevState=>({...prevState, flagImg:`https://flagpedia.net/data/flags/h80/${select.selectedOptions[0].dataset.countrycode.toLowerCase()}.webp`}))
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
        const mobile_number = `${country_code}${telephoneNumber}`;
        console.log(mobile_number); 
        if(mobile_number.length <5) {
            alert('Too Short ')
            
         } 
         /* checks whether phone number is valid or not of all countries*/
         else if(isValidPhoneNumber(mobile_number)) {
           generateOTP({mobile_number})
            .then(data => {
                if(data.error){
                    setValues({...values, error: data.error, loading: false})
                }else{ 
                    setValues({
                        ...values,
                        didRedirect:true
                    }) 
                }
                return;
            })
            .catch(err=>{
                setValues({...values, error: "Can't process the request right now", loading: false})
               
            })
         } else {
           
           setValues({...values, error: "Invalid Phone Number", loading: false})
         }
    }

    //performs redirect on succesfull phone number
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
                        <input type="number" id="telephone-number-input" onChange={handleChange("telephoneNumber")} value={telephoneNumber} name="mobile_number"/>
                        <div id="sms-disclamer">We will send you a one time SMS message. Charges may apply.</div>
                    </div>
                    <input type="button" className="submit-btn" value="Sign In with OTP " onClick={onSubmit}/>
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
