import {useEffect} from 'react'
import {getToken} from "@/utils/token.jsx";
import {useNavigate, useLocation } from "react-router-dom";


export default function Layout(){
    // const navigate = useNavigate();
    // let location = useLocation();
    // const token = getToken()
    //
    // useEffect(() => {
    //     if(!token){
    //         console.log('location',location.pathname)
    //         navigate('/login?redirect='+location.pathname)
    //     }
    // });

    return (<div className="layout">首页布局</div>)

}
