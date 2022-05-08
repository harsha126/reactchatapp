import React ,{useContext }from 'react';
import { useNavigate ,Route,Navigate} from 'react-router-dom';
import { AuthContext, useAuth } from '../context/auth';

const PrivateRoute = ({component:Component,...rest}) =>{
    const {curruser} = useAuth;
    console.log(curruser);
    const navigate = useNavigate();
    return (
        <Route
            {...rest}
            exact
            render={(props)=>
                curruser ? <Component {...props}/> : <Navigate to="/"/>
            }
        />
    );
} 

export default PrivateRoute;