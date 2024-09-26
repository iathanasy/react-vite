//自定义hook，用于用户数据（一处获取多处使用）
import {useEffect, useState} from "react";
import {getUserInfo} from "@/apis/user.jsx";

export default function useUserInfo(){
    const [profile, setProfile] = useState({})
    // 获取当前登录用户信息
    useEffect(() =>{
        const fetchUserInfo = async () => {
            const res = await getUserInfo()
            setProfile(res.data)
        }
        // getUserInfo().then(res => {
        //     setProfile(res.data)
        // })
        fetchUserInfo()
    }, []);

    return profile

}
