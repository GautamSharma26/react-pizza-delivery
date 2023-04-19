import React from 'react';
import { Link } from 'react-router-dom';
// import loginredirectimage from "../../images/loginplease.jpg";


const LoginRedirect = () => {
    return <div style={{
        position:"absolute",
        left:"50%",
        height:"50%",
        width:"50%",
        top:"50%",
        textAlign:"center",
        border:"12px",
        transform:"translate(-50%,-50%)"

        
    }}>
        <div style={{
            position:"relative",
            height:"100%",
            width:"100%"
            
        }}>
            <div style={{
                position:"absolute",
                top:"50%",
                left:"50%",
                transform:"translate(-50%,-50%)"

            }}>
                <Link to="/login" className='font-weight-bold'>Login Please</Link>
            </div>
        </div>

    </div>
}


// #endregion

export default LoginRedirect;