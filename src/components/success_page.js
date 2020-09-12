import React, {useState} from 'react'
import '../index.css';
import '../success.css';
import logo from '../images/artboard.png'


const SuccessPage = (props) =>{
    
    //ui of success page
    const success = () =>{
        return(
            
            <div className="container"> 
                <img src={logo} alt="" id="logo-3"/>
                <span id="success-text-1"> Welcome to AdmitKard </span>
                <span id="success-text-2">In order to provide you with a custom experience, <strong>we need to ask you a few questions.</strong> </span>
                <input type="button" className="submit-btn" value="Verify " />
                <span id="success-text-3">This will only take 5 min.</span>  
            </div>
        )
    }
    return(
        <>
            {success()}          
        </>   
    )
}
export default SuccessPage;
