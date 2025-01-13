import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contexts/FakeAuthContext";
import PropTypes from "prop-types";

ProtectedRouted.propTypes = {
    children: PropTypes.element
}

function ProtectedRouted({children}){
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(function(){
        if(!isAuthenticated)
            navigate('/');
    },[isAuthenticated, navigate]);
    return isAuthenticated ? children : null ;
}

export default ProtectedRouted;