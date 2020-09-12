import API from "../../backend"

export const otpVerification = data => {
    return fetch (`${API}/user/login`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        
        body: JSON.stringify(data)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>{
        console.log(err);
    })
}

export const generateOTP = user =>{
    console.log(user);
    return fetch (`${API}/user/register`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        
        body: JSON.stringify(user)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>{
        console.log(err);
    })
}