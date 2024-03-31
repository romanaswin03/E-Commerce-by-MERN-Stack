import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from '../layouts/Loader'

export default function ProtectedRoute({children}){
    const {isAuthenticate, loading} = useSelector(state => state.authState);

    if(!isAuthenticate && !loading){
        return<Navigate to={'/login'} />
    }
    if(isAuthenticate){
        return children;
    }
    if(loading){
        return <Loader />
    }
}