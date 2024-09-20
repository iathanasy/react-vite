import {getToken} from "@/utils/token";
import {Navigate, useLocation} from "react-router-dom"

const AuthRoute = ({children})=>{
    let location = useLocation();
    const token = getToken()
    if(token){
        return <>{ children }</>
    }
    return <Navigate to={ '/login?redirect='+location.pathname } replace />
}

export default AuthRoute;
