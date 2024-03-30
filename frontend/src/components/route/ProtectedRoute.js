import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}){
    const {isAuthenticate} = useSelector(state => state.authState);

    if(!isAuthenticate){
        return<Navigate to={'/login'} />
    }
    return children;
}