import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { Redirect} from 'react-router-dom'
import Signin from './components/user/signin'
import Otp from './components/user/otp'
import UnknownPage from './components/404';
const Routes = () =>{
    return(
        <Router>
            
                <Switch>
                    <Route exact path="/"> <Redirect to="/sign-in" /> </Route>
                    <Route path="/sign-in" component={Signin} />
                    <Route path="/otp" component={Otp} />
                    <Route path='*' exact={true} component={UnknownPage} />
                </Switch>
            
        </Router>
    )
}
export default Routes;

