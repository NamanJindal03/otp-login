import React, {useState} from 'react'
import '../../index.css';
import '../../otp.css'
import logo from '../../images/hand_holding_phone.png'
import CountryCodes from './country_extension';
import { isValidPhoneNumber } from 'react-phone-number-input'
import { Redirect} from 'react-router-dom'


const Otp = (props) =>{
    const [values, setValues] = useState({
        error: "",
        loading: false,
        didRedirect: false,
        telephoneNumber: "",
        otpNumber1:"",
        otpNumber2:"",
        otpNumber3:"",
        otpNumber4:"",
    })
    const { error, loading, didRedirect, telephoneNumber, country_code, otpNumber1, otpNumber2, otpNumber3, otpNumber4} = values;

    //sets state on change of value in the fields
    const handleChange = name => event =>{
        console.log("here");
        console.log(name);
        console.log(event.target.value);
        setValues({...values, error:false, [name]:event.target.value})
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
        const completeOtp = `${otpNumber1}${otpNumber2}${otpNumber3}${otpNumber4}`;
        console.log(completeOtp); 
        if(completeOtp == '1234'){
            console.log('redirect');
        }else{
            console.log("not redirect");
        }
    }

    //performs redirect on succesfull login
    const performRedirect = () =>{
        if(didRedirect){
            return <Redirect to ="/otp" />
            
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
    const changePhoneNumber = () =>{
        console.log("here");
        return <Redirect to ="/sign-in" />
    }
    //ui of signin form
    const otpForm = () =>{
        return(
            
            <div className="container">
                {console.log(props.location.state.completeNumber)}
                <img src={logo} alt="" id="logo-2"/>
                <span id="otp-text-1"> Please verify Mobile number </span>
                <span id="otp-text-2">An OTP is sent to {props.location.state.completeNumber} </span>
                <input type="button" id="change-number" onClick={changePhoneNumber} value="Change Phone Number" />
                <form>
                    {errorMessage()}
                    <div id="otp-number">
                        <input type="text" maxLength="1" value={otpNumber1} onChange={handleChange("otpNumber1")}/>
                        <input type="text" maxLength="1" value={otpNumber2} onChange={handleChange("otpNumber2")}/>
                        <input type="text" maxLength="1" value={otpNumber3} onChange={handleChange("otpNumber3")}/>
                        <input type="text" maxLength="1" value={otpNumber4} onChange={handleChange("otpNumber4")}/>
                    </div>
                    <div id="otp-text-3">Didn’t receive the code?</div>
                    <span id="otp-text-4">Resend</span>
                    <input type="button" className="submit-btn" value="Verify " onClick={onSubmit}/>
                </form>
                
            </div>
        )
    }
    return(
        <>
            
            {/* {loadingMessage()} */}
            {otpForm()}
            {performRedirect()}
                      
        </>   
    )
}
export default Otp;
